/*=========================================
            THEME ENGINE
=========================================*/

const themes = {

    dark:{

        primary:"#0078D4",
        background:"#050816",
        card:"#111827",
        text:"#CBD5E1"

    },

    light:{

        primary:"#0078D4",
        background:"#F8FAFC",
        card:"#FFFFFF",
        text:"#334155"

    },

    azure:{

        primary:"#0094FF",
        background:"#081A2E",
        card:"#0F2942",
        text:"#D6EFFF"

    },

    purple:{

        primary:"#8B5CF6",
        background:"#140F24",
        card:"#24193A",
        text:"#E9D8FD"

    },

    emerald:{

        primary:"#10B981",
        background:"#071A16",
        card:"#0D2A23",
        text:"#D1FAE5"

    }

};

/*=========================================
        APPLY THEME
=========================================*/

function applyTheme(name){

    const theme = themes[name];

    if(!theme) return;

    document.documentElement.style.setProperty(
        "--primary",
        theme.primary
    );

    document.documentElement.style.setProperty(
        "--dark",
        theme.background
    );

    document.documentElement.style.setProperty(
        "--card",
        theme.card
    );

    document.documentElement.style.setProperty(
        "--text",
        theme.text
    );

    localStorage.setItem("portfolio-theme",name);

}

/*=========================================
        LOAD SAVED THEME
=========================================*/

const savedTheme =

localStorage.getItem("portfolio-theme");

if(savedTheme){

    applyTheme(savedTheme);

}else{

    const prefersDark =

    window.matchMedia(

    "(prefers-color-scheme: dark)"

    ).matches;

    applyTheme(prefersDark ? "dark" : "light");

}

/*=========================================
        THEME BUTTONS
=========================================*/

document.querySelectorAll("[data-theme]")

.forEach(button=>{

    button.addEventListener("click",()=>{

        applyTheme(

            button.dataset.theme

        );

    });

});

