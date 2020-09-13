function hideFirstSlide(){
    $('#dobro_dosli').fadeOut();
    $('#potpis').fadeOut();
}
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: parseInt(srcWidth*ratio), height: parseInt(srcHeight*ratio) };
}

function backgroundImageResize(id_element, maxWidth, maxHeight){
    width = document.body.clientWidth;
    height = document.body.clientHeight;
    ratio = maxWidth / maxHeight;

    if(width < 1200){
        newWidth = parseInt(width);
        newHeight = parseInt(width / ratio);
        size = newWidth+"px "+newHeight+"px";

        $(id_element).css({"height": newHeight, "background-size": size});
    }
    else {
        size = maxWidth+"px "+maxHeight+"px";
        $(id_element).css({"max-height": maxHeight, "height": maxHeight, "background-size": size});
    }
}

window.onload = function(){
    backgroundImageResize("#animacija", 1020, 765);
    backgroundImageResize("#usluge", 1022, 765);
}

var onresize = function() {
    backgroundImageResize("#animacija", 1020, 765);
    backgroundImageResize("#usluge", 1022, 765);
}
window.addEventListener("resize", onresize);

function animation(){
    $('#dobro_dosli').show();
$('#potpis').show();

window.setTimeout(function(){
    hideFirstSlide();
}, 4000);

window.setTimeout(function(){
    $('#bili_smo').fadeIn();
    $('#ordinacija').show();
}, 4500);

window.setTimeout(function(){
    $('#bili_smo').animate({
        left: "-=300px",
        opacity: 0
      }, 1000, function() {
        $('#bili_smo').hide();
        $('#bili_smo').css('left', '20%');
        $('#bili_smo').css('opacity', '1');
      });
    $('#ordinacija').fadeOut();
}, 8000);

window.setTimeout(function(){
    

    $('#sada_smo').fadeIn();
    $('#bolnica').show();
}, 9000);

let topPercent = "";

window.setTimeout(function(){
    $('#sada_smo').animate({
        left: "-=300px",
        opacity: 0
      }, 1000, function() {
        
      });

    if(document.body.clientWidth <= 320){
        $('#bolnica').animate({
            top: "-=80px"
        }, 1000, function() {
            topPercent = "+=80px";
        });
    }
    if(document.body.clientWidth > 320 && document.body.clientWidth <= 448){
        $('#bolnica').animate({
            top: "-=80px"
        }, 1000, function() {
            topPercent = "+=80px";
        });
    }
    if(document.body.clientWidth > 448 && document.body.clientWidth <= 576){
        $('#bolnica').animate({
            top: "-=100px"
        }, 1000, function() {
            topPercent = "+=100px";
        });
    }
    if(document.body.clientWidth > 576 && document.body.clientWidth <= 768){
        $('#bolnica').animate({
            top: "-=150px"
        }, 1000, function() {
            topPercent = "+=150px";
        });
    }
    if(document.body.clientWidth > 768 && document.body.clientWidth <= 992){
        $('#bolnica').animate({
            top: "-=180px"
        }, 1000, function() {
            topPercent = "+=180px";
        });
    }
    if(document.body.clientWidth > 992 && document.body.clientWidth <= 1200){
        $('#bolnica').animate({
            top: "-=180px"
        }, 1000, function() {
            topPercent = "+=180px";
        });
    }
    if(document.body.clientWidth > 1200){
        $('#bolnica').animate({
            top: "-=300px"
        }, 1000, function() {
            topPercent = "+=300px";
        });
    }
    

}, 12500);

window.setTimeout(function(){
    $('#slika1').show();
}, 13500);

window.setTimeout(function(){
    $('#slika2').show();
}, 15000);

window.setTimeout(function(){
    $('#slika3').show();
}, 16000);

window.setTimeout(function(){
    $('#slika4').show();
}, 17000);

window.setTimeout(function(){
    $('#slika5').show();
}, 18000);

window.setTimeout(function(){
    $('#slika1').fadeOut();
    $('#slika2').fadeOut();
    $('#slika3').fadeOut();
    $('#slika4').fadeOut();
    $('#slika5').fadeOut();
    $('#bolnica').fadeOut();
    $('#animacija').animate({
        opacity: 0
      }, 1000, function(){
        $('#bolnica').css('top', topPercent);
        $("#sada_smo").css('left', '20%');
        $("#sada_smo").css('opacity', '1');
        $("#sada_smo").hide();
      });
    
}, 19000);

window.setTimeout(function(){
    $('#animacija').css('background-image', 'url("https://ivanmaksimovic97.github.io/DjoleSajt/assets/images/slider/02/02slika.jpg")');
    $('#animacija').css('background-position', 'right center');
    $('#animacija').animate({
        opacity: 1
      }, 4000);
    $('#usluge').show();
}, 20000);

window.setTimeout(function(){
    $('.usluge').slideDown('slow');
}, 21000);

window.setTimeout(function(){
    $("#usluge").fadeOut("slow");
    $(".usluge").fadeOut("slow");
    $('#animacija').animate({
        opacity: 0
    }, 1000);
}, 24000);
}

animation();

window.setInterval(function(){
    $('#animacija').css('background-image', 'url("https://ivanmaksimovic97.github.io/DjoleSajt/assets/images/slider/01/01slika.jpg")');
    $('#animacija').animate({
        opacity: 1
    }, 1000);
    animation();
    //alert("25 sekundi");
}, 25000);
