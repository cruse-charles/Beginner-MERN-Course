//mongodb automatically exports id with a _, so we need this
//when we turn to json, these dates go into string format
export interface Note {
    _id: string,
    title: string,
    text?: string,
    createdAt: string,
    updatedAt: string
}