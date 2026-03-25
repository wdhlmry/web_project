const postBtn = document.getElementById("post-btn");
const postContent = document.getElementById("post-content");
const feed = document.getElementById("feed");
const usernameInput = document.getElementById("username");


document.addEventListener("DOMContentLoaded", loadPosts);

postBtn.addEventListener("click", () => {
    const content = postContent.value.trim();
    if (content === "") return alert("Post cannot be empty!");

    const post = { id: Date.now(), text: content, date: new Date().toLocaleString() };
    savePost(post);
    addPostToFeed(post);
    postContent.value = "";
});

postBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim() || "Anonymous";
    const content = postContent.value.trim();
    if (content === "") return alert("Post cannot be empty!");

    const post = {
        id: Date.now(),
        username: username,
        text: content,
        date: new Date().toLocaleString()
    };

    savePost(post);
    addPostToFeed(post);
    postContent.value = "";
});

function savePost(post) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));
}

function loadPosts() {
    feed.innerHTML = "";
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(post => addPostToFeed(post));
}

function addPostToFeed(post) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    postDiv.innerHTML = `
        <div class="post-content">
            <strong>${post.username}</strong>
            <p>${post.text}</p>
            <small>${post.date}</small>
        </div>
        <div class="post-actions">
            <button class="more-btn">⋯</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    const moreBtn = postDiv.querySelector(".more-btn");
    const deleteBtn = postDiv.querySelector(".delete-btn");

    deleteBtn.style.display = "none";

    moreBtn.addEventListener("click", () => {
        deleteBtn.style.display = deleteBtn.style.display === "none" ? "inline-block" : "none";
    });

    deleteBtn.addEventListener("click", () => {
        deletePost(post.id);
    });

    feed.appendChild(postDiv);
}

function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}