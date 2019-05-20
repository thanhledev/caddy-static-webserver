(function($) {
    "use strict";
    /*==============================================================*/
    //Sticky menu scroll
    /*==============================================================*/
    $(window).scroll(function() {
        var winTop = $(window).scrollTop();
        if (winTop >= 5) {
            $("header").addClass("sticky-header");
        } else {
            $("header").removeClass("sticky-header");
        }
    });

    $.extend($.easing, {
        easeInOutExpo: function(t, e, i, n, s) {
            return 0 == e ? i : e == s ? i + n : (e /= s / 2) < 1 ? n / 2 * Math.pow(2, 10 * (e - 1)) + i : n / 2 * (-Math.pow(2, -10 * --e) + 2) + i
        },
    });
    $(document).ready(function() {

        /*==============================================================*/
        //Navigation Menu
        /*==============================================================*/

        $("#navigation6").navigation({
            offCanvasSide: "right"
        });
        $("#navigation5").navigation({
            hidden: true,
            offCanvasSide: "right"
        });
        $(".btn-show").click(function() {
            $("#navigation5").data("navigation").toggleOffcanvas();
        });

        // jQuery smooth scroll
        $('.nav-menu > li > a, .about__btn, .slider__btn').bind('click', function(event) {
            var $anchor = $(this);
            var headerH = '48';
            $('.header').outerHeight();
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
            }, 1200, 'easeInOutExpo');

            event.preventDefault();
        });

        /*==============================================================*/
        //Mail Ajax Post
        /*==============================================================*/
        $('#contactform')
            .submit(function(e) {
                e.preventDefault();
                var contact_name = $("#name")
                    .val();
                var contact_email = $("#email")
                    .val();
                var subject = $("#subject")
                    .val();
                var your_phone = $("#phone")
                    .val();
                var your_message = $("#message")
                    .val();
                $.post("sendmail.php", {
                    name: contact_name,
                    email: contact_email,
                    phone: your_phone,
                    subject: subject,
                    message: your_message,
                }, function(data, status) {
                    document.getElementById('msgmail')
                        .innerHTML = data;
                });
            });

        /*==============================================================*/
        //Mail Chimp
        /*==============================================================*/
        $('#mailchimp')
            .submit(function(e) {
                e.preventDefault();
                var n_email = $("#email-subscribe")
                    .val();
                $.post("mailchimp.php", {
                    email: n_email,
                }, function(data, status) {
                    document.getElementById('nconfirmation')
                        .innerHTML = data;
                });
            });

        /*==============================================================*/
        //Tilt Parllax Scrolling
        /*==============================================================*/
        $('.v2__mockup')
            .tilt({
                speed: 1500,
                maxTilt: 10,
                transition: true,
                scale: 1
            })

        /*==============================================================*/
        //Parallax scrolling Section
        /*==============================================================*/
        var wWidth = $(window)
            .width();
        if (wWidth > 767) {
            $('.v2__features')
                .parallax('90%', 0.2);
        }

        /*==============================================================*/
        //Counter Up
        /*==============================================================*/
        $('.stats')
            .counter();

        $('.horizon, .progress')
            .horizon({
                recurring: false,
                inView: function() {
                    $('.stats').each(function() {
                        var counter = $(this).data('counter');
                        counter.startCounter();
                    });
                },
            });

        /*==============================================================*/
        //Portfolio Filtering
        /*==============================================================*/

        // layout Isotope after each image loads

        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.lightbox-gallery',
            layoutMode: 'fitRows',
            getSortData: {
                name: '.name',
                symbol: '.symbol',
                number: '.number parseInt',
                category: '[data-category]',
                weight: function(itemElem) {
                    var weight = $(itemElem)
                        .find('.weight')
                        .text();
                    return parseFloat(weight.replace(/[\(\)]/g, ''));
                }
            }
        });

        $grid.imagesLoaded().progress(function() {
            $grid.isotope('layout');

        });

        // filter functions
        var filterFns = {
            // show if number is greater than 50
            numberGreaterThan50: function() {
                var number = $(this)
                    .find('.number')
                    .text();
                return parseInt(number, 10) > 50;
            },
            // show if name ends with -ium
            ium: function() {
                var name = $(this)
                    .find('.name')
                    .text();
                return name.match(/ium$/);
            }
        };
        // bind filter button click
        $('#filters')
            .on('click', 'button', function() {
                var filterValue = $(this)
                    .attr('data-filter');
                $(".button_item").removeClass("active");
                $(this).addClass('active');
                // use filterFn if matches value
                filterValue = filterFns[filterValue] || filterValue;
                $grid.isotope({
                    filter: filterValue
                });
            });

        /*==============================================================*/
        //Image Lightbox
        /*==============================================================*/
        $('.venobox')
            .venobox();

        /*==============================================================*/
        // Load More Function Start
        /*==============================================================*/
        ! function(e) {
            "use strict";
            e(document).ready(function() {
                function t(t) {
                    o.find(".hidden").removeClass("hidden");
                    var a = r.filteredItems.slice(t, r.filteredItems.length).map(function(e) {
                        return e.element
                    });
                    e(a).addClass("hidden"),
                        o.isotope("layout"),
                        0 == a.length ? jQuery("#loadMore").hide() : jQuery("#loadMore").show()
                }
                var o = e(".pro-all-projects").isotope({
                        itemSelector: ".pitem",
                        layoutMode: "fitRows",
                        getSortData: {
                            name: ".name",
                            symbol: ".symbol",
                            number: ".number parseInt",
                            category: "[data-category]",
                            weight: function(t) {
                                var o = e(t).find(".weight").text();
                                return parseFloat(o.replace(/[\(\)]/g, ""))
                            }
                        }
                    }),
                    a = 6,
                    i = 3,
                    n = a,
                    r = o.data("isotope");
                t(a),
                    e("#loadMore").on("click",
                        function() {
                            e("#filters").data("clicked") ? (n = i, e("#filters").data("clicked", !1)) : n = n, n += i, t(n)
                        }
                    ),
                    e("#filters").on("click",
                        function() {
                            e(this).data("clicked", !0), t(i)
                        }
                    )
            })
        }
        (jQuery);

        /*==============================================================*/
        //flickity sliders
        /*==============================================================*/
        //testimonial
        $('.testimonial-carousel').flickity({
            // options
            cellAlign: 'left',
            contain: true,
            prevNextButtons: false,
            wrapAround: true,
            autoPlay: 3500,
            imagesLoaded: true,
        });
        //client
        $('.client__carousel').flickity({
            // options
            contain: true,
            wrapAround: true,
            groupCells: true,
            pageDots: false,
            imagesLoaded: true,
        });
        /*==============================================================*/
        //Start Map
        /*==============================================================*/
        var map = $('#google_map');
        var myCenter = new google.maps.LatLng(40.712784, -74.005941);

        function initialize() {
                var mapProp = {
                    center: myCenter,
                    zoom: 13,
                    scrollwheel: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    styles: [{
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#444444"
                        }]
                    }, {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [{
                            "color": "#f2f2f2"
                        }]
                    }, {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [{
                            "saturation": -100
                        }, {
                            "lightness": 45
                        }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "simplified"
                        }]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{
                            "color": "#ffffff"
                        }, {
                            "visibility": "on"
                        }]

                    }]
                };
                var map = new google.maps.Map(document.getElementById("google_map"), mapProp);
                var marker = new google.maps.Marker({
                    position: myCenter,
                    animation: google.maps.Animation.BOUNCE,
                    icon: 'images/map_marker_blue.png'
                });
                var infowindow = new google.maps.InfoWindow({
                    content: "united-states"
                });
                marker.setMap(map);
            }
            //    google.maps.event.addDomListener(window, 'load', initialize);  
        if (map.length) {
            google.maps.event.addDomListener(window, 'load', initialize);
        }
    });

    /*==============================================================*/
    //Preloader
    /*==============================================================*/
    jQuery(window)
        .on('load', function() {
            $('.preloader')
                .fadeOut('slow');
        });

})(jQuery);