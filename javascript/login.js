const USERS = "users";
const CURRENT_USER = "currentUser";

function getUsers() {
  const users = localStorage.getItem(USERS);
  return users ? JSON.parse(users) : [];
}

// function saveUsers(users) {
//   localStorage.setItem(USERS, JSON.stringify(users));
// }

function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER, JSON.stringify(user));
}

function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER);
  return user ? JSON.parse(user) : null;
}

function showMessage(elementId, message, type = "error") {
  const messageElement = document.getElementById(elementId);
  if (!messageElement) return;
  messageElement.textContent = message;
  messageElement.style.color = type === "success" ? "green" : "red";
}

function clearMessage(elementId) {
  const messageElement = document.getElementById(elementId);

  if (!messageElement) return; //nothing to clear
  messageElement.textContent = "";
}

function redirectIfToLogedIn() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    window.location.href = "../html/index.html"; //if it works
  }
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearMessage("errorMessage");

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      showMessage("errorMessage", "email and password is Required");
      return;
    }

    const users = getUsers();

    const user = users.find(
      (u) => u.email.toLowerCase() === email && u.password === password,
    );

    if (!user) {
      showMessage("errorMessage", "Invalid email or password !");
      return;
    }
    setCurrentUser(user);
    showMessage("errorMessage", "Login is successful", "success");

    setTimeout(() => {
      window.location.href = "../html/index.html";
    }, 1500);
  });
}

const showPassword = document.getElementById("showPassword");
const passwordInput = document.getElementById("password");

if (showPassword && passwordInput) {
  showPassword.addEventListener("change", function () {
    passwordInput.type = this.checked ? "text" : "password";
  });
}

redirectIfToLogedIn();
