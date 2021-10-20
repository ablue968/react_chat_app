const express = require('express');
const cors    = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json()); //so I can pass json from front to back-end.
app.use(express.urlencoded({extended: true})); 

app.get('/', (req,res)=>{
    res.send('Hello World');
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));