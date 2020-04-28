jQuery(document).ready(function () {


    ////////////////////////////////////////////////////////////
    // Project Slides
    ////////////////////////////////////////////////////////////

    if (document.querySelector('.slides') !== null) {

        var imgstatus = jQuery('.current');
        var total = jQuery('.total');

        jQuery('.slides').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            i = i < 10 ? "0" + i : i;
            var count = slick.slideCount < 10 ? "0" + slick.slideCount : slick.slideCount;
            imgstatus.text(i);
            total.text("/" + count);
        });

        if (jQuery('.slides')) {
            jQuery('.slides').slick({
                autoplay: true,
                autoplaySpeed: 600000,
                arrows: false,
                speed: 500,
                fade: false,
                draggable: false,
                responsive: [
                    {
                      breakpoint: 980,
                      settings: {
                        slidesToShow: 1,
                        fade: true,
                        speed: 100,
                      }
                    },
                  ]
            });
        }

    }


    ////////////////////////////////////////////////////////////
    // Chaos Slides
    ////////////////////////////////////////////////////////////

    if (document.querySelector('.stack') !== null) {

        var stacks = document.querySelectorAll('.stack');

        var counter = 0;
        var inner = 0;

        var timer = window.setInterval(() => {
            next();
        }, 2400);

        function next() {

            stacks.forEach(el => {
                el.style.visibility = 'hidden';
            });

            stacks[counter].style.visibility = 'visible';

            var children = stacks[counter].children;
            // children[0].style.visibility = 'visible';

            if (inner < children.length) {

                    if(inner >= 2) {
                        children[inner - 2].style.visibility = 'hidden';
                    }
                    children[inner].style.visibility = 'visible';
                    inner += 1;
                    var top = Math.random() * (window.innerHeight - children[inner].getBoundingClientRect().height);
                    var left = Math.random() * (window.innerWidth - children[inner].getBoundingClientRect().width);
                    children[inner].style.top = top + 'px';
                    children[inner].style.left = left + 'px';
                    children[inner].style.visibility = 'visible';
                    inner += 1;
            } else {
                for (var i = 0; i < children.length; i++) {
                    children[i].style.visibility = 'hidden';
                }
                inner = 0;
                counter < stacks.length - 1 ? counter += 1 : counter = 0;
                next();
            }


        }


        jQuery('.chaos').on('click', function () {
            next();
            clearInterval(timer);
            timer = window.setInterval(() => {
                next();
            }, 3000);
        });

    }



});     

    ////////////////////////////////////////////////////////////
    // welcome banner
    ////////////////////////////////////////////////////////////

var welcome = document.querySelector(".welcome");
var shown = sessionStorage.getItem("welcome_shown");

if (welcome) {
    sessionStorage.setItem("welcome_shown", "true");
    if (shown) {
        welcome.style.display = "none";
    }
}