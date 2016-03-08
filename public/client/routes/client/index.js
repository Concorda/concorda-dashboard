import client from './containers/client'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, client)
  })
}
