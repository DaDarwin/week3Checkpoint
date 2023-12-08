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
    title:'A',
    body:'',
    color: 'black',
    dateCreated: Date('11/1/20'),
    dateUpdated: Date('12/7/21')
    }),
    new Jot({
    title:'A',
    body:'',
    color: 'black',
    dateCreated: Date('11/1/20'),
    dateUpdated: Date('12/7/21')
    }),
    new Jot({
    title:'A',
    body:'',
    color: 'black',
    dateCreated: Date('11/1/20'),
    dateUpdated: Date('12/7/21')
    }),
    new Jot({
    title:'A',
    body:'',
    color: 'black',
    dateCreated: Date('11/1/20'),
    dateUpdated: Date('12/7/21')
    }),
  ]
  /**@type {Jot} */
  activeJot = null
}
export const AppState = createObservableProxy(new ObservableAppState())