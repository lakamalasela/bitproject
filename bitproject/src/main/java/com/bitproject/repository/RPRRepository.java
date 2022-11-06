package com.bitproject.repository;

import com.bitproject.model.Reservationprogress;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RPRRepository extends JpaRepository<Reservationprogress,Integer> {


    @Query("select rp from Reservationprogress rp where (rp.rpcode like concat('%',:searchtext,'%') or " +
            " rp.reservation_id.reservationcode like concat('%',:searchtext,'%') or "+
            " rp.rprstatus_id.name like concat('%',:searchtext,'%') or " + "concat(rp.progressreportamount,'') like concat('%',:searchtext,'%') or " +
            "rp.employee_id.callingname like concat('%',:searchtext,'%'))")
    Page<Reservationprogress> findAll(@Param("searchtext") String searchtext, Pageable of);


    @Query(value = "SELECT concat('RP',lpad(substring(max(rp.rpcode),3)+1,8,0)) FROM ceylon_engineering.reservationprogress as rp",nativeQuery = true)
    String getnextnumber();

    @Query("select new Reservationprogress (rpr.id,rpr.rpcode,rpr.progressreportamount) from Reservationprogress  rpr where rpr.reservation_id.id=:reservationid and rpr.rprstatus_id.id=2")
    List<Reservationprogress> getbyreservation(int reservationid);

    @Query("select new Reservationprogress (rpr.id,rpr.rpcode,rpr.progressreportamount) from Reservationprogress  rpr where rpr.rprstatus_id.id=2")
    List<Reservationprogress> listall();
}
