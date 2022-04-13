const axios = require("axios");
const qs = require("qs");

const SPAuth = async () => {
  const { SP_CLIENT_ID, SP_CLIENT_SECRET, SP_TENANT_ID, SP_RESOURCE } =
    process.env;
  const url = `https://accounts.accesscontrol.windows.net/${SP_TENANT_ID}/tokens/OAuth/2`;
  let tokenData = null;

  var data = qs.stringify({
    grant_type: "client_credentials",
    client_id: `${SP_CLIENT_ID}@${SP_TENANT_ID}`,
    client_secret: SP_CLIENT_SECRET,
    resource: SP_RESOURCE,
  });
  var config = {
    method: "get",
    url: url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      tokenData = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return tokenData;
};

const UploadFile = async (token, file) => {
  let createdFile = null;
  var data = file.buffer;
  var config = {
    method: "post",
    url: `https://pobl.sharepoint.com/sites/RMExchange/_api/web/GetFolderByServerRelativeUrl('Documents')/Files/add(url='${file.originalname}',overwrite=true)`,
    headers: {
      "Content-Type": "application/json;odata=verbose",
      Accept: "application/json;odata=verbose",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      //   console.log(response.data);
      createdFile = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return createdFile;
};

module.exports = { SPAuth, UploadFile }