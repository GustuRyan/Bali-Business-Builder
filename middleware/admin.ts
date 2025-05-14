export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $isAdmin } = useAuth();
  if (!$isAdmin.value) {
    return await navigateTo("/");
  }
});
