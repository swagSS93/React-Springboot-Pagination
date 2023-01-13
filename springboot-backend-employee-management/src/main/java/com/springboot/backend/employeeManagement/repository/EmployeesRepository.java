package com.springboot.backend.employeeManagement.repository;

import com.springboot.backend.employeeManagement.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface EmployeesRepository extends PagingAndSortingRepository<Employee,Long> {
    Page<Employee> findAll(Pageable pageable);
}
