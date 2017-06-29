/**
 * Created by ganlu on 28/06/2017.
 */
(function(){

    var $face = null;
    var $faceContent = null;
    var $navbar = null;
    var $navbarPlaceholder = null;
    var navbarHeight = 0;
    var $sections = null;
    var $navItems = null;
    var processingInstance = null;

    var minHeight = 300;

    $(function(){

        $face = $('#face');
        $faceContent = $face.find('.content');
        $navbar = $('#navbar');
        $navbarPlaceholder = $('#navbar-placeholder');
        navbarHeight = $navbar.height();
        $navItems = $navbar.find('.item');
        $sections = $('.nav-section');

        $(window).resize(function() {
            adjustPageSize();
        });

        $(document).scroll(function(){
            adjustNavbar();
        });

        $('#navbar-community').on('click', function(e){
            if($('#navbar-qr-code').hasClass('active'))
            {
                $('#navbar-qr-code').removeClass('active');
            }else{
                $('#navbar-qr-code').addClass('active');
            }

            e.stopPropagation();
        });

        $('#footer-community').on('click', function(e){
            if($('#footer-qr-code').hasClass('active'))
            {
                $('#footer-qr-code').removeClass('active');
            }else{
                $('#footer-qr-code').addClass('active');
            }

            e.stopPropagation();
        });

        $('body').on('click', function(){
            $('.weixin-qr-code').removeClass('active');
        });

        $('.weixin-qr-code').on('click', function(e){
            e.stopPropagation();
        });

        var canvas = document.getElementById("intro-bg");
        processingInstance = new Processing(canvas, startSolarSystem);

        adjustPageSize();
        adjustNavbar();

        $faceContent.addClass('show');
    });

    function adjustPageSize()
    {
        var updateHeight = window.innerHeight >= minHeight ? window.innerHeight : minHeight;

        $face.height(updateHeight);

        $faceContent.css('top', (updateHeight - $faceContent.height() + navbarHeight) / 2);

        processingInstance.resizeSketch(updateHeight);
    }

    function adjustNavbar()
    {
        var currentTop = $(document).scrollTop();
        if(currentTop > 200)
        {
            $navbar.addClass('fixed');
            $navbarPlaceholder.removeClass('hide');

        }else{
            $navbar.removeClass('fixed');
            $navbarPlaceholder.addClass('hide');
        }

        $sections.each(function() {
            var top = $(this).offset().top - navbarHeight,
                bottom = top + $(this).height();

            if (currentTop >= top && currentTop <= bottom) {

                if(!$(this).hasClass('active'))
                {
                    $navItems.removeClass('active');
                    $sections.removeClass('active');
                    $(this).addClass('active');
                    var id = $(this).attr('id');
                    $('#nav-' + id).addClass('active');
                }
            }
        });
    }


})();



