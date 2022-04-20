import HttpService from 'utils/http'

export const login = (username, password) => {
  let apiEndpoint = '/v1/user/authen';
  return HttpService.post(apiEndpoint, { username, password }).then(res => {
    return res || {}
  }).catch(() => { return false });
}

export const getProfile = () => {
  let apiEndpoint = '/profile';
  return HttpService.get(apiEndpoint).then(res => {
    return res || {};
  }).catch(() => { return false });
}
