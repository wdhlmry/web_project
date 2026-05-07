
const postBtn = document.getElementById("post-btn");
const postContent = document.getElementById("post-content");
const postImage = document.getElementById("post-image");
const feed = document.getElementById("feed");
const userSidebar= document.getElementById("otherUsers");

document.addEventListener("DOMContentLoaded", () => {
  loadPosts();
  loadUsers();
});

postBtn.addEventListener("click", () => {
  const content = postContent.value.trim();
  const file = postImage ? postImage.files[0] : null;

  if (content === "" && !file) {
    alert("Post cannot be empty!");
    return;
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  if (!currentUser) {
    alert("No user logged in!");
    return;
  }
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
        comments: []
      };

      const saved = savePost(post);
      if (saved) {
        loadPosts();
      }
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
      comments: []
    };

    const saved = savePost(post);
    if (saved) {
      loadPosts();
    }
    postContent.value = "";
  }
});

function savePost(post) {
  try {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      if (!currentUser.posts) currentUser.posts = [];
      currentUser.posts.unshift(post.id);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    return true;
  } catch (error) {
    alert("Post could not be saved. The image may be too large.");
    return false;
  }


}

function loadPosts() {
  if (!feed) return;
  feed.innerHTML = "";
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  if (!currentUser) return;
  const followingIds = currentUser.following ? currentUser.following : [];
  const showenPosts = posts.filter(p => followingIds.includes(p.userId)|| p.userId == currentUser.id);
  showenPosts.forEach((post) => addPostToFeed(post));
}

function addPostToFeed(post) {

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
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
          
          ${(post.comments || []).map((c) => `
              <div class="eachComment">
                <p>💬${c.username}: ${c.text}</p>
                ${c.userId === currentUser.id ? `<button class="deleteCommentBtn" data-comment-id="${c.id}">🗑️</button>`: ""}
              </div>
          `).join("")}
          
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
  const deleteBtn = postDiv.querySelector(".delete-btn");
  const commentInput = postDiv.querySelector(".comment-box input");
  const commentBtn = postDiv.querySelector(".comment-btn");

  if(post.userId !== currentUser.id){
    deleteBtn.style.display = "none";
  }

  deleteBtn.addEventListener("click", () => {
    deletePost(post.id);
  });
  
  postDiv.querySelectorAll(".deleteCommentBtn").forEach(b => {
      b.addEventListener("click",()=>{          
      let posts = JSON.parse(localStorage.getItem("posts")) || [];
      posts = posts.map(p=>{
        if(p.id === post.id){
          p.comments = p.comments.filter(c=>c.id !==Number(b.dataset.commentId));
        }
        return p;
            });
          localStorage.setItem("posts",JSON.stringify(posts));
          loadPosts();

        });
  });

  likeBtn.addEventListener("click",()=>{
      let posts = JSON.parse(localStorage.getItem("posts")) || [];
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      currentUser.like = currentUser.like || [];

      posts = posts.map((p) => {
        if(p.id === post.id){
            const alreadyLiked = currentUser.like.includes(p.id);
            if(alreadyLiked){//unlike
              p.likes = Math.max((p.likes || 1) - 1,0);
              currentUser.like = currentUser.like.filter(id => id !== p.id);
            }else{//like
              p.likes = (p.likes || 0)+1;
              currentUser.like.push(p.id);
            
        }
      }
      return p;
      });

      localStorage.setItem("posts", JSON.stringify(posts));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      loadPosts();
     
});

  


  commentBtn.addEventListener("click", () => {
    const commentText = commentInput.value.trim();
    if (!commentText) return;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    posts = posts.map((p) => {
      if (p.id === post.id) {
        if (!p.comments) p.comments = [];
        p.comments.push({
          id:Date.now(),
          userId:currentUser.id,
          username:currentUser.username,
          text:commentText
        });
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

// for other users aside:
function loadUsers(){
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const filterUsers = users.filter(u=> u.id != currentUser.id);

  if(filterUsers.length ===0){
    userSidebar.innerHTML = "<p> No other users yet. </p>"
    return;
  }
  
  const following = currentUser.following || [];
  userSidebar.innerHTML = filterUsers.map(u =>{
    const isFollowing =following.includes(u.id);
    return `
    <div class="eachUser">
    <p>${u.username}</p>
    <button class="followBtn" data-id="${u.id}">
    ${isFollowing ?'Unfollow' : 'Follow' }</button>
    <button class="viewProfileBtn" data-id="${u.id}">View Profile</button>
    </div>
    `;
  }).join("");

  userSidebar.querySelectorAll(".viewProfileBtn").forEach(b => {
    b.addEventListener("click", ()=>{
      window.location.href = `profile.html?id=${b.dataset.id}`;
    });
  });
  userSidebar.querySelectorAll(".followBtn").forEach(b => {
    b.addEventListener("click", ()=>{
      activeFollow(b.dataset.id);
    });
  });
}
function activeFollow(targetID){
  let currentUser =JSON.parse(localStorage.getItem("currentUser")) || null;
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let followingArr = currentUser.following || [];

  const alreadyFollowing = followingArr.includes(Number(targetID));
  if(alreadyFollowing){//unfollow
    followingArr = followingArr.filter(id => id !== Number(targetID));
  }
  else{//follow
    followingArr.push(Number(targetID));

  }
  currentUser.following = followingArr;
  users = users.map(u=>{ // this part is to handle followers count
    if(u.id === Number(targetID)){
      let followersArr = u.followers || [];
      if(alreadyFollowing){
        u.followers = followersArr.filter(id=>id!==currentUser.id);
      }else{
        u.followers = [...followersArr,currentUser.id];
      }
    }
    if(u.id === currentUser.id){
      return currentUser;
    }
    return u;
  });
  localStorage.setItem("currentUser",JSON.stringify(currentUser));
  localStorage.setItem("users",JSON.stringify(users));
  loadUsers();
  loadPosts();
 
}