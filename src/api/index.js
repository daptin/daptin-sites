// this is aliased in webpack config based on server/client build
import {DaptinClient} from 'daptin-client'

const logRequests = !!process.env.DEBUG_API;


const endpoint = localStorage.getItem("DAPTIN_ENDPOINT");
console.log("end point from localstorage", endpoint);
console.log("end point from env", process.env.DAPTIN_ENDPOINT);

const daptinClient = new DaptinClient(endpoint || process.env.DAPTIN_ENDPOINT, logRequests);
daptinClient.worldManager.loadModels().then(function () {
  daptinClient.jsonApi.findAll("user_account").then(function (res) {
    console.log("all todos", res.data)
  })
});

export default daptinClient;

