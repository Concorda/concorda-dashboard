import addClient from './containers/addClient'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, addClient)
  })
}
