// hack for http://zty.pe/

// inject control button
var container = document.createElement('DIV')
container.setAttribute('id', 'hack-container')
container.style.width='50px'
container.style.height='30px'
container.style.position='fixed'
container.style.top='50%'
container.style.marginTop='-15px'
container.style.marginLeft='250px'
container.style.left='50%'
var hackBtn = document.createElement("BUTTON")
hackBtn.setAttribute('id', 'hack-btn')
hackBtn.innerHTML = 'Start'

var body = document.getElementsByTagName('body')[0]
body.appendChild(hackBtn)

hackBtn.addEventListener('click', toggleStatus, false)

function toggleStatus() {
    if (stopHack) {
        hackBtn.innerHTML = 'Stop'
        stopHack = false
    } else {
        hackBtn.innerHTML = 'Start'
        stopHack = true
    }
}

var stopHack = true;
// 0:模拟手速, 1: 零失误
var mode = 0;

var findWords = function() {
    var targets = ig.game.targets,
        words = [],
        i;

    for (var k in targets) {
        if (targets.hasOwnProperty(k)) {
            if (targets[k].length) {
                words.push(targets[k][0].word)
            }
        }
    }

    return words;
}

var shootWord = function(word) {
    var i = 0;
    for (i = 0; i < word.length; i++) {
        ig.game.shoot(word[i].toLowerCase())
    }
}


// delay是为了更好的实现射击效果
var shootWordDelay = function shootWordDelay (word, delay, index) {
    if (index == undefined){
        index = 0
    }
    ig.game.shoot(word[index].toLowerCase())
    if (index < word.length - 1) {
        setTimeout(function () {
            shootWordDelay(word, delay, index+1)
        }, delay)
    }
}

var hack = function() {
    var i = 0;
    if (ig.game.mode == 1 && !stopHack) {
        var words = findWords()
        var word = words.pop()
        while (typeof word !== 'undefined') {
            if (mode == 0) {
                shootWordDelay(word, 100)
            } else if (mode == 1) {
                shootWord(word);
            }
            word = words.pop()
        }
        window.setTimeout(hack, 100)
    } else {
        window.setTimeout(hack, 1000);
    }
}

hack()