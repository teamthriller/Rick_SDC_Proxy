const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.all("/artists/*", (req, res) => {
  proxy.web(req, res, {
    target:
      "http://related-artists-network-lb-d7115e4731d37adf.elb.us-east-1.amazonaws.com"
  });
});

app.all("/icon", (req, res) => {
  proxy.web(req, res, {
    target:
      "http://related-artists-network-lb-d7115e4731d37adf.elb.us-east-1.amazonaws.com"
  });
});

app.all("/data/*", (req, res) => {
  proxy.web(req, res, {
    target: "http://networkloadbalancer-55fc8eed1405d4ed.elb.us-east-2.amazonaws.com/"
  });
});

app.all("/albums/*", (req, res) => {
  proxy.web(req, res, {
    target: "http://artist-albums-15-09f02fec6df7d7a4.elb.us-west-1.amazonaws.com/"
  });
});

app.listen(port, () => console.log(`Proxy server running on port ${port}`));