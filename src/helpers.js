export function mountTo(router) {
  const data = localStorage.getItem('access_token');
  if (data) {
    router.push({ name: 'Home' });
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

export function showToast(message) {
  let toastBox = document.getElementById('toastbar');

  let box = document.createElement('div');
  box.classList.add('toast');
  box.innerHTML = message;

  let closeButton = document.createElement('span');
  closeButton.innerHTML = '&times;';
  closeButton.classList.add('close-button');
  closeButton.onclick = () => {
    box.style.opacity = 0;
    setTimeout(() => {
      box.remove();
    }, 500);
  };

  box.appendChild(closeButton);
  toastBox.appendChild(box);

  if (message.includes('Failed to submit')) box.classList.add('error');
  if (message.includes('Something failed')) box.classList.add('invalid');

  setTimeout(() => {
    box.style.opacity = 0;
    setTimeout(() => {
      box.remove();
    }, 500);
  }, 3000);
}
