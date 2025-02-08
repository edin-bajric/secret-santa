import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../assets/css/login-registration.css";

function Register() {
  return (
    <div className="full-page-container">
      <div className="centered-form-container">
        <h1 className="title">Register</h1>
        <Form>
          <div className="mb-3 d-flex">
           
            <Form.Control type="text" placeholder="Name" className="me-2" />
            
            <Form.Control type="text" placeholder="Surname" />
          </div>
          <Form.Group className="mb-3">
        
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3" >
          
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
