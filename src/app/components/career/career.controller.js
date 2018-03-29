class careerController {
    constructor() {
        "ngInject";
    }
    $onInit(){
        this.navs=[
            '算法研发',
            '技术研发',
            '产品运营',
            '行政主管',
            'UI设计'
        ]
        this.idx=0;
    }

}

export default careerController;
