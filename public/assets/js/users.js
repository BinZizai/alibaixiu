
// 1 获取用户
reload()
function reload() {
    $.ajax({
        type: 'get',
        url: '/users',
        success: function (res) {
            // 拼接模板
            var html = template('usersTpl', { data: res })
            $('tbody').html(html)
            // console.log(html);

        }
    })
}

// 2 添加用户
$('#userForm').on('submit', function () {
    // 获取表单信息
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function (res) {
            reload();
        }
    })

    return false;  //兼容性强
})

// 3 用户选择文件上传
$('#modifyBOx').on('change', '#avatar', function () {
    var fd = new FormData();
    fd.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        // jq默认传的是一个对象， 会转换成key=value格式
        processData: false,
        contentType: false,
        data: fd,
        success: function (res) {
            // 展现图片
            $('#preview').attr('src', res[0].avatar);
            // 隐藏ipnut赋值 val 实现地址上传
            $('#hiddenAvatar').val(res[0].avatar);

        }
    })
})

// 4 呈现修改用户页面
$('tbody').on('click', '.edit', function () {
    // 获取用户id
    var id = $(this).attr('data-id');

    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (res) {
            console.log(res);
            var html = template('modifyTpl', res);
            $('#modifyBOx').html(html);
        }
    })
})

// 5 提交用户修改
$('#modifyBOx').on('submit', '#userForm', function () {
    // 自动收集表单对象
    var fd = $(this).serialize();
    console.log(fd);

    //id
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: fd,
        success: function (res) {
            location.reload()
        }
    })

    // 阻止默认行为
    return false;
})

// 6 删除功能 事件委托
$('tbody').on('click', '.del', function () {
    if (confirm('确定要删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (res) {
                reload();
            }
        })
    }

})

// 7 全选全不选
$('#checkAll').on('change', function () {
    var isCheckAll = $(this).prop('checked');
    $('tbody input[type="checkbox"]').prop('checked', isCheckAll);
    // 显示或隐藏 批量删除按钮
    if (isCheckAll) {
        $('.deleteMany').show();
    } else {
        $('.deleteMany').hide();
    }
})

$('tbody').on('change', 'input[type="checkbox"]', function () {
    if ($('tbody input[type="checkbox"]').length == $('tbody input[type="checkbox"]:checked').length) {
        $('#checkAll').prop('checked', true)
    } else {
        $('#checkAll').prop('checked', false)
    }
    // 显示或隐藏 批量删除按钮
    if ($('tbody input[type="checkbox"]:checked').length > 1) {
        $('.deleteMany').show();
    } else {
        $('.deleteMany').hide();
    }
})

// 8 批量删除
$('.deleteMany').on('click', function () {
    // 被选择的input
    var checkedList = $('tbody input[type="checkbox"]:checked');
    // 拼接请求id
    var str = '';
    checkedList.each(function (i, ele) {
        str += $(ele).attr('data-id') + '-';
    })
    str = str.substr(0, str.length - 1);
    // 发送删除请求
    $.ajax({
        type: 'delete',
        url: '/users/'+ str,
        success: function(res) {
            console.log(res);
            
            reload();
        }
    })

})





