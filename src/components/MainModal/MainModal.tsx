import React, { ChangeEvent, FC, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

interface Props {
  selectedDueDate?: string
  onDateChange?: (date: string) => void;
  type: 'create' | 'update' | 'delete';
  callBack: () => void;
  title?: string;
  description?: string;
  resetStates?: () => void;
  onTitleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const MainModal: FC<Props> = (
  {
    selectedDueDate,
    onDateChange,
    type,
    callBack,
    title,
    description,
    resetStates,
    onTitleChange,
    onDescriptionChange,
  },
) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    if (resetStates) {
      resetStates();
    }

    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (onDateChange && selectedDueDate) {
      onDateChange(selectedDueDate);
    }

    callBack();
    setShow(false);
  };

  let actionText;

  switch (type) {
    case 'create':
      actionText = 'Create';
      break;
    case 'update':
      actionText = 'Update';
      break;
    case 'delete':
      actionText = 'Delete';
      break;
    default:
      actionText = '';
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {actionText}
        {' '}
        task
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {actionText}
            {' '}
            task
          </Modal.Title>
        </Modal.Header>
        {type !== 'delete' && (
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Task Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={onTitleChange}
                  placeholder="Enter title"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Task Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={onDescriptionChange}
                  rows={3}
                  placeholder="Enter description"
                />
              </Form.Group>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
              >
                <input
                  style={{
                    width: '220px',
                  }}
                  type="date"
                  value={selectedDueDate}
                  onChange={
                    (e: ChangeEvent<HTMLInputElement>) => (
                      onDateChange && onDateChange(e.target.value))
                  }
                />
              </div>
            </Form>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
