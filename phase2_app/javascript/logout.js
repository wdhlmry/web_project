document.addEventListener("DOMContentLoaded", () => {
  logoutUser();
});

function logoutUser() {
  localStorage.removeItem("currentUser");
}

function goLogin() {
  window.location.href = "../html/login.html";
}
