import clients from './containers/clients'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, clients)
  })
}
