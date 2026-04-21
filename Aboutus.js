
$(document).ready(function () {

    // =========================
    // TOGGLE PARAGRAPH
    // =========================
    $("#btn-toggle").click(function () {
        $("#paragraph1").slideToggle("fast");
    });

    // =========================
    // ACCORDION
    // =========================
    $("#accordion-questions").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    });

    // =========================
    // SCROLL REVEAL
    // =========================
    let revealOptions = { threshold: 0.2 };

    let revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('accordion-title')) {
                    entry.target.classList.add('fade-in-visible');
                } else {
                    entry.target.classList.add('reveal-active');
                }
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.who-we-are-container, .stories-container, .accordion-title')
        .forEach(el => revealObserver.observe(el));

    // =========================
    // SEARCH BAR
    // =========================
    $('.search-container form').on('submit', function (e) {
        e.preventDefault();

        const term = $(this).find('input[name="search"]').val().toLowerCase();
        const content = $('.middle-content, .bottom-section-container');

        $('mark').contents().unwrap();

        if (term.length > 2) {
            content.each(function () {
                const instance = $(this);
                const html = instance.html();

                const regex = new RegExp("(?![^<]*>)" + term, "ig");
                const newHtml = html.replace(regex, (match) => `<mark>${match}</mark>`);

                instance.html(newHtml);
            });

            if ($('mark').length > 0) {
                $('html, body').animate({
                    scrollTop: $("mark").first().offset().top - 100
                }, 500);
            }
        }
    });

    // =========================
    // COMMUNITY MILESTONES
    // =========================
    const crisisWords = ["help", "hurt", "die", "suicide", "depressed", "emergency", "hopeless"];

    let savedMessages = JSON.parse(localStorage.getItem('community_messages')) || [];
    savedMessages.forEach(msg => appendMessageToFeed(msg));

    $('#milestone-btn').on('click', function () {

        const lastSubmit = parseInt(localStorage.getItem('user_submitted_message'));
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (lastSubmit && (now - lastSubmit < twentyFourHours)) {
            alert("You have already shared a message today, please share one tomorrow!");
            return;
        }

        let milestoneText = $('#milestone-input').val().trim();
        let lowerText = milestoneText.toLowerCase();

        let isCrisis = crisisWords.some(word => lowerText.includes(word));

        if (isCrisis) {
            $('#crisis-msg').slideDown();
            return;
        }

        if (milestoneText.length > 0) {
            const milestoneData = {
                text: milestoneText,
                time: Date.now()
            };

            $('#success-msg').fadeIn().delay(5000).fadeOut();

            localStorage.setItem('user_submitted_message', now);
            saveAndDisplayMessage(milestoneData);

            $('#milestone-input').val("");
            $('#char-count').text("0/200").css("color", "#333");
        }
    });

    function saveAndDisplayMessage(data) {
        let messages = JSON.parse(localStorage.getItem('community_messages')) || [];

        messages.push(data);
        localStorage.setItem('community_messages', JSON.stringify(messages));

        appendMessageToFeed(data);
    }

    function appendMessageToFeed(message) {
        const fortyEightHours = 48 * 60 * 60 * 1000;

        if (Date.now() - message.time < fortyEightHours) {
            let messageHtml = `<div class="milestone-item"><p>"${message.text}"</p></div>`;
            $('#milestone-feed').prepend(messageHtml);
        }
    }

    // =========================
    // INPUT FOCUS EFFECT
    // =========================
    $('#milestone-input')
        .on('focus', function () {
            $('.milestone-wrapper').addClass('focused');
        })
        .on('blur', function () {
            $('.milestone-wrapper').removeClass('focused');
        });

    // =========================
    // CHARACTER COUNT
    // =========================
    $('#milestone-input').on('input', function () {
        let count = $(this).val().length;

        $('#char-count').text(`${count}/200`);

        if (count >= 200) {
            $('#char-count').css("color", "red");
        } else {
            $('#char-count').css("color", "#333");
        }
    });

    // =========================
    // CHAT SYSTEM
    // =========================
    console.log("JS is working");

    const chatBtn = document.querySelector('.chat-button');
    const chatBox = document.querySelector('.chatArea');
    const closeBtn = document.getElementById('exit');

    if (chatBtn && chatBox && closeBtn) {

        chatBtn.addEventListener('click', () => {
            chatBox.classList.toggle('active');
        });

        closeBtn.addEventListener('click', () => {
            chatBox.classList.remove('active');
        });

        const chatMessages = document.querySelector('.chatMessages');
        const sendBtn = document.getElementById('sendButton');
        const chatInput = document.getElementById('chatInput');

        sendBtn.addEventListener('click', sendMessage);

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });

        function sendMessage() {
            const text = chatInput.value.trim();
            if (text === "") return;

            const userDiv = document.createElement('div');
            userDiv.classList.add('user-message', 'message');
            userDiv.textContent = text;

            chatMessages.appendChild(userDiv);

            setTimeout(() => userDiv.classList.add('show'), 10);

            chatInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => botReply(text), 1000);
        }

        function botReply(userText) {
            const botDiv = document.createElement('div');
            botDiv.classList.add('bot-message', 'message');

            let reply = "I'm here to help! 😊";

            if (userText.toLowerCase().includes("stress")) {
                reply = "I'm sorry you're feeling stressed. Try taking a short break or deep breathing 💜";
            } else if (userText.toLowerCase().includes("help")) {
                reply = "You can contact us or explore our coping tools!";
            } else if (userText.toLowerCase().includes("hello")) {
                reply = "Hi there! 👋 How are you feeling today?";
            }

            botDiv.textContent = reply;
            chatMessages.appendChild(botDiv);

            setTimeout(() => botDiv.classList.add("show"), 10);

            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

}); 


window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    let navbutton = document.getElementById("navBtn");

    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        navbutton.style.display = "block";
    } else {
        navbutton.style.display = "none";
    }
}

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}