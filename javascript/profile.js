//Displaying Current logged-in user
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

if (!currentUser) {
  alert("No user logged in!");
  return;
} else {
  if (!currentUser.followers) currentUser.followers = [];
  if (!currentUser.following) currentUser.following = [];
  if (!currentUser.posts) currentUser.posts = [];
}

const usernameE1 = document.querySelector(".username");
const bioE1 = document.querySelector(".bio");
const nicknameE1 = document.querySelector(".nickname");
const picE1 = document.querySelector(".profile_pic");

if (currentUser) {
  if (usernameE1)
    usernameE1.textContent = currentUser.username || "No Username";
  if (bioE1) bioE1.textContent = currentUser.bio || "No Bio";
  if (nicknameE1)
    nicknameE1.textContent = currentUser.nickname || "No Name/Nickname";
 if (picE1) {
  picE1.src = currentUser.profilePic || "../images/download__9_-removebg-preview.png";
}
}
//functions
function updateFollowButton() {
  if (!followbtn || !currentUser) return;

  if (viewedUserId === currentUser.id) {
    followbtn.style.display = "none";
    return;
  }

  if (currentUser.following.includes(viewedUserId)) {
    followbtn.textContent = "Following";
  } else {
    followbtn.textContent = "Follow";
  }
}

function followUser(targetUserId) {
  if (targetUserId === currentUser.id) {
    alert("You cannot follow yourself!");
    return;
  }
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const targetUser = users.find((u) => u.id === targetUserId);

  if (!targetUser) return;
  if (!targetUser.followers) targetUser.followers = [];

  if (!currentUser.following.includes(targetUserId)) {
    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUser.id);
  }

  users = users.map((user) => {
    if (user.id === currentUser.id) return currentUser;
    if (user.id === targetUserId) return targetUser;
    return user;
  });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function unfollowUser(targetUserId) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const targetUser = users.find((u) => u.id === targetUserId);

  if (!targetUser) return;
  if (!currentUser.following.includes(targetUserId)) {
    alert("You are not following this user!");
    return;
  }

  currentUser.following = currentUser.following.filter(
    (id) => id !== targetUserId,
  );
  targetUser.followers = targetUser.followers.filter(
    (id) => id !== currentUser.id,
  );

  users = users.map((user) => {
    if (user.id === currentUser.id) return currentUser;
    if (user.id === targetUserId) return targetUser;
    return user;
  });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function updateStatus() {
  if (!currentUser) return;
  const followersCount = document.getElementById("followers_count");
  const followingCount = document.getElementById("following_count");
  const postCount = document.getElementById("posts_count");

  if (followersCount)
    followersCount.textContent = currentUser.followers
      ? currentUser.followers.length
      : 0;
  if (followingCount)
    followingCount.textContent = currentUser.following
      ? currentUser.following.length
      : 0;

  //   document.getElementById("followers_count").textContent =
  //     currentUser.followers.length;
  //   document.getElementById("following_count").textContent =
  //     currentUser.following.length;

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const userPosts = posts.filter((post) => post.userId === currentUser.id);

  //document.getElementById("posts_count").textContent = userPosts.length;
  if (postCount) {
    postCount.textContent = userPosts.length;
  }
}
//Handling follow/unfollow
const followbtn = document.getElementById("follow_button");

const viewedUserId = 2; //this value is an example

let users = JSON.parse(localStorage.getItem("users")) || [];

let viewedUser = users.find((u) => u.id === viewedUserId);

if (followbtn && currentUser) {
  followbtn.addEventListener("click", () => {
    if (currentUser.following.includes(viewedUserId)) {
      unfollowUser(viewedUserId);
    } else {
      followUser(viewedUserId);
    }

    updateFollowButton();
    updateStatus();
  });
}

updateFollowButton();
updateStatus();
