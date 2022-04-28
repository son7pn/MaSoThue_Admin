import HttpService from 'utils/http';

export const getAllDataSystem = () => {
  let apiEndpoint = '/v1/config/GetListByGroup?group=all';
  return HttpService.get(apiEndpoint)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return false;
    });
};
export const editSystem = (payload) => {
  let apiEndpoint = '/v1/Config/update';
  return HttpService.post(apiEndpoint, payload)
    .then((res) => {
      if (res.data) {
        return res.data;
      } else return [];
    })
    .catch(() => {
      return false;
    });
};
export const getAllDataAbout = () => {
  let apiEndpoint = '/v1/config/getbykey?key=ABOUTUS';
  return HttpService.get(apiEndpoint)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return false;
    });
};