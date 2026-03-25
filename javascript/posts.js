// gets the elements from the DOM
const postBtn = document.getElementById("post-btn");
const postContent = document.getElementById("post-content");
const feed = document.getElementById("feed");

// Load posts when page opens
document.addEventListener("DOMContentLoaded", loadPosts);

// Add new post
postBtn.addEventListener("click", () => {
    const content = postContent.value.trim();

    if (content === "") {
        alert("Post cannot be empty!");
        return;
    }

    const post = {
        text: content,
        date: new Date().toLocaleString()
    };

    savePost(post);
    addPostToFeed(post);

    postContent.value = ""; // clear textarea
});

// Save post to localStorage
function savePost(post) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(post); // newest on top
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Load all posts
function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(post => addPostToFeed(post));
}

// Display post in UI
function addPostToFeed(post) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    postDiv.innerHTML = `
        <p>${post.text}</p>
        <small>${post.date}</small>
        
    `;

    feed.appendChild(postDiv);
}