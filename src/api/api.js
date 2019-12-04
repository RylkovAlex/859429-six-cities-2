import axios from 'axios';
import ActionCreator from '../redux/actions/action-creator/action-creator';
import history from '../browser-history/browser-history';

const BASE_URL = `https://htmlacademy-react-2.appspot.com/six-cities`;

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onStart = (request) => {
    dispatch(ActionCreator.fetchStart());
    return request;
  };
  const onSuccess = (response) => {
    dispatch(ActionCreator.fetchSuccess());
    return response;
  };
  const onFail = (err) => {
    const fetchUrl = err.config.url.substr(BASE_URL.length);
    dispatch(ActionCreator.fetchError(fetchUrl, err));
    if (err.response.status === 401) {
      dispatch(ActionCreator.clearUser());
      localStorage.clear();
      history.push(`/login`);
    }
    // пробрасываю дальше
    throw err;
  };

  api.interceptors.request.use(onStart);
  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export const offerAdapter = {
  toModel: (rawOffer) => ({
    city: rawOffer.city,
    id: rawOffer.id,
    previewImage: rawOffer.preview_image,
    images: rawOffer.images,
    title: rawOffer.title,
    isFavorite: rawOffer.is_favorite,
    isPremium: rawOffer.is_premium,
    rating: rawOffer.rating,
    type: rawOffer.type,
    bedrooms: rawOffer.bedrooms,
    maxAdults: rawOffer.max_adults,
    price: rawOffer.price,
    goods: rawOffer.goods,
    host: {
      id: rawOffer.host.id,
      isPro: rawOffer.host.is_pro,
      name: rawOffer.host.name,
      avatarUrl: rawOffer.host.avatar_url,
    },
    description: rawOffer.description,
    location: rawOffer.location
  }),
};

export const reviewAdapter = {
  toModel: (rawReview) => ({
    id: rawReview.id,
    user: {
      id: rawReview.user.id,
      isPro: rawReview.user.is_pro,
      name: rawReview.user.name,
      avatarUrl: rawReview.user.avatar_url,
    },
    rating: rawReview.rating,
    comment: rawReview.comment,
    date: rawReview.date,
  }),
};
