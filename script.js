$(document).ready(function() {

    var li =  $(".project-carousel li a");
    li.click(function(){
        li.removeClass('active');
    });

    const project_owl = $(".project-carousel");
    project_owl.owlCarousel({
        margin: 39.5,
        loop: false,
        nav: true,
        navContainer: ' .project-nav',
        navText: ['<span class="material-icons">keyboard_arrow_left</span>', '<span class="material-icons">keyboard_arrow_right</span>'],
        dots: false,
        autoplay: false,
        autoWidth:true,
        responsive: {
            0: {
                items: 3,
            },
            450: {
                items: 5,
            },
            768: {
                items: 7,
            }
        }
    });

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
   /* var slidesPerPage = 8; //globaly define number of elements per page*/
    var syncedSecondary = true;

    sync1.owlCarousel({
        items : 1,
        slideSpeed : 2000,
        nav: false,
        dots: false,
        responsiveRefreshRate : 200,
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items : 7,
            dots: false,
            nav: false,
            // center:true,
            smartSpeed: 200,
            slideSpeed : 500,
            URLhashListener:true,
            startPosition: 'URLHash',
            /*slideBy: slidesPerPage, *///alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate : 100
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        var current = el.item.index;



        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if(syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function(e){
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });

    const awards_owl = $(".awards-carousel");
    awards_owl.owlCarousel({
        items: 1,
        margin: 0,
        loop: false,
        nav: true,
        dots: false,
        autoplay: false
    });

    if ($(window).width() < 768) {
        $('.modal .tab-pane').removeClass('active show');
        $('.nav-pills .nav-link').removeClass('active');
        $('.return-btn').on('click', function() {
            $('.nav-pills .nav-link').addClass('active');
            $('.nav-pills .nav-link').removeClass('active');
            $('.modal .tab-pane').addClass('active show');
            $('.modal .tab-pane').removeClass('active show');
        });
    }
});