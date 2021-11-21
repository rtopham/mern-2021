import api from './api'

const setPublicAPIKeyHeader = (key) => {
  if (key) {
    api.defaults.headers.common['api-key'] = key
  } else {
    delete api.defaults.headers.common['api-key']
  }
}

export default setPublicAPIKeyHeader
