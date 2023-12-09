import { AppState } from "../AppState.js";
import { jotServices } from "../services/JotServices.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";

function _goHome(){
    document.getElementById('Jot.').innerHTML = AppState.landing + AppState.offCanvas
    _drawJots()
}
function _drawJots(){
    const jots = AppState.jots
    let content = ''
    jots.forEach(jot => content += jot.jotIcon)
    document.getElementById('jots').innerHTML = content
}
/**NOTE - Ask for a better way */
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


export class JotController{

    constructor(){
        _goHome()
        AppState.on('jots', _drawJots)
        jotServices.loadJots()
        AppState.on('activeJot', _drawActiveJot)
    }



    selectJot(id){
        if(id != 0 && 1){
            jotServices.selectJot(id)
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
       if(await Pop.confirm('Are You Sure?', "This Jot will be lost forever(That's a long time).", "Yes, I'm Sure")){
        jotServices.deleteJot(id)
       }
    }
}
