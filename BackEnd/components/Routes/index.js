import postResume from "./postResume.js";

export default function Routes(app){
    app.use('/', postResume)
}