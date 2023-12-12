import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js";
import { loadState, saveState } from "../utils/Store.js";
import { Pop } from "../utils/Pop.js";

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
            Pop.toast(`${AppState.activeJot.title} Saved`)
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
            clearInterval(AppState.updateDom)
        }
    }

    autoSave(){
        if(!AppState.pref.autoSave.state){
            AppState.pref.autoSave.function =  setInterval(this.saveActive, AppState.pref.autoSave.interval)
            AppState.pref.autoSave.state = true
            this.savePref()
            Pop.toast(`Autosave On`)
        }
        else {
            clearInterval(AppState.pref.autoSave.function)
            AppState.pref.autoSave.state = false
            this.savePref()
            Pop.toast('Autosave Off')
        }
    }

    savePref(){
        saveState('pref', AppState.pref)
    }

    loadPref(){
        AppState.pref = loadState('pref', Object)
    }

    wordCount(body){
        let words = body.split(' ')
        if(words[0] == ''){
            AppState.activeJot.wordCount = 0
        }
        if(words[0]){
            AppState.activeJot.wordCount = words.length
        }
    }

    saveTime(){
        AppState.activeJot.dateUpdated = new Date()
    }

    // highlight(){
    //     let words = AppState.activeJot.body.split(' ')
    //     let highlightedWords = words.map(word => {

    //         let highlighter = AppState.highlightersStart.includes(word.toLowerCase())
    //         highlighter ? `<span style="color:${AppState.activeJot.color};">` : word

    //         highlighter = AppState.highlightersEnd.includes(word.toLowerCase())
    //         return highlighter ? `</span>`: word
    //     })
    //     console.log(highlightedWords)
    //     return highlightedWords.join(' ')
    // }



}

export const jotServices = new JotServices()