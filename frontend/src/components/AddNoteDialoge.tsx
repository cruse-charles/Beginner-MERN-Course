import React from "react";
import { Modal } from "react-bootstrap";

interface AddNoteDialogeProps {
  onDismiss: () => void;
}

const AddNoteDialoge = ({ onDismiss }: AddNoteDialogeProps) => {
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default AddNoteDialoge;
