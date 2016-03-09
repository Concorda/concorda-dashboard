import overview from './containers/overview'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, overview)
  })
}
