var startX
var startY
var endX
var endY

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
    log('direction', d)
    if(d != '') {
        generateNewCell()
        updateScore()
        if(judgeFull() == true) {
            // judgeGame()
        }
    }
})

const judgeDirection = function(startX, startY, endX, endY) {
    var dx = endX - startX
    var dy = endY - startY
    // log('dx ', dx, 'dy', dy)
    if(Math.abs(dx) >= Math.abs(dy)) {
        if(dx > 30) {
            handleRight()
            return 'right'
        }else if(dx < -30) {
            handleLeft()
            return 'left'
        }
    }else {
        if(dy > 30) {
            handleDown()
            return 'down'
        }else if(dy < -30) {
            handleUp()
            return 'up'
        }
    }
    return ''
}

const randomCell = function(number) {
    var num = Math.random() * number
    num = Math.floor(num)
    return num
}

const randomNum = function(array) {
    var length = array.length
    var index = Math.random() * length
    index = Math.floor(index)
    return array[index]
}

const generateNewCell = function() {
    if(judgeFull() == true) {
        return
    }
    var done = false
    var length = 4
    var size = length * length
    var array = [2, 4]
    var num = randomNum(array)
    var spans = $('table').find('span')
    while(!done) {
        var pos = randomCell(size)
        // log('generating...', pos, spans[pos].innerText)
        if(spans[pos].innerText == '') {
            spans[pos].innerText = num
            done = true
        }
    }
    log('generated', pos, spans[pos].innerText)
}

const updateScore = function() {
    $('#id-score-now').text(score)
}

const judgeFull = function() {
    var spans = $('table').find('span')
    for (var i = 0; i < spans.length; i++) {
        if(spans[i].innerText == '') {
            return false
        }
    }
    return true
}

const judge = function(array, i, j, num) {
    if(i < 0 || i >= array.length) {
        return false
    }
    if(j < 0 || j >= array[0].length) {
        return false
    }
    return array[i][j] == num
}

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

const judgeGame = function() {
    // log('GameJudge')
    var arr = loadTable()
    var rows = arr.length
    var cols = arr[0].length
    for (var i = 0; i < rows; i++) {
        for (var j = 0; i < cols; j++) {
            if(judgeCell(arr, i, j) == true) {
                return true
            }
        }
    }
    log('game over!')
    return false
}
