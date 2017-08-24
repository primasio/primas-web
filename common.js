(function(){
    var $navbar = null;
    var $navbarPlaceholder = null;
    $navbar = $('#navbar');
    $navbarPlaceholder = $('#navbar-placeholder');

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
    }

    function layer(text) {
        var $div=document.createElement("div");
        $div.className='toast-wrap'
        $div.innerHTML=text;
        document.body.appendChild($div);
        setTimeout(function () {
            document.body.removeChild($div);
        },3000)
    }

    $(function () {
        $(document).scroll(function(){
            adjustNavbar();
        });
        $('#navbar-community').on('mouseenter', function(e){
            $('#navbar-qr-code').addClass('active');
            e.stopPropagation();
        }).on('mouseleave', function(e){
            $('#navbar-qr-code').removeClass('active');
            e.stopPropagation();
        });

    });
})();



