# User Authentication / Authorization

**Get the Current User**

`GET: api/session`

- Successful Response when there is a User (200)
- Successful Response when there is NO User (200)

**Log In a User**

A User should be able to Log in with visible confirmation and without causing any crashes. 

`POST: api/session`

- Successful Response (200)
- Error Response: Invalid Credentials (401)
- Error Response: Body Validation Errors (400)

**Sign Up a User**

A User should be able to Sign Up for Service-Bunny without any crashes or bugs.

`POST: api/users`

- Successful Response (201)
- Error Response: User already exists with specified Email (500)
- Error Response: User already exists with specified Username (500)
- Error Response: Body Validation Error (400)

# Locations

**Logged-in User that is a Customer or Manager can create a Location (Create)**

`POST: api/locations`

- Successful Response (201)
- Error Response: Body Validation Error (400)

**Logged in User that is a Customer can view all of their Locations (Read)**

`GET: api/locations `

- Successful Response (200)
- Successful Response when there are no Locations (200)
- Error Response: Location not found (404)

 **Logged in User that is a Manager/Technician can view their customer's locations**

`GET: api/locations/:locationId `

- Successful Response (200)
- Error Response: Location not found (404)

**Logged in User can edit their Location (Update)**

`PUT: api/locations/:locationId`

- Successful Response (200)
- Error Response: Body Validation Error (400)

**Logged in User can delete their Location (Delete)**

`DELETE: api/locations/:locationId`

- Successful Response (200)
- Error Response: Location not Found (404)

# Jobs

**Logged in User that is a customer can create jobs for a Location (Create)**

`POST api/jobs`

- Successful Response (200)
- Error Response: Body Validation Error (400)
- Error Response: Location does not Exist (404)

**Logged in Users can view jobs they create, accept, or are assigned to (Read)**

`GET api/jobs`

- Successful Response (200)
- Error Response: Job does not Exist (404)

Logged in User can update their jobs (Update)

`PUT api/jobs/:jobId`

- Successful Response (200)
- Error Response: Body Validation Error (400)
- Error Response: Job does not Exist (404)

**Logged in User that is a customer or Manager can delete their jobs (Delete)**

`DELETE api/jobs/:jobId`

- Successful Response (200)
- Error Response: Job does not Exist (404)

# Reviews

**Logged in User can add a review to a job (Create)**

`POST api/reviews`

- Successful Response (201)
- Error Response: Body Validation Error (400)
- Error Response: job not found (404)

**User can view all reviews for Companies (Read)**

`GET api/reviews` 

- Successful Response (200)
- Successful Response when there are no reviews (200)

**User can view review details for a review (Read)**

`GET api/reviews/:reviewId` 

- Successful Response (200)
- Successful Response when there are no reviews (200)
- Error Response: review not found (404)

**Logged in User can update their Review (Update)**

`PUT api/reviews/:reviewId`

- Successful Response (200)
- Error Response: Body Validation Error (400)
- Error Response: Review does not Exist (404)

**Logged in User can delete their reviews (Delete)**

`DELETE api/reviews/:reviewId`

- Successful Response (200)
- Error Response: Review does not Exist (404)

# Parts

**Logged in User that is a manager can add a part to their location (Create)**

`POST api/parts`

- Successful Response (201)
- Error Response: Body Validation Error (400)
- Error Response: location not found (404)

**Logged in User can View all parts in a location of theirs or their customers (Read)**

`GET api/parts`

- Successful Response (200)
- Successful Response when there are no cards (200)

**Logged in User can Update their parts (Update)**

`PUT api/parts/:partId`

- Successful Response (200)
- Error Response: Body Validation (400)

**Logged in User can Delete their parts (Delete)**

`DELETE api/parts/:partId`

- Successful Response (200)
- Error Response: Comment not Found (404)
