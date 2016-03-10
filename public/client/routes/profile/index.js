import profile from './containers/profile'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, profile)
  })
}
