import { JotController } from "./controllers/JotController.js";
import { Router } from "./utils/Router.js";


export const router = new Router([
  {
    path: '',
    controllers: [JotController],
    view:'app/views/Home.html'},
])
