const mongo = require("mongodb")
const express = require("express")
const app = express()
const port = 5000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  )
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
  next()
})

/* previne problemas com o CORS */

app.get("/tasks", async (req, res) => {
  const agg = []
  const client = await mongo.MongoClient.connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const coll = client.db("express-tests").collection("tasks")
  const cursor = coll.aggregate(agg)
  const result = await cursor.toArray()
  await client.close()

  res.json(result)
})

app.post("/tasks", async (req, res) => {
  let addedTask = {
    content: req.body.content,
    isChecked: req.body.isChecked,
  }
  const client = await mongo.MongoClient.connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const coll = client.db("express-tests").collection("tasks")
  const result = await coll.insertOne(addedTask)
  res.json(result.insertedId)
  client.close()
})

app.delete("/tasks/:id", async (req, res) => {
  let id = req.params
  const client = await mongo.MongoClient.connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const coll = client.db("express-tests").collection("tasks")

  coll.deleteOne({ _id: new mongo.ObjectId(id) }, function (err) {
    if (err) {
      throw err
    }
  })
})

app.put("/tasks/:id", async (req, res) => {
  let id = req.params
  const client = await mongo.MongoClient.connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const coll = client.db("express-tests").collection("tasks")

  coll.updateOne(
    { _id: new mongo.ObjectId(id) },
    [{ $set: { isChecked: { $not: "$isChecked" } } }],
    function (err) {
      if (err) {
        throw err
      }
    },
  )
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
