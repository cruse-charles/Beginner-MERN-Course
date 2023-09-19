import "dotenv/config"
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from "./routes/notes";
import morgan from "morgan"
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"))

app.use(express.json())

app.use("/api/notes", notesRoutes)

//We want this route & middleware here to catch when users go to endpoints we don't define, which is why we have no endpoint listed, but we want before the error handler so that we can keep forwarding the error
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"))
})

//Even if next is not used, express needs these 4 arguments or it cant use this use method
//.get and .use both have middlewear that actually creates our endpoints for stuff, but error middleware has to be specified
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "An unkonwn error occured";
    let statusCode = 500
    if (isHttpError(error)) {
        statusCode = error.status
        errorMessage = error.message
    } 
    res.status(statusCode).json({error: errorMessage})
})

export default app;