const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')



mongoose.connect('mongodb+srv://vasu1419:dT1yr6RXV6JiYWE6@cluster0.wwfknql.mongodb.net/?appName=Cluster0')
.then(()=>{
    console.log('connected with database')
})
.catch(err=>{
    console.log('error',err)
})


const userRoute = require('./routes/user');
const courseRoute = require('./routes/course');
const studentRoute = require('./routes/student');
const feeRoute = require('./routes/fee');


app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


app.use('/user',userRoute);
app.use('/course',courseRoute);
app.use('/student',studentRoute);
app.use('/fee',feeRoute);

app.use('*',(req,res)=>{
    res.status(404).json({
        msg:'bad request'
    })
})

module.exports = app;
