package com.bitproject.repository;

import com.bitproject.model.FloorArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FloorAreaRepository extends JpaRepository<FloorArea,Integer> {


    @Query("select far from FloorArea far where far.id in (select chsf.floorarea_id.id from ConstructionsubtaskHasFloorarea chsf where chsf.reservation_id.id=:reservationid)")
    List<FloorArea> floorarealistbyreservation(@Param("reservationid") int reservationid);

    @Query("select fla from FloorArea fla where fla.id in(select phfa.floorarea_id.id from PlanHasFloorarea phfa where phfa.plan_id.id in (select pl from Plan pl where pl.id=:planid))")
    List<FloorArea> listbyplan(@Param("planid") int planid);


    @Query("select flarea from FloorArea flarea where flarea.id in(select ehsc.floorarea_id.id from EstimationHasSubcategory ehsc where ehsc.estimation_id.id in(select e.id from Estimation e where (substring(e.rnowithprojecttitle,1,10))=:reservationcode))")
    List<FloorArea> listbyreservationofestimation(@Param("reservationcode") String reservationcode);
}
