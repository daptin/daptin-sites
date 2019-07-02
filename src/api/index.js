// this is aliased in webpack config based on server/client build
import {DaptinClient} from 'daptin-client'

const logRequests = !!process.env.DEBUG_API;


const daptinClient = new DaptinClient("http://localhost:6336", logRequests);
daptinClient.worldManager.loadModels().then(function () {
  daptinClient.jsonApi.findAll("user_account").then(function (res) {
    console.log("all todos", res.data)
  })
});

export default daptinClient;

