const postBtn = document.getElementById("post-btn");
const postContent = document.getElementById("post-content");
const feed = document.getElementById("feed");

document.addEventListener("DOMContentLoaded", loadPosts);

postBtn.addEventListener("click", () => {
    const content = postContent.value.trim();
    if (content === "") return alert("Post cannot be empty!");

    const post = { id: Date.now(), text: content, date: new Date().toLocaleString() };
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
        <p>${post.text}</p>
        <small>${post.date}</small>
    `;

    feed.appendChild(postDiv);
}

function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}