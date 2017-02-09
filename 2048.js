const log = function() {
    console.log.apply(console, arguments)
}

// 初始化html表格
const load = function() {
    log('load')
    $('table').find('span').text('2')
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
            var c = spans[index].innerText
            if(c != '') {
                var number = parseInt(spans[index].innerText)
            }else {
                var number = 0
            }
            arr.push(number)
        }
        array.push(arr)
    }
    log('array', array)
    return array
}

const testArray = [
    [2, 2, 2, 2],
    [2, 2, 2, 0],
    [2, 2, 0, 0],
    [2, 0, 0, 0],
]

// 将数组赋值给html表格
const saveTable = function(array) {
    var rows = array.length
    var cols = array[0].length
    var spans = $('table').find('span')
    for (let i = 0; i < rows; i++) {
        // var arr = array[i]
        for (let j = 0; j < cols; j++) {
            var index = i * cols + j
            if(array[i][j] != 0){
                spans[index].innerText = array[i][j]
            }else {
                spans[index].innerText = ''
            }
        }
    }
}

// 向右相加
const rightPlus = function(array) {
    var rows = array.length
    var cols = array[0].length
    for (let i = 0; i < rows; i++) {
        for (let j = cols - 1; j > 0; j--) {
            if((array[i][j] == array[i][j - 1]) && (array[i][j] != 0)) {
                array[i][j] += array[i][j - 1]
                array[i][j - 1] = 0
              }
        }
    }
    return array
}

var test = function() {
    saveTable(testArray)
    var array = loadTable()
    // rightPlus(array)
    saveTable(array)
}

test()
