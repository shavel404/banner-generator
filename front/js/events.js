/*
Установка событий для полей ввода
*/

const sizeChangeElements = [
    document.getElementById('width'),
    document.getElementById('height')
]

sizeChangeElements.forEach(element=>{
    element.oninput = (event)=>{
        if (event.target.value < 0 || event.target.value > 1280)
            element.value = config[element.id]
            else
                config[element.id] = element.value
    }
})

const textChangeElement = document.getElementById('Text')

textChangeElement.oninput = event =>{

    if (event.target.value.split("\n").length > 3) {
        textChangeElement.value = config[textChangeElement.id]
        }
        else 
            config[textChangeElement.id] = textChangeElement.value

}

const defaultElements = [
    document.getElementById('solidFillcolor'),
    document.getElementById('grad1Fillcolor'),
    document.getElementById('grad2Fillcolor'),
    document.getElementById('textcolor'),
    document.getElementById('imgUrl'),
    document.getElementById('bannerUrl')
]

defaultElements.forEach(element=>{
    element.onchange = ()=>{
        config[element.id] = element.value
    }
})

