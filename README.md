# API with omdbapi data

### 1. Clone the repository
### 2. Type in the console in the project directory:
a) To install all dependencies:
```
npm i 
```
b) To run tests type:

```
 npm test 
```

c) To run appliaction on localhost type:
```
 npm run dev
```
### 3. Finally  type in your browser localhost:3001

### 4. Now you can use the API with some tools like Postman requests:

| Method        | URL                                |       
| ------------- |:-------------:                     | 
| POST          | http://localhost:3001/api/movies   | 
| GET           | http://localhost:3001/api/movies   |  
| POST          | http://localhost:3001/api/comments |  
| GET           | http://localhost:3001/api/comments |  

***

#### Heroku

| Method        | URL                                                  |       
| ------------- |:-------------:                                       | 
| POST          | https://netguru-movie-api.herokuapp.com/api/movies   | 
| GET           | https://netguru-movie-api.herokuapp.com/api/movies   |  
| POST          | https://netguru-movie-api.herokuapp.com/api/comments |  
| GET           | https://netguru-movie-api.herokuapp.com/api/comments |  

***

#### a) POST /movies:
   Request body should contain only movie title, and its presence should be validated.
   Based on passed title, other movie details should be fetched from http://www.omdbapi.com/ (or other similar, public movie database) -    and saved to application database.
   Request response should include full movie object, along with all data fetched from external API.
  
  ##### To POST the movies type http://localhost:3001/api/movies (or heroku url) and add to the body the JSON object: 
  
  {
    "title": "My favourite movie title"
  }
  

 #### b) GET /movies:
  Should fetch list of all movies already present in application database.
  Additional filtering, sorting is fully optional (BONUS points)
  
  ##### To GET the movies type http://localhost:3001/api/movies


 #### c) POST /comments:
  Request body should contain ID of movie already present in database, and comment text body.
  Comment should be saved to application database and returned in request response.

  ##### To POST the comments type http://localhost:3001/api/comments (or heroku url) and add to the body the JSON object: 
  
  {
    "movieId": "Movie id"
    "comment": "My comment" 
  }
  

 #### d) GET /comments:
  Should fetch list of all comments present in application database.
  Should allow filtering comments by associated movie, by passing its ID.
  
  ##### To GET the comments type http://localhost:3001/api/comments (or heroku url)
  
  If you want to filtering comments by associated movie, by passing its ID
  type http://localhost:3001/api/comments/:movieId (or heroku url) - :movieId is for example 5bedd3b16261c90820812f38


### 5. Bounus
You can display the Rest-Movie-Api objects in the browser. Just type in the browser: 
http://localhost:3001 


***

### What did I use?
- Express - it helps you in creating server-side web applications faster and smarter
- Eslint - to write a readable code and stick to the rules 
- Nodemon - it allows to reload the server every time when you will change something in your code
- Winston - [logs] more beautiful than console.log  
- Mocha and supertest - to write some tests
- Materialize - to style all ejs files
- MongoDB & Mongoose - easy creating Schemas and and saving data in Mongo Atlas

*** 

*If you want to display the JSON in the Chrome browser I recommend this extension:
https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc

