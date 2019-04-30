# NodejsTask

## Open Endpoints

Open endpoints require no Authentication.

Login : `POST /login/`

Set `Content-Type` header to `application/json`

It expects a JSON object with name and password field

```
{
	"name":"your_name",
	"password": "your_password"
}
```

It responds with a JSON object containing a JWT signed key using a secret key and username

```
{
    "sucess": true,
    "userCreated": "bhavay",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJoYXZheSIsImlhdCI6MTU1NjYxMzM2OSwiZXhwIjoxNTU2NjE2OTY5fQ.tI-r0kv8ZEolf6axFHsG4P4LUW_ltyqt1z7HDcsRl84"
}
```
![](https://user-images.githubusercontent.com/34943807/56961260-f6a49080-6b70-11e9-92df-8eeb570f3d29.png)


## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Json Patching : `PATCH /jsonpatch/` ###

Set `Content-Type` header to `application/json`

Set `Authorization` header to `<Bearer + JWT_Token_Received>`

It expects 2 objects, patch and JSONdata
patch is an array of JSON object or patches which are to be applied, and JSONdata is a JSON object.

```
{
  "patch": [{"op": "replace", "path": "/baz", "value": "boo"}],

  "JSONdata": {
      "baz": "qux",
      "foo": "bar"
    }
}
```

It responds with one patched JSON object.

```
{
    "patchedData": {
        "baz": "boo",
        "foo": "bar"
    }
}
```
![](https://user-images.githubusercontent.com/34943807/56961262-f73d2700-6b70-11e9-9983-7840854cc38d.png)



### Thumbnail : `POST /thumbnail/` ###

Set `Content-Type` header to `application/json`

Set `Authorization` header to `<Bearer + JWT_Token_Received>`

It expects 1 JOSN objects with url key.

```
{
  "url": "https://homepages.cae.wisc.edu/~ece533/images/arctichare.png"
}
```

It responds with base64 encoded 50x50 resized image data and the encoded data is wrapped in a html img tag so it can be easily preview on API testing tool.

![](https://user-images.githubusercontent.com/34943807/56961263-f7d5bd80-6b70-11e9-899a-c1dc5ad10f05.png)


### How to run ? ###

* Install nodejs and npm
* clone ths project and change directory to the project root directory.
* on terminal or cmd, type `npm i`. It'll install all the dependencies and dev-dependencies.
* change `config.env` variable in `config.js` to `test` while running tests and to `prod` while serving the API.
* now type `npm  start` to run the project or `npm test` to run test suite.

### To run with docker
* Type in terminal from root directory of project `docker build -t <your_user_name>/<project_name> .`
* It'll pull all the required images from docker hub.
* now type `docker run -p 49160:8080 -d <your_user_name>/<project_name>`
* it'll map 8080 port inside of the container to the port 49160 on your machine.
