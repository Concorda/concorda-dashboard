import users from './containers/users'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, users)
  })
}
