import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js";
import { jotServices } from "../services/JotServices.js";

function _drawJots(){
    const jots = AppState.jots
    let content = ''
    jots.forEach(jot => content += jot.jotIcon)
    document.getElementById('jots').innerHTML = content
}

function _drawActiveJot(){
    document.getElementById('activeJot').innerHTML = AppState.activeJot.jotBody
    document.getElementById('jotBox').value = AppState.activeJot.body
}

export class JotController{

    constructor(){
        jotServices.loadJots()
        _drawJots()
        AppState.on('activeJot', _drawActiveJot)
        AppState.on('jots', _drawJots)
    }



    selectJot(id){
        jotServices.selectJot(id)
    }

    saveActive(){
        jotServices.saveActive()
    }
}