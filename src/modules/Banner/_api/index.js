import HttpService from 'utils/http';

export const getAllDataBanner = () => {
  let apiEndpoint = '/v1/Advs/GetListByPosition/0';
  return HttpService.get(apiEndpoint)
    .then((res) => {
      return res;
    })
    .catch(() => {
      return false;
    });
};
export const createBanner = (payload) => {
  let apiEndpoint = '/v1/Advs/create';
  return HttpService.post(apiEndpoint, payload)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
      return [];
    })
    .catch(() => {
      return false;
    });
};

export const editBanner = (payload) => {
  let apiEndpoint = '/News/Update';
  return HttpService.post(apiEndpoint, payload)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
      return [];
    })
    .catch(() => {
      return false;
    });
};
export const getDetailBaner = (id) => {
  let apiEndpoint = `/v1/Advs/getbyId/${id}`;
  return HttpService.get(apiEndpoint)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
      return [];
    })
    .catch(() => {
      return false;
    });
};
export const deleteBanner = (payload) => {
  let apiEndpoint = `/v1/Advs/delete/${payload}`;
  return HttpService.delete(apiEndpoint)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
      return [];
    })
    .catch(() => {
      return false;
    });
};