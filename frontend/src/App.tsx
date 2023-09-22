import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Note as NoteModel } from "./models/notes";
import Note from "./components/Notes";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialoge from "./components/AddNoteDialoge";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    loadNotes();
  }, []);

  return (
    <Container>
      <Button
        onClick={() => {
          setShowAddNoteDialog(true);
        }}
      >
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col>
            <Note note={note} key={note._id} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialoge
          onNoteSaved={(newNote) => {
            setShowAddNoteDialog(false);
            setNotes([...notes, newNote]);
          }}
          onDismiss={() => {
            setShowAddNoteDialog(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
