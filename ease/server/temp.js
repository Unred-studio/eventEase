//Read everything when go to /api/emails
app.get("/api/emails", (req, res) => {
  readItems((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

//Read a single item by id when go to /api/emails/:id
app.get("/api/emails/:id", (req, res) => {
  const { id } = req.params;
  readItemById(id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});

//Create a new item when go to /api/emails
app.post("/api/emails", (req, res) => {
  const { sender, content, edition } = req.body;
  const contentStringify = content.replace(/\r\n/g, "\n");
  createItem(sender, contentStringify, edition, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(`Item added with id: ${data.id}`);
    }
  });
});

//Read a single item by id when go to /api/emails/:id
app.put("/api/emails/:id", (req, res) => {
  const { id } = req.params;
  const { sender, content, edition } = req.body;
  updateItem(id, sender, content, edition, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send("Item updated successfully");
    }
  });
});

//Delete a single item by id when go to /api/emails/:id
app.delete("/api/emails/:id", (req, res) => {
  const { id } = req.params;
  deleteItems(id, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send("Item deleted successfully");
    }
  });
});
