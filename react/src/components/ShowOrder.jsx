import axios from "axios";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const ShowOrder = ({ show, handleClose }) => {
  const [orders, setAllOrder] = useState([]);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = () => {
    axios.get(
      `http://localhost:8000/api/calc`
    ).then((response) => { 
      console.log(response.data.data)
      setAllOrder(response.data.data || []);
    }
    ).catch((err) => console.error(err));
  };

  return (
    <>
      <Modal show={show} size="lg" onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Etinerário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
            <Card.Text>
              <div>
                <Table responsive="xl">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Origem</th>
                      <th>Origem X</th>
                      <th>Origem Y</th>
                      <th>Destino</th>
                      <th>Destino X</th>
                      <th>Destino Y</th>
                    </tr>
                  </thead>
                  <tbody>
                  {orders && orders.map((order, idx) => 
                    <tr key={idx + 1}>
                      <td>{idx}</td>
                      <td>{order.coordenada.id }</td>
                      <td>{order.coordenada.x }</td>
                      <td>{order.coordenada.y }</td>
                      <td>{order.coordenadaMaisProxima && order.coordenadaMaisProxima.id ? order.coordenadaMaisProxima.id : "0"}</td>
                      <td>{order.coordenadaMaisProxima && order.coordenadaMaisProxima.x ? order.coordenadaMaisProxima.x : "0"}</td>
                      <td>{order.coordenadaMaisProxima && order.coordenadaMaisProxima.y ? order.coordenadaMaisProxima.y : "0"}</td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowOrder;