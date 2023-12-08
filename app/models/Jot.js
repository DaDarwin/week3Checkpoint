import { generateId } from "../utils/GenerateId.js"

export class Jot{

    constructor(data){
        this.title = data.title
        this.body = data.body || ''
        this.id = data.id || generateId()
        this.color = data.color
        this.dateCreated = data.dateCreated || Date()
        this.dateUpdated = data.dateUpdated || ''
    }

    // get Jotdate(){
    //     // console.log(this.dateCreated)
    // }

    get jotIcon(){
        return `
        <div class="col-2 bg-dark text-light rounded py-2 px-4 m-1 mb-2 icon border border-light">

            <div class="row align-items-baseline ">

                <div class="w-75" onclick="app.JotController.selectJot('${this.id}')" data-bs-toggle="offcanvas">
                    <h4>${this.title}</h4>
                </div>      

                <button class="w-25 btn btn-outline-danger" onclick="app.JotController.deleteJot('${this.id}')">
                    <i class="mdi mdi-trash-can-outline"></i>
                </button>

            </div>
        </div>
            `
            // <h5>${this.dateUpdated}</h5>
    }

    get jotBody(){
        return `
        <div class="w-75" id="activeJot">

        <div class="d-flex justify-content-between border-bottom border-2 border-light mb-3">
          <h1>${this.title}</h1> 
          <h3>${this.dateUpdated}</h3>
        </div>
  
        <div class="form-floating">
        <label class="text-center w-100 h-100" for="jotBox">Jot it down!</label>
        <textarea class="form-control bg-dark w-100 text-light jotBox" placeholder="Leave a comment here" id="jotBox"></textarea>
        </div>
      </div>`
    }
}