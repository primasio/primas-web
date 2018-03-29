class AppController {

  constructor($transitions,$state) {
    "ngInject";
      this.$state=$state;
      $transitions.onEnter({}, (transition, state)=> {
          $(document).scrollTop(0);
      })
  }
}

export default AppController;
