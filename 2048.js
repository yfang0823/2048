const log = function() {
    console.log.apply(console, arguments)
}

// 初始化html表格
const load = function() {
    log('load')
    $('table').find('span').text('1024')
}

load()

// 从html中读出表格数字到数组
const loadTable = function() {
    var array = []
    var spans = $('table').find('span')
    var size = 4
    var rows = spans.length / size
    var cols = rows
    for (let i = 0; i < rows; i++) {
        var arr = []
        for (let j = 0; j < cols; j++) {
            var index = i * cols + j
            arr.push(spans[index].innerText)
        }
        array.push(arr)
    }
    log('array', array)
    return array
}

// 将数组赋值给html表格
const saveTable = function(array) {
    var rows = array.length
    var cols = array[0].length
    
}

// 向右相加
const rightPlus = function(array) {

}
