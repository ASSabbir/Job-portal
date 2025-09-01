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
    const userCollection = database.collection('user')
    const jobCollection = database.collection('job')

    app.get('/', (req, res) => {
      res.send({ messge: 'Job portal is working perfectly' })
    })
    app.post('/add_user', async (req, res) => {
      console.log(req.body)
      const result = await userCollection.insertOne(req.body)
      console.log(result)
      res.send(result)
    })
    app.post('/add_job', async (req, res) => {
      const jobInfo = req.body
      console.log(jobInfo)
      const result = await jobCollection.insertOne(jobInfo)
      console.log(result)
      res.send(result)

    })
    // Get all jobs (default)
    app.get("/jobs", async (req, res) => {
      try {
        const jobs = await jobCollection.find().toArray();
        res.send(jobs);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // Search jobs by title (or role)
    app.get("/jobs/search", async (req, res) => {
      try {
        const { title, role } = req.query;
        let query = {};
        if (title) {
          query.title = { $regex: title, $options: "i" };
        } else if (role) {
          query.role = { $regex: role, $options: "i" };
        }
        const jobs = await jobCollection.find(query).toArray();
        res.send(jobs);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  app.get('/job/:id',async (req,res)=>{
    try {
    const { id } = req.params;

    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }
    const job = await jobCollection.findOne({ _id: new ObjectId(id) });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  })
  app.delete('/job/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await jobCollection.deleteOne(query);

    if (result.deletedCount > 0) {
      res.send({ success: true, message: "Job deleted successfully" });
    } else {
      res.status(404).send({ success: false, message: "Job not found" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});
app.put('/job/:id', async (req, res) => {
  try {
   
    const { id } = req.params;
    const {_id,...updatedJob} = req.body;
     console.log(id,updatedJob)

    const result = await jobCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedJob }
    );

    if (result.modifiedCount > 0) {
      res.send({ success: true, message: "Job updated successfully" });
    } else {
      res.status(404).send({ success: false, message: "No changes made or job not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});

















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
