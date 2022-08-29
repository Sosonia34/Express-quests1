require("dotenv").config();
const express = require("express");

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

app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);//Express02*/


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

app.post("/api/movies", movieHandlers.postMovie);//Express3*/
app.post("/api/users", usersHandlers.postUsers);
app.put("/api/movies/:id", movieHandlers.updateMovie);//Express4*/
app.put("/api/users/:id", usersHandlers.updateUsers);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);//Express5*/
app.delete("/api/users/:id", usersHandlers.deleteUsers);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);//Express4bis*/
app.put("/api/users/:id", validateUsers, usersHandler.updateUsers);