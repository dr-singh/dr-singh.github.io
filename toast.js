window.onload = (event) => {
  let toastLive = document.getElementById("welcomeToast");
  let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
  toastBootstrap.show();
}