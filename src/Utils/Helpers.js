import axios from "axios";
import { format, parse } from "date-fns";

export function flatternObject(obj) {
  let result = {};
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      let nestedObj = flatternObject(obj[key]);
      for (let nestedkey in nestedObj) {
        result[nestedkey] = nestedObj[nestedkey];
      }
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

export async function getCurrentLocation() {
  try {
    const permissionStatus = await navigator.permissions.query({
      name: "geolocation",
    });

    if (permissionStatus.state === "granted") {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }

    } else if (permissionStatus.state === "prompt") {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } else {
      throw new Error("Geolocation permission not granted.");
    }
  } catch (err) {
    throw new Error("Geolocation permission not granted.");
  }
}

// export function getCurrentLocation() {
//   return new Promise((resolve, reject) => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;

//           // Ensure valid latitude and longitude values
//           if (
//             latitude >= -90 && latitude <= 90 &&
//             longitude >= -180 && longitude <= 180
//           ) {
//             resolve({ latitude, longitude });
//           } else {
//             reject(new Error("Received invalid latitude or longitude values."));
//           }
//         },
//         (error) => {
//           console.error("Error retrieving location:", error);
//           switch (error.code) {
//             case error.PERMISSION_DENIED:
//               reject(new Error("User denied the request for Geolocation."));
//               break;
//             case error.POSITION_UNAVAILABLE:
//               reject(new Error("Location information is unavailable."));
//               break;
//             case error.TIMEOUT:
//               reject(new Error("The request to get user location timed out."));
//               break;
//             case error.UNKNOWN_ERROR:
//               reject(new Error("An unknown error occurred."));
//               break;
//             default:
//               reject(new Error("Failed to retrieve location. Please check your permissions."));
//           }
//         },
//         {
//           enableHighAccuracy: true, // Use high accuracy if available
//           timeout: 15000, // Timeout after 15 seconds
//           maximumAge: 0 // Do not use a cached position
//         }
//       );
//     } else {
//       reject(new Error("Geolocation is not supported by this browser."));
//     }
//   });
// }



// const GOOGLE_API_KEY = "AIzaSyBtyw25OjqTrQjs0yMOWygoI4OGbkjpl-Y"; // Replace with your actual Google API key

// export async function getCurrentLocation() {
//   try {
//     const response = await axios.post(
//       `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`
//     );
//     console.log("response", response)
//     const { lat, lng } = response.data.location;
//     return {
//       latitude: lat,
//       longitude: lng,
//     };
//   } catch (error) {
//     console.error("Error fetching geolocation:", error);
//     throw new Error("Failed to retrieve location. Please check your network and API key.");
//   }
// }


// const IP_INFO_API_KEY = 'http://ipinfo.io/192.168.0.198?token=40e1b04cfd6fa8'; // Replace with your actual IPinfo API key

// export async function getCurrentLocation() {
//   try {
//     const response = await axios.get(`https://ipinfo.io/json?token=${IP_INFO_API_KEY}`);
//     const { loc } = response.data;
//     const [latitude, longitude] = loc.split(',');
//     return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
//   } catch (error) {
//     console.error('Error fetching IP-based location:', error);
//     throw new Error('Failed to retrieve location by IP.');
//   }
// }

export async function getIpAddress() {
  try {
    const { data } = await axios.get("https://ipinfo.io/json");
    return data;
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return null;
  }
}
export const convertTo12HourFormat = (time24) => {
  const date = parse(time24, "HH:mm:ss", new Date());
  return format(date, "hh:mm:ss a");
};

export const convertTo24HourFormat = (time12) => {
  const date = parse(time12, "hh:mm a", new Date());
  return format(date, "HH:mm:ss");
};

export function newConvertTo12HourFormat(time24) {
  // Parse the 24-hour format time string into a Date object
  const date = parse(time24, "HH:mm", new Date());

  // Format the Date object into a 12-hour format time string
  const time12 = format(date, "hh:mm aa");

  return time12;
}

function newConvertTo24HourFormat(time12) {
  const date = parse(time12, "hh:mm aa", new Date());
  const time24 = format(date, "HH:mm");

  return time24;
}

// export const formatTime = (dateTime) => {
//   const date = parse(dateTime, "yyyy-MM-dd HH:mm:ss", new Date());
//   return format(date, "HH:mm:ss");
// };
export const formatTime = (timeString) => {
  if (!timeString || typeof timeString !== 'string') {
    return '00:00:00'; // Return a default value if input is invalid
  }

  try {
    const parsedDate = parse(timeString, "yyyy-MM-dd HH:mm:ss", new Date());
    return format(parsedDate, "HH:mm:ss");
  } catch (error) {
    console.error("Error formatting time:", error);
    return "00:00:00";
  }
};