
exports.init = init;

function init(genericAWSClient) {
  return createIAMClient;

  function createIAMClient(accessKeyId, secretAccessKey, options) {
    options = options || {};
    var client = genericAWSClient({
      host: options.host || "iam.amazonaws.com",
      path: options.path || "/",
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      secure: options.secure,
      timeout: options.timeout
    });

    return {
      client: client,
      call: call
    };

    function call(action, query, callback) {
      query["Action"] = action
      query["Version"] = options.version || '2010-05-08'
      query["SignatureMethod"] = "HmacSHA256"
      query["SignatureVersion"] = "2"
      return client.call(action, query, callback);
    }
  }
}
