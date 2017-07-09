window.onload = function() {
    $('#signin').off('click').on('click', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/mock/api/v1/user/signin',
            method: 'post',
            data: $('form').serialize()
        }).done(function(res) {
            console.log(res);
        }).fail(function(xhr, status, err) {
            console.log(status, err);
            errorModal(xhr.responseJSON.message, '登录错误');
        })
    });
}