const editForm = document.querySelector(".edit_form");
const nicknameInput = document.getElementById("nickname");
const usernameInput = document.getElementById("username");
const bioInput = document.getElementById("bio");
const accountPictureInput = document.getElementById("accountPicture");
const previewImage = document.querySelector(".picture img");

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null ;

if (!currentUser) {
  alert("No user logged in!");
} else {
  if (!currentUser.followers) currentUser.followers = [];
  if (!currentUser.following) currentUser.following = [];
  if (!currentUser.posts) currentUser.posts = [];
}

//   id: Date.now(),
//   nickname: "",
//   username: "",
//   bio: "Hello i am new here", // the defult bio
//   profilePic: "../images/default-avatar.png",
//   followers: [],
//   following: [],
//   posts: [],
// };

// the changes on the edit profile to the profile
if (currentUser){
nicknameInput.value = currentUser.nickname || "";
usernameInput.value = currentUser.username || "";
bioInput.value = currentUser.bio || "";
previewImage.src = currentUser.profilePic || "../images/default-avatar.png";
}

  accountPictureInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

//save when we click submit
editForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("SUBMIT WORKED");

  if(!currentUser) return;

  const oldUsername = currentUser.username;

  const updatedUser = {
    ...currentUser,
    nickname: nicknameInput.value.trim(),
    username: usernameInput.value.trim(),
    bio: bioInput.value.trim(),
    profilePic: previewImage.src,
  };
  //save current login user
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.length > 0) {
    posts = posts.map((post) => {
      if (post.id === updatedUser.id) {
        return{
          ...post,
          username: updatedUser.username,
        };
      }
      return post;
    });

    localStorage.setItem("users", JSON.stringify(users));
  }
  window.location.href = "../html/profile.html";
});
