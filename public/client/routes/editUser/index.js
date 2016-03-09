import editUser from './containers/editUser'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, editUser)
  })
}
