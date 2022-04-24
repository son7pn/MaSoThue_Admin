import HttpService from 'utils/http';

export const getAllDataArticle = ({ type, pageIndex }) => {
  let apiEndpoint = `/v1/Article/GetList?type=${type}&status=-1&pageIndex=${pageIndex}&pageSize=10`;
  return HttpService.get(apiEndpoint)
    .then((res) => {
      return res;
    })
    .catch(() => {
      return false;
    });
};
export const getSearchArticle = ({ keyword, pageIndex }) => {
  let apiEndpoint = `/v1/Article/search?keyword=${keyword}&type=0&pageIndex=${pageIndex}&pageSize=10`;
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
  let apiEndpoint = `/News/Delete/${payload}`;
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