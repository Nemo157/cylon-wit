import Cylon from 'cylon'
import mic from './mic'
import wit from 'node-wit'

export default class Adaptor extends Cylon.Adaptor {
  constructor(options) {
    super(...arguments)
    this.access_token = options.access_token;
  }

  get listening() { return !!this.listener }

  connect(callback) { callback() }
  disconnect(callback) { callback() }

  listen() {
    this.listener = mic.start()
    wit.captureSpeechIntent(
      this.access_token,
      this.listener.audio,
      'audio/wav',
      (err, res) => {
        if (err) {
          this.emit('error', err, res)
        } else if (res.outcomes[0]) {
          this.emit('outcome', res.outcomes[0], res)
        } else {
          this.emit('unparsed', res)
        }
      })
  }

  finish() {
    if (this.listener) {
      this.listener.stop()
      this.listener = null
    }
  }
}

// vim:sw=2:ts=2:et
