var ctx = new (window.AudioContext || window.webkitAudioContext)();

var tapper = document.getElementById("strike");

var now;
var osc;
var gainNode;

tapper.addEventListener('click', function( evt ) {
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

