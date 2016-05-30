import logs from './containers/logs'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, logs)
  })
}
