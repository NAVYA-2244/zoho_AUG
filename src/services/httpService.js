import axios from 'axios';
// import { logout } from '../auth/login/userService';

axios.interceptors.response.use(null, (error) => {
  const logError = error.response && error.response.status === 440;

  if (logError) {
    // logout();
    window.location = '/';
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  // var tokto = jwtoken.sign(
  //   {
  //     exp: Math.floor(Date.now() / 1000) + 10,
  //     data: window.location.href,
  //   },
  //   process.env.REACT_APP_CSRF
  // );

  axios.defaults.headers.common['x-auth-token'] = jwt;
  //axios.defaults.headers.common["csrf-token"] = tokto;
}

function setCaptcha(captcha) {
  axios.defaults.headers.common['x-captcha-token'] = captcha;
}

const exportedObject = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
  setCaptcha,
};

export default exportedObject;
