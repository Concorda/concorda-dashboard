import changePwd from './containers/changePassword'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, changePwd)
  })
}
