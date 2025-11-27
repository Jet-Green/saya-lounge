import { getModel, systemPrompt } from "~~/server/utils/model";

export default defineEventHandler(async (event) => {
  const { message } = await readBody(event);

  const model = await getModel();
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: message }
  ];
  const response = await model.invoke(messages);

  return { content: response.content };
});