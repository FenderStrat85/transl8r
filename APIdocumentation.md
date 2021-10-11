# **Transl8r API endpoints**
# *Register*
_Used for creating both customers and translators. The body of the request will be different for the two._

**URL** : `/register`
**Method** : `POST`
   **Data Params:**
_customers:_
 ```json
{
	"name": "johndoe",
	"email": "johndoe@gmail.com",
	"password": "password",
	"role": "customer"
}
```
_translators:_
 ```json
{
	"name": "johndoe",
	"email": "johndoe@gmail.com",
	"password": "password",
	"role": "customer",
	"languages":  "[Chinese, Italian]" (add languages With first letter capitalized)
}
```

**Success Response:**

  _If successful, the access token will be included in the response_

  **Code** : `201`
   **Content example**

```json
{
	"accessToken":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC"
}
```

**Error Response:**

**Condition 1** : Already exist an user with the same email.

**Code** : `409`

**Content example**

```json
{
	"error":  "409",
	"message":  "Could not create user"
}
```
**Condition 2** :  Other reasons.

**Code** : `400`

**Content example**

```json
{
	"error":  "400",
	"message":  "Could not create user"
}
```



# *Login*
_Used for authenticate both customers and translators_

**URL** : `/login`
**Method** : `POST`
   **Data Params:**
_for both customers and translators:_
 ```json
{
"email": "johndoe@gmail.com",
"password": "password",
}
```

**Success Response:**

  _If successful, the access token will be included in the response_

  **Code** : `200`
   **Content example**

```json
{
	"accessToken":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC"
}
```

**Error Response:**

**Condition** : Username or password not valid

**Code** : `401`

**Content example**

```json
{
	"error":  "409",
	"message":  "Username or password not valid"
}
```


# *Create a Job*

_Used for create a new job_

**URL** : `/createJob`
**Method** : `POST`
   **Data Params:**
 ```json
{
	"CustomerId":  "f75d7cad-3cb0-412b-9751-f3819636a670",
	"jobName":  "here goes the jobName",
	"jobType":  "message",
	"languageFromName":  "Chinese",
	"languageToName"  :  "Italian",
}
```

**Success Response:**

  _If successful, the job will be included in the response_

  **Code** : `201`
   **Content example**

```json
{
	"status":  "pending",
	"jobName":  "here goes the jobName",
	"jobType":  "message",
	"_id":  "f99d720b-2c05-41ef-80a3-24d6ee4cefd1",
	"languageFrom":  "80d8351c-5f80-4f9a-b553-b7972a33a126",
	"languageTo":  "8cfb8a19-35e4-4070-89a1-8d388a6659cb",
	"CustomerId":  "f75d7cad-3cb0-412b-9751-f3819636a670",
	"updatedAt":  "2021-10-10T19:47:48.171Z",
	"createdAt":  "2021-10-10T19:47:48.171Z",
	"dateCompleted":  null,
	"TranslatorId":  null
}
```

**Error Response:**

**Condition** : Not able to create a new job
**Code** : `400`

**Content example**

```json
{
	"error":  "400",
	"message":  "Not able to create a job"
}
```


# *Accept a Job*

_Used for accepting a new job, this will also change the status of that job to "accepted"_

**URL** : `/acceptJob`
**Method** : `PUT`
   **Data Params:**

 ```json
{
	"CustomerId":  "f75d7cad-3cb0-412b-9751-f3819636a670",
	"jobName":  "here goes the jobName",
	"jobType":  "message",
	"languageFromName":  "Chinese",
	"languageToName"  :  "Italian",
}
```

**Success Response:**

  _If successful, the job will be included in the response_

  **Code** : `200`
   **Content example**

```json
{
	"status":  "pending",
	"jobName":  "here goes the jobName",
	"jobType":  "message",
	"_id":  "f99d720b-2c05-41ef-80a3-24d6ee4cefd1",
	"languageFrom":  "80d8351c-5f80-4f9a-b553-b7972a33a126",
	"languageTo":  "8cfb8a19-35e4-4070-89a1-8d388a6659cb",
	"CustomerId":  "f75d7cad-3cb0-412b-9751-f3819636a670",
	"updatedAt":  "2021-10-10T19:47:48.171Z",
	"createdAt":  "2021-10-10T19:47:48.171Z",
	"dateCompleted":  null,
	"TranslatorId":  "4cb63a4f-75d5-4d56-8693-83b4eb88d4a2",
}
```

**Error Response:**

**Condition** : Not able to accept a job
**Code** : `400`

**Content example**

```json
{
	"error":  "400",
	"message":  "Not able to accept a job"
}
```


# *Get jobs*

_Used for getting all the jobs that a user have (customers and translators), both completed or pending. Useful for showing in the dashbord the jobs_

**URL** : `/getJobs/:id/:role`
**Method** : `GET`
**URL Parameters** : `id=[string]` & `role=[string]` where `id` is the ID of the user or translator and `role` is either `customer` or `translator`

**Success Response:**

  _If successful, an array of jobs will be included in the response_

  **Code** : `200`
   **Content example**

```json
[
	{
		"_id":  "4bcdd783-6203-467f-b0ea-a5013a6c0f68",
		"status":  "accepted",
		"languageFrom":  "80d8351c-5f80-4f9a-b553-b7972a33a126",
		"languageTo":  "8cfb8a19-35e4-4070-89a1-8d388a6659cb",
		"jobType":  "message",
		"dateCompleted":  null,
		"jobName":  "don't know what this field is",
		"createdAt":  "2021-10-10T19:47:15.499Z",
		"updatedAt":  "2021-10-10T20:35:45.157Z",
		"CustomerId":  "f75d7cad-3cb0-412b-9751-f3819636a670",
		"TranslatorId":  "4cb63a4f-75d5-4d56-8693-83b4eb88d4a2"
	}
]
```

**Error Response:**

**Condition** : Not able to retrieve the jobs
**Code** : `400`

**Content example**

```json
{
"error":  "400",
"message":  "Not able to retrieve the jobs"
}
```


# *Get available jobs*

_Used for getting all the jobs that are available at the moment and that matches the profile of the translator._

**URL** : `/getAvailableJobs/:id`
**Method** : `GET`
**URL Parameters** : `id=[string]` where `id` is the ID of the translator

**Success Response:**

  _If successful, an array of jobs will be included in the response_

  **Code** : `200`
   **Content example**

```json
[
	{
		"_id":  "4bcdd783-6203-467f-b0ea-a5013a6c0f68",
		"status":  "pending",
		"languageFrom":  "80d8351c-5f80-4f9a-b553-b7972a33a126",
		"languageTo":  "8cfb8a19-35e4-4070-89a1-8d388a6659cb",
		"jobType":  "message",
		"dateCompleted":  null,
		"jobName":  "don't know what this field is",
		"createdAt":  "2021-10-10T19:47:15.499Z",
		"updatedAt":  "2021-10-10T20:35:45.157Z",
		"CustomerId":  "f75d7cad-3cb0-412b-9751-f3819636a670",
		"TranslatorId":  null,
	}
]
```

**Error Response:**

**Condition** : Not able to retrieve the available jobs
**Code** : `400`

**Content example**

```json
{
"error":  "400",
"message":  "Not able to retrieve the available jobs"
}
```


# *Populate the database with all languages*

_Used for getting all the jobs that are available at the moment and that matches the profile of the translator._

**URL** : `/addLang`
**Method** : `POST`

**Success Response:**
  **Code** : `200`

**Error Response:**
**Condition** : Not able to populate the database
**Code** : `400`

**Content example**

```json
{
"error":  "400",
"message":  "Not able to populate the database"
}
```
