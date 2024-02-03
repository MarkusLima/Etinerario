import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const EditClient = ({ show, handleClose, client, onSave }) => {
  const [editedClient, setEditedClient] = useState({ ...client });

  const handleSave = () => {
    onSave(editedClient);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Editar cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Card>
                <Card.Body>
                <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Markus Lima" 
                    value={editedClient.name}
                    name="name" 
                    onChange={(e) => setEditedClient({ ...editedClient, name: e.target.value })} 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="markusmak@gmail.com" 
                    value={editedClient.email}
                    name="email" 
                    onChange={(e) => setEditedClient({ ...editedClient, email: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="21996575274" 
                    value={editedClient.phone}
                    name="phone" 
                    onChange={(e) => setEditedClient({ ...editedClient, phone: e.target.value })} 
                    />
                </Form.Group>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Coordenada Latitude</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="5752" 
                            name="lat" 
                            value={editedClient.lat}
                            onChange={(e) => setEditedClient({ ...editedClient, lat: e.target.value })} 
                        />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Coordenada Longitude</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="2199" 
                            name="long" 
                            value={editedClient.long}
                            onChange={(e) => setEditedClient({ ...editedClient, long: e.target.value })} 
                        />
                    </Form.Group>
                    </Col>
                </Row>
                </Form>
                </Card.Body>
            </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            SALVAR
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditClient;