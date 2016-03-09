import addUser from './containers/addUser'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, addUser)
  })
}
