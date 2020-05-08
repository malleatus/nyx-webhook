## Checking Signed Requests

There exists an azure key vault with a secret.  This secret is shared with the
github web hook.  The application has its system assigned identity enabled, and
the key vault has an access policy that allows that identity to get secrets.

The application settings for the secret are configured as a key vault
reference.  When running locally, set the secret in
`Values.githubWebhookSecret` in your `local.settings.json`.

## Setup

```sh
func azure fucntionapp fetch-app-settings NyxWebhook
```
