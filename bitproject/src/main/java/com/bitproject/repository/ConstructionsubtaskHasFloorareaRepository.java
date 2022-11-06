package com.bitproject.repository;

import com.bitproject.model.ConstructionsubtaskHasFloorarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ConstructionsubtaskHasFloorareaRepository extends JpaRepository<ConstructionsubtaskHasFloorarea,Integer> {


    @Query("select chf from ConstructionsubtaskHasFloorarea chf where chf.reservation_id.id =:reservationid")
    List<ConstructionsubtaskHasFloorarea> listbyreservation(@Param("reservationid") int reservationid);


    @Query("select chf from ConstructionsubtaskHasFloorarea chf where chf.reservation_id.id=:reservationid and chf.floorarea_id.id=:floorareaid")
    ConstructionsubtaskHasFloorarea countsubparts(@Param("reservationid") int reservationid,@Param("floorareaid") int floorareaid);
}
