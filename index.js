const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.qvgg1my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    

const UserCollection = client.db('diptosikhaDB').collection('users');


    
    app.get('/users', async(req, res) =>{
     const cursor = UserCollection.find()
     const result = await cursor.toArray()
     res.send(result);
    })
    
    app.get('/users/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await UserCollection.findOne(query);
        res.send(result);
       })


    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('YaY Server is running!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})