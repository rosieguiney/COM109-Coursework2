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
