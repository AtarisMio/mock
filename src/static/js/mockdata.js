var options = {
    modes: ['tree', 'text'],
    mode: 'tree'
};
var v2template = {
    'data': {},
    'error': [],
    'success': true
};
var v4template = {
    'code': '0000',
    'data': {},
    'msg': '',
    'success': true
};

window.onload = function() {
    var preDataGenerator = new JSONEditor(document.getElementById('preDataGenerator'), options, v4template);
    var postDataGenerator = new JSONEditor(document.getElementById('postDataGenerator'), options, v4template);
    $('.addApi').off('click').on('click', function() {
        var mockEditorModal = $('#mockEditorModal');
        mockEditorModal.find('input').val('');
        $('#apiPath').trigger('input');
        preDataGenerator.set(v4template);
        postDataGenerator.set(v4template);
        mockEditorModal.modal('show');
    });
    $('#apiPath').off('input').on('input', function() {
        var apiPath = $(this).val();
        if (apiPath.length) {
            $('.modal-header').removeClass('hide');
            $('#mockEditorModalLabel').text(apiPath);
        } else {
            $('.modal-header').addClass('hide');
        }
    });
    $('.selectTemplate').off('click').on('click', function() {
        var target = $(this).data('target');
        var version = $(this).data('version');
        var generator = null;
        if (target === 'pre') {
            generator = preDataGenerator;
        } else if (target === 'post') {
            generator = postDataGenerator;
        }
        if (generator === null) return;
        switch (version) {
            case 'v2': {
                generator.set(v2template);
                return;
            }
            case 'v4': {
                generator.set(v4template);
                return;
            }
        }
    });
    $('#submit').off('click').on('click', function() {
        var id = $('form input[name=id]').val();
        var form = $('form');
        if (id) {
            var data = {
                title: form.find('input#title').val(),
                apiPath: form.find('input#apiPath').val(),
                method: form.find('select#method').val(),
                description: form.find('textarea#description').val(),
                preDataGenerator: JSON.stringify(preDataGenerator.get()),
                postDataGenerator: JSON.stringify(postDataGenerator.get())
            }
            $.ajax({
                url: '/mock/api/v1/api/' + id,
                method: 'put',
                data: data
            }).done(function(res) {
                debugger;
            })
        } else {
            $.ajax({
                url: '/mock/api/v1/api/',
                method: 'post',
                data: $('form').serialize()
            }).done(function(res) {
                if (res.success) {
                    $.ajax({
                        url: '/mock/api/v1/api/' + res.result.id,
                        method: 'put',
                        data: {
                            preDataGenerator: JSON.stringify(preDataGenerator.get()),
                            postDataGenerator: JSON.stringify(postDataGenerator.get())
                        }
                    }).done(function(res) {
                        debugger;
                    })
                }
            }).fail(function(xhr, status, err) {
                debugger;
            })
        }
    });
    $('.editApi').off('click').on('click', function() {
        var id = $(this).data('id');
        $.ajax({
            url: '/mock/api/v1/api/' + id,
            method: 'get'
        }).done(function(res) {
            var api = res.result.api;
            var mockEditorModal = $('#mockEditorModal');
            mockEditorModal.find('input#title').val(api.title);
            mockEditorModal.find('input#apiPath').val(api.apiPath).attr('disabled', 'disabled');
            $('#apiPath').trigger('input');
            mockEditorModal.find('select#method').val(api.method);
            mockEditorModal.find('textarea#description').val(api.description);
            preDataGenerator.set(api.preDataGenerator);
            postDataGenerator.set(api.postDataGenerator);
            $('form input[name=id]').val(id);
            mockEditorModal.modal('show');
        });
    })
};