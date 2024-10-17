const db = require("./database");

//Create
const createItem = (sender, content, edition, callback) => {
  const sql = "INSERT INTO emails (sender, content, edition) VALUES(?, ?, ?)";
  db.run(sql, [sender, content, edition], function (err) {
    callback(err, { id: this.lastID });
  });
};

//Read everything
const readItems = (callback) => {
  const sql = `SELECT * FROM emails`;
  db.all(sql, [], callback);
};

//read particular id
const readItemById = (id, callback) => {
  const sql = `SELECT * FROM emails WHERE id =?`;
  db.get(sql, id, callback);
};

//Update
const updateItem = (id, sender, content, edition, callback) => {
  const sql = `UPDATE emails SET sender = ?, content = ?, edition = ? WHERE id = ?`;
  db.run(sql, [sender, content, edition, id], callback);
};

//Delete
const deleteItems = (callback) => {
  const sql = `DELETE FROM emails`; // Remove all rows from the emails table
  db.run(sql, callback);
};

//exporting the functions
module.exports = {
  createItem,
  readItems,
  readItemById,
  updateItem,
  deleteItems,
};
