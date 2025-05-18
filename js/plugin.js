$(document).ready(function() {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1) {
            $('.header').addClass("sticky");
        } else {
            if ($(this).scrollTop() < 1) {
                $('.header').removeClass("sticky");
            }
        }
    });

    $(function() {
        const navbarMenu = $("#navbar");
        const overlayMenu = $(".overlay");

        $("#burger, .overlay").click(function() {
            navbarMenu.toggleClass("active");
            overlayMenu.toggleClass("active");
        });

        navbarMenu.on("click", "[data-toggle]", function(e) {
            if (window.innerWidth <= 999) {
                e.preventDefault();
                const $menuDropdown = $(this).parent();

                if ($menuDropdown.hasClass("active")) {
                    $menuDropdown.removeClass("active").find(".submenu").removeAttr("style");
                } else {
                    $(".menu-dropdown.active .submenu").removeAttr("style");
                    $(".menu-dropdown.active").removeClass("active");

                    $menuDropdown.addClass("active");
                    $menuDropdown.find(".submenu").css("max-height", $menuDropdown.find(".submenu")[0].scrollHeight + "px");
                }
            }
        });

        $(window).on("resize", function() {
            if (window.innerWidth > 999) {
                navbarMenu.removeClass("active");
                $(".menu-dropdown.active").removeClass("active").find(".submenu").removeAttr("style");
            }
        });
    });


    $('.cancel').click(function() {
        $('.navbar').removeClass("active");
        $('.overlay').removeClass("active");
    });


    $(".menu-item").click(function() {
        $(this).addClass("activelink").siblings().removeClass("activelink");
    });


    // End Header



    $(function() {
        $('.timer').each(function() {
            const $el = $(this);
            const to = +$el.data('to') || 0;
            const duration = +$el.data('speed') || 2000;
            const decimals = +$el.data('decimals') || 0;
            const start = +$el.data('from') || 0;
            const steps = Math.ceil(duration / 30);
            const increment = (to - start) / steps;
            let value = start,
                count = 0;

            const interval = setInterval(() => {
                value += increment;
                count++;
                $el.text(value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                if (count >= steps) {
                    clearInterval(interval);
                    $el.text(to.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                }
            }, 30);
        });
    });

    // End timer Numbers


    $(window).on("scroll", function() {
        window.requestAnimationFrame(() => {
            $(".parallax-image img").each(function() {
                let $this = $(this);
                let offsetTop = $this.closest(".parallax-image").offset().top;
                let scrollY = $(window).scrollTop();

                if (offsetTop < scrollY) {
                    let translateY = (scrollY - offsetTop) / 2;
                    $this.css("transform", `translateY(${translateY}px)`);
                } else {
                    $this.css("transform", "translateY(0)");
                }
            });
        });
    });



    // setTimeout(function() {
    //     $(".logo-animation").fadeOut(500, function() {
    //         $(".textcenter").fadeIn(500); // تظهر بعد انتهاء الـ fadeOut
    //     });
    // }, 4000);


    $('.possessimg').addClass('move-up');

    setTimeout(function() {
        $('.possessimg').removeClass('move-up').addClass('move-left-small');
        $('.second-item').addClass('show');
        setTimeout(function() {
            $('.onebox').addClass('show');
        }, 1500);
        setTimeout(function() {
            $('.towbox').addClass('show');
        }, 2000);

    }, 2000);




    function filterItems(buttonClass, filterClass) {
        $(buttonClass).click(function() {
            var value = $(this).data('filter');

            $(buttonClass).removeClass('active');
            $(this).addClass('active');

            if (value === "all") {
                $(filterClass).stop(true, true).fadeIn(300);
            } else {
                $(filterClass).stop(true, true).fadeOut(300).filter('.' + value).fadeIn(300);
            }
        });
        const urlParams = new URLSearchParams(window.location.search);
        const initialFilter = urlParams.get('filter');
        if (initialFilter) {
            const targetBtn = $(`${buttonClass}[data-filter="${initialFilter}"]`);
            if (targetBtn.length) {
                targetBtn.click();
            }
        } else {
            $(`${buttonClass}[data-filter="all"]`).click();
        }
    }
    filterItems(".filter-but", ".filter");



    function setActiveClass(parentSelector, childSelector) {
        $(parentSelector).on("click", childSelector, function() {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active").siblings().removeClass("active");
            }
        });
    }

    // Apply the function to both lists.
    setActiveClass(".pagination", "li a");
    setActiveClass(".listbtn", "a");



    $('.sliderproducts').slick({
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 999, settings: { slidesToShow: 2 } },
            { breakpoint: 550, settings: { slidesToShow: 1 } }
        ]
    });


    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('.scrollToTop').fadeIn();
            $('.scrollToTop').addClass("btntop");
        } else {
            $('.scrollToTop').fadeOut();
            $('.scrollToTop').removeClass("btntop");
        }
    });
    //Click event to scroll to top
    $('.scrollToTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 300);
        return false;
    });

    // End Scroll Top

    let $list = $('.image-list');
    let tickerHeight = $('.image-ticker').height();
    let totalHeight = $list.height();

    $list.append($list.html()); // لتكرار المحتوى للحركة المستمرة

    let pos = 0;
    let interval;

    function scrollTicker() {
        pos--;
        if (Math.abs(pos) >= totalHeight) {
            pos = 0;
        }
        $list.css('top', pos + 'px');
    }

    function startTicker() {
        interval = setInterval(scrollTicker, 20);
    }

    function stopTicker() {
        clearInterval(interval);
    }

    // بدء الحركة
    startTicker();

    // وقف الحركة عند الهوفر
    $('.image-ticker').hover(stopTicker, startTicker);

    $(".img-container").popupLightbox({});


    $(function() {

        // We can attach the `fileselect` event to all file inputs on the page
        $(document).on('change', ':file', function() {
            var input = $(this),
                numFiles = input.get(0).files ? input.get(0).files.length : 1,
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [numFiles, label]);
        });

        // We can watch for our custom `fileselect` event like this
        $(document).ready(function() {
            $(':file').on('fileselect', function(event, numFiles, label) {

                var input = $(this).parents('.input-group').find(':text'),
                    log = numFiles > 1 ? numFiles + ' files selected' : label;

                if (input.length) {
                    input.val(log);
                } else {
                    if (log) alert(log);
                }

            });
        });

    });

});


if (typeof WOW !== 'undefined') {
    wow = new WOW({
        animateClass: 'animated',
        offset: 100,
        callback: function(box) {
            console.log("WOW: animating <" + box.tagName.toLowerCase() + ">");
        }
    });
    wow.init();
}