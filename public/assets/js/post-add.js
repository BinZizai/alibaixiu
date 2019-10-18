
//获取文章分类

$.ajax({
    type: 'get',
    url:'/categories',
    success: function(res) {
        console.log(res);
        var html = template('categoryTpl', {data:res})
        $('#category').html(html)
        
    }
})

// 图片上传
$('#feature').on('change', function() {
    var fd = new FormData();
    fd.append( 'avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        processData:false,
        contentType: false,
        data: fd,
        success: function(res){
            console.log(res);
            $('.thumbnail').attr('src', res[0].avatar).show();
            $('#thumbnail').val(res[0].avatar);
        }
    })
})

// 添加文章
$('#addForm').on('submit', function() {
    $.ajax({
        type: 'post',
        url: '/posts',
        data: $(this).serialize(),
        success: function(res) {
            console.log(res);
            
            // location.href = 'posts.html';
        }
    })
})