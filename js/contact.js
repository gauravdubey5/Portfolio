const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const btn = document.getElementById("send-btn");

    btn.innerHTML = "Sending...";

    btn.disabled = true;

    emailjs.sendForm(

        "service_shg8rpt",

        "template_hca8c7d",

        this

    )

    .then(() => {

        alert("✅ Message sent successfully!");

        form.reset();

        btn.innerHTML = "Send Message";

        btn.disabled = false;

    })

    .catch((error) => {

        console.error(error);

        alert("❌ Failed to send message.");

        btn.innerHTML = "Send Message";

        btn.disabled = false;

    });

});