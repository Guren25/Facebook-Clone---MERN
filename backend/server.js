const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Established Connnection with MongoDB');
    })
    .catch(()=> {
        console.log('Failed to establish connection with MongoDB', err);
    })

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));