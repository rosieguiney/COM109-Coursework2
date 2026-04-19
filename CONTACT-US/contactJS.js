document.addEventListener("DOMContentLoaded", function () {

  // PAGE LOAD ENTRANCE ANIMATIONS
  // ---------------------------------
  setTimeout(() => {
    if (document.querySelector(".box")) document.querySelector(".box").classList.add("show");
    if (document.querySelector(".LLBox")) document.querySelector(".LLBox").classList.add("show");
    if (document.querySelector(".LRBox")) document.querySelector(".LRBox").classList.add("show");
  }, 200);


  // CHAT PANEL OPEN / CLOSE 
  // -------------------------
  const openBtn = document.getElementById('chat');
  const closeBtn = document.getElementById('exit');
  const chatWin = document.getElementById('chatPanel');

  if (openBtn) {
    openBtn.onclick = () => chatWin.classList.add("active");
  }

  if (closeBtn) {
    closeBtn.onclick = () => chatWin.classList.remove("active");
  }

  // CHAT MESSAGES
  // ----------------

  const chatMessages = document.querySelector('.chatMessages');
  const sendBtn = document.getElementById('sendButton');
  const chatInput = document.getElementById('chatInput');


  // When send button is clicked
  if (sendBtn) {
    sendBtn.onclick = function() {
        sendMessage(); // Sends user message to chat
    };
  }

  // BOT RESPONSE FUNCTION
  // ---------------------------
  function botReply(userText) {
    const botDiv = document.createElement('div');

    botDiv.classList.add('bot-message', 'message');

    let reply = "I'm here to help! 😊";

    // responses
    if (userText.toLowerCase().includes("stress")) {
      reply = "I'm sorry you're feeling stressed. Try taking a short break or deep breathing 💜";
    } else if (userText.toLowerCase().includes("help")) {
      reply = "You can contact us or explore our coping tools!";
    } else if (userText.toLowerCase().includes("hello")) {
      reply = "Hi there! 👋 How are you feeling today?";
    }

    botDiv.textContent = reply;

    // Add bot message to chat window
    chatMessages.appendChild(botDiv);

    // animation
    setTimeout(() => {
      botDiv.classList.add("show");
    }, 10);

    // show latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // USER MESSAGE FUNCTION
  // -----------------------
  function sendMessage() {
    const text = chatInput.value.trim();

    if (text !== "") {

      const userDiv = document.createElement('div');
      userDiv.classList.add('user-message', 'message');
      userDiv.textContent = text;

      chatMessages.appendChild(userDiv);

      // animation
      setTimeout(() => {
        userDiv.classList.add('show');
      }, 10);

      chatInput.value = "";

      // show latest message
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // bot typing delay
      setTimeout(() => botReply(text), 1000);
    }
  }


  // ENTER KEY / SEND MESSAGE
  // ---------------------------
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Stops default form submission
      sendMessage();
    }
  });

  // ERROR POP UP
  // ------------
  const popup = document.getElementById('errorPopup');
  const closePopup = document.getElementById('closePopup');

  if (closePopup) {
    closePopup.onclick = function () {
      popup.style.display = 'none';
    };
  }

  // RUN VALIDATION
  const form = document.querySelector('form[name="Contact"]');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // stops refresh

      validateForm();
    });
  }

});

// FORM VALIDATION FUNCTION
// -----------------------------
function validateForm() {
  let errors = [];

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const phone = document.getElementById('phonenum').value.trim();
  const dob = document.getElementById('dob').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const message = document.getElementById('message').value.trim();

  if (firstName === '') errors.push("First Name is required.");
  if (lastName === '') errors.push("Last Name is required.");

  if (phone === '') errors.push("Phone Number is required.");

  if (dob === '') errors.push("Date of Birth is required.");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    errors.push("Email is required.");
  } else if (!emailPattern.test(email)) {
    errors.push("Invalid email address.");
  }

  if (address === '') errors.push("Address is required.");
  if (message === '') errors.push("Message is required.");

  if (errors.length > 0) {
    showErrors(errors);
    return false;
  }

  alert("Form submitted successfully!");
  return true;
}

// FORM ERRORS
// -----------
function showErrors(errors) {
  const popup = document.getElementById('errorPopup');
  const popupErrors = document.getElementById('popupErrors');

  popupErrors.innerHTML = '';

  errors.forEach(error => {
    const div = document.createElement('div');
    div.textContent = error;
    popupErrors.appendChild(div);
  });

  popup.style.display = 'flex';
}
