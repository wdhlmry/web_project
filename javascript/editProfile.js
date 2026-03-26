const editForm = document.querySelector(".edit_form");
const nicknameInput = document.getElementById("nickname");
const usernameInput = document.getElementById("username");
const bioInput = document.getElementById("bio");
const accountPictureInput = document.getElementById("accountPicture");
const previewImage = document.querySelector(".picture img");

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
  id : Date.now(),
  nickname: "",
  username: "",
  bio: "Hello i am new here", // the defult bio
  profilePic: "../images/default-avatar.png",
  followers: [],
  following: [],
  posts: [],
};

// the changes on the edit profile to the profile 
nicknameInput.value = currentUser.nickname || "";
usernameInput.value = currentUser.username || "";
bioInput.value = currentUser.bio || "";
previewImage.src = currentUser.profilePic || "../images/default-avatar.png",


accountPictureInput.addEventListener("change", function(){
    const file = this.files[0];
    if (file){
        const reader = new FileReader();
        reader.onload = function(e){
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

//save when we click submit
editForm.addEventListener("submit" , function (e){
    e.preventDefault();
    console.log("SUBMIT WORKED");

    const updatedUser= {
        ...currentUser,
        nickname : nicknameInput.value.trim(),
        username : usernameInput.value.trim(),
        bio : bioInput.value.trim(),
        profilePic : previewImage.src
    };
    //save current login user
    localStorage.setItem("currentUser" , JSON.stringify(updatedUser));

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if(users.length > 0){
        users = users.map((user) => {
            if (user.id === updatedUser.id){
                return updatedUser;
            }
            return user;
        });
    
    localStorage.setItem("users" , JSON.stringify(users));
    }
    window.location.href = "../html/profile.html";
});
