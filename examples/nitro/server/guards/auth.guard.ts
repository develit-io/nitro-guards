export default defineNitroGuard((event) => {
  const authHeader = getHeader(event, 'Authorization')

  if (!authHeader || authHeader !== 'Bearer my-secret-token') {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
})
