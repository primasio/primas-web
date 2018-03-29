class MessageService {
    constructor($timeout) {
        "ngInject";
        this.$timeout = $timeout;
    }

    success(message) {
        this.clear();
        $('#alert-message').addClass('success');
        this.show(message, 3000);
    }

    error(message, period) {
        this.clear();
        $('#alert-message').addClass('error');

        let p = typeof(period) == 'undefined' ? 3000 : period;

        this.show(message, p);
    }

    info(message) {
        this.clear();
        $('#alert-message').addClass('info');
        this.show(message, 0);
    }
    warn(message, period) {
        this.clear();
        $('#alert-message').addClass('warn');

        let p = typeof(period) == 'undefined' ? 3000 : period;

        this.show(message, p);
    }

    clear() {
        $('#alert-message')
            .removeClass('error')
            .removeClass('success')
            .removeClass('info');
    }

    show(message, period) {
        // if ($(document).scrollTop() >= 40) {
        //     $('#alert-message').addClass('fixed').css('top', 0);
        // } else {
        //     $('#alert-message').removeClass('fixed').css('top', '');
        // }

        $('#alert-message').html(message).fadeIn();

        if (period != 0) {
            this.$timeout(
                () => {
                    $('#alert-message').fadeOut();
                },
                period
            );
        }
    }

    hide() {
        $('#alert-message').fadeOut();
    }
}

export default MessageService;
