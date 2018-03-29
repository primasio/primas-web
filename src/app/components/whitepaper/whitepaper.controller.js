class whitepaperController {
    constructor($stateParams) {
        "ngInject";
        location.href=`./pdf/primas-1.3.1-${$stateParams.lang}.pdf`;
    }
    $onInit(){

    }
}

export default whitepaperController;
