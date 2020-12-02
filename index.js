const express = require('express')
const path = require('path')
const app = express()


app.use(express.static(path.resolve(__dirname, 'front')))

app.get('*',(req, res)=>{
    res.sendFile(path.resolve(_dirname,'front','index.html'))
})

app.listen(3999)