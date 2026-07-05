/*=========================================
            GITHUB CONFIG
=========================================*/

const GITHUB_USERNAME = "gauravdubey5";

/*=========================================
        FETCH USER PROFILE
=========================================*/

async function loadGithubProfile() {

    try {

        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}`
        );

        if (!response.ok) {
            throw new Error("GitHub API Error");
        }

        const user = await response.json();

        updateProfile(user);

        loadRepositories();

    } catch (error) {

        console.error(error);

    }

}

/*=========================================
        UPDATE PROFILE
=========================================*/

function updateProfile(user) {

    setText("repo-count", user.public_repos);

    setText("followers", user.followers);

    setText("following", user.following);

    setText("public-gists", user.public_gists);

    setText("github-username", user.login);

    setText("github-bio", user.bio || "DevOps & Cloud Engineer");

    const avatar = document.getElementById("github-avatar");

    if (avatar) {

        avatar.src = user.avatar_url;

    }

}

/*=========================================
        FETCH REPOSITORIES
=========================================*/

async function loadRepositories() {

    try {

        const response = await fetch(

            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`

        );

        const repos = await response.json();

        const container = document.getElementById("github-projects");

        if (!container) return;

        container.innerHTML = "";

        repos.forEach(repo => {

            const card = document.createElement("div");

            card.className = "repo-card";

            card.innerHTML = `

                <h3>${repo.name}</h3>

                <p>${repo.description ?? "No description available."}</p>

                <div class="repo-info">

                    ⭐ ${repo.stargazers_count}

                    🍴 ${repo.forks_count}

                </div>

                <a href="${repo.html_url}"

                   target="_blank">

                   View Repository →

                </a>

            `;

            container.appendChild(card);

        });

    }

    catch(error){

        console.error(error);

    }

}

/*=========================================
            HELPERS
=========================================*/

function setText(id,value){

    const el=document.getElementById(id);

    if(el){

        el.textContent=value;

    }

}

/*=========================================
            START
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    loadGithubProfile

);