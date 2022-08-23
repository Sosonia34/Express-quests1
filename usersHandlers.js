const database = require("./database");
const getUsers = (req, res) => {
  database
  .query("select * from users")
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
   
  database
  .query("select * from users where id = ?", [id])
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

  module.exports = {
    getUsersById,
    getUsers,
  };
  