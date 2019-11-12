import jwtDecode from 'jwt-decode'

export default token => {
  try {
    return jwtDecode(token)
  } catch (err) {
    return {} // return empty object of token is invalid
  }
}
