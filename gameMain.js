/*
  游戏主控
*/

// 判断触屏滑动方向
const judgeDirection = function(startX, startY, endX, endY) {
    var dx = endX - startX
    var dy = endY - startY
    if(Math.abs(dx) >= Math.abs(dy)) {
        if(dx > 30) {
            return 'right'
        }else if(dx < -30) {
            return 'left'
        }
    }else {
        if(dy > 30) {
            return 'down'
        }else if(dy < -30) {
            return 'up'
        }
    }
    return ''
}

// 生成随机位置
const randomCell = function(number) {
    var num = Math.random() * number
    num = Math.floor(num)
    return num
}

// 生成随机数字
const randomNum = function(array) {
    var length = array.length
    var index = Math.random() * length
    index = Math.floor(index)
    return array[index]
}

// 在随机位置填充随机数字
const generateNewCell = function() {
    if(judgeFull() == true) {
        return
    }
    var done = false
    var length = 4
    var size = length * length
    var array = [2, 2, 2, 2, 4]
    var num = randomNum(array)
    var spans = $('table').find('span')
    while(!done) {
        var pos = randomCell(size)
        if(spans[pos].innerText == '') {
            spans[pos].innerText = num
            var className = 'n' + num
            // 添加字体class
            spans[pos].classList.add(className)
            var newClass = 'new-one'
            spans[pos].classList.add(newClass)
            done = true
        }
    }
    // log('generated', pos, spans[pos].innerText)
}

// 更新分数
const updateScore = function() {
    $('#id-score-now').text(String(score))
    $('#id-score-record').text(String(record))
}

// 判断是否赢了
const judgeSuccess = function() {
    var spans = $('table').find('span')
    for (var i = 0; i < spans.length; i++) {
        var text = spans[i].innerText
        if(text == '2048') {
            $('.success').text('2048！，可以了')
            return true
        }else if(text == '4096') {
            $('.success').text('4096！，上天了')
            return true
        }
    }
    return false
}

// 判断是否所有格子被填满
const judgeFull = function() {
    var spans = $('table').find('span')
    for (var i = 0; i < spans.length; i++) {
        if(spans[i].innerText == '') {
            return false
        }
    }
    return true
}

// 判断单元格i, j的数字是否与num相等
const judge = function(array, i, j, num) {
    if(i < 0 || i >= array.length) {
        return false
    }
    if(j < 0 || j >= array[0].length) {
        return false
    }
    return array[i][j] == num
}

// 判断单元格i, j与相邻单元格内容是否有相等
const judgeCell = function(array, i, j) {
    var num = array[i][j]
    if(judge(array, i - 1, j, num) == true) {
        return true
    }
    if(judge(array, i + 1, j, num) == true) {
        return true
    }
    if(judge(array, i, j - 1, num) == true) {
        return true
    }
    if(judge(array, i, j + 1, num) == true) {
        return true
    }
}

// 判断游戏是否结束
const judgeEnd = function(success) {
    // log('GameJudge')
    var arr = loadTable()
    var rows = arr.length
    var cols = arr[0].length
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if(judgeCell(arr, i, j) == true) {
                return true
            }
        }
    }
    if(success == true) {
        $('.success').text('2048！然而游戏结束了')
    }else {
        $('.fail').text('小朋友你输了')
    }
    return false
}

const clearTable = function() {
    var zeroArr = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]
    saveTable(zeroArr)
}

const clearText = function() {
    $('.success').text('')
    $('.fail').text('')
}

const clearScore = function() {
    $('#id-score-now').text('0')
    score = 0
}

const clearPaths = function() {
    paths = []
    $('.cheat').addClass('disabled')
}

// localStorage缓存数据结构
var data = {
    "table": [],
    "score": '',
    "record": '',
}

// 保存游戏
const saveGame = function() {
    var arr = loadTable()
    data.table = arr
    data.score = String(score)
    data.record = String(record)
    localStorage.game = JSON.stringify(data)
}

const newGame = function() {
    clearTable()
    clearText()
    clearScore()
    clearPaths()
    gameInit()
    saveGame()
}

const cheatGame = function() {
    var length = paths.length
    if(length > 0) {
        var last = length - 1
        var lastTable = paths[last].table
        var lastScore = paths[last].score
        score = parseInt(lastScore)
        paths.splice(last, 1)
        // log('cheat! ', paths.length, lastTable, lastScore)
        saveTable(lastTable)
        updateScore()
        saveGame()
        if(paths.length == 0) {
            $('.cheat').addClass('disabled')
        }
    }else {
        // log('no cheat path! ')
    } 
}
