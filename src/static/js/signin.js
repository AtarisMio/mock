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
            console.log(xhr, status, err);
        })
        
    })
}