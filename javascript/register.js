let users = JSON.parse(localStorage.getItem("users"))|| []; // Restore an existing array or creat new one

const regForm = document.querySelector(".register-form");
regForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    addUser();
});

function addUser(){
    const email = document.getElementById("register-email").value;
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if(users.some(u=>u.username === username)){ // to check if the username is exist
        alert("This username already Registerd");
        return;
    }
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1; 

    let nickname = "";
    let bio = "";      
    let profilePic = "../images/default-avatar.png";
    let followers = [];  
    let following = [];  
    
    const user = {
        email: email,
        username: username,
        password: password,
        id: id,
        nickname: nickname,
        bio: bio,
        profilePic: profilePic,
        followers: followers,
        following: following
    }
    users.push(user);
    localStorage.setItem("users",JSON.stringify(users));
    alert("Account created successfully!");

document.getElementById("register-email").value = "";
document.getElementById("register-username").value = "";
document.getElementById("register-password").value = "";
window.location.href = "../html/login.html";

}

    const showPassword = document.getElementById('showPassword');
    const passwordInput = document.getElementById('register-password');

    showPassword.addEventListener("change", function () {
        passwordInput.type = this.checked ? "text" : "password";
    })

