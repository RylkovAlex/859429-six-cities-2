import axios from 'axios';
import ActionCreator from '../redux/actions/action-creator/action-creator';

export const createAPI = (onLoginFail, dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
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
    dispatch(ActionCreator.fetchError(err));
    if (err.response.status === 401) {
      onLoginFail();
      return;
    }
    throw err;
  };

  api.interceptors.request.use(onStart);
  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
