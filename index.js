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


  //user data handle
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

    app.post('/users',async(req, res)=>{
      const user = req.body;
      const result = await UserCollection.insertOne(user);
      res.send(result);
    })

    app.put('/users/:id',async(req, res)=>{
      const id= req.params.id;
      const user = req.body;
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true}
      const updatedUser={
        $set:{
          name:user.name,
          email:user.email,
          img:user.img,
          designation:user.designation,
          mobile:user.mobile,
          bloodGroup:user.bloodGroup,
          facebook:user.facebook,
          education:user.education,
          lastDonate:user.lastDonate,
        }
      }
      const result = await UserCollection.updateOne(filter,updatedUser,options);
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