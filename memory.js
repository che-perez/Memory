var memoryArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];

var memoryVal = [];
var memoryCrdsId = [];
var crdsFlipp = 0;
Array.prototype.memoryCrdsShuffle = function() {
    var i = this.length, j, temp;
    while(--i > 0) {
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard() {
    crdsFlipp = 0;
    var output = '';
    memoryArray.memoryCrdsShuffle();
    for(var i = 0; i < memoryArray.length; i++) {
        output += '<div id="crds'+i+'" onclick="memoryFlippCrds(this,\''+memoryArray[i]+'\')"></div>';
    }
    
    document.getElementById('memoryBoard').innerHTML = output;
    document.getElementById('theme').play();
}

function memoryFlippCrds(crds,val) {
    if(crds.innerHTML == "" && memoryVal.length < 2) {
        crds.style.background = '#ff4949';
        crds.innerHTML = val;
        crds.style.color = '#fff';
        if(memoryVal.length == 0) {
            memoryVal.push(val);
            memoryCrdsId.push(crds.id);
        } else if (memoryVal.length == 1) {
            memoryVal.push(val);
            memoryCrdsId.push(crds.id);
            if(memoryVal[0] == memoryVal[1]) {
                document.getElementById("coin").play();
                crdsFlipp += 2;
                
                memoryVal = [];
                memoryCrdsId = [];
                
                if(crdsFlipp == memoryArray.length) {
                    alert("You WON!!!  Press OK to play again.");
                    document.getElementById('memoryBoard').innerHTML = "";
                    newBoard();
                }
                
            } else {
                
                function flipBack() {
                    var crds1 = document.getElementById(memoryCrdsId[0]);
                    var crds2 = document.getElementById(memoryCrdsId[1]);
                    crds1.style.background = 'url(img/Block.png) no-repeat';
                    crds1.innerHTML = "";
                    crds2.style.background = 'url(img/Block.png) no-repeat';
                    crds2.innerHTML = "";
                    
                    memoryVal = [];
                    memoryCrdsId = [];
                }
                
                setTimeout(flipBack, 700);
            }
        }
    }
}

window.onload = newBoard;