$('#logout').on('click', function () {
    var isConfirm = confirm('你确定要推出登录？')
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function (res) {
                // 跳转页面
                location.href = 'login.html'
            }
        })
    }
})