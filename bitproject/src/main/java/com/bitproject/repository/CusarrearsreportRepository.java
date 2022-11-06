package com.bitproject.repository;

import com.bitproject.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CusarrearsreportRepository extends JpaRepository<Customer,Integer> {

//    @Query(value = "SELECT c.regno,c.fullname,c.arrearsamount FROM ceylon_engineering.customer as c",nativeQuery = true)
//    List customerArrearsList();
    @Query(value = "select new Customer (c.fullname,c.arrearsamount) FROM Customer c where c.customerstatus_id.id=1")
    List<Customer> customerArrearsList();
}
