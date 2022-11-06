package com.bitproject.repository;

import com.bitproject.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    @Query("select i from Customer i where (i.regno like concat('%',:searchtext,'%') or " +
            " i.callingname like concat('%',:searchtext,'%') or "+
            " i.nic like concat('%',:searchtext,'%') or " + "i.mobile like concat('%',:searchtext,'%') or " +
            "i.customerstatus_id.name like concat('%',:searchtext,'%'))")
    Page<Customer> findAll(@Param("searchtext") String searchtext, Pageable of);



    @Query(value = "SELECT concat('C',lpad(substring(max(c.regno),2)+1,9,0)) FROM ceylon_engineering.customer as c;",nativeQuery = true)
    String getNextNumber();

    @Query(value = "SELECT new Customer (c.id,c.regno) FROM Customer c where c.customerstatus_id.id=1")
    List<Customer> list();

    @Query("select c from Customer c where c.nic=:nic")
    Customer findByNic(@Param("nic") String nic);

    @Query("select ec from Customer ec where ec.id=:exid")
    Customer getCus(@Param("exid") Integer exid);
}
