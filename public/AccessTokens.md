Access to any part of this API other than the <code><a href='#operation/post-authenticate'>/authenticate</a></code> endpoint requires bearer token authentication with a JSON Web Token (JWT).

To obtain an access token, send a request to the `/authenticate` endpoint using Basic authentication with the credentials provided by the onboarding team.

> **NOTE:** Credentials will be different for the sandbox and production environments which means credentials for one environment cannot be used for the other.

<br>
<p class="code-title">Request example</p>

```sh
curl --request POST \
--location "https://demo-api.com/api/authenticate" \
--header "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" \
--header "Content-Type: application/json"
```

<br>
<p class="code-title">Response example</p>

```json
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

<br>
<p class="code-title">JWT request example</p>

```sh
curl --request POST \
--location "https://demo-api.com/api/criminal-search" \
--header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
--header "Content-Type: application/json" \
--data "{...}"
```

<br>
