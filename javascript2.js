$(function () {

    // ACCORDIONS
    $("#mainAccordion").accordion({
        collapsible: true,
        heightStyle: "content"
    });

    $("#faqAccordion").accordion({
        collapsible: true,
        heightStyle: "content"
    });

    // MINI GAME
    let score = 0;
    let active = false;

    $("#startGame").click(function () {
        score = 0;
        active = true;
        $("#score").text("Score: 0");
        $("#clickBtn").prop("disabled", false);

        setTimeout(() => {
            active = false;
            $("#clickBtn").prop("disabled", true);
            alert("Time's up! Score: " + score);
        }, 10000);
    });

    $("#clickBtn").click(function () {
        if (active) {
            score++;
            $("#score").text("Score: " + score);
        }
    });

});

// 👇 KEEP THIS OUTSIDE the jQuery block
window.onscroll = function () {
    let navbutton = document.getElementById("navBtn");

    if (!navbutton) return; // prevents errors

    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        navbutton.style.display = "block";
    } else {
        navbutton.style.display = "none";
    }
};

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}