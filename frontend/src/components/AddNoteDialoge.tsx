import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface AddNoteDialogeProps {
  onDismiss: () => void;
}

const AddNoteDialoge = ({ onDismiss }: AddNoteDialogeProps) => {
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addNoteForm">
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder="Text" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addNoteForm">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNoteDialoge;
