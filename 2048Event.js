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
    judgeDirection(startX, startY, endX, endY)
    generateNewCell()
    updateScore()
})

const judgeDirection = function(startX, startY, endX, endY) {
    var dx = endX - startX
    var dy = endY - startY
    // log('dx ', dx, 'dy', dy)
    if(Math.abs(dx) >= Math.abs(dy)) {
        if(dx > 30) {
            handleRight()
        }else if(dx < -30) {
            handleLeft()
        }
    }else {
        if(dy > 30) {
            handleDown()
        }else if(dy < -30) {
            handleUp()
        }
    }
}

var randomCell = function(number) {
    var num = Math.random() * number
    num = Math.floor(num)
    return num
}

var randomNum = function(array) {
    var length = array.length
    var index = Math.random() * length
    index = Math.floor(index)
    return array[index]
}

var generateNewCell = function() {
    var done = false
    var length = 4
    var size = length * length
    var array = [2, 4]
    var spans = $('table').find('span')
    while(!done) {
        var pos = randomCell(size)
        if(spans[pos].innerText == '') {
            var num = randomNum(array)
            spans[pos].innerText = num
            done = true
        }
    }
}

var updateScore = function() {
    $('#id-score-now').text(score)
}
