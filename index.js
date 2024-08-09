const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
const PORT =  3000



app.use(express.json());
app.use(bodyParser.json()); 
app.use(cors());
const dbUrl="mongodb://localhost:27017/dbconnectpractice";


// data base connect
mongoose.connect(dbUrl,{

}).then(()=>{
console.log("db connected");
}).catch((error)=>{console.log(error);
})

//collection declaration Name, Email, Password, Address
const blogCollectionSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    address:String
})

// store collection name
const blogCollectionName = mongoose.model('testcollection1',blogCollectionSchema);

//get Api for getting all blogs
app.get('/blog',
    async(req,res)=>{
    try{
    const blogData = await blogCollectionName.find();
    res.json(blogData)
    console.log(blogData);
    
    }catch (err) {
        res.status(500).json(err);
      }
    
}
)

//post api for inserting blog
app.post('/blog',
    async(req,res)=>{
   try{
    const addNewBlog = new blogCollectionName(req.body);
    await addNewBlog.save();
    res.json(addNewBlog);
   }catch(err){
   console.log("unable to push data in database");
   
   }
})

//update the blog record 
app.put('/blog/:id',async (req,res)=>{
    try{
        const updateBlog = await blogCollectionName.findByIdAndUpdate(req.params.id, req.body, {new :true});
        if(!updateBlog){
          res.send("no blog is present to update")
        }else{
          res.json(updateBlog)
        }
    }catch(error){
    console.log("unable to update the data");
    }
 

})

//delete the blog from database
app.delete('/blog/:id',async (req,res)=>{
    try{
        const deleteBlog = await blogCollectionName.findByIdAndDelete(req.params.id);
        if(!deleteBlog){
          res.send("no blog is present to delete")
        }else{
          res.json({message:"blog deleted successfully"})
        }
    }catch(error){
    console.log("unable to delete the data");
    }
 

})


// run the get method to check working
app.listen(PORT,()=>{
    console.log(`server is connected ${PORT}`);
    
})