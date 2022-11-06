package com.bitproject.repository;

import com.bitproject.model.PlanHasFloorareaHasHouseSubparts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlanHasFloorareaHashousesubpartsRepository extends JpaRepository<PlanHasFloorareaHasHouseSubparts,Integer> {

    @Query("select phfhhsp from PlanHasFloorareaHasHouseSubparts phfhhsp where phfhhsp.housesubparts_id.id=:housesubpartid  and phfhhsp.plan_has_floorarea_id.id in (select phfa.id from PlanHasFloorarea phfa where phfa.plan_id.id=:planid and phfa.floorarea_id.id=:floorareaid)")
    PlanHasFloorareaHasHouseSubparts  listbysubparts(@Param("housesubpartid") int housesubpartid,@Param("planid") int planid,@Param("floorareaid") int floorareaid);

}
