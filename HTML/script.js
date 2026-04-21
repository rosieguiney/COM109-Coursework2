//difficulty levels (higher is slower and harder)
const levels = {
    beginner: 2,
    intermediate: 1.5,
    advanced: 1
};

// diff breathing patterns
const patterns = {
    "478": [
        { text: "Inhale", time: 4 , class: "inhale" },
        { text: "Hold", time: 7, class: "hold" },
        { text: "Exhale", time: 7, class: "exhale" }
    ],

    "box": [
        { text: "Inhale", time: 3 },
        { text: "Hold", time: 3 },
        { text: "Exhale", time: 3 },
        { text: "Hold", time:  3}
    ]
};

//mobile menu stuff
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

//toggle menu on click
if (menu && menuLinks) {
    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });
}

//variables controling the cycles
let isRunning = false;
let timeout;
let interval;
let phaseIndex = 0;


//gettibg elements from HTML
const circle = document.getElementById("circle");
const text = document.getElementById("breathText");
const timer = document.getElementById("timer");
const btn = document.getElementById("startBtn");

btn.addEventListener("click", () => {
    isRunning ? stop() : start();
});


function showError(message) {
    const errorBox = document.getElementById("formError");
    errorBox.textContent = message;
}

function clearError() {
    document.getElementById("formError").textContent = "";
}

function start() {
    const patternSelect = document.getElementById("pattern").value;
    const levelKey = document.getElementById("level").value;

    clearError();

    let errors = [];

    //basic checking
    if (!patternSelect) {
        errors.push("Please select a breathing method.");
    }

    if (!levelKey) {
        errors.push("Please select a difficulty level.");
    }

    //stop if something is missing
    if (errors.length > 0) {
        showError(errors.join(" "));
        return;
    }

    const level = levels[levelKey];

    isRunning = true;
    btn.textContent = "Stop";
    phaseIndex = 0;

    run(patternSelect, level);
}

//stop and reset
function stop() {
    isRunning = false;
    btn.textContent = "Start";
    clearTimeout(timeout);
    clearInterval(interval);

    circle.className = "circle";
    text.textContent = "Ready";
    timer.textContent = "0";
}


// main loop for my breathing
function run(type, speed) {
    if (!isRunning) return;

    const step = patterns[type][phaseIndex];
    let duration = step.time / speed;

    text.textContent = step.text;

    let timeLeft = Math.round(duration);
    timer.textContent = timeLeft;

    //countdown
    clearInterval(interval);
    interval = setInterval(() => {
        timeLeft--;
        if (timeLeft >= 0) timer.textContent = timeLeft;
    }, 1000);

    //speed of the transistions animantion
    circle.style.transitionDuration = duration + "s";

    //changing the style and patterns 
    if (type === "478") {
        circle.className = "circle " + step.class;
    } else {
        circle.className = "square pos-" + phaseIndex;
    }

    // go to the next steps
    timeout = setTimeout(() => {
        phaseIndex = (phaseIndex + 1) % patterns[type].length;
        run(type, speed);
    }, duration * 1000);
}


//drop downs 
const pattern = document.getElementById("pattern");
const level = document.getElementById("level");

function checkReady() {
    btn.disabled = false;
}

pattern.addEventListener("change", checkReady);
level.addEventListener("change", checkReady);

checkReady();
// recommendation section
$(document).ready(function() {

    $("#recommendBtn").click(function() {
        let input = $("#recommendInput").val().trim();

        // empty check
        if (input === "") {
            alert("Please enter a technique first!");
            return;
        }

        // duplicate check
        let exists = false;

        $("#recommendList li").each(function() {
            if ($(this).text().toLowerCase() === input.toLowerCase()) {
                exists = true;
            }
        });

        if (exists) {
            alert("This technique is already added!");
            return;
        }

        // add new item
        let newItem = $("<li></li>").text(input).hide();
        $("#recommendList").append(newItem);
        newItem.fadeIn(500);

        // popup
        $("#popup").fadeIn(300).delay(2000).fadeOut(300);

        // clear input
        $("#recommendInput").val("");
    });

    $("#closePopup").click(function() {
        $("#popup").fadeOut(300);
    });

    // press enter to submit
    $("#recommendInput").keypress(function(e) {
        if (e.key === "Enter") {
            $("#recommendBtn").click();
        }
    });

});

document.addEventListener("DOMContentLoaded", function () {
console.log("JS is working");
  // =========================
  // OPEN / CLOSE CHAT
  // =========================
  const chatBtn = document.querySelector('.chat-button');
  const chatBox = document.querySelector('.chatArea');
  const closeBtn = document.getElementById('exit');

  chatBtn.addEventListener('click', () => {
    chatBox.classList.toggle('active');
  });

  closeBtn.addEventListener('click', () => {
    chatBox.classList.remove('active');
  });


  // =========================
  // CHAT MESSAGES
  // =========================
  const chatMessages = document.querySelector('.chatMessages');
  const sendBtn = document.getElementById('sendButton');
  const chatInput = document.getElementById('chatInput');

  // SEND BUTTON
  sendBtn.addEventListener('click', sendMessage);

  // ENTER KEY
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });


  function sendMessage() {
    const text = chatInput.value.trim();
    if (text === "") return;

    // USER MESSAGE
    const userDiv = document.createElement('div');
    userDiv.classList.add('user-message', 'message');
    userDiv.textContent = text;

    chatMessages.appendChild(userDiv);

    setTimeout(() => {
      userDiv.classList.add('show');
    }, 10);

    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // BOT REPLY
    setTimeout(() => botReply(text), 1000);
  }

  // BOT RESPONSE
  function botReply(userText) {
    const botDiv = document.createElement('div');
    botDiv.classList.add('bot-message', 'message');

    let reply = "I'm here to help! 😊";

    if (userText.toLowerCase().includes("stress")) {
      reply = "I'm sorry you're feeling stressed. Try taking a short break or deep breathing 💜";
    } 
    else if (userText.toLowerCase().includes("help")) {
      reply = "You can contact us or explore our coping tools!";
    } 
    else if (userText.toLowerCase().includes("hello")) {
      reply = "Hi there! 👋 How are you feeling today?";
    }

    botDiv.textContent = reply;
    chatMessages.appendChild(botDiv);

    setTimeout(() => {
      botDiv.classList.add("show");
    }, 10);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

});
