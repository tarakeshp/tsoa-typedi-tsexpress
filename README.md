# Code Structure
```
| File/Folder      | Description
| ------------- | ---------------------------------------------
| server.ts     | main file
| \app.ts       | application configuration
| \di.ts        | typeDI IoC configuration as per tsoa spec
| \controllers  | RESTful controllers
| \dto          | DataTransferObject to handle request and response objects
| \exceptions   | different kinds of exceptions - Generic, NotFound, Service, Validation
| \integrations | third party service integrations
| \middlewares  | exception handling middleware, authorization handling middleware, validation handling middleware
| \routes       | auto-generated router.ts file by tsoa
| \services     | shared domain services for upper layers
| \swagger      | contains auto-generated swagger.json file by tsoa build, postman.json file by postman command
| tsconfig.json | typescript configuration JSON file
| tsoa.json     | tsoa configuration JSON file
| ------------- | ---------------------------------------------
```

- `tsoa` automatically generates routes, swagger, models
- `swagger` is accessible over `http://localhost:3000/swagger`

### NPM Commands
- `npm run postman` command generates postman.json file inside `/src/swagger/postman.json`
- `npm run build` command generates tsoa routes and swagger.json

### Standard Error Responses
```
// NotFound
 {
    "code": "USER_NOT_FOUND",
    "message": "The requested user was not found.",
    "stack": "Error\n   ....",
    "innerException": null
}

// Service
{
    "code": "USER_SERVICE_ERROR",
    "message": "An error occurred while fetching user data.",
    "stack": "Error..",
    "innerException": null
}

// Generic
{
    "code": "SERVER_ERROR",
    "message": "an unexpected error has occurred on the server side. please try after sometime.",
    "stack": "Error\n ...",
    "innerException": {
        "name": "Error",
        "message": "No Exception Applied",
        "stack": "Error..."
    }
}
// Validation
{
    "code": "VALIDATION_ERROR",
    "message": "name must be longer than or equal to 3 characters, name must be a string, name should not be empty, email must be an email, email should not be empty",
    "stack": "...",
    "innerException": null
}
```

- `Domain layer` i.e `Service layer` should not decided the http-status code rather `Controller layer` should decide basic on the exception type that is thrown from Domain layers.
- This way the domain layer is decoupled from http and could re-used in a non-http environments by just ignoring the http-status code.