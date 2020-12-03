/*
Создание объекта конфигурации баннера
Присвоение id полям ввода
Начальная инициализация конфигурации баннера по дефолтным значениям полей
*/

const config = {width:0, height:0, gradientOn:false}

const panel = document.getElementById('set-panel')
const controls = panel.getElementsByClassName('form-control')

for (let i = 0; i < controls.length; i++){
    let key = controls[i].ariaLabel
    config[key] = controls[i].value
    controls[i].id = key
}