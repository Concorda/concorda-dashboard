import register from './containers/register'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, register)
  })
}
