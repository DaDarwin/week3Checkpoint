import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js";



class JotServices{

    selectJot(id){
        AppState.activeJot = AppState.jots.find(jot => jot.id == id)
    }

}

export const jotServices = new JotServices()