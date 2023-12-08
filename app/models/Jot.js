import { generateId } from "../utils/GenerateId.js"

export class Jot{

    constructor(data){
        this.title = data.title
        this.body = data.body
        this.id = generateId()
        this.color = data.color
        this.dateCreated = data.dateCreated
        this.dateUpdated = data.dateUpdated
    }

    // get Jotdate(){
    //     // console.log(this.dateCreated)
    // }

    get jotIcon(){
        return `
        <div class="col-2 bg-dark text-light rounded py-2 px-4 m-1 icon">
            <div class="row align-items-baseline" >
                <h4 class="w-75">${this.title}</h4>
                <button class="w-25 btn btn-outline-danger"><i class="mdi mdi-trash-can-outline"></i></button>
            </div>
            <div>
            </div>
            </div>
            `
            // <h5>${this.dateUpdated}</h5>
    }

    get jotBody(){
        return `
            <div>
                        
            </div>`
    }
}