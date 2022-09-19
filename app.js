require("dotenv").config();
const express = require("express");
const userHandlers = require("./usersHandlers");
const { hashPassword, verifyPassword, verifyToken } = require("./auth");


const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favorite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");//Express02*/
const { validateMovie } = require("./validators.js");//Express 4bis*/
const { validateUsers } = require ("./validators.js");
const { hashedPassword,verifyPassword} = require ("./auth.js"); //Express 07*/
const isItDewight = (req, res, next) => {
  if (req.body.email === "dwight@theoffice.com" && req.body.password === "123456") {
    res.send("Credentials are valid");
  } else {
    res.sendStatus(401);
  }
};

app.post("/api/movies",verifyToken,movieHandlers.postMovie);
app.post("/api/login", isItDewight);//express08*/
app.post("/api/users", hashedPassword, usersHandlers.postUser);//Express 07*/
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

app.post("/api/movies", movieHandlers.postMovie);//Express3*/
app.put("/api/movies/:id", movieHandlers.updateMovie);//Express4*/
app.delete("/api/movies/:id", movieHandlers.deleteMovie);//Express5*/
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);//Express4bis*/

//express08

//public routes express08
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);

app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.use(verifyToken); // verifyToken activé pour chaque route après cette ligne
app.post("/api/users", usersHandlers.postUsers);
app.put("/api/users/:id", validateUsers, usersHandlers.updateUsers);
app.delete("/api/users/:id", usersHandlers.deleteUsers);
