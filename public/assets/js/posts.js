
// 获取文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        console.log(res);
        var html = template('postsTpl', res);
        $('tbody').html(html)
        // 分页
        var page = template('pageTpl', res);
        $('ul.pagination').html(page);

    }
})
// 格式化日期
function dateFormat(date) {
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}


// 分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data : {page: page},
        success: function (res) {
            console.log(res);
            var html = template('postsTpl', res);
            $('tbody').html(html)
            // 分页
            var page = template('pageTpl', res);
            $('ul.pagination').html(page);

        }
    })
}
// 获取并渲染分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('categoryTpl', {data: res});
        $('#categoryBox').html(html)
    }
})

// 
$('#filterForm').on('submit', function() {
    // 收集表单数据
    var formData = $(this).serialize();
    console.log(formData);
    
    // 发送请求
    // 获取列表
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (res) {
            console.log(res);
            var html = template('postsTpl', res);
            $('tbody').html(html)
            // 分页
            var page = template('pageTpl', res);
            $('ul.pagination').html(page);

        }
    })
    return false;
})
