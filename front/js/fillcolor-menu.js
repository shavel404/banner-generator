const dropColorBtn = document.getElementById('dropdown-color-btn')
const dropColorMenu = document.getElementById('dropdown-color-menu')

const solidFillInp = document.getElementById('solidFillcolor')
const grad1FillInp = document.getElementById('grad1Fillcolor')
const grad2FillInp = document.getElementById('grad2Fillcolor')

const solidFillBtn = document.getElementById('solid-fill-btn')
const gradFillBtn = document.getElementById('gradient-fill-btn')

const isDisplayNone = element => window.getComputedStyle(element).display === 'none' ? true:false

solidFillInp.style.display = 'block'
grad1FillInp.style.display = 'none'
grad2FillInp.style.display = 'none'

dropColorBtn.onclick = function(e){
    e.stopPropagation()

    if (isDisplayNone(dropColorMenu)){
        dropColorMenu.style.display = 'block'
        document.addEventListener('click',()=>{dropColorMenu.style.display = 'none'})
        }else
            dropColorMenu.style.display = 'none'
}

solidFillBtn.onclick = ()=>{

    config.gradientOn = false

    solidFillInp.style.display = 'block'
    grad1FillInp.style.display = 'none'
    grad2FillInp.style.display = 'none'

}

gradFillBtn.onclick = ()=>{

    config.gradientOn = true

    solidFillInp.style.display = 'none'
    grad1FillInp.style.display = 'block'
    grad2FillInp.style.display = 'block'
    
}



