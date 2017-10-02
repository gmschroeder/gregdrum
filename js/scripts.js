var ctx = new (window.AudioContext || window.webkitAudioContext)();

var tapper = document.getElementById("strike");

var now;
var osc;
var gainNode;

tapper.addEventListener('click', function( evt ) {
    osc = ctx.createOscillator();
    osc.type = 'sawtooth';


    var scale = {
        'c': 261,
        'd': 293.665,
        'e': 329.628,
        'g': 392,
        'a': 440,
        'c2': 523.251
    }

    var keySize = window.innerHeight / 6;


    if (evt.screenY < keySize ) {
        osc.frequency.value = scale.c2;
    } else if (evt.screenY > keySize && evt.screenY < keySize * 2) {
        osc.frequency.value = scale.a;
    } else if (evt.screenY > keySize * 2 && evt.screenY < keySize * 3) {
        osc.frequency.value = scale.g;
    } else if (evt.screenY > keySize * 3 && evt.screenY < keySize * 4) {
        osc.frequency.value = scale.e;
    } else if (evt.screenY > keySize * 4 && evt.screenY < keySize * 5) {
        osc.frequency.value = scale.d;
    } else {
        osc.frequency.value = scale.c;

    }
    gainNode = ctx.createGain();
    gainNode.gain.value = 0;

    

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();

    now = ctx.currentTime;
    gainNode.gain.exponentialRampToValueAtTime(1, now+0.00001);
    gainNode.gain.exponentialRampToValueAtTime(.000000000001,now + 3);
});

