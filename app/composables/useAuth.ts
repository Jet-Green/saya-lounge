import AuthAPI from "../api/AuthApi"
import type { User } from "../types/user.interface"


export function useAuth() {
  const user = useState<User | null>(() => null)
  const router = useRouter()

  async function registration(data: any): Promise<boolean> {
    try {
      const response = await AuthAPI.registration(data)

      if (response.user) {
        user.value = response.user
      }
      return true
    } catch {
      return false
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await AuthAPI.login(email, password)
      if (response.data.value) {
        user.value = response.data.value.user
      }
      return response
    } catch {
      return false
    }
  }

  async function checkAuth(): Promise<boolean> {
    try {
      if (user.value?._id) return true

      const response = await AuthAPI.refresh()

      if (response.data.value?._id) {
        user.value = response.data.value
        return true
      }

      return false
    } catch {
      await logout()
      return false
    }
  }

  async function getAllUsers(): Promise<any> {
    try {
      return await AuthAPI.getAllUsers()
    } catch (error) {
      console.log(error)
    }
  }

  async function logout(): Promise<any> {
    try {
      const res = await AuthAPI.logout()
      user.value = null
      router.push('/')
      return res
    } catch { }
  }

  async function updateUser(newUser: any, userId: string) {
    try {
      const res = await AuthAPI.updateUser(newUser, userId)

      if (res.status.value === 'success') {
        user.value = res.data.value
      }

      return res
    } catch { }
  }

  async function sendResetLink(email: string) {
    try {
      return await AuthAPI.sendResetLink(email)
    } catch (error) {
      console.log(error)
    }
  }

  async function resetPassword(password: string, userId: string, token: string) {
    try {
      return await AuthAPI.resetPassword(password, userId, token)
    } catch (error) {
      console.log(error)
    }
  }

  async function uploadAvatar(fd: FormData, userId: string) {
    try {
      return await AuthAPI.uploadAvatar(fd, userId)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    user,
    registration,
    login,
    checkAuth,
    logout,
    updateUser,
    sendResetLink,
    resetPassword,
    getAllUsers,
    uploadAvatar,
  }
}
