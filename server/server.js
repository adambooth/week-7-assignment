//imports
import express from "express";
import cors from "cors";
import { db } from "./.dbConnection.js";

//init express
const app = express();

//use JSON in our server
app.use(express.json());

//config cors
app.use(cors());

//port
const PORT = 8080;
app.listen(PORT, () => {
  console.info(`Server API is running on port ${PORT}`);
});

//routing system

//root route
//route --> http method GET
// READ data
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server API. GET comfy!" });
});

//READ biscuits data
//route --> http method GET
//static route
app.get("/biscuits", async (req, res) => {
  try {
    //query db
    const query = await db.query(
      `SELECT biscuit_name AS "biscuit name", src AS "image link", description, crunchiness FROM biscuits`
    );
    console.log(query.rows);
    res.json(query.rows);
    // throw new Error(); //to test catch block
  } catch (error) {
    console.error(error, "Response failed. Turn off and on");
    res.status(500).json({ response: "fail" });
  }
});

//READ biscuits and customers data
app.get("/biscuits-customers", async (req, res) => {
  try {
    const query = await db.query(
      `SELECT biscuits.*, customers.* FROM biscuits JOIN customers ON customers.id = biscuits.customer_id`
    );
    console.log(query.rows);
    res.json(query.rows);
  } catch (error) {
    console.error(error, "Response failed. Turn off and on");
    res.status(500).json({ response: "fail" });
  }
});

//CREATE new entries in the biscuits table
//route --> http method POST

app.post("/new-biscuit", async (req, res) => {
  try {
    //collect the data to insert
    const data = req.body;
    //query the database to insert new data

    if (!data || !data.biscuit_name) {
      return res
        .status(400)
        .json({ request: "fail", message: "Invalid request body" });
    }

    const query = await db.query(
      `INSERT INTO biscuits (biscuit_name, src, description, crunchiness, customer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        data.biscuit_name,
        data.src,
        data.description,
        data.crunchiness,
        data.customerId,
      ]
    );
    res.status(200).json({ request: "success" });
  } catch (error) {
    console.error(error, "Request failed. Turn off and on");
    res.status(500).json({ request: "fail" });
  }
});

/* 
POSTMAN
POST Request to http://localhost:8080/new-biscuit
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
app.delete("/delete-biscuit/:id", async (req, res) => {
  try {
    //access the value of my id params
    const idParams = req.params.id;
    //query database
    const query = await db.query(`DELETE FROM biscuits WHERE id = $1`, [
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

app.put("/update-biscuit/:id", async (req, res) => {
  try {
    //access the value of my id params
    const idParams = req.params.id;

    //We need to store the new values to update current entry
    const { biscuit_name, src, description, crunchiness, customer_id } =
      req.body;

    //query database
    const query = await db.query(
      `UPDATE biscuits SET biscuit_name = $1, src = $2, description = $3, crunchiness = $4, customer_id = $5 WHERE id = $6`,
      [biscuit_name, src, description, crunchiness, customer_id, idParams]
    );
    res.status(200).json({ request: "success" });
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
