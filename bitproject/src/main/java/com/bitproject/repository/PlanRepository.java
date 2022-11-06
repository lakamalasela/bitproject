package com.bitproject.repository;

import com.bitproject.model.Plan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan,Integer> {

    @Query(value = "SELECT concat('P',lpad(substring(max(p.plancode),2)+1,9,0)) FROM ceylon_engineering.plan as p;",nativeQuery = true)
    String getNextNumber();

    @Query("select p from Plan p where (p.plancode like concat('%',:searchtext,'%') or " +
            " p.rnowithprojecttitle like concat('%',:searchtext,'%') or "+
            " p.employee_id.callingname like concat('%',:searchtext,'%') or "+
            " trim(p.persftcharge) like concat('%',:searchtext,'%') or " + "p.plantype_id.name like concat('%',:searchtext,'%') or " +
            "p.planstatus_id.name like concat('%',:searchtext,'%'))")
    Page<Plan> findAll(@Param("searchtext") String searchtext, Pageable of);


    @Query("select new Plan (p.id,p.plancode,p.rnowithprojecttitle,p.planphoto,p.addeddate,p.plancharge,p.totalarea) from Plan p where p.planstatus_id.id=1")
    List<Plan> list();

    @Query("select new Plan (ap.id,ap.plancode,ap.rnowithprojecttitle,ap.planphoto,ap.addeddate,ap.plancharge,ap.totalarea) from Plan ap where substring(ap.rnowithprojecttitle,12,600) =:reservationtitle")
    List<Plan> listbytitle(@Param("reservationtitle") String reservationtitle);


}
