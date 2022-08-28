import httpClient from "../utils/httpClient";

export const listAll = async () => {
  const data = await httpClient
    .get('/bank/listAll')
    .then((v) => v.data);
  return data;
};

export const listById = async (_id) => {
  const data = await httpClient
    .get(`/bank/listById?_id=${_id}`)
    .then((v) => v.data);
  return data;
};
