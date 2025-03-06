export default defineGuardEventHandler({
  guards: [authGuard],
}, () => {
  return 'Authenticated!'
})
