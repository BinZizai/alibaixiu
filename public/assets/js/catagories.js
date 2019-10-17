
// 获取分类
reload() 
function reload() {
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function (res) {
            var html = template('listTpl', { data: res })
            $('tbody').html(html)

        }
    })
}

// 添加分类
$('#addCategory').on('submit', function () {

    $.ajax({
        type: 'post',
        url: '/categories',
        data: $(this).serialize(),
        success: function (res) {
            reload()     
        }
    })
    return false;
})

// 获取修改分类页面

$('tbody').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (res) {
            var html = template('modifyTpl', res)
            $('#formBox').html(html)
        }
    })
})
// 修改分类
$('#formBox').on('submit', '#addCategory', function() {
    var id = $(this).attr('data-id');
       
    $.ajax({
        
        type: 'put',
        url: '/categories/' + id,
        data: $(this).serialize(),
        success: function (res) {
            location.reload()
        }
    })
    return false;
})

//  删除功能 事件委托
$('tbody').on('click', '.delete', function () {
    if (confirm('确定要删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function (res) {
                reload();
            }
        })
    }

})
// 全选 全不选

// 批量删除
$('.deleteMany').on('click', function() {
    // 获取选中的项目
    var checkedList = $('tbody input[type="checked"]:checked')
    console.log(checkedList);
    // 拼接id
    var str = '';
    checkedList.each(function(i, ele) {

    })
    
    $.ajax({})
    
})
