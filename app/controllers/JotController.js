import { AppState } from "../AppState.js";
import { jotServices } from "../services/JotServices.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";

function _goHome(){
    document.getElementById('Jot.').innerHTML = AppState.landing
    clearInterval(AppState.updateDom)
}

function _updatePassiveDom(){
    _drawJots()
    document.getElementById('jotNum').innerText = `${AppState.jots.length} Jots`
    
}

function _drawJots(){
    const jots = AppState.jots
    let content = ''
    jots.forEach(jot => content += jot.jotIcon)
    document.getElementById('jots').innerHTML = content
}

function _toggleDom(id){

    const toggledELM = AppState.dom.find(elm => elm.name == id)
    
    if(!toggledELM.value){
        document.getElementById(id).classList.remove("d-flex") 
        document.getElementById(id).classList.add("d-none")
        toggledELM.value = true
    }
    else  {
        document.getElementById(id).classList.remove("d-none")
        document.getElementById(id).classList.add("d-flex")
        toggledELM.value = false
    }
}

function _updateActiveDom(){
    AppState.changes = (document.getElementById('jotBox').value != AppState.activeJot.body)
    if(AppState.changes){
        AppState.timeStamp = new Date()
        AppState.lastSaved = setInterval(_lastSaved, 100)
        AppState.wordCount = setInterval(_wordCount, 100)
        clearInterval(AppState.updateDom)
    }
    // TODO let highlightedWords = jotServices.highlight()
    // _highlight(highlightedWords)
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

function _lastSaved(){
        if(AppState.changes){let currentTime = new Date()
        let lastSaved = AppState.timeStamp
        let lastUpdated = ''
        const time = Math.floor((currentTime.getTime() - lastSaved.getTime()) / 1000)
        
        if(time < 60){lastUpdated = `Last Updated: ${time} Seconds ago`}
        
        if(time >= 60 && time < 3600){
            if(Math.floor(time / 60) == 1){
                lastUpdated = `Last Saved: 1 Minute ago`
            }
            else lastUpdated = `Last Saved: ${Math.floor(time / 60)} Minutes and ${time % 60} Seconds ago`
        }
        
        if(time >= 3600){
            lastUpdated = `Last Saved: ${String(time / 3600).slice(0,3)} Hours ${Math.floor(time / 60)} Minutes and ${time % 60} Seconds ago`}

        document.getElementById('lastUpdated').innerText = lastUpdated
        AppState.activeJot.lastUpdated = lastUpdated}
        else {
            clearInterval(AppState.lastSaved)
            clearInterval(AppState.lastSaved)
            AppState.updateDom = setInterval(_updateActiveDom, 100)
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

// TODO notifications

export class JotController{

    constructor(){
        
        _goHome()
        AppState.on('jots', _updatePassiveDom)
        AppState.on('activeJot', _drawActiveJot)
    

        if(jotServices.loadPref()) {jotServices.loadPref()}
        jotServices.loadJots()
    }



    async selectJot(id){
        if(AppState.changes) if(await Pop.confirm('You have Unsaved Changes', "Would You like to save your changes?", "Yes")) jotServices.saveActive()

        
        if(AppState.jots.find(jot => jot.id == id)){
            jotServices.selectJot(id)
            AppState.updateDom = setInterval(_updateActiveDom, 100)
        }
        if(id == 0) _goHome()

        if(AppState.dom.find(elm => elm.name == id)) _toggleDom(id)
    }

    saveActive(){
        jotServices.saveActive()
    }

    addJot(){
        event.preventDefault()
        const newJot = getFormData(event.target)
        jotServices.addJot(newJot)
        event.target.reset()
    }

    async deleteJot(id){
       if(await Pop.confirm('Are You Sure?', "This Jot will be lost forever(That's a long time).", "Yes, I'm Sure")) jotServices.deleteJot(id)
       _goHome()
    }

    autoSave(){
        jotServices.autoSave()
    }
}
