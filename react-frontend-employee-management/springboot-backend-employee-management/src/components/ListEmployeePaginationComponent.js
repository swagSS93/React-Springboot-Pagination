import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
import Button from "react-bootstrap/Button";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";

const ListEmployeePaginationComponent = () => {

  const [page,setPage] = useState(0)
  const [size, setSize] = useState(4)

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 4,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function(page, sizePerPage) {
      page = page - 1;
      setPage(page)
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function(page, sizePerPage) {
      setSize(sizePerPage)
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  const onUpdate = (row, rowIndex, formatExtraData) => {
    return (
      <Button href= {`/update-employee/${rowIndex.id}`} variant="primary"
      >
        Update
      </Button>
    );
  };

  const deleteEmployee = (employeeId) => {
    EmployeeService.deleteEmployee(employeeId).then((response) =>{
     getAllEmployees();
 
    }).catch(error =>{
        console.log(error);
    })
     
 };
 
  const onDelete = (row, rowIndex, formatExtraData) => {
    return (
      <Button variant="primary" onClick={() => deleteEmployee(rowIndex.id)}
      >
        Delete
      </Button>
    );
  };

  const columns = [
    { dataField: "id", text: "Employee Id" },
    { dataField: "firstName", text: "Employee First Name" , sort: true},
    { dataField: "lastName", text: "Employee Last Name" },
    { dataField: "emailId", text: "Employee Email Id" },
    {
      dataField: "update",
      text: "Update",
      formatter: onUpdate
    },
    {
      dataField: "delete",
      text: "Delete",
      formatter: onDelete,
    }
  ];


  const [empployees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {

      // EmployeeService.getAllEmployees()
      // .then((response) => {
      //   setEmployees(response.data.content);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
    
      EmployeeService.getAllEmployeesWithPagination(page,size)
      .then((response) => {
        setEmployees(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

   {
    return (
      <div className="container">
        <h2 className="text-center">List Employees</h2>
        <Button href="/add-employee">Add Employee</Button>
        <h2></h2>
        <BootstrapTable
          striped 
          hover
          keyField="id"
          data={empployees}
          columns={columns}
          pagination={pagination}
        />
      </div>
    );
  }
};

export default ListEmployeePaginationComponent;
