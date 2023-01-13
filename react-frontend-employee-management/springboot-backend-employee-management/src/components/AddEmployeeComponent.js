import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';

const AddEmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
   
    const form = event.currentTarget;
    console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      alert('Enter values')
    }
    else{
        setValidated(true);
        saveOrUpdateEmployee(event)
    }
    
  };

  const onReset = (e) => {
    setFirstName('')
    setLastName('')
    setEmailId('')
  }

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, emailId };

    if (id) {
      EmployeeService.updateEmployee(id, employee)
        .then((response) => {
          navigate("/employees/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      EmployeeService.createEmployee(employee)
        .then((response) => {
          console.log(response.data);

          navigate("/employees");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    EmployeeService.getEmployeeById(id)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmailId(response.data.emailId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = () => {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label> First Name :</Form.Label>
                  <InputGroup hasValidation>
                  <Form.Control type="text" placeholder="Enter first name" 
                   value = {firstName}
                   onChange = {(e) => setFirstName(e.target.value)}
                   required/>
                   <Form.Control.Feedback type="invalid">
                        Please enter first name.
            </Form.Control.Feedback>
                  </InputGroup>
                 
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label> Last Name :</Form.Label>
                  <InputGroup hasValidation>
                  <Form.Control type="text" placeholder="Enter last name"
                   value = {lastName}
                   onChange = {(e) => setLastName(e.target.value)} 
                   required/>
                <Form.Control.Feedback type="invalid">
                        Please enter first name.
            </Form.Control.Feedback>
                  </InputGroup>
                  </Form.Group>  
                <Form.Group className="mb-3" controlId="emailId">
                  <Form.Label>Email address</Form.Label>
                  <InputGroup hasValidation>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  <Form.Control type="email" placeholder="Enter email"
                   value = {emailId}
                   onChange = {(e) => setEmailId(e.target.value)} 
                   required/>
                  <Form.Control.Feedback type="invalid">
                        Please enter email.
            </Form.Control.Feedback>
                  </InputGroup>
                  
                </Form.Group>
                
                <button 
                  type="submit"
                  href="/employees"
                  className="btn btn-success"
                  
                >
                  Submit{" "}
                </button >{" "}
                <Button 
                  variant="primary"
                  onClick={onReset}
                >
                  Reset{" "}
                </Button >{" "}
                <Button href="/employees" variant="danger">
                  Cancel
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeComponent;
