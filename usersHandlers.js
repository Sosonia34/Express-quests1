const database = require("./database");

const getUsers = (req, res) => {
  database
  .query("select firstname, lastname, email, city, language from users")//express07*/
  .then(([users]) => {
    res.json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};
//EXPRESS 02*/
const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
   //express07*/
  query("select firstname, lastname, email, city, language from users where id = ?", [id])
  .then(([users]) => {
    if (users[0] != null) {
      res.json(users[0]).status(200);
    } else {
      res.status(404).send("Not Found");
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
}
//Express 03 */ //express07*/
const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;
  

database //express07*/
  .query(
      "INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language, hashedPassword]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};
//Express4*/
const updateUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;
database
  .query(
      "update users set firstname = ?, lastname = ?, email = ?  city = ?,  language = ?, where id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie");
    });
};
//Express5*/
const deleteUsers = (req, res) => {
  const id = parseInt(req.params.id);
database
  .query("delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the movie");
    });
};
/*Express6*/
const getUserByLanguage =(req, res) => {
  let sql = "select * from users";
  const sqlValue = [];

  if (req.query.language) {
    sql += " where language = ?";
    sqlValue.push(req.query.language);
  }

  if (req.query.city) {
    sql += " where city = ?";
    sqlValue.push(req.query.city);
  }
database
  .query(sql, sqlValue)
    .then(([users]) => {
      res.json(users).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports ={
    getUsersById,
    getUsers,
    postUsers,
    updateUsers,
    deleteUsers,
  };
  