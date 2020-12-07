/*
Заполнение панели дефолтными значениями 
    Ключи объекта конфигурации соответствуют id элемента панели
*/
export function defaultControlsValues(panelElemId, controlsClassName, config){

  const panel = document.getElementById(panelElemId)
  const controls = panel.getElementsByClassName(controlsClassName)

  for (let i = 0; i < controls.length; i++){

    for (let key in config)
      if (key === controls[i].id)
        controls[i].value = config[key]
    
  }
}

/*
Установка начального вида баннера
*/

export function defaultPreview(config, previewId){

  const preview =  document.getElementById(previewId)

  preview.style.width = config.width+'px'
  preview.style.height = config.height+'px'
  preview.style.background = config.solidFillcolor
  preview.style.color = config.textcolor

  //preview.getElementsByTagName('span')[0].textContent = "hello"
  //preview.getElementsByTagName('span')[0].style.fontSize =`${config.height/8}px`

  let img = new Image() 
  img.src = config.imgUrl

  img.onload = ()=>{
      preview.getElementsByTagName('img')[0].src = config.imgUrl
  }

}