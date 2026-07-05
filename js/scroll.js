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
