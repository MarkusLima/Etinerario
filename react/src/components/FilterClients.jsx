import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function FilterClients({ onHide, onSearch, ...props }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    onHide && onHide();
  };

  const handleSearch = () => {
    onSearch(name, email, phone); // Passe os valores do filtro para a função de pesquisa
    handleClose(); // Feche o Offcanvas após a pesquisa
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end" {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtrar Clientes</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form.Label htmlFor="search_name">Nome</Form.Label>
          <Form.Control
            type="text"
            id="search_name"
            value={name}
            onChange={(e) => setName(e.target.value )}
          />
          <Form.Label htmlFor="search_email">Email</Form.Label>
          <Form.Control
            type="text"
            id="search_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label htmlFor="search_phone">Telefone</Form.Label>
          <Form.Control
            type="text"
            id="search_phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <hr />
          <div className='d-flex justify-content-end'>
            <Button variant="primary" type="button" onClick={handleSearch}>
              Pesquisar
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default FilterClients;