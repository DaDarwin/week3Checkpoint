import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js";
import { jotServices } from "../services/JotServices.js";

function _drawJots(){
    const jots = AppState.jots
    // console.log(jots)
    let content = ''
    jots.forEach(jot => content += jot.jotIcon)
    // console.log(content)
    document.getElementById('jots').innerHTML = content
    // AppState.jots[1].Jotdate
}

function _drawActiveJot(){
    document.getElementById('activeJot').innerHTML = AppState.activeJot.jotBody
}

export class JotController{

    constructor(){
        _drawJots()
        AppState.on('activeJot', _drawActiveJot)
        AppState.on('jots', _drawJots)
    }



    selectJot(id){
        // console.log(id)
        jotServices.selectJot(id)
    }
}