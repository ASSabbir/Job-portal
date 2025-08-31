require('dotenv').config()
const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORt || 5000;


app.use(cors())
app.use(express.json())

// mongodb connection 


// const verifyToken=(req,res,next)=>{
//   const token=req?.cookies?.token
//   if(!token){
//     return res.send({massage:'unothoris'})
//   }
//   jwt.verify(token,'AD42AEEC73759E8F49FD2B96FF936B0C1D920B5B3D3E6E769281928EB538D1C2',(err,decode)=>{
//     if(err){
//       return res.send({massage:'again login'})
//     }
//     req.user=decode
//     next()
//   }) LearnBridge

// }


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyv8hzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const database = client.db("JobPotal");
    const userCollection=database.createCollection('user')
    
    app.get('/',(req,res)=>{
        res.send({messge: 'Job portal is working perfectly'})
    })
    app.post('/add_user',async(req,res)=>{
        console.log(req.body)
        const result =(await userCollection).insertOne(req.body)
        res.send(result)
    })


    // app.post('/jwt',async(req,res)=>{
    //   const user =req.body

    //   const token =jwt.sign(user,'AD42AEEC73759E8F49FD2B96FF936B0C1D920B5B3D3E6E769281928EB538D1C2',{expiresIn:'1h'})
    //   res
    //   .cookie('token',token,{
    //     httpOnly:true,
    //     secure:false
    //   })
    //   .send({success:true})
    // })

   






    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send("This is Learn Bridge Server")
})

app.listen(port, () => {
  console.log(`surver is running ${port}`)
})
