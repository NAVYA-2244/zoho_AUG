import io from "socket.io-client";
import get_gameslist from "../reduxStore/action/getgamesAction";
import get_profile from "../reduxStore/action/profileAction";

import helpers from "./commonServices/cryptos";
import get_ongoingbets from "../reduxStore/action/ongoingBetsActions";
import get_referalcom from "../reduxStore/action/referralComActions";
import get_admincontrols from "../reduxStore/action/adminControlsActions";
// http://3.141.192.107/
const SERVER = process.env.REACT_APP_API_URL_SOCKET;
// "http://3.141.192.107";

const token = localStorage.getItem("gm-token");
var authtkn = null;
if (token) {
  authtkn = helpers.decrypt(token);
}

export var socket = io(SERVER, {
  auth: {
    token: authtkn,
  },
});

socket.once("connect", () => {
  // console.log('socket connected');
});

socket.on("CGGA_profile", (profile) => {
  // console.log('cgga_profile socket');
  get_profile(profile);
});

socket.on("CGGA_Data", (msg) => {
  // console.log('CGGA_Data socket');
  var glist = JSON.parse(msg);
  get_gameslist(glist);
});

socket.on("get_ongoing_bets", (msg) => {
  var ongoing_bets = JSON.parse(msg);
  get_ongoingbets(ongoing_bets);
});

socket.on("get_admin_controls", (msg) => {
  var admin_controls = JSON.parse(msg);
  get_admincontrols(admin_controls);
});

socket.on("get_history", (msg) => {
  // console.log('get_history socket');

  var get_history = JSON.parse(msg);

  get_referalcom(get_history?.referrals);
});
