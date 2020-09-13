//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //mybutton.style.display = "block";
    $('#myBtn').stop(true, true).fadeIn();
  } else {
    //mybutton.style.display = "none";
    $('#myBtn').stop(true, true).fadeOut();
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  //document.body.scrollTop = 0; // For Safari
  //document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  $('html,body').animate({ scrollTop: 0 }, 'slow');
}