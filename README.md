# zuri_crud_task

## Documentation

Please follow the steps below, to  make use of this app.

#### Base / API url: 

> https://crud-task-zuri.herokuapp.com/


#### INSTALL ALL THE REQUIRED DEPENDENCIES
> ```npm install```


#### AVAILABLE ROUTES: 
```
/create       (for POST request)
/users        (for GET request)
/users/:id    (for single GET request)
/edit/:id     (for PUT request)
/remove/:id   (for DELETE request)
```

## USAGE

> **_Send HTTP request to the appropriate endpoint._**


###### **CREATE OPERATION**
> ```Create a user in the users record```

Send a `POST` request to `/create` along 
with the data that consists of the following fields
in the request body.
```
{
   "name": <value >,
   "email": <value>,
   "country": <value>
}
```


###### **READ OPERATION**
> ```List all users in the users record```

Send a `GET` request to `/users or /` to get a
list of all the users in the record.

> ```Get only one user from the users record```

Send a `GET` request to `/users/:id` to return the 
details of a single user in the record.


###### UPDATE OPERATION
> ```Edit the entries in a single user record```

Send a `PUT` request to `/edit/:id` together 
with the entries you want to alter in the request body.
One or more of the following field(s) is allowed.

```
- name
- email
- country
```


###### DELETE OPERATION
> ```delete a single entry in the users record```

Send a `DELETE` request to `/remove/:id` together 
with the entries you want to alter in the request body


## Example below 
###### GET Request: 
> https://crud-task-zuri.herokuapp.com/users


> `Created by Devvyhac`
