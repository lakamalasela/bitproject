package com.bitproject.repository;

import com.bitproject.model.Employeetracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmptrackingRepository extends JpaRepository<Employeetracking, Integer> {

    @Query("select et from Employeetracking et where et.reservation_id.id=:rsid and et.employee_id.id =:empid and et.nofoworkingdates=0")
    Employeetracking getByReservationId(@Param("rsid") Integer rsid,@Param("empid") Integer empid);

    @Query("select et from Employeetracking et where et.employee_id.id=:empid")
    List<Employeetracking> emptrackingReservation(@Param("empid") int empid);
}
