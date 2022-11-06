package com.bitproject.repository;

import com.bitproject.model.Estimation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EstimationRepository extends JpaRepository<Estimation,Integer> {

    @Query("select e from Estimation e where (e.bsr_id.bsrcode like concat('%',:searchtext,'%') or " +
            " e.estimationcode like concat('%',:searchtext,'%') or "+
            " e.rnowithprojecttitle like concat('%',:searchtext,'%') or " + "trim(e.addeddate) like concat('%',:searchtext,'%') or " +
            " e.estimationstatus_id.name like concat('%',:searchtext,'%') or "+
            " e.employee_id.callingname like concat('%',:searchtext,'%') or "+
            "trim(e.totalestimationcost) like concat('%',:searchtext,'%'))")
    Page<Estimation> findAll(@Param("searchtext") String searchtext, Pageable of);


    @Query(value = "SELECT concat('ES',lpad(substring(max(e.estimationcode),3)+1,8,0)) FROM ceylon_engineering.estimation e",nativeQuery = true)
    String getNextNumber();

    @Query(value = "select new Estimation (e.id,e.estimationcode,e.addeddate,e.estimationcharge,e.totalestimationcost) from Estimation e where e.estimationstatus_id.id=1")
    List<Estimation> list();

    @Query(value = "select new Estimation (appe.id,appe.estimationcode,appe.addeddate,appe.estimationcharge,appe.totalestimationcost) from Estimation appe where substring(appe.rnowithprojecttitle,12,600)=:reservationtitle")
    List<Estimation> listbyrestitle(@Param("reservationtitle") String reservationtitle);
}
