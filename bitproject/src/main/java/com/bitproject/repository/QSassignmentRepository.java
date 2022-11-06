package com.bitproject.repository;

import com.bitproject.model.Designerassignment;
import com.bitproject.model.QSassignment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QSassignmentRepository extends JpaRepository<QSassignment,Integer> {



    @Query("select q from QSassignment q where (q.reservation_id.reservationcode like concat('%',:searchtext,'%') or " +
            " trim(q.assigndate) like concat('%',:searchtext,'%') or " + "q.qsemployee_id.callingname like concat('%',:searchtext,'%') or " +
            "trim(q.completeddate) like concat('%',:searchtext,'%') or "+
            "trim(q.actualcompleteddate) like concat('%',:searchtext,'%') or "+
            "q.employee_id.callingname like concat('%',:searchtext,'%') or "+
            "q.qsstatus_id.name like concat('%',:searchtext,'%'))")
    Page<QSassignment> findAll(@Param("searchtext") String searchtext, Pageable of);



    @Query("select qsass from QSassignment qsass where qsass.reservation_id.projecttitle=:reservationtitle")
    QSassignment qsbyReservation(@Param("reservationtitle") String reservationtitle);

}
