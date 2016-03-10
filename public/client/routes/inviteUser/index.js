import inviteUser from './containers/inviteUser'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, inviteUser)
  })
}
