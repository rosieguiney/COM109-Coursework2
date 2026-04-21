$(function () {

$("#mainAccordion").accordion({
    collapsible: true,
    heightStyle: "content"
});

$("#faqAccordion").accordion({
    collapsible: true,
    heightStyle: "content"
});

$("#topBtn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
});

/* MINI GAME */
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
