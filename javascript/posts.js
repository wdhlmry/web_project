const postBtn = document.getElementById("post-btn");
const postContent = document.getElementById("post-content");
const postImage = document.getElementById("post-image");
const feed = document.getElementById("feed");

document.addEventListener("DOMContentLoaded", loadPosts);

postBtn.addEventListener("click", () => {
  const content = postContent.value.trim();
  const file = postImage.files[0];

  if (content === "" && !file) return alert("Post cannot be empty!");

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

  if (file) {
    const reader = new FileReader();

    reader.onload = function () {
      const post = {
        id: Date.now(),
        userId: currentUser.id,
        username: currentUser.username,
        text: content,
        image: reader.result,
        date: new Date().toLocaleString(),
        likes: 0,
        comments: [],
      };

      savePost(post);
      addPostToFeed(post);
      postContent.value = "";
      postImage.value = "";
    };

    reader.readAsDataURL(file);
  } else {
    const post = {
      id: Date.now(),
      userId: currentUser.id,
      username: currentUser.username,
      text: content,
      image: null,
      date: new Date().toLocaleString(),
      likes: 0,
      comments: [],
    };

    savePost(post);
    addPostToFeed(post);
    postContent.value = "";
  }
});

function savePost(post) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.unshift(post);
  localStorage.setItem("posts", JSON.stringify(posts));
}

function loadPosts() {
  if (!feed) return;
  feed.innerHTML = "";
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
  const userPost = posts.filter((p) => p.username === currentUser.username);
  userPost.forEach((post) => addPostToFeed(post));
  // posts.forEach(post => addPostToFeed(post));
}

function addPostToFeed(post) {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  postDiv.innerHTML = `
    <div class="post-content">
        <strong>${post.username}</strong>
        <p>${post.text}</p>
        ${post.image ? `<img src="${post.image}" class="post-img">` : ""}
        <small>${post.date}</small>

        <button class="like-btn"> ❤️ ${post.likes || 0}</button> 

        <div class="comments">
        ${(post.comments || []).map((c) => `<p>💬 ${c}</p>`).join("")}
       </div>
        
       <div class="comment-box">
        <input type="text" placeholder="Write a comment..." />
        <button class="comment-btn">Comment</button>
      </div>
    </div>

    <div class="post-actions">
      <button class="more-btn">⋯</button>
      <button class="delete-btn">Delete</button>
    </div>

  `;

  const likeBtn = postDiv.querySelector(".like-btn");
  const moreBtn = postDiv.querySelector(".more-btn");
  const deleteBtn = postDiv.querySelector(".delete-btn");
  const commentInput = postDiv.querySelector("input");
  const commentBtn = postDiv.querySelector(".comment-btn");

  deleteBtn.style.display = "none";

  moreBtn.addEventListener("click", () => {
    deleteBtn.style.display =
      deleteBtn.style.display === "none" ? "inline-block" : "none";
  });

  deleteBtn.addEventListener("click", () => {
    deletePost(post.id);
  });

likeBtn.addEventListener("click", () => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts = posts.map((p) => {
    if (p.id === post.id) {
      p.likes = (p.likes || 0) + 1;
    }
    return p;
  });
  localStorage.setItem("posts", JSON.stringify(posts));
  loadPosts();
});

commentBtn.addEventListener("click", () => {
  const commentText = commentInput.value.trim();
  if (!commentText) return;

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts = posts.map((p) => {
    if (p.id === post.id) {
      if (!p.comments) p.comments = [];
      p.comments.push(commentText);
    }
    return p;
  });

  localStorage.setItem("posts", JSON.stringify(posts));
  loadPosts();
});
feed.appendChild(postDiv);
}

function deletePost(id) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts = posts.filter((post) => post.id !== id);
  localStorage.setItem("posts", JSON.stringify(posts));
  loadPosts();
}
