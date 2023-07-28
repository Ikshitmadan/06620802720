
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
const dotenv=require('dotenv');

const axios=require('axios');

dotenv.config();

app.use(cors());

console.log(process.env.MONGO);

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB!");
    } catch (error) {
      console.log(error);
    }
  };



  app.listen(3000,()=>{

    connect()

    console.log("backend is running");
})



app.get('/numbers',async(req, res )=>{


    const urls=req.query;

    console.log(req.query.url,"sksls");

    // res.json({
    //     numbers: urls
    // })

    // Use the match() method to extract all URLs from the original string
    const uniqueResponses = [];
    const promises = urls.url.map(apiUrl => makeTimedRequest(apiUrl));
    
    // Wait for all API requests to finish or timeout using Promise.all()
    const responses = await Promise.all(promises);
  
    // Filter unique non-null responses
    responses.forEach(response => {

    response?.numbers.forEach(no=>{
        if (no && !uniqueResponses.includes(no)) {
            uniqueResponses.push(no);
          }
    })
      
    });
  
    res.json({ numbers: uniqueResponses });

})

async function makeTimedRequest(apiUrl) {
    try {
      const response = await axios.get(apiUrl, { timeout: 500 }); 
      return response.data;
    } catch (error) {
      console.log(`Request to ${apiUrl} timed out or encountered an error: ${error.message}`);
      return null;
    }
  }
  
  


