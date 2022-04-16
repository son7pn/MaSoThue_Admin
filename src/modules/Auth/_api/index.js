import HttpService from 'utils/http'

export const login = (email, password) => {
  let apiEndpoint = '/login';
  return HttpService.post(apiEndpoint, { email, password }).then(res => {
    return res || {}
  }).catch(() => { return false });
}

export const getProfile = () => {
  let apiEndpoint = '/profile';
  return HttpService.get(apiEndpoint).then(res => {
    return res || {};
  }).catch(() => { return false });
}
