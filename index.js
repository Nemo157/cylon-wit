import Cylon from 'cylon'
import Adaptor from './lib/adaptor'
import Driver from './lib/driver'

export default {
  adaptors: ['wit'],
  drivers: ['wit'],
  adaptor: opts => new Adaptor(opts),
  driver: opts => new Driver(opts),
}

// vim:sw=2:ts=2:et
