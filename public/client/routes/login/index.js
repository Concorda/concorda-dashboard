import loginComponent from './containers/login'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, loginComponent)
  })
}
