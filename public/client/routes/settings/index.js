import settings from './containers/settings'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, settings)
  })
}
