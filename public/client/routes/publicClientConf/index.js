import publicClientConf from './containers/publicClientConf'

export default function getComponent (location, cb) {
  require.ensure([], (require) => {
    cb(null, publicClientConf)
  })
}
