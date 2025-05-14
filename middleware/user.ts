export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $isUser } = useAuth();
  if (!$isUser.value) {
    return await navigateTo("/");
  }
});
