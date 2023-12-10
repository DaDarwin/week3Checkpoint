import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js";
import { loadState, saveState } from "../utils/Store.js";

class JotServices{
    
    constructor(){
    }
    
    selectJot(id){
        AppState.activeJot = AppState.jots.find(jot => jot.id == id)
        if(AppState.pref.autoSave.state){
            AppState.pref.autoSave.function = setInterval( this.saveActive, AppState.pref.autoSave.autoSaveInterval)
        }
    }

    saveActive(){
        const active = AppState.activeJot
        active.body = document.getElementById('jotBox').value
        active.dateUpdated = new Date()

        let i = AppState.jots.findIndex(jot => jot.id == active.id)

        if(i >= 0){
            AppState.jots[i] = active
            AppState.emit('activeJot')
            // Called it this way so the autosave interval can access it
            jotServices.saveJots()
            // **TODO - Notification
        }
    }

    saveJots(){
        saveState('Jots', AppState.jots)
      }
    //*STUB - Naming convention is irrelevant in the case of funny miss-clicks
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

    autoSave(){
        if(!AppState.pref.autoSave.state){
            AppState.pref.autoSave.function =  setInterval(this.saveActive, AppState.pref.autoSave.interval)
            AppState.pref.autoSave.state = true
            this.savePref()
        }
        else {
            clearInterval(AppState.pref.autoSave.function)
            AppState.pref.autoSave.state = false
            this.savePref()
        }
    }

    savePref(){
        saveState('pref', AppState.pref)
    }

    loadPref(){
        AppState.pref = loadState('pref', Object)
    }

}

export const jotServices = new JotServices()