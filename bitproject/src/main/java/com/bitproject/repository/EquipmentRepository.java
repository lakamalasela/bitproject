package com.bitproject.repository;

import com.bitproject.model.Equipment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

public interface EquipmentRepository extends JpaRepository<Equipment,Integer> {

    @Query("select i from Equipment i where (i.equipmentname like concat('%',:searchtext,'%') or " +" i.equipmentcode like concat('%',:searchtext,'%') or"+
            " i.equipmentcategory_id.name like concat('%',:searchtext,'%') or " + "i.equipmentownby_id.name like concat('%',:searchtext,'%') or " +
            "i.equipmentstatus_id.name like concat('%',:searchtext,'%'))")

    Page<Equipment> findAll(@Param("searchtext") String searchtext, Pageable of);

    @Query(value = "SELECT concat('EQ',lpad(substring(max(equipmentcode),3)+1,8,0)) FROM ceylon_engineering.equipment as e;",nativeQuery = true)
    String getNextNumber();


    @Query("select eq from Equipment eq where eq.equipmentname=:eqname")
    Equipment findByeqname(@Param("eqname") String eqname);

    //@Query("select aveqin from Equipment aveqin where aveqin.id in (select eqin.equipment_id.id from EquipmentInventory eqin )")
}
