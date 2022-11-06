package com.bitproject.repository;

import com.bitproject.model.Designerassignment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DesignerassignmentRepository extends JpaRepository<Designerassignment,Integer> {

    @Query("select d from Designerassignment d where (d.reservation_id.reservationcode like concat('%',:searchtext,'%') or " +
            " trim(d.assigndate) like concat('%',:searchtext,'%') or " + "d.designeremployee_id.callingname like concat('%',:searchtext,'%') or " +
            "trim(d.completeddate) like concat('%',:searchtext,'%') or "+
            "trim(d.actualcompleteddate) like concat('%',:searchtext,'%') or "+
            "d.employee_id.callingname like concat('%',:searchtext,'%') or "+
            "d.desingerstatus_id.name like concat('%',:searchtext,'%'))")
    Page<Designerassignment> findAll(@Param("searchtext") String searchtext, Pageable of);


//    @Query("select new Designerassignment(assignd.designeremployee_id) from Designerassignment assignd where assignd.reservation_id.id=:reservationid")
//    Designerassignment designerbyReservation(@Param("reservationid") int reservationid);

    //constrctor eka nodaa ee project title ekta,neththan adaala reservation id ekta adaaala designerassignment object eka gaththa
    @Query("select assignd from Designerassignment assignd where assignd.reservation_id.projecttitle=:reservationtitle")
    Designerassignment designerbyReservation(@Param("reservationtitle") String reservationtitle);
}
