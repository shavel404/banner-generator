const express = require('express')
const path = require('path')
const PORT = 3999

const app = express()

app.use(express.json())

app.post('/download',(req, res)=>{

    const download = require('image-downloader')
    const resData = {url : '', success: false}
    
    const options = {
    url: req.body.data,
    dest: path.join( __dirname, 'front', 'img-temp')      // will be saved to /path/to/dest/photo.jpg
    }
 
    download.image(options)
    .then(({ filename }) => {
        console.log('Saved to', filename)  // saved to /path/to/dest/photo.jpg

        resData.url = path.join('img-temp', path.basename(filename))
        resData.success = true
    })
    .catch((err) => console.error(err))
    .finally(()=>{
        res.status(200).json(resData)
    })

})

app.use(express.static(path.resolve(__dirname, 'front')))

app.get('*',(req, res)=>{
    res.sendFile(path.resolve(__dirname,'front','index.html'))
})

app.listen(PORT,()=>console.log(`Приложение запущено на порту ${PORT}`))