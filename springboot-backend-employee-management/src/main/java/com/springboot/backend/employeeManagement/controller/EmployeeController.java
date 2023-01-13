package com.springboot.backend.employeeManagement.controller;

import com.springboot.backend.employeeManagement.exception.ResourceNotFoundException;
import com.springboot.backend.employeeManagement.model.Employee;
import com.springboot.backend.employeeManagement.repository.EmployeesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    @Autowired
    EmployeesRepository employeesRepository;


    @GetMapping
    public ResponseEntity<Page<Employee>> getAllEmployees(Pageable pageable){
        return new ResponseEntity<>(employeesRepository.findAll(pageable) , HttpStatus.OK);
    }

    @PostMapping
    public Employee  createEmployee(@RequestBody Employee employee){
        return employeesRepository.save(employee);
    }

    // build get employee by id REST API
    @GetMapping("{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable  long id){
        Employee employee = employeesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id:" + id));
        return ResponseEntity.ok(employee);
    }

    // build update employee REST API
    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id,@RequestBody Employee employeeDetails) {
        Employee updateEmployee = employeesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        updateEmployee.setFirstName(employeeDetails.getFirstName());
        updateEmployee.setLastName(employeeDetails.getLastName());
        updateEmployee.setEmailId(employeeDetails.getEmailId());

        employeesRepository.save(updateEmployee);

        return ResponseEntity.ok(updateEmployee);
    }

    // build delete employee REST API
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable long id){

        Employee employee = employeesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        employeesRepository.delete(employee);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }


}
