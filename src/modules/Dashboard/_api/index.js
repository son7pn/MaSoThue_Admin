import HttpService from 'utils/http'


export const getClinicList = (params) => {
  let apiEndpoint = '/Service/Detail';
  return HttpService.get(apiEndpoint, params).then(res => {
    if (res.data) {
      return res.data.lis
    }
    return []
  }).catch(() => { return false });
}

