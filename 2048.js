const log = function() {
    console.log.apply(console, arguments)
}

// 初始化html表格
const load = function() {
    log('load')
    $('table').find('span').text('2')
}

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
                spans[index].innerText = Math.abs(array[i][j])
            }else {
                spans[index].innerText = ''
            }
        }
    }
}

// 向右滑动相加
const rightPlus = function(array) {
    var rows = array.length
    var cols = array[0].length
    for (let i = 0; i < rows; i++) {
        for (let j = cols - 2; j >= 0; j--) {
            if(array[i][j] != 0) {
                rightPlusCell(array, i, j)
            }
        }
    }
}

// 单元格向右滑动相加
// 1, 若遇到 0, 则跳过继续
// 2, 若遇到数字, 则判断是否能相加
// 3, 若能相加，则相加后，原单元格置 0，新值 *= -1，避免多次相加
// 4, 若不能相加，并且单元格需要移动，则将原单元格移至遇到的数字前一格并将原单元格置 0
// 5，若滑动到底无数字，则将单元格移至最右端，原单元格置 0
const rightPlusCell = function(array, i, j) {
    var cols = array[0].length
    var k = j + 1
    while(k < cols) {
        if(array[i][k] == 0) {
            k++
        }else if(array[i][j] == array[i][k]) {
            array[i][k] *= -2
            array[i][j] = 0
            return
        }else if(k - 1 != j){
            array[i][k - 1] = array[i][j]
            array[i][j] = 0
            return
        }else {
            return
        }
    }
    if(k >= cols) {
        array[i][cols - 1] = array[i][j]
        array[i][j] = 0
    }
}

// 向左滑动相加
const leftPlus = function(array) {
    var rows = array.length
    var cols = array[0].length
    for (let i = 0; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if(array[i][j] != 0) {
                leftPlusCell(array, i, j)
            }
        }
    }
}

// 单元格向左滑动相加
// 1, 若遇到 0, 则跳过继续
// 2, 若遇到数字, 则判断是否能相加
// 3, 若能相加，则相加后，原单元格置 0，新值 *= -1，避免多次相加
// 4, 若不能相加，并且单元格需要移动，则将原单元格移至遇到的数字前一格并将原单元格置 0
// 5，若滑动到底无数字，则将单元格移至最左端，原单元格置 0
const leftPlusCell = function(array, i, j) {
    var cols = array[0].length
    var k = j - 1
    while(k >= 0) {
        if(array[i][k] == 0) {
            k--
        }else if(array[i][j] == array[i][k]) {
            array[i][k] *= -2
            array[i][j] = 0
            return
        }else if(k + 1 != j){
            array[i][k + 1] = array[i][j]
            array[i][j] = 0
            return
        }else {
            return
        }
    }
    if(k <= 0) {
        array[i][0] = array[i][j]
        array[i][j] = 0
    }
}

// 向上滑动相加
const upPlus = function(array) {
    var rows = array.length
    var cols = array[0].length
    for (let i = 1; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if(array[i][j] != 0) {
                upPlusCell(array, i, j)
            }
        }
    }
}

// 单元格向上滑动相加
// 1, 若遇到 0, 则跳过继续
// 2, 若遇到数字, 则判断是否能相加
// 3, 若能相加，则相加后，原单元格置 0，新值 *= -1，避免多次相加
// 4, 若不能相加，并且单元格需要移动，则将原单元格移至遇到的数字前一格并将原单元格置 0
// 5，若滑动到底无数字，则将单元格移至最上端，原单元格置 0
const upPlusCell = function(array, i, j) {
    var rows = array.length
    var k = i - 1
    while(k >= 0) {
        if(array[k][j] == 0) {
            k--
        }else if(array[i][j] == array[k][j]) {
            array[k][j] *= -2
            array[i][j] = 0
            return
        }else if(k + 1 != i){
            array[k + 1][j] = array[i][j]
            array[i][j] = 0
            return
        }else {
            return
        }
    }
    if(k <= 0) {
        array[0][j] = array[i][j]
        array[i][j] = 0
    }
}

// 向下滑动相加
const downPlus = function(array) {
    var rows = array.length
    var cols = array[0].length
    for (let i = rows - 2; i >= 0; i--) {
        for (let j = 0; j < cols; j++) {
            if(array[i][j] != 0) {
                downPlusCell(array, i, j)
            }
        }
    }
}

// 单元格向下滑动相加
// 1, 若遇到 0, 则跳过继续
// 2, 若遇到数字, 则判断是否能相加
// 3, 若能相加，则相加后，原单元格置 0，新值 *= -1，避免多次相加
// 4, 若不能相加，并且单元格需要移动，则将原单元格移至遇到的数字前一格并将原单元格置 0
// 5，若滑动到底无数字，则将单元格移至最下端，原单元格置 0
const downPlusCell = function(array, i, j) {
    var rows = array.length
    var k = i + 1
    while(k < rows) {
        if(array[k][j] == 0) {
            k++
        }else if(array[i][j] == array[k][j]) {
            array[k][j] *= -2
            array[i][j] = 0
            return
        }else if(k - 1 != i){
            array[k - 1][j] = array[i][j]
            array[i][j] = 0
            return
        }else {
            return
        }
    }
    if(k >= rows) {
        array[rows - 1][j] = array[i][j]
        array[i][j] = 0
    }
}

const testArray = [
    [0, 2, 0, 2],
    [2, 0, 2, 2],
    [2, 2, 0, 2],
    [2, 0, 2, 0],
]

var test = function() {
    saveTable(testArray)
    var array = loadTable()
    rightPlus(array)
    leftPlus(array)
    upPlus(array)
    downPlus(array)
    saveTable(array)
}

test()
