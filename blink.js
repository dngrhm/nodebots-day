var five = require("johnny-five");
var Particle = require('particle-io');
var board = new five.Board({
     io: new Particle({
       token: process.env.PARTICLE_TOKEN,
       deviceName: process.env.NODEBOT_NAME
     })
   });

board.on("ready", function() {
 var led = new five.Led('D7');
 led.blink(500);
});
