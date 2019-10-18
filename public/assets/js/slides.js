// 获取轮播图片
reload()
function reload() {
    $.ajax({
        type: 'get',
        url: '/slides',
        success: function (res) {
            console.log(res);
            var html = template('slidesTpl', { data: res });
            $('tbody').html(html)
        }
    })
}

// 添加轮播图
$('#slidesForm').on('submit', function () {
   
    
    $.ajax({
        type: 'post',
        url: '/slides',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            reload()
        }
    })

    return false;
})


// 添加图片

$('#file').on('change', function () {
    var fd = new FormData();
    fd.append('image', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
            // 预览图片
            $('img.thumbnail').attr('src', res[0].image).show();
            // 把图片路径存到隐藏域里
            $('#image').val(res[0].image)
        }
    })
})

// 删除
$('tbody').on('click', '.delete', function() {
    var id = $(this).attr('data-id');

    $.ajax({
        type: 'delete',
        url: '/slides/' + id,
        success: function(res) {
            reload()
        }
    })
})


