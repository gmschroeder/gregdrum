var ctx = new (window.AudioContext || window.webkitAudioContext)();

var tapper = document.getElementById("strike");

var now;
var osc;
var gainNode;

tapper.addEventListener('click', function( evt ) {
    osc = ctx.createOscillator();
    osc.type = 'sawtooth';


    var scale = {
        'c2': 523.251,
        'a': 440,
        'g': 392,
        'e': 329.628,
        'd': 293.665,
        'c': 261
    }

    var keySize = window.innerHeight / 6;

    console.log("window height");
    console.log(window.innerHeight);
    console.log("this click:");
    console.log(evt.clientY)

    if (evt.clientY < keySize ) {
        osc.frequency.value = scale.c2;
    } else if (evt.clientY > keySize && evt.clientY < keySize * 2) {
        osc.frequency.value = scale.a;

    } else if (evt.clientY > keySize * 2 && evt.clientY < keySize * 3) {
        osc.frequency.value = scale.g;

    } else if (evt.clientY > keySize * 3 && evt.clientY < keySize * 4) {
        osc.frequency.value = scale.e;

    } else if (evt.clientY > keySize * 4 && evt.clientY < keySize * 5) {
        osc.frequency.value = scale.d;

    } else if (evt.clientY > keySize * 5) {
        osc.frequency.value = scale.c;

    }

    console.log(osc.frequency.value);


    gainNode = ctx.createGain();
    gainNode.gain.value = 0;

    

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();

    now = ctx.currentTime;
    gainNode.gain.exponentialRampToValueAtTime(1, now+0.00001);
    gainNode.gain.exponentialRampToValueAtTime(.000000000001,now + 3);
});

