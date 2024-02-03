const express = require('express');
const mongoose = require('mongoose');
const connectDB =require('./connect')

require('dotenv').config();
const app = express();
const PORT =  3000;


app.use(express.json());

// Define User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  });
  
  const User = mongoose.model('User', userSchema);



  const start =async ()=>{
      try{
          await connectDB(process.env.MONGO_URI)
          app.listen(3001,console.log(`MOngodb Server is listening on port 3001...`))
      }
      catch(error){
          console.log('Mongodb failed to connect');
          console.log(error);
      }
      }
  
      start()  



app.post('/register', async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  const fields = { name, email, phone, address, password };

  const missingFields = Object.entries(fields)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `The following fields are required: ${missingFields.join(', ')}` });
  }

  

  try {
    // Create a new user
    const newUser = new User(fields);
    await newUser.save();
    res.status(201).json({ success: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
