
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



  const scrollText = document.querySelector(".scroll-text");

scrollText.innerHTML = scrollText.textContent.split("").map(char => {
    return `<span class="hover-char">${char === " " ? "&nbsp;" : char}</span>`;
}).join("");