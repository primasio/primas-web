class FaceController {
    constructor($scope,$translate,$timeout,$location,$anchorScroll,message,reportAPI) {
        "ngInject";
        this.$translate=$translate;
        this.cur_lang = window.localStorage.primas_lang||'en';
        this.showEwm=false;
        this.$timeout=$timeout;
        this.message=message;
        this.reportAPI=reportAPI;
        this.$location=$location;
        this.$anchorScroll=$anchorScroll;
        this.$anchorScroll.yOffset = 99;
        this.current_nav='face';
        this.loading=false;
    }
    $onInit(){
        this.navItems=[
            'face','introduction','investors','team','roadmap','partners','media'
        ]
        $('.face-banner').height(window.innerHeight);
        $('body').on('click.hideewm',()=>{
            this.$timeout(()=>{
                this.showEwm=false;
            })

        })
        // this.switching('en')
    }
    switching(lang){
        this.$translate.use(lang)
        window.localStorage.primas_lang=lang
    }
    gotoAnchor (x) {
        this.current_nav=x;
        if (this.$location.hash() !== x) {
            // set the $location.hash to `newHash` and
            // $anchorScroll will automatically scroll to it
            this.$location.hash(x);
        } else {
            // call $anchorScroll() explicitly,
            // since $location.hash hasn't changed
            this.$anchorScroll();
        }
    };
    subform(){
        this.loading=true;
        this.reportAPI.one('report').customPOST(JSON.stringify(this.form)).then(
            (res) => {
                this.loading=false;
                this.message.success("ok");
                this.showForm=false;
            }
        );
    }
}

export default FaceController;
