import { RequestHandler } from "express";
import NoteModel from '../models/note'
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {  
        // throw Error("Error")
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch(error) {
        next(error);
    }
}


export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;
    
    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id")
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found")
        }
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}

interface CreateNoteBody {
    title?: string,
    text?: string,
}

//third argument is the body, which we want to use our interface against, other three are req, res, next 
//we will pass unknown here instead of any since unknown is more restrictive, since 4 values MUST be passed, all or none, can't just do one
export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    
    try {
        if (!title) {
            throw createHttpError(400, "Note must have a title")
        }

        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error)
    }
}

//noteId has to match what is in the route in terms of spelling
interface UpdateNoteParams {
    noteId: string,
}

interface UpdateNoteBody {
    title?: string,
    text?: string
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId
    const newTitle = req.body.title
    const newText = req.body.text

    
    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id")
        }

        if (!newTitle) {
            throw createHttpError(400, "Note must have title")
        }

        const note = await NoteModel.findById(noteId).exec()

        if (!note) {
            throw createHttpError(404, "Note not found")
        }

        note.title = newTitle
        note.text = newText

        //we want to update the note, so we don't have to do a fetch again later
        const updatedNote = await note.save();

        res.status(200).json(updatedNote)
    } catch (error) {
        next(error)
    }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId

    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "invalid note id")
        }

        const note = await NoteModel.findById(noteId).exec()

        if (!note) {
            throw createHttpError(404, "note not found")
        }

        await NoteModel.findByIdAndRemove(noteId)

        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

