import {getTextBlocksHtml} from '/js/wrapText.js'

function getHtml(config, imgDisplay){

  let background = config.gradientOn ? 
     `background: linear-gradient(${config.grad1Fillcolor}, ${config.grad2Fillcolor})`:
     `background: ${config.solidFillcolor}`

  let htmlCode = 
  `<a href = "${config.bannerUrl}"`+
               ' style = "display:block;'+
               ` border-radius:${ config.borderRadius}px;`+
               ' text-decoration:none;'+
               ' position: relative;'+ 
               ' overflow: hidden;'+
               ` width:${ config.width}px;`+ 
               ` height:${config.height}px;`+
               ` ${background};`+
               ` color:${config.textcolor}">`+ '\n' +
      `<img width = ${config.width}`+
            ` height = ${config.height}`+ 
            ` src = "${config.imgUrl}"`+
            ` style = "display: ${imgDisplay}"`+
            '/>'+
      `${getTextBlocksHtml(config)}`+
  '\n</a>'

  return htmlCode

}

export function saveHtml(config){

  const img = new Image()
  img.src = config.imgUrl

  let area = document.createElement("textarea")
  document.body.appendChild(area)

  img.onload = ()=>{
    area.value = getHtml(config, 'block')
    area.select()
    document.execCommand("copy")
    document.body.removeChild(area)
  }

  img.onerror = ()=>{
    area.value = getHtml(config, 'none')
    area.select()
    document.execCommand("copy")
    document.body.removeChild(area)
  }
 
}