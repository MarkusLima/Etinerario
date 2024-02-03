import axios from "axios";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FilterClients from '../components/FilterClients';
import EditClient from '../components/EditClient';
import ShowOrder from '../components/ShowOrder';

const GetAllClient = () => {

  const [clients, setAllClient] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterValues, setFilterValues] = useState({
    name: '', email: '', phone: ''
  });
  const [configPages, setConfigPages] = useState({
    totalPages: 0, totalItens: 0, pageCurrent: 1, totalItensPage: 0
  });
  const [pageCurrent, setPageCurrent] = useState(1);
  const [selectedClient, setSelectedClient] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  useEffect(() => {
    getallClients();
  }, [filterValues, pageCurrent]);

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  const handleFilterSearch = (name, email, phone) => {
    setFilterValues({name:name, email:email, phone:phone});
    setPageCurrent(1);
  };

  const getallClients = () => {
    axios.get(
      `http://localhost:8000/api/client?name=${filterValues.name}&email=${filterValues.email}&phone=${filterValues.phone}&page=${pageCurrent}`
    ).then((response) => { 
      setAllClient(response.data.data.body || []);
      setConfigPages({
        totalPages: response.data.data.totalPages,
        totalItens: response.data.data.totalItens,
        pageCurrent: response.data.data.pageCurrent,
        totalItensPage: response.data.data.totalItensPage
      })
    }
    ).catch((err) => console.error(err));
  };

  const deleteClient = async (id) => {
    await axios.delete(
      `http://localhost:8000/api/client/${id}`, 
      {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}}
    )
    .then((response) => {
      return alert("Client Deleted: " + `${JSON.stringify(response.data, null,4)}`);
    })
    .catch((err) => {
      return alert(err);
    });
    getallClients();
  }

  const paginate = (pageNumber) => {
    setPageCurrent(pageNumber)
  }

  const pages = () => {
    let paginationItems = [];
  
    for (let i = 1; i <= configPages.totalPages; i++) {
      paginationItems.push(
        <Pagination.Item key={i} active={i === pageCurrent} onClick={() => paginate(i)}>
          {i}
        </Pagination.Item>
      );
    }
  
    return paginationItems;
  };

  const handleEditClient = (cli) => {
    setSelectedClient(cli);
  };

  const handleSaveEditedClient = async (editedClient) => {
    await axios.put(
      `http://localhost:8000/api/client/${editedClient.id}`, 
      editedClient,
      {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}}
    )
    .then((response) => {
      return alert("Client Edited: " + `${JSON.stringify(response.data, null,4)}`);
    })
    .catch((err) => {
      return alert(err);
    });
    getallClients();
  };

  const handleShowOrder = () => {
    setShowOrder(true);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card>
            <Card.Header>
              <Container>
                <Row>
                  <Col xs={6} md={2}>Lista de Clientes</Col>
                  <Col xs={6} md={2}><small>Total Itens: {configPages.totalItens}</small></Col>
                  <Col xs={6} md={2}><small>Itens por pagina: {configPages.totalItensPage}</small></Col>
                  <Col xs={6} md={2}><small>Pagina atual: {configPages.pageCurrent}</small></Col>
                  <Col xs={6} md={2}><small>Total paginas: {configPages.totalPages}</small></Col>
                  <Col xs={6} md={1}>
                    <Button variant="secondary" size="sm" className="me-2"
                      onClick={handleFilterToggle}>
                      Pesquisar
                    </Button>
                  </Col>
                  <Col xs={6} md={1}>
                    <Button variant="secondary" size="sm" className="me-2"
                      onClick={handleShowOrder}>
                      Calcular Ordem
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Card.Header>
            <Card.Body>
              <Card.Text>
              <div>
                <Table responsive="xl">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                  {clients && clients.map(client => 
                    <tr key={client.id}>
                      <td>{client.id}</td>
                      <td>{client.name}</td>
                      <td>{client.email}</td>
                      <td>{client.phone}</td>
                      <td>{client.lat}</td>
                      <td>{client.long}</td>
                      <td>
                      <ButtonGroup size="sm">
                        <Button variant="primary" onClick={() => handleEditClient(client)}>EDITAR</Button>
                        <Button variant="danger" onClick= {()=>deleteClient(client.id)}>APAGAR</Button>
                      </ButtonGroup>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </div>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              <Pagination>
                {pages()}
              </Pagination>
            </Card.Footer>
          </Card>
        </Card.Body>
      </Card>

      {showFilter && (
        <FilterClients 
          onHide={handleFilterClose}
          onSearch={handleFilterSearch}
          
        />
      )}

      {selectedClient && (
        <EditClient
          show={selectedClient}
          handleClose={() => setSelectedClient(false)}
          client={selectedClient}
          onSave={handleSaveEditedClient}
        />
      )}

      {showOrder && (
        <ShowOrder
          show={showOrder}
          handleClose={() => setShowOrder(false)}
        />
      )}

    </>
    );
  };
  
  export default GetAllClient;