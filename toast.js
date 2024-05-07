let toastIds = ["welcomeToast", "googleTranslateToast"];

window.onload = (event) => {
  toastIds.forEach(toastId => {
      let toast = document.getElementById(toastId);
      let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
      toastBootstrap.show();
  })
}