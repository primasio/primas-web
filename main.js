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
    var radio=1920/817;
    var updateHeight = window.innerHeight >= minHeight ? window.innerHeight : minHeight;


    $face = $('#face');
    $faceContent = $face.find('.content');
    $navbar = $('#navbar');
    $navbarPlaceholder = $('#navbar-placeholder');
    navbarHeight = $navbar.height();
    $navItems = $navbar.find('.item');
    $sections = $('.nav-section');
    $faceContent.addClass('show');
    adjustPageSize();
    adjustNavbar();
    $('#navbar-community').on('mouseenter', function(e){
        $('#navbar-qr-code').addClass('active');
        e.stopPropagation();
    }).on('mouseleave', function(e){
        $('#navbar-qr-code').removeClass('active');
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

    $("[data-track]").on("click", function () {
        var label = $(this).data("track");
        window._hmt && window._hmt.push(['_trackEvent', label, 'click']);
    });
    $('.lazyload').each(function () {
        var $this=$(this);
        var src=$this.data('src');
        var img=new Image();
        img.src=src;
        img.onload=function () {
            $this[0].src=src;
        }
    })
    //
    var scrollTop, rootElement = document.scrollingElement || docuemnt.body;
    $('#ios-download').on('click',function () {
        $('.popup').show();
       scrollTop = rootElement.scrollTop;
        $('body').css({position:'fixed',top:-scrollTop+'px'})
    })
    //表单提交
    $('#email').on('keyup',function () {
        var myreg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if(!myreg.test(this.value)){
            $('.sub-btn').addClass('disabled');
        }else{
            $('.sub-btn').removeClass('disabled');
        }
    });
    $('.pup-form')
        .on('click','.close',function () {
            $('.popup').hide();
            $('body').css({position:'static'});
            rootElement.scrollTop=scrollTop;
        }).end()
        .on('click','.sub-btn',function () {
            if(!$(this).hasClass('disabled')){
                $.ajax({
                    method: "POST",
                    crossDomain:true,
                    contentType:"application/json",
                    url: "http://139.196.73.49:3098/report",
                    data: { email: "John@dsd.com", remark: "Boston" },
                    success:function () {
                        alert('ok')
                    }
                })
            }

        });
    $('#navbar').on('click','.item-nav',function () {
        var $el=document.querySelector($(this).data('href'));
        scrollTo($el)
    })

    function adjustPageSize()
    {

        $face.height(updateHeight);

        $faceContent.css('top', (updateHeight - $faceContent.height() + navbarHeight) / 2);

        //$('#team').height(window.innerWidth/radio)
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
    var timer;
    function scrollTo(el){

        timer = setInterval(function(){
            var osTop = el.offsetTop;
            var speed = Math.floor(-osTop / 6);
            console.log(osTop)
            rootElement.scrollTop = osTop + speed;
            if(osTop == rootElement.scrollTop){
                clearInterval(timer);
            }
        },30);
    }

    $(window).resize(function() {
        adjustPageSize();
        updateHeight = window.innerHeight >= minHeight ? window.innerHeight : minHeight
        processingInstance.resizeSketch(updateHeight);
    });

    $(document).scroll(function(){
        adjustNavbar();
    });

    $(function () {
        processingInstance = new Processing(canvas, startSolarSystem);
        processingInstance.resizeSketch(updateHeight);

    });
})();



