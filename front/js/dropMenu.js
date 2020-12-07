const isDisplayNone = element => window.getComputedStyle(element).display === 'none' ? true:false

export const dropMenuFillColor = function(config, previewId){

    const dropColorBtn = document.getElementById('dropdown-color-btn')
    const dropColorMenu = document.getElementById('dropdown-color-menu')

    const solidFillInp = document.getElementById('solidFillcolor')
    const grad1FillInp = document.getElementById('grad1Fillcolor')
    const grad2FillInp = document.getElementById('grad2Fillcolor')

    const solidFillBtn = document.getElementById('solid-fill-btn')
    const gradFillBtn = document.getElementById('gradient-fill-btn')

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

        document.getElementById(previewId).style.background =  config.solidFillcolor

        solidFillInp.style.display = 'block'
        grad1FillInp.style.display = 'none'
        grad2FillInp.style.display = 'none'

    }

    gradFillBtn.onclick = ()=>{

        config.gradientOn = true

        document.getElementById(previewId).style.background =  `linear-gradient(${config.grad1Fillcolor}, ${config.grad2Fillcolor}`

        solidFillInp.style.display = 'none'
        grad1FillInp.style.display = 'block'
        grad2FillInp.style.display = 'block'
        
    }
}

export const dropMenuExport = (config, savePng, saveHtml, saveJson)=>{

    const dropExportMenu = document.getElementById('dropdown-export-menu')
    const dropExportBtn = document.getElementById('dropdown-export-btn')
    
    const exportPngBtn = document.getElementById('export-png-btn')
    const exportHtmlBtn = document.getElementById('export-html-btn')
    const exportJsonBtn = document.getElementById('export-json-btn')

    dropExportBtn.onclick = function(e){
        e.stopPropagation()

        if (isDisplayNone(dropExportMenu)){
            dropExportMenu.style.display = 'block'
            document.addEventListener('click',()=>{dropExportMenu.style.display = 'none'})
            }else
                dropExportMenu.style.display = 'none'
    }

    exportPngBtn.onclick = () => savePng(config)
        
    exportHtmlBtn.onclick = () => {
        saveHtml(config)

        for (let i = 0; i < 6;i++)
            setTimeout(()=>{
                document.getElementById('copiedHtml').style.display = i %2 === 0 ?'none':'inline'
            },200*i)

        setTimeout(()=>{
            document.getElementById('copiedHtml').style.display = 'none'
        },2500)
    }

    exportJsonBtn.onclick = () => {
        saveJson(config)

        for (let i = 0; i < 6;i++)
            setTimeout(()=>{
                document.getElementById('copiedJson').style.display = i %2 === 0 ?'none':'inline'
            },200*i)

        setTimeout(()=>{
            document.getElementById('copiedJson').style.display = 'none'
        },3000)
    }

    


}

