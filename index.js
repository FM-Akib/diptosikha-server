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
const programCollection = client.db('diptosikhaDB').collection('programs');
const donationCollection = client.db('diptosikhaDB').collection('donations');


  //user server - database handle

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
          address:user.address,
        }
      }
      const result = await UserCollection.updateOne(filter,updatedUser,options);
      res.send(result);
    })



  //programs server - database handle

  app.get('/programs', async(req, res) =>{
    const cursor = programCollection.find()
    const result = await cursor.toArray()
    res.send(result);
   })
   
   app.get('/programs/:id', async(req, res) =>{
       const id = req.params.id;
       const query = {_id: new ObjectId(id)}
       const result = await programCollection.findOne(query);
       res.send(result);
      })

   app.post('/programs',async(req, res)=>{
     const user = req.body;
     const result = await programCollection.insertOne(user);
     res.send(result);
   })

   app.put('/programs/:id',async(req, res)=>{
     const id= req.params.id;
     const programs = req.body;
     const filter = {_id: new ObjectId(id)}
     const options = {upsert: true}
     const updatedPrograms={
       $set:{
        title:programs.title,
        date:programs.date,
        img:programs.img,
        cost:programs.cost,
        description:programs.description,
        author:programs.author,
        imgtitle:programs.imgtitle,
        sector:programs.sector,
       }
     }
     const result = await programCollection.updateOne(filter,updatedPrograms,options);
     res.send(result);
   })
   
   app.delete('/programs/:id', async(req, res) =>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await programCollection.deleteOne(query);
    res.send(result);
   })

 

  //Donations server - database connection

  app.get('/donations', async(req, res) =>{
    const cursor = donationCollection.find()
    const result = await cursor.toArray()
    res.send(result);
   })
   
   app.get('/donations/:id', async(req, res) =>{
       const id = req.params.id;
       const query = {_id: new ObjectId(id)}
       const result = await donationCollection.findOne(query);
       res.send(result);
      })

   app.post('/donations',async(req, res)=>{
     const user = req.body;
     const result = await donationCollection.insertOne(user);
     res.send(result);
   })

   app.put('/donations/:id',async(req, res)=>{
     const id= req.params.id;
     const donations = req.body;
     const filter = {_id: new ObjectId(id)}
     const options = {upsert: true}
     const updatedPrograms={
       $set:{
        title:donations.name,
        date:donations.mobile,
        img:donations.email,
        cost:donations.amount,
        description:donations.date,
        author:donations.donationOn,
        imgtitle:donations.trxID
       }
     }
     const result = await donationCollection.updateOne(filter,updatedPrograms,options);
     res.send(result);
   })
   
   app.delete('/donations/:id', async(req, res) =>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await donationCollection.deleteOne(query);
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