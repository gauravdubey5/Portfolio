/*==================================================
                MOBILE MENU
==================================================*/

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

    menuBtn.classList.toggle("active");

});

/* Close menu after click */

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        menuBtn.classList.remove("active");

    });

});

/*==================================================
                STICKY HEADER
==================================================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.background = "rgba(5,8,22,.92)";
        header.style.backdropFilter = "blur(20px)";
        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.25)";

    }else{

        header.style.background = "rgba(5,8,22,.65)";
        header.style.boxShadow = "none";

    }

});

/*==================================================
                BACK TO TOP
==================================================*/

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*==================================================
                FOOTER YEAR
==================================================*/

const year = document.getElementById("year");

if(year){

    year.textContent = new Date().getFullYear();

}

/*==================================================
            ACTIVE NAVIGATION
==================================================*/

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

/*==================================================
                SMOOTH BUTTON SCROLL
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

console.log("%cPortfolio Loaded Successfully 🚀",
"color:#0078D4;font-size:16px;font-weight:bold;");

/*==================================================
                DARK / LIGHT THEME
==================================================*/

const themeToggle = document.getElementById("theme-toggle");

const currentTheme = localStorage.getItem("theme");

if(currentTheme === "light"){

    document.body.classList.add("light-theme");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("light-theme");

    if(document.body.classList.contains("light-theme")){

        localStorage.setItem("theme","light");

        themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }else{

        localStorage.setItem("theme","dark");

        themeToggle.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }

});

/*==================================================
                TYPING EFFECT
==================================================*/

const words = [

    "Microsoft Azure",

    "Terraform",

    "Linux",

    "Git",

    "GitHub Actions",

    "Cloud Engineer"

];

const typingText = document.getElementById("typing-text");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    if(!typingText) return;

    const currentWord = words[wordIndex];

    if(!deleting){

        typingText.textContent =
            currentWord.substring(0,charIndex++);

        if(charIndex > currentWord.length){

            deleting = true;

            setTimeout(typeEffect,1200);

            return;

        }

    }else{

        typingText.textContent =
            currentWord.substring(0,--charIndex);

        if(charIndex === 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= words.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect,deleting ? 45 : 90);

}

typeEffect();

/*==================================================
                COUNTER
==================================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const counter = entry.target;

        const target =
            parseInt(counter.textContent);

        let count = 0;

        const speed = target / 80;

        const update = ()=>{

            count += speed;

            if(count < target){

                counter.textContent =
                    Math.ceil(count);

                requestAnimationFrame(update);

            }else{

                counter.textContent =
                    target + "+";

            }

        };

        update();

        counterObserver.unobserve(counter);

    });

});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});

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

