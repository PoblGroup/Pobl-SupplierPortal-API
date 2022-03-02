const { ContainerSASPermissions, generateBlobSASQueryParameters } = require("@azure/storage-blob");
const crypto = require("crypto");

const generateSasToken = ()  => { //resourceUri, signingKey, policyName, expiresInMins
    const uri = 'https://PoblConnect.blob.core.windows.net'
    resourceUri = encodeURIComponent(uri);

    // Set expiration in seconds
    var expires = (Date.now() / 1000) + 60 * 60;
    expires = Math.ceil(expires);
    var toSign = resourceUri + '\n' + expires;

    // Use crypto
    var hmac = crypto.createHmac('sha256', Buffer.from('+T6vzvaYVIjKbYF82FSyYdUsW/IcOVYtnu5pj+PoMPCvs/cjSHkDqVNjvx3f6N0ZxVLGS8mDj3OTZUCPA5D2wQ==', 'base64'));
    hmac.update(toSign);
    var base64UriEncoded = encodeURIComponent(hmac.digest('base64'));

    // Construct authorization string
    // var token = "SharedAccessSignature sr=" + resourceUri + "&sig="
    // + base64UriEncoded + "&se=" + expires;
    // if (policyName) token += "&skn="+policyName;


    // var token = `SharedAccessSignature sr=${resourceUri}&sig=${base64UriEncoded}&se=${expires}`
    //if (policyName) token += "&skn="+policyName;`
    var token = `https://poblconnect.blob.core.windows.net/?sig=${base64UriEncoded}&se=${expires}`

    //'https://poblconnect.blob.core.windows.net/?sv=2020-08-04&ss=b&srt=co&sp=rwdlacitfx&se=2022-02-15T19:39:59Z&st=2022-02-15T11:39:59Z&spr=https&sig=9pBiZHVhNUb7%2F8pn2X97qWk6OgcwCtX3%2FJu00rsp9jw%3D

    return token;
};

const getContainerSasUri = (containerName, sharedKeyCredential, storedPolicyName) => {
    const sasOptions = {
        containerName: containerName,
        permissions: ContainerSASPermissions.parse("c")
    };

    if (storedPolicyName == null) {
        sasOptions.startsOn = new Date();
        sasOptions.expiresOn = new Date(new Date().valueOf() + 3600 * 1000);
    } else {
        sasOptions.identifier = storedPolicyName;
    }

    const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
    console.log(`SAS token for blob container is: ${sasToken}`);

    return sasToken;
}

module.exports = {
    generateSasToken,
    getContainerSasUri
}