//imports
import express from "express";
import cors from "cors";
import { db } from "./.dbConnection.js";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8080;

app.listen(PORT, () => {
  console.info(`Server API is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server API. GET comfy!" });
});

app.get("/posts", async (req, res) => {
  try {
    //query db
    const query = await db.query(
      `SELECT id, creator, description, category, likecount FROM week7posts ORDER BY id ASC`
    );
    res.json(query.rows);
  } catch (error) {
    console.error(error, "Response failed. Turn off and on");
    res.status(500).json({ response: "fail" });
  }
});

app.post("/new-post", async (req, res) => {
  try {
    const data = req.body;

    if (
      !data ||
      !data.creator ||
      !data.description ||
      !data.category ||
      !data.likecount
    ) {
      return res
        .status(400)
        .json({ request: "fail", message: "Invalid request body" });
    }

    const query = await db.query(
      `INSERT INTO week7posts (creator, description, category, likecount) VALUES ($1, $2, $3, $4) RETURNING *`,
      [data.creator, data.description, data.category, data.likecount]
    );
    res.status(200).json({ request: "success" });
  } catch (error) {
    console.error(error, "Request failed. Turn off and on");
    res.status(500).json({ request: "fail" });
  }
});

/* 
POSTMAN
POST Request to http://localhost:8080/new-post
Body, RAW, JSON

{
    "biscuit_name": "Jammy Dodger",
    "src": "wewe",
    "description": "Gooey",
    "crunchiness": 2,
    "customerId": 1
}
*/

//Delete an entry from biscuit table
// route --> http method delete
app.delete("/delete-post/:id", async (req, res) => {
  try {
    //access the value of my id params
    const idParams = req.params.id;
    //query database
    const query = await db.query(`DELETE FROM week7posts WHERE id = $1`, [
      idParams,
    ]);
    res.status(200).json({ request: "success" });
  } catch (error) {
    console.error(error, "Request failed");
    res.status(500).json({ request: "fail" });
  }
});

/* 
POSTMAN
DELETE Request to http://localhost:8080/delete-biscuit/8
Body, RAW, JSON
*/

//UPDATE an entry

app.put("/update-post/:id", async (req, res) => {
  try {
    const idParams = req.params.id;
    const { creator, description, category, likecount } = req.body;

    const query = await db.query(
      `UPDATE week7posts
       SET creator = $1, description = $2, category = $3, likecount = $4
       WHERE id = $5
       RETURNING *`,
      [creator, description, category, likecount, idParams]
    );

    if (!query.rows[0]) {
      return res
        .status(404)
        .json({ request: "fail", message: "Post not found" });
    }

    res.status(200).json({ request: "success", post: query.rows[0] });
  } catch (error) {
    console.error(error, "Request failed");
    res.status(500).json({ request: "fail" });
  }
});

/* 
POSTMAN
PUT Request to http://localhost:8080/update-biscuit/5
Body, RAW, JSON
{
  "biscuitName": "Chocolate Biscuit",
  "src": "https://images.unsplash.com/photo-1589988802149-7f9cb13a468e?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3",
  "description": "Delicious cookie with scrumptious chocolate",
  "crunchiness": 4,
  "customerId": 1
}
*/
