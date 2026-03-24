const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){
    alert("No user logged in!");
}

if(document.getElementsByClassName("username")){
document.getElementsByClassName("username").textContent = currentUser.username;
document.getElementsByClassName("bio").textContent = currentUser.bio;
document.getElementsByClassName("nickname").textContent = currentUser.nickname;
const pic = document.getElementsByClassName("profile_pic");
if(pic){
    pic.src = currentUser.profilePic;
}

}



//Handling edit form submission
if(document.getElementsByClassName("edit_form")){

    document.getElementsByClassName("username").value = currentUser.username;
    document.getElementsByClassName("nickname").value = currentUser.nickname;
    document.getElementsByClassName("bio").value = currentUser.bio;


    document.getElementsByClassName("edit_form").addEventListener("submit", function(e){
        
        e.preventDefault();

        const updatedUserName = document.getElementById("username").value;
        const updatedNickName = document.getElementById("nickname").value;
        const updatedBio = document.getElementById("bio").value;
        
        let users = JSON.parse(localStorage.getItem("users")) || [];
        
        users = users.map(user =>{
            if(user.id === currentUser.id){
                  user.username = updatedUserName;
                  user.nickname = updatedNickName;
                  user.bio = updatedBio;   
        }
            return user;

        });

        localStorage.setItem("users" , JSON.stringify(users));

        currentUser.username = updatedUserName;
        currentUser.nickname = updatedNickName;
        currentUser.bio = updatedBio;

        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        alert("Profile updated!");

        window.location.href = "profile.html";

    });

}



//functions
function updateFollowButton(){

    if(currentUser.following.includes(viewedUserId)){
        followbtn.textContent = "Following";
    }
    else{
        followbtn.textContent = "Follow";
    }
}


function followUser(targetUserId){

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const targetUser = users.find(u => u.id === targetUserId);

    if(!currentUser.following.includes(targetUserId)){
        currentUser.following.push(targetUserId)
        targetUser.followers.push(currentUser.id);
    }

    users = users.map(user => {
        if(user.id === currentUser.id) return currentUser;
        if(user.id === targetUserId) return targetUser;
        return user;
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
}


function unfollowUser(targetUserId){

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const targetUser = users.find(u => u.id === targetUserId);

    if(!currentUser.following.includes(targetUserId)){
        alert("You are not following this user!");
        return;
    }

    currentUser.following = currentUser.following.filter(id => id !==targetUserId);
    targetUser.followers = targetUser.followers.filter(id => id !==currentUser.id);

    users = users.map(user => {
        if(user.id === currentUser.id) return currentUser;
        if(user.id === targetUserId) return targetUser;
        return user;
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
}


function updateStatus(){

    document.getElementById("followers_count").textContent = currentUser.followers.length;
    document.getElementById("following_count").textContent = currentUser.following.length;

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const userPosts = posts.filter(post => post.userId === currentUser.id);

    document.getElementById("posts_count").textContent = userPosts.length;
}




//Handling follow/unfollow
const followbtn = document.getElementById("follow_button");

const viewedUserId = 2; //this value is an example

let users = JSON.parse(localStorage.getItem("users")) || [];

let viewedUser = users.find(u => u.id === viewedUserId);


followbtn.addEventListener("click", ()=>{
     
    if(currentUser.following.includes(viewedUserId)){
        unfollowUser(viewedUserId);
    }
    else{
        followUser(viewedUserId);
    }
    
    updateFollowButton();
    updateStatus();

});

updateFollowButton();
