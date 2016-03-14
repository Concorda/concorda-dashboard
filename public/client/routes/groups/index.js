import groups from './containers/groups'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, groups)
  })
}
