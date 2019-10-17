$('#modifyForm').on('submit', function() {
    $(this).serialize();

    $.ajax({
        type: 'put',
        url: '/users/password',
        data: $(this).serialize(),
        success: function(res) {
            location.href = 'login.html';
        }
    })
})