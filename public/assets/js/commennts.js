
// 获取评论列表
reload()
function reload() {
    $.ajax({
        type: 'get',
        url: '/comments',
        success: function (res) {
            console.log(res);
            var html = template('commentsTpl', res);
            $('tbody').html(html);
            //
            var page = template('pageTpl', res)
            $('.pagination').html(page)
        }
    })
}

function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';

}
// 分页

function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: { page: page },
        success: function (res) {
            console.log(res);
            var html = template('commentsTpl', res);
            $('tbody').html(html);
            //
            var page = template('pageTpl', res)
            $('.pagination').html(page)
        }
    })
}

// 批准 驳回

$('tbody').on('click', '.status', function () {
    //  
    var id = $(this).parent().attr('data-id');
    var status = $(this).parent().attr('data-status');
    var page = $(this).parent().attr('page');
  
    //  
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: { state: status == 1 ? 0 : 1 },
        success: function (res) {
            changePage(page)
        }
    })
})

// 删除
$('tbody').on('click', '.delete', function() {
    if (confirm('确定要删除么？')) {
        var id = $(this).parent().attr('data-id');
        var page = $(this).parent().attr('page');
        $.ajax({
            type: 'delete',
            url: `/comments/${id}`,
            success: function(res){
                changePage(page)
            }
        })
    }
})