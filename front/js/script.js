import {config} from '/js/bannerConfig.js'
import {dropMenuFillColor, dropMenuExport} from '/js/dropMenu.js'
import {defaultControlsValues, defaultPreview} from '/js/initDefault.js'
import {setChangeEvents} from '/js/setChangeEvents.js'
import {savePng} from '/js/export/export-png.js'
import {saveHtml} from '/js/export/export-html.js'
import {saveJson} from '/js/export/export-json.js'


defaultControlsValues('set-panel', 'form-control', config)
defaultPreview(config, 'preview')
dropMenuFillColor(config, 'preview')
dropMenuExport(config, savePng, saveHtml, saveJson)
setChangeEvents(config, 'preview')

