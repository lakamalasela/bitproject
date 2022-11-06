package com.bitproject.repository;

import com.bitproject.model.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProvinceRepository extends JpaRepository<Province,Integer> {

    @Query("select p from Province p where p.id in (select r.province_id.id from Reservation r where r.id=:reservationid)")
    Province listbyreservation(@Param("reservationid") int reservationid);
}
