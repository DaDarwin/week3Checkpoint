import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js";
import { loadState, saveState } from "../utils/Store.js";



class JotServices{

    selectJot(id){
        AppState.activeJot = AppState.jots.find(jot => jot.id == id)
    }

    saveActive(){
        console.log('List:',AppState.jots)
        const active = AppState.activeJot

        console.log('Temp Before',active)
        active.body = document.getElementById('jotBox').value
        active.dateUpdated = Date()
        console.log('Temp After',active)

        AppState.jots.forEach(jot => console.log('Index:',jot.id))
        let i = AppState.jots.findIndex(jot => jot.id == active.id)

        if(i >= 0){
            console.log('AppState Before',AppState.jots[i])
            AppState.jots[i] = active
            console.log('AppState After',AppState.jots[i])
            console.log('List:',AppState.jots)
            AppState.emit('activeJot')
            this.saveJots()}
    }

    saveJots(){
        saveState('Jots', AppState.jots)
      }
    
      loadJots(){
        const coldJots = loadState('Jots', [Jot])
        AppState.Jots = coldJots
      }

}

export const jotServices = new JotServices()