import http from "./httpService";
import helpers from "./cryptos";
const tokenKey = "zohoEmployeeToken";
const apiUrl = process.env.REACT_APP_API_URL;

export async function backEndCall(route) {
  updtk();
  const { data } = await http.post(apiUrl + route);
  return helpers.decryptobj(data);
}

export async function backEndCallNoEnc(route) {
  updtk();

  const { data } = await http.post(apiUrl + route);
  return data;
}

export async function testBackendcall(type) {
  return new Promise((resolve, reject) => {
    if (type === "fail") {
      let response = { response: { data: "Something went wrong" } };
      reject(JSON.stringify(response));
    } else {
      resolve({ success: "Success!" });
    }
  });
}

export async function backEndCallObjNoEnc(route, obj) {
  updtk();
  const { data } = await http.post(apiUrl + route, obj);
  return helpers.decryptobj(data);
}

export async function backEndCallObjNothing(route, obj) {

  updtk();

  const { data } = await http.post(apiUrl + route, obj);

  return data;
}

// export async function loginCall(route, obj) {
//   updtk();
//   const { data } = await http.post(apiUrl + route, obj);
//   await localStorage.setItem(tokenKey, data.success);
//   return data;
// }
export async function loginCall(route, obj) {
  updtk(); // Ensure JWT is updated before making the request

  const { data } = await http.post(apiUrl + route, obj);

  if (data.success) {
    await localStorage.setItem(tokenKey, data.success); // Store the token in localStorage
  }

  return data; // Return the response data including the token
}


export async function backEndCallObj(route, obj) {
  updtk();
  const drreqpob = helpers.encryptobj(obj);
  const { data } = await http.post(apiUrl + route, {
    enc: drreqpob,
  });
  return helpers.decryptobj(data);
}
export async function backEndCallObjCap(route, obj, cap) {
  updtk();
  await http.setCaptcha(cap);
  const drreqpob = helpers.encryptobj(obj);
  const { data } = await http.post(apiUrl + route, {
    enc: drreqpob,
  });
  return helpers.decryptobj(data);
}

export async function backEndCallObjNoDcyt(route, obj) {
  updtk();
  const drreqpob = helpers.encryptobj(obj);
  const { data } = await http.post(apiUrl + route, {
    enc: drreqpob,
  });
  return data;
}

export async function backEndCallObjCaptcha(route, obj, captcha) {
  updtk();
  // http.setJwt(captcha);
  const drreqpob = helpers.encryptobj(obj);
  const { data } = await http.post(apiUrl + route, {
    enc: drreqpob,
  });
  return helpers.decryptobj(data);
}

// export async function updtk() {
//   const token = getJwt();
//   if (!token) {
//     // console.warn('No Token in header');
//   }
//   await http.setJwt(getJwt());
// }
export async function updtk() {
  const token = localStorage.getItem(tokenKey); // Get the JWT token from localStorage
  if (token) {
    http.setJwt(token); // Set the JWT in the HTTP client
  } else {
    console.warn('No Token in header'); // Optional: Log a warning if no token is found
  }
}

// export function getJwt() {
//   return localStorage.getItem(tokenKey);

// }


export function getJwt() {
  const token = localStorage.getItem(tokenKey);
  // console.log('Retrieved Token:', token);
  return token;
}


const exportedObject = {
  backEndCall,
  backEndCallObj,

};

export default exportedObject;
