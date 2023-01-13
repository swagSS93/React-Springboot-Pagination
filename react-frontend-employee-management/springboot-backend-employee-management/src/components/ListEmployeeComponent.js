import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const ListEmployeeComponent = () => {
  const [empployees, setEmployees] = useState([]);

  useEffect(() => {

    getAllEmployees();
}, [])

const getAllEmployees = () => {
    EmployeeService.getAllEmployees().then((response) => {
        setEmployees(response.data.content)
    }).catch(error =>{
        console.log(error);
    })
}

const deleteEmployee = (employeeId) => {
   EmployeeService.deleteEmployee(employeeId).then((response) =>{
    getAllEmployees();

   }).catch(error =>{
       console.log(error);
   })
    
}
{
  return (
  <div className = "container">
    <h2 className="text-center">List Employees</h2>
    <Button href="/add-employee">Add Employee</Button>
    <h2></h2>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th> Employee Id </th>
          <th> Employee First Name </th>
          <th> Employee Last Name </th>
          <th> Employee Email Id </th>
          <th> Actions</th>
        </tr>
      </thead>
      <tbody>
        { 
        empployees.map(employee => (
          <tr key={employee.id}>
            <td> {employee.id} </td>
            <td> {employee.firstName} </td>
            <td> {employee.firstName} </td>
            <td>{employee.lastName}</td>
            <td>{employee.emailId}</td>
            <td>
              <Button href= {`/update-employee/${employee.id}`} variant="primary">
                Update{" "}
              </Button>{" "}
              <Button variant="secondary" onClick={() => deleteEmployee(employee.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);
}
  
};

export default ListEmployeeComponent;
