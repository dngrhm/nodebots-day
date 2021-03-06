var five = require("johnny-five");
var Particle = require("particle-io");

var board = new five.Board({
  io: new Particle({
    token: process.env.PARTICLE_TOKEN,
    deviceName: process.env.NODEBOT_NAME
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

  function left_rev() {
    leftWheel.rev(speed);
  }

  function right_rev() {
    rightWheel.rev(speed);
  }

  function forward() {
    leftWheel.fwd(speed);
    rightWheel.fwd(speed);
  }

  function left_fwd() {
    leftWheel.fwd(speed);
  }

  function right_fwd() {
    rightWheel.fwd(speed);
  }

  function stop() {
    leftWheel.stop();
    rightWheel.stop();
  }

  function left_stop() {
    leftWheel.stop();
  }

  function right_stop() {
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
    'r': left_fwd,
    'f': left_stop,
    'v': left_rev,
    'u': right_fwd,
    'j': right_stop,
    'm': right_rev,
    'up': forward,
    'down': reverse,
    'left': left,
    'right': right,
    'space': stop,
    'q': exit
  };

  if(process.env.SWITCH_FWD_REV === 'yes') {
    var keyMap = {
      'm': left_fwd,
      'j': left_stop,
      'u': left_rev,
      'v': right_fwd,
      'f': right_stop,
      'r': right_rev,
      'down': forward,
      'up': reverse,
      'left': left,
      'right': right,
      'space': stop,
      'q': exit
    };
  }

  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();

  stdin.on("keypress", function(chunk, key) {
      if (!key || !keyMap[key.name]) return;

      keyMap[key.name]();
  });
});
