// this is aliased in webpack config based on server/client build
import {DaptinClient} from 'daptin-client'

const logRequests = !!process.env.DEBUG_API;


// const endpoint = localStorage.getItem("SIMPLY_ENDPOINT");
console.log("end point simply api from env", 'http://localhost:8090');

const daptinClientSimply = new DaptinClient('http://localhost:8090', logRequests);
daptinClientSimply.worldManager.loadModel("user_account").then(function () {
  // daptinClient.jsonApi.findAll("user_account").then(function (res) {
  //   console.log("all todos", res.data)
  // })
});

export default daptinClientSimply;

