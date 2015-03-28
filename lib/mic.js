import { spawn } from 'child_process'
import { PassThrough } from 'stream'

export function start () {
  let audio = new PassThrough()
  let info = new PassThrough()

  let ps = spawn('sox', ['-d', '-b', '16', '-c', '1', '-r', '16k', '-t', 'wav', '-'])

  ps.stdout.pipe(audio)
  ps.stderr.pipe(info)

  return {
    stop () { ps.kill() },
    audio: audio,
    info: info
  }
}

// vim:sw=2:ts=2:et
