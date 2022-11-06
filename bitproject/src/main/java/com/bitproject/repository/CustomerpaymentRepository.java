package com.bitproject.repository;

import com.bitproject.model.Customerpayment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerpaymentRepository extends JpaRepository<Customerpayment,Integer> {

//
    @Query("select p from Customerpayment p where (p.billcode like concat('%',:searchtext,'%') or " +
            " p.reservation_id.reservationcode like concat('%',:searchtext,'%') or "+
            " p.paymentmethod_id.name like concat('%',:searchtext,'%') or " + "p.paymentcategory_id.name like concat('%',:searchtext,'%') or " +
            "p.paymentstatus_id.name like concat('%',:searchtext,'%'))")
    Page<Customerpayment> findAll(@Param("searchtext") String searchtext, Pageable of);

    @Query(value = "SELECT concat('B',lpad(substring(max(cp.billcode),2)+1,9,0)) FROM ceylon_engineering.customerpayment as cp",nativeQuery = true)
    String getNextNumber();

    @Query("select cp from Customerpayment cp where cp.reservation_id.id=:reservationid order by cp.id desc")
    List<Customerpayment> getbyreservation(@Param("reservationid") int reservationid);




}
