import axios from 'axios';

const cache = {};

export async function fetchData(url, options = {}) {
  if (cache[url]) {
    return Promise.resolve(cache[url]);
  }

  const response = await axios.get(url, options);
  cache[url] = response.data;
  return response.data;
}
