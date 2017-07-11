var errorModalDialog = $('#errorModal');
errorModalDialog.on('hidden.bs.modal', function() {
    errorModalDialog.find('.modal-header .modal-title').text('');
    errorModalDialog.find('.modal-header').addClass('hide');
});
function errorModal(errorMessage, errorTitle, autoClose, delay) {
    autoClose = autoClose || false;
    delay = delay || 0;
    if (errorTitle) {
        errorModalDialog.find('.modal-header .modal-title').text(errorTitle);
        errorModalDialog.find('.modal-header').removeClass('hide');
    }
    errorModalDialog.find('.modal-body').html(errorMessage);
    errorModalDialog.modal('show');
}