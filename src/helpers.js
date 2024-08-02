export function mountTo(router) {
  const data = localStorage.getItem('access_token');
  if (data) {
    router.push({ name: 'Home'});
  }
}

export function getStoredPermissions() {
  const storedPermissions = localStorage.getItem('permissions');
  if (storedPermissions) {
    try {
      return JSON.parse(storedPermissions);
    } catch (e) {
      console.error('Failed to parse permissions:', e);
      return [];
    }
  } else {
    console.warn('No permissions found in localStorage.');
    return [];
  }
}

export function hasPermission(permissionName) {
  const permissions = getStoredPermissions();
  return permissions.some(p => p.name === permissionName);
}
