package com.bitproject.repository;

import com.bitproject.model.Equipmentallocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EqallocationreportRepository extends JpaRepository<Equipmentallocation,Integer> {

//    @Query("select new Equipmentallocation(ea.fromreservation_id,ea.finalavqty,ea.expectedremovedatetime,ea.equipment_id)  from Equipmentallocation ea where ea.expectedremovedatetime < :expremovedatetime and ea.equipment_id.id=:eqid and (ea.estype_id.id=1 or ea.estype_id.id=3) and ea.finalavqty <>0  order by ea.expectedremovedatetime desc")
//    List<Equipmentallocation> eqallocationexpdatetList(@Param("expremovedatetime")LocalDateTime expremovedatetime, @Param("eqid") int eqid);

    @Query(value = "SELECT r.reservationcode,sum(ea.finalavqty),ea.expectedremovedatetime FROM ceylon_engineering.equipmentallocation as ea,ceylon_engineering.reservation as r where ea.fromreservation_id = r.id and " +
            "ea.expectedremovedatetime < ?1 and ea.equipment_id=?2 and (ea.estype_id=1 or ea.estype_id=3) and ea.finalavqty <>0  group by ea.fromreservation_id,date(ea.expectedremovedatetime)  order by ea.expectedremovedatetime desc",nativeQuery = true)
    List eqallocationexpdatetList(LocalDateTime expremovedatetime,int eqid);
}
