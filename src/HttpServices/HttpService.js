import axios from "axios";
import { useNavigate } from "react-router";
let employeeToken = "zohoEmployeeToken";
let adminToken = "zohoAdminToken";
export let settingTokens = {
  settingEmployeeToken: (data) => {
    return localStorage.setItem(employeeToken, data);
  },
  gettingEmployeeToken: () => {
    return localStorage.getItem(employeeToken);
  },
  removingEmployeeToken: () => {
    return localStorage.removeItem(employeeToken);
  },
  settingAdminToken: (data) => {
    return localStorage.setItem(adminToken, data);
  },
  gettingAdminToken: () => {
    return localStorage.getItem(adminToken);
  },
  removingAdminToken: () => {
    return localStorage.removeItem(adminToken);
  },
};
export const makeNetworkCall = async (obj, type, headers) => {
  try {
    const options = {
      method: "post",
      url: `https://cg-crm.onrender.com/post_data`,
      responseType: "json",
    };
    if (headers) {
      options.headers = {
        "Content-Type": "application/json",
        "x-auth-token": settingTokens.gettingEmployeeToken() || "",
      };
    }
    if (obj) {
      options.data = {
        type: type,
        data: obj,
      };
    }
    const response = await axios(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return Promise.reject({ error });
  }
};
export const makeNetworkCall1 = async (type, route, data, headers) => {
  try {
    const options = {
      method: type,
      url: `https://cg-crm.onrender.com/post_data/${route}`,
      responseType: "json",
    };
    if (data) {
      options.data = data;
    }
    if (headers) {
      options.headers = {
        "Content-Type": "application/json",
        "x-auth-token": settingTokens.gettingEmployeeToken() || "",
      };
    }
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return Promise.reject({ error });
  }
};
// export const useNavigating = (path) => {
//     const navigate = useNavigate();
//     const navigating = () => {
//       navigate(path);
//     };
//     return navigating;
//   };
/*
export const reApiCall = async (path) => {
  const response = await axios({
    method: "post",
    url: `https://split-wise-jugo.onrender.com/users/${path}`,
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("splitWiseUserToken") || "",
    },
    timeout: 5000,
    responseType: "json",
  });
  return Crypto.decryptobj(response.data);
};
*/
