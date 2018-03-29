export default () => {
    return (scope, element) => {
        let height = element.offset().top+element.outerHeight();
        // let height = 250;
        let id = Math.random();

        $(document).on('scroll.navbar' + id, () => {
            let $navs=$(element).find('.items').children()
            let top = $(document).scrollTop();
            if (top >= height) {
                element.addClass('nav-fixed');
            } else {
                element.removeClass('nav-fixed');
            }
            $navs.each(function(){
                let classname=$(this).attr('data');
                let $container=$('#'+classname);
                if($container.length==0)return;
                let t = $container.offset().top;
                let b = t+$container.outerHeight();
                if(top>t-height &&top<b-height){
                    $(this).addClass('active')
                }else{
                    $(this).removeClass('active')
                }

            })
        });

        scope.$on('$destroy', function () {
            $(document).off('scroll.navbar' + id);
        });
    };
};
