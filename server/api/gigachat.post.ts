import { defineEventHandler, readBody, setResponseStatus } from 'h3'
import https from 'node:https'
import { randomUUID } from 'crypto'
import { generateSystemPrompt } from '../utils/gigachat-prompts'
import { getById } from '../utils/cocktails'

type AuthResponse = {
  access_token?: string
  expires_in?: number
}

type GigachatRequestBody = {
  prompt: string
  model?: string
  temperature?: number
}

const AUTH_KEY = process.env.GIGACHAT_AUTH_KEY || ''
const AUTH_URL = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth'
const API_URL = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions'

let cachedToken: { token: string; expiresAt: number } | null = null

const agent = new https.Agent({ rejectUnauthorized: false })

async function httpsRequest<T>(url: string, options: any): Promise<T> {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url)
    const req = https.request(
      {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.pathname,
        method: options.method,
        headers: options.headers,
        agent,
      },
      (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch {
            reject(new Error('Invalid JSON response'))
          }
        })
      }
    )
    req.on('error', reject)
    if (options.body) req.write(options.body)
    req.end()
  })
}

async function getAccessToken(): Promise<string> {
  const now = Date.now()

  if (cachedToken && cachedToken.expiresAt > now) {
    return cachedToken.token
  }

  const authRes = await httpsRequest<AuthResponse>(AUTH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${AUTH_KEY}`,
      RqUID: randomUUID(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ scope: 'GIGACHAT_API_PERS' }).toString(),
  })

  const token = authRes?.access_token
  if (!token) {
    throw new Error('Failed to obtain access token')
  }

  const expiresIn = authRes.expires_in || 1800
  cachedToken = { token, expiresAt: now + (expiresIn - 30) * 1000 }

  return token
}

export default defineEventHandler(async (event) => {
  try {
    if (!AUTH_KEY) {
      setResponseStatus(event, 500)
      return { error: 'GIGACHAT_AUTH_KEY not configured' }
    }

    const body = await readBody<GigachatRequestBody>(event)
    const prompt = body?.prompt

    if (!prompt || typeof prompt !== 'string') {
      setResponseStatus(event, 400)
      return { error: 'prompt is required' }
    }

    const token = await getAccessToken()

    const chatResponse = await httpsRequest<any>(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        RqUID: randomUUID(),
      },
      body: JSON.stringify({
        model: body.model || 'GigaChat-Pro',
        messages: [
          { role: 'system', content: generateSystemPrompt() },
          { role: 'user', content: prompt }
        ],
        temperature: body.temperature || 1.0,
      }),
    })

    let content = chatResponse?.choices?.[0]?.message?.content;

    let cocktailIds = content.split(",").map((_id: string) => Number(_id))

    return cocktailIds.map((_id: number) => getById(_id))
  } catch (err: any) {
    console.error('gigachat.post error:', err)
    setResponseStatus(event, 500)
    return { error: 'Internal server error', details: err?.message || String(err) }
  }
})
