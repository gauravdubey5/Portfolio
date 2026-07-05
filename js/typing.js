
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
