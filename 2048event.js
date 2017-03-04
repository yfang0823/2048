var startX
var startY
var endX
var endY

var data = {
    "table": [],
    "score": '',
    "record": '',
}

const saveGame = function() {
    var arr = loadTable()
    data.table = arr
    data.score = String(score)
    data.record = String(record)
    localStorage.game = JSON.stringify(data)
}

$('table').on('touchstart', function(event){
    startX = event.touches[0].pageX
    startY = event.touches[0].pageY
    // log('touchstart', startX, startY)
})

$('table').on('touchmove', function(event){
    // 禁止屏幕滚动
    event.preventDefault()
})

$('table').on('touchend', function(event){
    endX = event.changedTouches[0].pageX
    endY = event.changedTouches[0].pageY
    // log('touchend', endX, endY)
    var d = judgeDirection(startX, startY, endX, endY)
    var changed = false
    if(d != '') {
        changed = handleDirection(d)
    }
    // log('table changed ? ', changed)
    if(changed == true) {
        generateNewCell()
        updateScore()
        saveGame()
        var success = judgeSuccess()
        // log('success ? ', success)
        var full = judgeFull()
        if(full == true) {
            judgeEnd(success)
        }
    }
})

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
    var array = [2, 2, 2, 4]
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
