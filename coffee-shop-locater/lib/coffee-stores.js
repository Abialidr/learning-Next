import Unsplash, { createApi } from 'unsplash-js';
// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  secret: process.env.NEXT_PUBLIC_UNSPLASH_SECRET_KEY,
});
const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 30,
  });
  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result) => result.urls['small']);
};
export const fetchCoffeeStores = async (
  latLong = '43.653833032607096%2C-79.37896808855945',
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();
  try {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
      },
    };
    const url = getUrlForCoffeeStores(latLong, 'coffee', limit);
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results.map((result, idx) => {
      return {
        id: result.fsq_id,
        address: result.location.formatted_address,
        name: result.name,
        neighbourhood: result.location.locality,
        imgUrl: photos.length > 0 ? photos[idx] : null,
      };
    });
  } catch (err) {
    console.log('🚀 ~ file: coffee-stores.js:45 ~ err', err);
  }
};
