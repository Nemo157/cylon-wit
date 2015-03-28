import Cylon from 'cylon'

export default class Driver extends Cylon.Driver {
  constructor() { super(...arguments) }

  get listening() { return this.connection.listening }

  start(callback) {
    ['error', 'outcome', 'unparsed'].forEach(ev => this.defineDriverEvent({ eventName: ev }))
    callback()
  }

  halt(callback) { callback() }
  listen() { this.connection.listen() }
  finish() { this.connection.finish() }
}

// vim:sw=2:ts=2:et
