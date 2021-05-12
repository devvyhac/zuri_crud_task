# zuri_crud_task

## Documentation

Please follow the steps below, to  make use of this app.

#### Base url: 

> https://crud-task-zuri.herokuapp.com/


#### INSTALL ALL THE REQUIRED DEPENDENCIES
> ```npm install```


#### AVAILABLE ROUTES: 
```
/create
/users
/users/:id
/edit/:id
/remove/:id
```

## USAGE

> **_Send HTTP request to the appropriate endpoint._**


###### **CREATE OPERATION**
> ```Create a user```

Send a `POST` request to `/create` along 
with the data that consists of the following fields
in the request body.
```
1. name 
2. email
3. country
```


###### **READ OPERATION**
> ```List all users```

Send a `GET` request to `/users or /` to get a
list of all the users in the record.

> ```Get only one user```

Send a `GET` request to `/users/:user_id` to return the 
details of a single user in the record.


###### UPDATE OPERATION
> ```Edit the entries in a single user record```

Send a `PUT` request to `/edit/:id` together 
with the entries you want to alter in the request body


###### DELETE OPERATION
> ```delete a single entry in the users record```

Send a `DELETE` request to `/remove/:id` together 
with the entries you want to alter in the request body


## Example below 
###### GET Request: 
> https://crud-task-zuri.herokuapp.com/users/609b80f3cdb7d3211d584a36


> `Created by Devvyhac`
