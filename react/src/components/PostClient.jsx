import axios from "axios";
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const PostClient = () => {
  
    const [client, setClient] = useState({
      name: '',
      email: '',
      phone: '',
      lat: '',
      long: '',
    })

    const createClient = async () => {
      await axios.post(
        "http://localhost:8000/api/client", 
        client,
        {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}}
      )
      .then((response) => {
        setClient({name: '', email: '', phone: '', lat: '', long: ''});
        console.log(response)
        return alert("Client Created: " + `${JSON.stringify(response.data, null,4)}`);
      })
      .catch((err) => {
        return alert(err);
      });
    }

    return (
      < >
        <Card>
          <Card.Body>
            <Card>
            <Card.Header>
              <Container>
                <Row>
                  <Col xs={6} md={6}>Criar cliente</Col>
                </Row>
              </Container>
            </Card.Header>
            <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Markus Lima" 
                  value={client.name}
                  name="name" 
                  onChange={(e) => setClient({...client, name: e.target.value})} 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="markusmak@gmail.com" 
                  value={client.email}
                  name="email" 
                  onChange={(e) => setClient({...client, email: e.target.value})} 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="21996575274" 
                  value={client.phone}
                  name="phone" 
                  onChange={(e) => setClient({...client, phone: e.target.value})} 
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
                      value={client.lat}
                      onChange={(e) => setClient({...client, lat: e.target.value})} 
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
                      value={client.long}
                      onChange={(e) => setClient({...client, long: e.target.value})} 
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end">
              <Button variant="primary"  type="button"  onClick= {()=>createClient()}>
                ENVIAR
              </Button>
            </Card.Footer>
            </Card>
          </Card.Body>
        </Card>
      </>
      );
  };
  
  export default PostClient;