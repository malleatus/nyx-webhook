// https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=javascript

module.exports = async function checkSuiteComplete(context: any, req: any) {
  context.log('JavaScript HTTP trigger function processed a request.');

  if (req.query.name || (req.body && req.body.name)) {
    context.bindings.msg = `ohai ${req.query.name || req.body.name}`;
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: 'Hello ' + (req.query.name || req.body.name),
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a name on the query string or in the request body',
    };
  }
};
