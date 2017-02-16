const log = function() {
    console.log.apply(console, arguments)
}

var score = 0
var record = 0
var paths = []

const copyArray = function(array) {
    var arr = JSON.stringify(array)
    return JSON.parse(arr)
}

// 根据滑动方向调用不同的相加函数
const handleDirection = function(direction) {
    var d = direction
    var array = loadTable()
    var arr = copyArray(array)
    paths.push(arr)
    $('.cheat').removeClass('disabled')
    var changed = false
    if(d == 'right'){
        changed = handleRight(array)
    }else if(d == 'left'){
        changed = handleLeft(array)
    }else if(d == 'down'){
        changed = handleDown(array)
    }else if(d == 'up'){
        changed = handleUp(array)
    }else {
        // 滑动方向错误
    }
    if(score > record) {
        record = score
    }
    if(changed == true) {
        saveTable(array)
        saveGame()
    }
    return changed
}

const handleRight = function(array) {
    return rightPlus(array)
}

const handleLeft = function(array) {
    return leftPlus(array)
}

const handleUp = function(array) {
    return upPlus(array)
}

const handleDown = function(array) {
    return downPlus(array)
}

// 向右滑动相加
const rightPlus = function(array) {
    var rows = array.length
    var cols = array[0].length
    var changed = false
    for (let i = 0; i < rows; i++) {
        for (let j = cols - 2; j >= 0; j--) {
            if(array[i][j] != 0) {
                rightPlusCell(array, i, j)
                if(array[i][j] == 0) {
                    changed = true
                }
            }
        }
    }
    return changed
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
            score += array[i][j] * 2
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
    var changed = false
    for (let i = 0; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if(array[i][j] != 0) {
                leftPlusCell(array, i, j)
                if(array[i][j] == 0) {
                    changed = true
                }
            }
        }
    }
    log('left change ? ', changed)
    return changed
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
            score += array[i][j] * 2
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
    var changed = false
    for (let i = 1; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if(array[i][j] != 0) {
                upPlusCell(array, i, j)
                if(array[i][j] == 0) {
                    changed = true
                }
            }
        }
    }
    return changed
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
            score += array[i][j] * 2
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
    var changed = false
    for (let i = rows - 2; i >= 0; i--) {
        for (let j = 0; j < cols; j++) {
            if(array[i][j] != 0) {
                downPlusCell(array, i, j)
                if(array[i][j] == 0) {
                    changed = true
                }
            }
        }
    }
    return changed
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
            score += array[i][j] * 2
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
