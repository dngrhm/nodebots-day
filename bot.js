var five = require("johnny-five");
var Particle = require("particle-io");

var board = new five.Board({
  io: new Particle({
    token: '8c461c53e385172408e430ff2be8a4919b0d232a',
    deviceName: 'nodebots5'
  })
});

board.on("ready", function() {
  console.log('ready');

  var leftWheelSpeedPin = 'D2';
  var leftWheelDirPin = 'D0';
  var rightWheelSpeedPin = 'D1';
  var rightWheelDirPin = 'D3';

  var rightWheel = new five.Motor({
    pins: { pwm: rightWheelSpeedPin, dir: rightWheelDirPin },
    invertPWM: true
  });

  var leftWheel = new five.Motor({
    pins: { pwm: leftWheelSpeedPin, dir: leftWheelDirPin },
    invertPWM: true
  });

  var speed = 255;

  function reverse() {
    leftWheel.rev(speed);
    rightWheel.rev(speed);
  }

  function forward() {
    leftWheel.fwd(speed);
    rightWheel.fwd(speed);
  }

  function stop() {
    leftWheel.stop();
    rightWheel.stop();
  }

  function left() {
    leftWheel.rev(speed);
    rightWheel.fwd(speed);
  }

  function right() {
    leftWheel.fwd(speed);
    rightWheel.rev(speed);
  }

  function exit() {
    leftWheel.rev(0);
    rightWheel.rev(0);
    setTimeout(process.exit, 1000);
  }

  var keyMap = {
    'up': forward,
    'down': reverse,
    'left': left,
    'right': right,
    'space': stop,
    'q': exit
  };

  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();

  stdin.on("keypress", function(chunk, key) {
      if (!key || !keyMap[key.name]) return;

      keyMap[key.name]();
  });
});
