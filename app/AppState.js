import { Jot } from './models/Jot.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  /**@type {import('./models/Example.js').Example[]} */
  examples = []
  
  jots = [
    new Jot({
    title:'A',
    body:'',
    color: 'black',
    dateCreated: Date('11/1/20'),
    dateUpdated: Date('12/7/21')
    }),
    new Jot({
    title:'b',
    body:'',
    color: 'black',
    dateCreated: Date('11/1/20'),
    dateUpdated: Date('12/7/21')
    }),
    new Jot({
    title:'c',
    body:'',
    color: 'black',
    dateCreated: Date('11/1/20'),
    dateUpdated: Date('12/7/21')
    }),
    new Jot({
    title:'c',
    body:'',
    color: 'black',
    dateCreated: Date('11/1/20'),
    dateUpdated: Date('12/7/21')
    }),
    new Jot({
      title:'d',
      body:'',
      color: 'black',
      dateCreated: Date('11/1/20'),
      dateUpdated: Date('12/7/21')
    }),
  ]
  /**@type {Jot} */
  activeJot = null
  
  landing = `<div id="landing" class="landing d-flex justify-content-center align-items-center">
  <span class="landing-logo p-0 border-bottom border-3 border-light bg-dark px-3 pb-1" data-bs-toggle="offcanvas" data-bs-target="#jotList">J<i class="mdi mdi-circle-edit-outline"></i>T.</span>
  </div>`

  nav = `  <nav id="nav" class="d-flex justify-content-between align-items-baseline border-bottom border-2 border-light my-2 p-1">

  <button class="btn btn-outline-light px-2 py-0 m-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#jotList" aria-controls="offcanvasExample">
    <i class="fs-3 mdi mdi-menu"></i>
  </button>

  <h1 class="jot-logo border-bottom border-light" onclick="app.JotController.selectJot(null)">J<i class="mdi mdi-circle-edit-outline fs-3"></i>T.</h1>

  <button class="btn btn-outline-light px-2 py-0 m-2" onclick="app.JotController.saveActive()">
    <i class="fs-3 mdi mdi-floppy"></i>
  </button>
</nav>

<div class="m-0 bg-dark text-light d-flex justify-content-center activeJot" id="activeJot"></div>`

}
export const AppState = createObservableProxy(new ObservableAppState())