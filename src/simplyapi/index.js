// this is aliased in webpack config based on server/client build
import {DaptinClient} from 'daptin-client'

const logRequests = !!process.env.DEBUG_API;


const prodEndPoint = process.env.CHIEF_ENDPOINT || "https://daptin-chief-instance-staging.dapt.xyz";
console.log("end point simply api from env", prodEndPoint);
const daptinClientSimply = new DaptinClient(prodEndPoint, logRequests);
daptinClientSimply.worldManager.loadModel("user_account").then(function () {
  // daptinClient.jsonApi.findAll("user_account").then(function (res) {
  //   console.log("all todos", res.data)
  // })
});
// daptinClientSimply.worldManager.loadModel("layout");
// daptinClientSimply.worldManager.loadModel("application");

export default daptinClientSimply;

