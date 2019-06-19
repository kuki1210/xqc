const uttr = new SpeechSynthesisUtterance();

var complete = false;
var spinning = [0,0,0]
var slot = [
  document.getElementById('slot_first'),
  document.getElementById('slot_second'),
  document.getElementById('slot_third')
];
var interval = [-1,-1,-1];

function click(){
  if(complete == false){
    if(spinning[0]==0 && spinning[1]==0 && spinning[2]==1){
      stopSpinning(2);
      if(slot[0].innerText == 'X' && slot[1].innerText == 'Q' && slot[2].innerText == 'C'){
        xqc();
      }
    }
    else if(spinning[0]==0 && spinning[1]==1 && spinning[2]==1){
      stopSpinning(1);
    }
    else if(spinning[0]==1 && spinning[1]==1 && spinning[2]==1){
      stopSpinning(0);
    }
    else if(spinning[0]==0 && spinning[1]==0 && spinning[2]==0){
      startSpinning(0);
      startSpinning(1);
      startSpinning(2);
    }
  }
}

function startSpinning(pos){
  interval[pos] = setInterval(function(){
    slot[pos].innerText = getRandomLetter();
  },10);
  spinning[pos] = 1;
}

function stopSpinning(pos){
  animStartRU(document.getElementById('area'))
  speechSynthesis.cancel();
  var audionum = Math.floor(Math.random()*16);
  slot[pos].className = 'letter anton shake';
  animStartRU(slot[pos]);
  new Audio('./audio/' + audionum + '.mp3').play();
  clearInterval(interval[pos]);
  spinning[pos] = 0;
  document.body.className = "flash";
  animStartRU(document.body);
}

function getRandomLetter(){
  var rand = Math.floor(Math.random()*26);
  var ascii = rand + 65;
  return String.fromCharCode(ascii);
}

function animStartRU(elem){
  if(!elem) return
  var p = elem.parentElement
  var dummy = document.createElement("span")
  p.replaceChild(dummy, elem)
  p.replaceChild(elem, dummy)
}

function xqc(){
  new Audio('./audio/VI31T98guV4P.128.mp3').play();
  document.getElementById('area').className = 'area rainbow';
  animStartRU(document.body);
  complete = true;
}

function muteAudio(){
  mute();
  document.getElementById('mute').className = 'disabled anton';
}
