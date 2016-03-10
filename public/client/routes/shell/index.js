import shell from './containers/shell'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, shell)
  })
}
