/*
Установка событий изменения полей ввода 
*/
import {wrapTextHtml} from '/js/wrapText.js'

export function setChangeEvents(config, previewId){

  const preview = document.getElementById(previewId)

  const sizeChangeElements = [
    document.getElementById('width'),
    document.getElementById('height')
  ]

  sizeChangeElements.forEach(element=>{
    element.oninput = (event)=>{
        if (event.target.value < 0 || event.target.value > 1280)
          element.value = config[element.id]
          else{
            config[element.id] = element.value
            preview.style[element.id] = element.value+'px'
            wrapTextHtml(config, previewId)
          }
    }
  })

  const textChangeElement = document.getElementById('text')

  textChangeElement.oninput = event =>{

    if (event.target.value.split("\n").length > 3) {
      textChangeElement.value = config[textChangeElement.id]
      }
      else{
        config[textChangeElement.id] = textChangeElement.value
        wrapTextHtml(config, previewId)
      }
  }

  const colorChangeElements = [
    document.getElementById('solidFillcolor'),
    document.getElementById('grad1Fillcolor'),
    document.getElementById('grad2Fillcolor'),
    document.getElementById('textcolor'),
  ]

  colorChangeElements.forEach(element=>{
    element.oninput = ()=>{
        
      config[element.id] = element.value

      switch (element.id){
        case 'solidFillcolor':
          preview.style.background = element.value
          break
        case 'grad1Fillcolor':
          preview.style.background =  `linear-gradient(${element.value}, ${config.grad2Fillcolor}`
          break
        case 'grad2Fillcolor':
          preview.style.background =  `linear-gradient(${config.grad1Fillcolor}, ${element.value}`
          break
        case 'textcolor':
          preview.style.color=  element.value
          break
        default:
            break
      }
    }
  })

  const otherElements = [
    document.getElementById('imgUrl'),
    document.getElementById('bannerUrl')
  ]

 otherElements.forEach(element=>{
    element.onchange = ()=>{
        
      config[element.id] = element.value

      switch (element.id){
      
        case 'imgUrl':
          let img = preview.getElementsByTagName('img')[0]
          img.style.display = 'none'
          img.src = config.imgUrl

          img.onload = () => img.style.display = 'block'
     
          break
        default:
            break
      }
    }
  })

}