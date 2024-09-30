export function mountTo(router) {
  const data = localStorage.getItem("access_token");
  if (data) {
    router.push({ name: "Home" });
  }
}

export function getStoredPermissions() {
  const storedPermissions = localStorage.getItem("permissions");
  if (storedPermissions) {
    try {
      return JSON.parse(storedPermissions);
    } catch (e) {
      console.error("Failed to parse permissions:", e);
      return [];
    }
  } else {
    console.warn("No permissions found in localStorage.");
    return [];
  }
}

export function hasPermission(permissionName) {
  const permissions = getStoredPermissions();
  return permissions.some((p) => p.name === permissionName);
}

export function showToast(message, value) {
  if (message === "PASS") {
    message = '<i class="fa-solid fa-circle-check"></i> ' + value;
  } else if (message === "FAIL") {
    message = '<i class="fa-solid fa-circle-xmark"></i> ' + value;
  } else {
    message =
      '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + value;
  }
  let toastBox = document.getElementById("toastbar");

  let box = document.createElement("div");
  box.classList.add("toast");
  box.innerHTML = message;

  let closeButton = document.createElement("span");
  closeButton.innerHTML = "&times;";
  closeButton.classList.add("close-button");
  closeButton.onclick = () => {
    box.style.opacity = 0;
    setTimeout(() => {
      box.remove();
    }, 500);
  };

  box.appendChild(closeButton);
  toastBox.appendChild(box);

  if (message.includes("Failed to submit")) box.classList.add("error");
  if (message.includes("Something failed")) box.classList.add("invalid");

  setTimeout(() => {
    box.style.opacity = 0;
    setTimeout(() => {
      box.remove();
    }, 500);
  }, 3000);
}

export function toCamelCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0) return word.charAt(0).toUpperCase() + word.slice(1);
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}
