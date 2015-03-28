var spawn = require('child_process').spawn;
var PassThrough = require('stream').PassThrough;

exports.start = function () {
  var audio = new PassThrough();
  var info = new PassThrough();

  var ps = spawn('sox', ['-d', '-b', '16', '-c', '1', '-r', '16k', '-t', 'wav', '-']);

  ps.stdout.pipe(audio);
  ps.stderr.pipe(info);

  return {
    stop: function() {
      ps.kill();
    },
    audio: audio,
    info: info,
  };
};

// vim:sw=2:ts=2:et
