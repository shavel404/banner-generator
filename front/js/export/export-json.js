export function saveJson(config){

  let area = document.createElement("textarea")

  document.body.appendChild(area)
      area.value = JSON.stringify(config)
      area.select()
      document.execCommand("copy")
  document.body.removeChild(area) 
  
}

