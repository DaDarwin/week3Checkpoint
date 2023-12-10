import { AppState } from "../AppState.js";
import { jotServices } from "../services/JotServices.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";

function _goHome(){
    document.getElementById('Jot.').innerHTML = AppState.landing + AppState.offCanvas
    _drawJots()
    clearInterval(_lastSaved)
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

function _drawNum(){
    if(document.getElementById('jotNum').innerText) document.getElementById('jotNum').innerText = ''

    
    else document.getElementById('jotNum').innerText = `Jots: ${AppState.jots.length}`
}

let _lastSaved
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
            _lastSaved = setInterval(this.lastSaved, 1000)
        }
        if(id == 0) _goHome()

        else _drawNum()
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

    lastSaved(){
        AppState.changes = (document.getElementById('jotBox').value != AppState.activeJot.body)

        if(AppState.changes){let currentTime = new Date()
        let lastSaved = new Date(AppState.activeJot.dateUpdated)
        let time = (currentTime.getTime() - lastSaved.getTime()) / 1000
        console.log(time)

        if(time > 3600){
            document.getElementById('last-updated').innerText = `Last Saved: ${time / 3600} Hours ago`
        }
        if(time > 60){
            if(Math.floor(time / 60) == 1) document.getElementById('last-updated').innerText = `Last Saved: 1 Minute ago`
            document.getElementById('last-updated').innerText = `Last Saved: ${Math.floor(time / 60)} Minutes ago`
        }}

    }
}
