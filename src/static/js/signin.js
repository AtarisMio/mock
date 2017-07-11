window.onload = function() {
    $('#signinButton').off('click').on('click', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/mock/api/v1/user/signin',
            method: 'post',
            data: $('form').serialize()
        }).done(function(res) {
            window.location.href='/mock/management';
        }).fail(function(xhr, status, err) {
            console.log(status, err);
            errorModal(xhr.responseJSON.message, '登录错误');
        })
    });
    $('#signupButton').off('click').on('click', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/mock/api/v1/user/signup',
            method: 'post',
            data: $('form').serialize()
        }).done(function(res) {
            window.location.href='/mock/management';
        }).fail(function(xhr, status, err) {
            console.log(status, err);
            errorModal(xhr.responseJSON.message, '注册错误');
        })
    });
}