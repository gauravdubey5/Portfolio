
/*==================================================
            PROGRESS BAR ANIMATION
==================================================*/

const progressBars =
document.querySelectorAll(".progress-fill");

const progressObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.transform =
            "scaleX(1)";

        }

    });

});

progressBars.forEach(bar=>{

    bar.style.transform = "scaleX(0)";

    bar.style.transformOrigin = "left";

    bar.style.transition = "1.5s ease";

    progressObserver.observe(bar);

});

/*==================================================
            SCROLL REVEAL
==================================================*/

const revealElements = document.querySelectorAll(

    ".section, .skill-card, .project-wrapper, .timeline-item, .certificate-card, .achievement-card"

);

const revealObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},

{

    threshold:.15

}

);

revealElements.forEach(item=>{

    item.classList.add("hidden");

    revealObserver.observe(item);

});


/*==================================================
            SCROLL PROGRESS BAR
==================================================*/

const progressBar = document.createElement("div");

progressBar.id = "scroll-progress";

document.body.appendChild(progressBar);

window.addEventListener("scroll",()=>{

    const scrollTop = window.scrollY;

    const docHeight =

        document.documentElement.scrollHeight -

        window.innerHeight;

    const progress =

        (scrollTop / docHeight) * 100;

    progressBar.style.width = progress + "%";

});


/*==================================================
            GITHUB API
==================================================*/

const githubUser = "devops-eng-gaurav";

fetch(`https://api.github.com/users/${githubUser}`)

.then(res=>res.json())

.then(data=>{

    if(document.getElementById("repo-count")){

        document.getElementById("repo-count").textContent =
            data.public_repos;
    }

    if(document.getElementById("followers")){

        document.getElementById("followers").textContent =
            data.followers;
    }

    if(document.getElementById("following")){

        document.getElementById("following").textContent =
            data.following;
    }

    if(document.getElementById("public-gists")){

        document.getElementById("public-gists").textContent =
            data.public_gists;
    }

})

.catch(err=>{

    console.log("GitHub API Error",err);

});


/*==================================================
            FLOATING ICONS
==================================================*/

const floatingIcons =

document.querySelectorAll(".floating");

floatingIcons.forEach((icon,index)=>{

    icon.style.animationDelay =
        `${index * .5}s`;

});


/*==================================================
            MOUSE GLOW
==================================================*/

const glow = document.createElement("div");

glow.className = "cursor-glow";

document.body.appendChild(glow);

window.addEventListener("mousemove",(e)=>{

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});


/*==================================================
            PRELOADER
==================================================*/

window.addEventListener("load",()=>{

    const loader =

        document.querySelector(".loader");

    if(loader){

        loader.classList.add("hide");

        setTimeout(()=>{

            loader.remove();

        },600);

    }

});



/*==================================================
            CONSOLE MESSAGE
==================================================*/

console.log(

"%cDesigned & Developed by Gaurav Dubey 🚀",

"color:#0078D4;font-size:18px;font-weight:bold;"

);

