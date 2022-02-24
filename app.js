// import Swal from "sweetalert2";

// import Swal from "sweetalert2";
const loader = document.querySelector(".loader");
const main = document.querySelector(".main");
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




const client_id = "your github client id";
const client_secret = "your github client secret";
 



const displayUser = (user) => {
    loader.style.display = "flex";
    loader.style.opacity = ".35";
    
  setTimeout(() => {
    fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`)
    .then(res => {
        if (!res.ok) {
            throw new Error("HTTP status " + response.status);   
        }
        return res.json()
        
    })
    .then((data) => {
        console.log(data)
        let date =  moment.utc(data.created_at).local();
        let newDate = ("date", date.format('MMMM Do YYYY'))

        if (user !== "") {
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
            user.value = ''
        }else {
            userToggle.setAttribute("style", "display: none; opacity: 0");
            reposToggle.setAttribute("style", "display: none; opacity: 0"); 
            
        }
        

    }).catch(err => {
        console.log(err + "something went wrong")
        Swal.fire({
            icon: 'error',
            title: '<h1>Oops...</h1>',
            text: 'Something went wrong!',
            footer: '<h5>maybe user does not exist</h5>'
            
          })
        })   

    fetch(`https://api.github.com/users/${user}/repos?sort=created&per_page=12&direction=desc?client_id=${client_id}&client_secret=${client_secret}`)
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
    });
  }, 600)

    setTimeout(() => {
        
        main.style.display = "block";
        setTimeout(() => {
            main.style.opacity = "1";
        }, 300);

        loader.style.opacity = "0";
        loader.style.display = "none";


    }, 4000)
}

searchValue.addEventListener("keypress", (e) => {
   
    if(e.key === 'Enter') {  
        reposContainer.innerHTML = ''
        displayUser(searchValue.value);
        searchValue.value = ''
    }
    
})


