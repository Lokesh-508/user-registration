const express = require('express');

const app = express();
const PORT =  3000;


app.use(express.json());

const MONGO_URI=



app.post('/register', async (req, res) => {
  const { name, email, phone, address } = req.body;

  
  if (!name || !email || !phone || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  //  validation logic ( email format validation) can be added here

  try {
    // Create a new user
    const newUser = new User({ name, email, phone, address });
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
