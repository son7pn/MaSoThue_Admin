import HttpService from 'utils/http';

export const getAllDataCrawl = ({ keyword, pageIndex }) => {
  let apiEndpoint = `/v1/Crawl/GetList?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=10`;
  return HttpService.get(apiEndpoint)
    .then((res) => {
      return res;
    })
    .catch(() => {
      return false;
    });
};
