/*==================================================
                PRELOADER
==================================================*/

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (loader) {

        loader.classList.add("hide");

        setTimeout(() => {

            loader.remove();

        }, 500);

    }

});

/*==================================================
                CUSTOM CURSOR
==================================================*/

const cursor = document.querySelector(".cursor");

if (cursor) {

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });

}

/*==================================================
                TOAST MESSAGE
==================================================*/

function showToast(message){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },400);

    },3000);

}

/*==================================================
            COPY EMAIL
==================================================*/

const copyBtn = document.getElementById("copy-email");

if(copyBtn){

    copyBtn.addEventListener("click",async()=>{

        try{

            await navigator.clipboard.writeText(
                "YOUR_EMAIL@example.com"
            );

            showToast("Email copied successfully 🚀");

        }catch{

            showToast("Unable to copy email");

        }

    });

}

/*==================================================
            PAGE TITLE CHANGE
==================================================*/

const originalTitle = document.title;

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        document.title = "👋 Come Back Soon!";

    }else{

        document.title = originalTitle;

    }

});

/*==================================================
            CTRL + K
==================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key.toLowerCase()==="k"){

        e.preventDefault();

        showToast("Command Palette coming soon...");

    }

});

/*==================================================
            WELCOME MESSAGE
==================================================*/

setTimeout(()=>{

    showToast("Welcome to Gaurav's Portfolio 👋");

},1200);