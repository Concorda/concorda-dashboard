import passReset from './containers/passReset'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, passReset)
  })
}
