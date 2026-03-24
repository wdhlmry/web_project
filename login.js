const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

function getUsers() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
  window.location.href = "login.html";
}

function generateUserId() {
  return Date.now().toString();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
  return password.length >= 6;
}

function showMessage(elementId, message, type = "error") {
  const messageElement = document.getElementById(elementId);
  if (!messageElement) return;
  messageElement.textContent = message;
  messageElement.style.color = type === "success" ? "green" : "red";
}

function clearMessage(elementId) {
  const messageElement = document.getElementById(elementId);

  if (!messageElement) return;
  messageElement.textContent = "";
}

/////////////////////////////////////////////////////////////////////////////////

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    clearMessage("registerMessage");

    const username = document.getElementById("registerUsername").value.trim();
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    if (!username || !name || !email || !password) {
      showMessage("registerMessage", "All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("registerMessage", "Invalid email format.");
      return;
    }

    if (!isStrongPassword(password)) {
      showMessage(
        "registerMessage",
        "Password must be at least 6 characters long.",
      );
      return;
    }

    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    if (password !== confirmPassword) {
      showMessage("registerMessage", "Passwords do not match.");
      return;
    }

    const users = getUsers();

    const existingUser = users.find(
      (u) => u.username === username || u.email === email,
    );
    if (existingUser) {
      showMessage("registerMessage", "Username or email already exists.");
      return;
    }

    const newUser = {
      id: generateUserId(),
      username: username,
      name: name,
      email: email,
      password: password,
      bio: "Hello! i am new here.",
      profilePicture: "default-profile.png",
      followers: [],
      following: [],
      posts: [],
    };

    users.push(newUser);
    saveUsers(users);

    showMessage(
      "registerMessage",
      "Registration successful! You can now log in.",
      "success",
    );

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    clearMessage("loginMessage");
    const usernameOrEmail = document
      .getElementById("loginUsername")
      .value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!usernameOrEmail || !password) {
      showMessage("loginMessage", "All fields are required.");
      return;
    }

    const users = getUsers();
    const user = users.find(
      (u) =>
        (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
        u.password === password,
    );

    if (!user) {
      showMessage("loginMessage", "Invalid username/email or password.");
      return;
    }

    setCurrentUser(user);
    window.location.href = "index.html";

    showMessage("loginMessage", "Login successful! Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  });
}

function requireLogin() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = "login.html";
  }
}

function redirectIfLoggedIn() {
  const currentUser = getCurrentUser();

  if (currentUser) {
    window.location.href = "index.html";
  }
}

window.logoutUser = logoutUser;
window.requireLogin = requireLogin;
window.redirectIfLoggedIn = redirectIfLoggedIn;
window.getCurrentUser = getCurrentUser;
