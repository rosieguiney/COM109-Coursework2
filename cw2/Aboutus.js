
$(document).ready(function() {
	$("#btn-toggle").click(function() {
		$("#paragraph1").slideToggle("fast");
    });



/* Accordian & Paragraph code */ 
    $( function() {
    $( "#accordion-questions" ).accordion({
      collapsible: true,
      active: false,
      heightStyle: "content"
    });
});



/* When the user scrolls down page to the middle section, the paragraphs appear */ 

  let revealOptions = { threshold: 0.2 }; 

    let revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine which class to add based on the element
                if (entry.target.classList.contains('accordion-title')) {
                    entry.target.classList.add('fade-in-visible');
                } else {
                    entry.target.classList.add('reveal-active');
                }
                observer.unobserve(entry.target);    
            }
        });
    }, revealOptions);

    document.querySelectorAll('.who-we-are-container, .stories-container, .accordion-title').forEach(el => {
        revealObserver.observe(el);
    });

});




/* navigation code */
window.onscroll = function() {scrollFunction()};

    /*When the user scrolls down 300px from the top of the page, display the button */

    function scrollFunction() {
        let navbutton = document.getElementById("navBtn");
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            navbutton.style.display = "block";
        } else {
            navbutton.style.display = "none";
        }
    }

/*When the user clicks on the button, it scrolls to the top of the page*/
function topFunction() {
    window.scrollTo({top: 0, behavior: 'smooth'});
} 




/* Community Milestones */ 

$(document).ready(function() {
    const crisisWords = ["help", "hurt", "die", "suicide", "depressed", "emergency", "hopeless"];

    /*Must only have 1-150 characters */ 
    $('#milestone-input').on('input', function () {
        $('#char-count').text($(this).val().length + "/150");
    });

    $('#milestone-btn').on('click', function () {
        /*one submittion rule */
        if (localStorage.getItem('user_submitted_message')) {
            alert("You have already shared a message today, please share one tomorrow!")
            return;
        }

        let milestoneText = $('#milestone-input').val().trim();
        let lowerText = milestoneText.toLowerCase();

        /*Crisis word filter */ 
        let isCrisis = crisisWords.some(word => lowerText.includes(word));
        if (isCrisis) {
            $('#crisis-msg').slideDown();
            return;
        }

        if(milestoneText.length >0) {
            /* 48 hour time limit */ 
            const milestoneData = {
                text: milestoneText,
                time: Date.now()
            };

            /* Well done text */

            $('#success-msg').fadeIn().delay(3000).fadeOut();
            localStorage.setItem('user_submitted_message', 'true');
            
            saveAndDisplayMessage(milestoneData);
            $('#milestone-input').val("");
            $('#char-count').text("0/150");
        }
    });


    function saveAndDisplayMessage(data) {
        appendMessageToFeed(data);
    }

    function appendMessageToFeed(message) {
        const fortyEightHours = 48 * 60 * 60 * 1000;

        if (Date.now() - message.time < fortyEightHours) {
            let messageHtml = `<div class="milestone-item"><p>"${message.text}"</p></div>`;
            $('#milestone-feed').prepend(messageHtml);
        }
    }
});


/* adding focus() and blur() */

const milestoneInput = document.getElementById('milestone-input');
const wrapper = document.querySelector('.milestone-wrapper');

milestoneInput.addEventListener('focus', () => {
    wrapper.classList.add('focused');
});

milestoneInput.addEventListener('blur', () => {
    wrapper.classList.remove('focused');
});



/* turns text red is limit is reached */ 


milestoneInput.addEventListener('input', function() {
    let count = this.value.length;
    let charDisplay = document.getElementById('char-count');
    charDisplay.textContent = `${count}/150`;
    
    
    if (count >= 150) {
        charDisplay.style.color = "red";
    } else {
        charDisplay.style.color = "#333";
    }
});

    


  



