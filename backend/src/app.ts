import "dotenv/config"
import express, { NextFunction, Request, Response } from 'express';
import NoteModel from './models/note'

const app = express();


app.get('/', async (req, res, next) => {
    try {  
        // throw Error("Error")
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch(error) {
        next(error);
    }
});


//Even if next is not used, express needs these 4 arguments or it cant use this use method
//.get and .use both have middlewear that actually creates our endpoints for stuff, but error middlewear has to be specified
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "An unkonwn error occured";
    if (error instanceof Error) errorMessage = error.message
    res.status(500).json({error: errorMessage})
})

export default app;