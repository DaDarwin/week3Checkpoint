import { AppState } from "../AppState.js";
import { JotController } from "../controllers/JotController.js";
import { Jot } from "../models/Jot.js";
import { loadState, saveState } from "../utils/Store.js";



class JotServices{

    selectJot(id){
        AppState.activeJot = AppState.jots.find(jot => jot.id == id)
    }

    saveActive(){
        const active = AppState.activeJot
        active.body = document.getElementById('jotBox').value
        active.dateUpdated = Date()

        AppState.jots.forEach(jot => console.log('Index:',jot.id))
        let i = AppState.jots.findIndex(jot => jot.id == active.id)

        if(i >= 0){
            AppState.jots[i] = active
            AppState.emit('activeJot')
            this.saveJots()}
        else{
            /**TODO - File Not Found Popup */
        }
    }

    saveJots(){
        saveState('Jots', AppState.jots)
        console.log('saved')
      }
    
      loadJots(){
        const coldJots = loadState('Jots', [Jot])
        AppState.jots = coldJots
      }

    addJot(newJot){
        AppState.jots.push(new Jot(newJot))
        this.saveJots()
    }

    deleteJot(id){  
        const i = AppState.jots.findIndex(jot => jot.id == id)
        AppState.jots.splice(i,1)
        this.saveJots()
        if(id == AppState.activeJot.id){
            AppState.activeJot = null
        }
    }

}

export const jotServices = new JotServices()