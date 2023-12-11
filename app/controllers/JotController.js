import { AppState } from "../AppState.js";
import { jotServices } from "../services/JotServices.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";

function _goHome(){
    document.getElementById('Jot.').innerHTML = AppState.landing + AppState.offCanvas
    _drawJots()
    clearInterval(AppState.updateDom)
}
function _drawJots(){
    const jots = AppState.jots
    let content = ''
    jots.forEach(jot => content += jot.jotIcon)
    document.getElementById('jots').innerHTML = content
}

function _drawActiveJot(){
    if(AppState.activeJot){
        document.getElementById('activeJot').innerHTML = AppState.nav
        document.getElementById('activeJot').innerHTML += AppState.activeJot.jotBody
        document.getElementById('jotBox').value = AppState.activeJot.body}
        else{
            _goHome()
    }
}

function _drawDropDown(){
    if(AppState.dropDownOn) document.getElementById('dropdown').innerHTML = ''
    else document.getElementById('dropdown').innerHTML = AppState.dropDown
}

function _updateDom(){
    _lastSaved()
    _wordCount()
    // let highlightedWords = jotServices.highlight()
    // _highlight(highlightedWords)
}

function _lastSaved(){
    AppState.changes = (document.getElementById('jotBox').value != AppState.activeJot.body)

    if(AppState.changes){
        let currentTime = new Date()
        let lastSaved = new Date(AppState.activeJot.dateUpdated)
        let time = (currentTime.getTime() - lastSaved.getTime()) / 1000

        if(time > 3600){
            document.getElementById('last-updated').innerText = `Last Saved: ${String(time / 3600).slice(0,3)} Hours ago`}

        if(time > 60 && time < 3600){
            if(Math.floor(time / 60) == 1) document.getElementById('last-updated').innerText = `Last Saved: 1 Minute ago`
            document.getElementById('last-updated').innerText = `Last Saved: ${Math.floor(time / 60)} Minutes ago`}
    }
}

function _wordCount(){
    let body = document.getElementById('jotBox').value
    jotServices.wordCount(body)
    document.getElementById('wordCount').innerText = `Words: ${AppState.activeJot.wordCount}`
}

// function _highlight(highlightedWords){
//     document.getElementById('jotBox').innerHTML = highlightedWords
    // if (jotBox.)
    // jotBox.
// }

export class JotController{

    constructor(){
        console.log()
        
        _goHome()
        AppState.on('jots', _drawJots)
        AppState.on('activeJot', _drawActiveJot)

        if(jotServices.loadPref()) {jotServices.loadPref()}
        jotServices.loadJots()

        console.log(AppState.pref.autoSave.autoSaveState)
    }



    async selectJot(id){
        if(AppState.changes) if(await Pop.confirm('You have Unsaved Changes', "Would You like to save your changes?", "Yes")) jotServices.saveActive()

        
        if(id != 0 && 1){
            jotServices.selectJot(id)
            AppState.updateDom = setInterval(_updateDom, 1000)
        }
        if(id == 0) _goHome()

        else _drawDropDown()
    }

    saveActive(){
        jotServices.saveActive()
    }

    addJot(){
        event.preventDefault()
        const newJot = getFormData(event.target)
        jotServices.addJot(newJot)
    }

    async deleteJot(id){
       if(await Pop.confirm('Are You Sure?', "This Jot will be lost forever(That's a long time).", "Yes, I'm Sure")) jotServices.deleteJot(id)
    }

    autoSave(){
        jotServices.autoSave()
    }
}

