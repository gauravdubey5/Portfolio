/*==================================================
            GITHUB DASHBOARD
==================================================*/

const username = "gauravdubey5";

const profileURL = `https://api.github.com/users/${username}`;
const repoURL = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;

const avatar = document.getElementById("github-avatar");
const userName = document.getElementById("github-username");
const bio = document.getElementById("github-bio");
const locationText = document.getElementById("github-location");

const repoCount = document.getElementById("repo-count");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const publicGists = document.getElementById("public-gists");

const repoGrid = document.getElementById("github-projects");

/*==================================================
            PROFILE
==================================================*/

async function loadProfile() {

    try {

        const response = await fetch(profileURL);

        const data = await response.json();

        avatar.src = data.avatar_url;

        userName.textContent = data.name || data.login;

        bio.textContent = data.bio || "Azure DevOps Engineer";

        locationText.textContent = data.location || "India";

        repoCount.textContent = data.public_repos;

        followers.textContent = data.followers;

        following.textContent = data.following;

        publicGists.textContent = data.public_gists;

    }

    catch(error){

        console.error(error);

    }

}

/*==================================================
            REPOSITORIES
==================================================*/

async function loadRepositories(){

    try{

        const response = await fetch(repoURL);

        const repos = await response.json();

        repoGrid.innerHTML = "";

        repos.forEach(repo=>{

            repoGrid.innerHTML += `

            <div class="repo-card">

                <h3>${repo.name}</h3>

                <p>

                    ${repo.description || "No description available."}

                </p>

                <div class="repo-info">

                    <span>

                        ⭐ ${repo.stargazers_count}

                    </span>

                    <span>

                        🍴 ${repo.forks_count}

                    </span>

                    <span>

                        💻 ${repo.language || "N/A"}

                    </span>

                </div>

                <a href="${repo.html_url}"

                   target="_blank">

                    View Repository

                </a>

            </div>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}
loadProfile();

loadRepositories();