export function mountTo(router) {
  const data = localStorage.getItem('access_token');
  if (data) {
    router.push({ name: 'Home'});
  }
}
