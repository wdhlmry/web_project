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
