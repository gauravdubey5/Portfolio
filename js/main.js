/*==================================================
                MOBILE MENU
==================================================*/

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
const overlay = document.querySelector(".menu-overlay");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

        menuBtn.classList.toggle("active");

        if (overlay) {
            overlay.classList.toggle("active");
        }

        document.body.classList.toggle("menu-open");

    });

}

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        menuBtn.classList.remove("active");

        if (overlay) {
            overlay.classList.remove("active");
        }

        document.body.classList.remove("menu-open");

    });

});

if (overlay) {

    overlay.addEventListener("click", () => {

        navbar.classList.remove("active");

        menuBtn.classList.remove("active");

        overlay.classList.remove("active");

        document.body.classList.remove("menu-open");

    });

}

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
