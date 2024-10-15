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

//read by sender

//Update
const updateItem = (id, sender, content, edition, callback) => {
  const sql = `UPDATE emails SET sender = ?, content = ?, edition = ? WHERE id = ?`;
  db.run(sql, [sender, content, edition, id], callback);
};

//Delete
const deleteItems = (id, callback) => {
  const sql = `DELETE FROM emails WHERE id = ?`;
  db.run(sql, id, callback);
};

//exporting the functions
module.export = { createItem, readItems, updateItem, deleteItems };
