const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


$('.comment-form').on('submit', function(e) {
    e.preventDefault();

    const name = $('.comment-form input').val();
    const comment = $('.comment-form textarea').val();

    if (!name || !comment) {
        alert("Please fill in both fields!");
        return;
    }

    const confirmPost = confirm("Are you sure you want to post this comment?");

    if (!confirmPost) return;

    const newComment = `
        <div class="testimonial-col" style="display:none;">
            <div>
                <p>"${comment}"</p>
                <h3>${name}</h3>
            </div>
        </div>
    `;

    const element = $(newComment);
    $('.user-comments').append(element);
    element.fadeIn(500);

    this.reset();

    alert("Thank you for the feedback!");
});

document.addEventListener("DOMContentLoaded", function () {

    const quotes = [
        "You’ve got this ",
        "Take a deep breath ",
        "Progress over perfection ",
        "One step at a time ",
        "You are stronger than you think ",
        "It’s okay to take a break ",
        "Small progress is still progress ",
        "Believe in yourself "
    ];

    const button = document.getElementById("newQuoteBtn");
    const text = document.getElementById("quoteText");

    button.addEventListener("click", function () {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        text.textContent = quotes[randomIndex];
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

  // =========================
  // SEND MESSAGE
  // =========================
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

  // =========================
  // BOT RESPONSE
  // =========================
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
