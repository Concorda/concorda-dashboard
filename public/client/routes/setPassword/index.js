import setPassword from './containers/setPassword'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, setPassword)
  })
}
