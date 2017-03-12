const log = function() {
    console.log.apply(console, arguments)
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
    return array
}

// 将数组赋值给html表格
const saveTable = function(array) {
    var rows = array.length
    var cols = array[0].length
    var spans = $('table').find('span')
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            var t = array[i][j]
            var index = i * cols + j
            // 清空字体class
            spans[index].classList = ''
            if(t != 0){
                var num = Math.abs(t)
                spans[index].innerText = num
                var className = 'n' + num
                // 添加字体class
                spans[index].classList.add(className)
                if(t < 0) {
                    console.log('before merge: ', t, spans[index].classList)
                    var animation = 'merge-one'
                    spans[index].classList.add(animation)
                    console.log('after merge: ', t, spans[index].classList)
                }
            }else {
                spans[index].innerText = ''
            }
        }
    }
}
