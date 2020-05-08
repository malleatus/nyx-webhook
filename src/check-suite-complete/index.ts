// https://docs.microsoft.com/en-us/azure/azure-functions/

// eslint-disable-next-line node/no-unsupported-features/es-syntax
import Crypto from 'crypto';

let key = process.env.githubWebhookSecret as string;

interface AzureRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  headers: {
    [key: string]: string | undefined;
  };
  query: QueryParams;
}

interface AzureResponse {
  status?: number;
  body: string;
}

interface Context {
  // see function.json: bindings
  binding: unknown;
  res: AzureResponse;

  log(message: string): void;
}

interface QueryParams {
  [key: string]: string | undefined;
}

module.exports = async function checkSuiteComplete(
  context: Context,
  req: AzureRequest
): Promise<void> {
  context.log('nyx webhook received event');

  let hmac = Crypto.createHmac('sha1', key);
  let digest = hmac.update(JSON.stringify(req.body) || '').digest('hex');
  let signature = `sha1=${digest}`;
  let suppliedSignature = req.headers['x-hub-signature'];

  if (signature !== suppliedSignature) {
    context.res = {
      status: 401,
      body: `Bad Signature`,
    };
    return;
  }

  context.res = {
    body: 'Thanks, that signature was great!',
  };
};
