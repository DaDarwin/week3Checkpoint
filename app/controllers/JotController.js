import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js";
import { jotServices } from "../services/JotServices.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";

function _drawJots(){
    const jots = AppState.jots
    let content = ''
    jots.forEach(jot => content += jot.jotIcon)
    document.getElementById('jots').innerHTML = content
    document.getElementById('jots#').innerText = `Jots: ${AppState.jots.length}`
}

function _drawActiveJot(){
    if(AppState.activeJot){
        document.getElementById('activeJot').innerHTML = AppState.activeJot.jotBody
        document.getElementById('jotBox').value = AppState.activeJot.body}
    else{
        document.getElementById('activeJot').innerHTML = ''
    }

}

export class JotController{

    constructor(){
        AppState.on('jots', _drawJots)
        jotServices.loadJots()
        AppState.on('activeJot', _drawActiveJot)
    }



    selectJot(id){
        jotServices.selectJot(id)
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
