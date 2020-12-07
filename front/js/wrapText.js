function countFontSize(str, fontSize, font, maxWidth){

  let testBlock = document.createElement("div")

  document.body.appendChild(testBlock)
    testBlock.style.display = "inline-block"
    testBlock.style.font = `${fontSize}px ${font}`
    testBlock.textContent = str

  while (testBlock.clientWidth > maxWidth){
    fontSize-=1;
    testBlock.style.font = `${fontSize}px ${font}`
    if (fontSize <= 1) return fontSize
  }

  document.body.removeChild(testBlock)

  return fontSize

}
  
export function wrapTextHtml(config, previewId){

  const preview = document.getElementById(previewId)
  const textBlocks = preview.getElementsByTagName('span')
  
  for (let i = 0; i < textBlocks.length; i++) textBlocks[i].textContent = ''

  const defaultFontSize = config.height/8
  const marginLeft = config.width/10
  const maxWidth = config.width - marginLeft*2

  
  const strArr = config.text.split("\n");

  strArr.forEach((str, i) => {

    let fontSize = countFontSize(str, defaultFontSize, config.font, maxWidth)

    let marginBottom = (defaultFontSize * (strArr.length -i))-defaultFontSize + config.height/10 
    
    textBlocks[i].style.font = `${fontSize}px ${config.font}`
    textBlocks[i].style.bottom = `${marginBottom}px`
    textBlocks[i].style.left = `${marginLeft}px`
    textBlocks[i].textContent = str
  })

}

export function wrapTextCanvas(config, ctx){

  let strArr = config.text.split("\n")


  const defaultFontSize = config.height/8
  const marginLeft = config.width/10
  const maxWidth = config.width - marginLeft*2

  ctx.fillStyle = config.textcolor

  strArr.forEach((str, i) => {

    let fontSize = countFontSize(str, defaultFontSize, config.font, maxWidth)
    let marginBottom = (defaultFontSize * (strArr.length -i))-defaultFontSize + config.height/10

    ctx.font = `${fontSize}px ${config.font}`
    ctx.fillText(str, marginLeft, config.height - marginBottom)

  })
}

export function getTextBlocksHtml(config){
  let strArr = config.text.split("\n")

  let text = ''
 
  const defaultFontSize = config.height/8
  const marginLeft = config.width/10
  const maxWidth = config.width - marginLeft*2

  strArr.forEach((str, i) => {

    let fontSize = countFontSize(str, defaultFontSize, config.font, maxWidth)
    let marginBottom = (defaultFontSize * (strArr.length -i))-defaultFontSize + config.height/10 

    text+=
          '\n<div style = "position:absolute;'+ 
                       ` font:${fontSize}px ${config.font};`+ 
                       ` bottom:${marginBottom}px;`+ 
                       ` left: ${marginLeft}px">`+
              `${str}`+
          '</div>'

  })

  return text

}