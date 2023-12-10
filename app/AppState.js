import { Jot } from './models/Jot.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  /**@type {import('./models/Example.js').Example[]} */
  examples = []
  
  jots = []

  /**@type {Jot} */
  activeJot = null
  
  updateDom = null

  pref = {
    autoSave: {
      name: 'autosave',
      state: true,
      interval: 60000,
      function:null,
    }
  
  }
  
  changes = false

  dropDownOn = false

  highlightersStart = ['!jot', '!j']

  highlightersEnd = ['jot!', 'j!']

  landing = `<div id="activeJot" class="row justify-content-center"><div id="landing" class="landing d-flex justify-content-center align-items-center">
    <span class="landing-logo p-0 border-bottom border-3 border-light bg-dark px-3 pb-1" data-bs-toggle="offcanvas" data-bs-target="#jotList">J<i class="mdi mdi-circle-edit-outline"></i>T.</span>
    </div></div>`

  nav = `  <nav id="nav" class="d-flex justify-content-between align-items-baseline border-bottom border-2 border-light my-2 p-1">

  <button class="btn btn-outline-light px-2 py-0 m-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#jotList" aria-controls="offcanvasExample">
    <i class="fs-3 mdi mdi-menu"></i>
  </button>

  <h1 class="jot-logo border-bottom border-light" onclick="app.JotController.selectJot(null)">J<i class="mdi mdi-circle-edit-outline fs-3"></i>T.</h1>

  <div>

    <button class="btn btn-outline-light px-2 py-0 m-2" onclick="app.JotController.autoSave()" title="Auto-Save">
      <i class="fs-3 mdi mdi-content-save-cog-outline"></i>
    </button>

    <button class="btn btn-outline-light px-2 py-0 m-2" onclick="app.JotController.saveActive()" title="Save">
      <i class="fs-3 mdi mdi-floppy"></i>
    </button>

  </div>
</nav>

    <div class="m-0 bg-dark text-light d-flex justify-content-center activeJot" id="activeJot"></div>`

  offCanvas = `<div class="offcanvas offcanvas-start bg-dark text-light" tabindex="-1" id="jotList" aria-labelledby="jotCanvas">
    
  <div class="offcanvas-header border-bottom border-2 border-light">
    
      <h1 class="offcanvas-title jot-logo" id="jotCanvas" onclick="app.JotController.selectJot(1)" title="Show Number of Jots">J<i class="mdi mdi-circle-edit-outline fs-3"></i>T.</h1>

      <button type="button" class="btn btn-outline-light px-3" data-bs-dismiss="offcanvas" aria-label="Close" title="Close Menu"> <i class="mdi mdi-window-close fs-4"></i> </button>
      
  </div>
  
  <div id="dropdown" class="d-flex offcanvas"> </div>

      <div class="d-flex flex-column justify-content-between sidebar">

      
      <div class="offcanvas-body" id="jots"></div>

      <div class="container-fluid">
        <form onsubmit="app.JotController.addJot()" id="addJot" class="row border border-light p-2 rounded">
          <div class="w-100 ">
            <input id="title" required type="text" minlength="3" maxlength="15" class="form-control w-100 m-1 px-5" name="title" title="Name Your Jot">
          </div>
          <div class="d-flex justify-content-around w-100 px-2">
            <input type="color" name="color" class="form-control h-75 w-50 m-1 bg-dark" title="Choose a Jot Color" value="#e9ecef">
            <select name="type" class="form-control h-75 w-25 m-1 bg-dark text-light">
              <option value="mdi mdi-file-outline">Jot</option>
              <option value="mdi mdi-file-account-outline">Personal Jot</option>
              <option value="mdi mdi-file-cog-outline">Important Jot</option>
            </select>
            <button class="btn btn-outline-light rounded-end-3 h-75 w-25 m-1" title="New Jot"><i class="mdi mdi-file"></i></button>
          </div>
        </form>
      </div>

    </div>
    
    </div>`

  dropDown = `
    <h5 id="num" class="m-2"></h5>
    
    <select id="types"></select>`

}
export const AppState = createObservableProxy(new ObservableAppState())