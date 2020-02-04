const searchValue = document.querySelector("#searchUser");
const userToggle = document.querySelector(".user");
const userPic = document.querySelector(".user__pic");
const reposToggle = document.querySelector(".repos");
const userName = document.querySelector(".user__profile-h2");
const aliasName = document.querySelector(".user__profile-h3");
const userTown = document.querySelector(".user__profile-town");
const userWork = document.querySelector(".user__profile-work");
const userJoin = document.querySelector(".user__profile-join");
const userSummary = document.querySelector(".user__summary");
const publicRepos = document.querySelector(".user__summary--box1 h4");
const publicGist = document.querySelector(".user__summary--box2 h4");
const followers = document.querySelector(".user__summary--box3 h4");
const following = document.querySelector(".user__summary--box4 h4");
const reposContainer = document.querySelector(".repos__container");




const client_id = "777bdbb6d04dc944fee8";
const client_secret = "ae04e65886341c23e54b689cf446de264521ea2f";
 



const displayUser = (user) => {
    
    fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`)
    .then(res => res.json())
    .then((data) => {
        console.log(data)
        let date =  moment.utc(data.created_at).local();
        let newDate = ("date", date.format('MMMM Do YYYY'))

        if (user !== "" && data.message !== "not found") {
            userName.innerHTML = data.name;
            aliasName.innerHTML = data.login;
            userPic.innerHTML = `<img src="${data.avatar_url}" max-width="100%">`
            userTown.innerHTML = data.location
            userWork.innerHTML = data.company
            userJoin.innerHTML = newDate
            publicRepos.innerHTML = data.public_repos
            publicGist.innerHTML = data.public_gists
            followers.innerHTML = data.followers
            following.innerHTML = data.following
            userToggle.setAttribute("style", "display: block; opacity: 1");
            reposToggle.setAttribute("style", "display: block; opacity: 1"); 
        }else {
            userToggle.setAttribute("style", "display: none; opacity: 0");
            reposToggle.setAttribute("style", "display: none; opacity: 0"); 
        }
        

    }).catch(err => {
        console.log(err + "something went wrong")
        })   

    fetch(`https://api.github.com/users/${user}/repos?per_page=12&order=asc?client_id=${client_id}&client_secret=${client_secret}`)
    .then(res => res.json())
    .then((data) => {
        console.log(data)

        data.forEach((repo, index) => {
            reposContainer.innerHTML += `
            <div class="repos__box">
            <h4 class="repos__box-topic">${repo.name}</h4>
            <p class="repos__box-desc">${repo.description}</p>
            <div class="repos__box-footer">
                <span>Forks: ${repo.forks_count}</span>
                <span>Watchers: ${repo.watchers_count}</span>
                <span>Stars: ${repo.stargazers_count}</span>
                <span class="right-align"><a href="${repo.html_url}" target="_blank" class="waves-effect red waves-light btn-small">Repo Page</a></span>
            </div>
        </div>
            `
        });
    }).catch(err => {
        console.log(err)
    })
}

searchValue.addEventListener("keypress", (e) => {
   
    if(e.key === 'Enter') {
    reposContainer.innerHTML = ''
    displayUser(searchValue.value)
   }
    
})


