
$(document).ready(function() {
	$("#btn-toggle").click(function() {
		$("#paragraph1").slideToggle("fast"); 
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


/* When the user scrolls down page to the middle section, the paragraphs appear */ 

  document.addEventListener("DOMContentLoaded", function() {
    let containers = document.querySelectorAll('.who-we-are-container, .stories-container');

    let observerOptions = {
        threshold: 0.4  /* User scrolls down to see the content */ 
    };

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);    
            }
        });
    }, observerOptions);

    containers.forEach(container => {
        observer.observe(container);
    });
});
  

  /* Scroll down button */ 


  /* accordian jQuery */
  $( function() {
    $( "#common-ground-accordion" ).accordion();
  } );


  



  