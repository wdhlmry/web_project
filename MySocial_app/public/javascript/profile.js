const params = new URLSearchParams(window.location.search);
const viewedUserId = Number(params.get("id"));
const users = JSON.parse(localStorage.getItem("users")) || null;
const loggedInUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const currentUser = viewedUserId ? users.find(u => u.id === viewedUserId) : loggedInUser;
if (!currentUser) {
  alert("No user logged in!");
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
    usernameE1.textContent = "@" + currentUser.username || "No Username";
  if (bioE1) bioE1.textContent = currentUser.bio || "No Bio";
  if (nicknameE1)
    nicknameE1.textContent = currentUser.nickname || "No Name/Nickname";
  if (picE1) {
    picE1.src = currentUser.profilePic || "../images/default-avatar.png";
  }
}


function renderUserPosts() {
  if (!currentUser) return;

  const profilePostsCountainer = document.getElementById("profile_posts");
  if (!profilePostsCountainer) return;

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const userPosts = posts.filter((post) => post.userId === currentUser.id);

  profilePostsCountainer.innerHTML = "";

  if (userPosts.length === 0) {
    profilePostsCountainer.innerHTML = "<h4> No Posts yet</h4>";
    return;
  }

  userPosts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    postDiv.innerHTML = `
    <div class="post-content">
    <strong> ${post.username}</strong>
        <p>${post.text}</p>
        ${post.image ? `<img src="${post.image}" class="post-img">` : ""}
        <small>${post.date}</small>
      </div>`;

    profilePostsCountainer.appendChild(postDiv);
  });
}

function updateStatus() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (!currentUser) return;

  const followersCount = document.getElementById("followers_count");
  const followingCount = document.getElementById("following_count");
  const postCount = document.getElementById("posts_count");

  const targetUser = users.find(u=>u.id === currentUser.id);
  if (followersCount)
    {
    followersCount.textContent = targetUser.followers ? targetUser.followers.length : 0;
    }

  if (followingCount)
    {
    followingCount.textContent = targetUser.following ? targetUser.following.length : 0;
    }


  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const userPosts = posts.filter((post) => post.userId === currentUser.id);

  if (postCount) {
    postCount.textContent = userPosts.length;
  }
}

updateStatus();
renderUserPosts();
