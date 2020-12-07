import {request} from '/js/request.js'
import {wrapTextCanvas} from '/js/wrapText.js'

function clipper(ctx, x,y,w,h,rad){
    ctx.beginPath();
    ctx.arc(x+rad, y+rad, rad, Math.PI, Math.PI+Math.PI/2 , false);
    ctx.lineTo(x+w - rad, y);
    ctx.arc(x+w-rad, y+rad, rad, Math.PI+Math.PI/2, Math.PI*2 , false);
    ctx.lineTo(x+w,y+h - rad);
    ctx.arc(x+w-rad,y+h-rad,rad,Math.PI*2,Math.PI/2,false);
    ctx.lineTo(x+rad,y+h);
    ctx.arc(x+rad,y+h-rad,rad,Math.PI/2,Math.PI,false);
    ctx.closePath();
    ctx.save();
    ctx.clip();
  }
  


const download = (canvas, config) => {

    let dataURL

    try{
        dataURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    }catch(e){
        console.log('Ошибка создания dataURL: '+ e)
        return 0
    }

    let link = document.createElement("a")
    link.href = dataURL;
    link.download = `banner_${config.width}x.${config.height}.png`
    link.click()
}

const saveCanvas = (config, canvas) =>{

    let ctx = canvas.getContext('2d')
    clipper(ctx, 0, 0, config.width, config.height,config.borderRadius)

    if (config.gradientOn){
        let gradient = ctx.createLinearGradient(0, 0, 0, config.height)
            gradient.addColorStop(0, config.grad1Fillcolor)
            gradient.addColorStop(1, config.grad2Fillcolor)

            ctx.fillStyle = gradient
        }
            else
                ctx.fillStyle = config.solidFillcolor

    
    ctx.rect(0, 0, config.width, config.height)
    ctx.fill()
    wrapTextCanvas(config, ctx)
    download(canvas, config)

}

const saveWithImg = (config, canvas) =>{

    let ctx = canvas.getContext('2d')

    let outerImg = new Image()
        outerImg.crossOrigin = "anonymous"
    
    console.log('Попытка использовать внешний url...')
    outerImg.src = config.imgUrl

    outerImg.onload = () => {
        console.log('...повезло')

        clipper(ctx, 0, 0, config.width, config.height,config.borderRadius)
        ctx.drawImage(outerImg, 0, 0, config.width, config.height)
        ctx.restore()
        wrapTextCanvas(config, ctx)
        download(canvas, config)
    }

    outerImg.onerror = async () => {
        console.log('...не повезло')
        console.log('Загрузка изображения на сервер...')

        let serverImg = new Image()

        let res = {success:false}

        res = await request('/download','POST', {data:config.imgUrl})

         if (res.success){
             console.log('...успешно')
             console.log('Подключение изображения с сервера...')

             serverImg.src = res.url
             console.log(res.url)

             serverImg.onload = ()=>{
                console.log('...все ок')

                clipper(ctx, 0, 0, config.width, config.height, config.borderRadius)
                ctx.drawImage(serverImg, 0, 0, config.width, config.height)
                ctx.restore()
                wrapTextCanvas(config, ctx)
                download(canvas, config)
             }

             serverImg.onerror = ()=>{
                 console.log('...что-то пошло не так')
            }
         }else console.log('...не удалось')

    }
}


export const savePng = config => {

    let canvas = document.createElement('canvas')
    canvas.width = config.width
    canvas.height = config.height

    const imgAvalible = new Image()
    imgAvalible.src = config.imgUrl

    imgAvalible.onload = ()=>{
        console.log('Изображение есть')
        saveWithImg(config, canvas)
    }

    imgAvalible.onerror = ()=>{
        console.log('Изображения нет')
        saveCanvas(config, canvas)

    }
}


