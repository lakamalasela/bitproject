package com.bitproject.repository;

import com.bitproject.model.EquipmentInventory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EquipmentInventoryRepository extends JpaRepository<EquipmentInventory,Integer> {
    @Query("select ei from EquipmentInventory ei where ei.equipment_id.id=:eid")
    EquipmentInventory getByEquipment(@Param("eid") Integer eid);


    @Query("select aveq from EquipmentInventory aveq where aveq.eistatus_id.id=1")
    List<EquipmentInventory> getavailableEquipments();

    @Query("select aveqi from EquipmentInventory aveqi where aveqi.equipment_id.id=:equipmentid")
    EquipmentInventory getavqtybyequipmentid(@Param("equipmentid") int equipmentid);

    @Query("select e from EquipmentInventory e where (e.equipment_id.equipmentname like concat('%',:searchtext,'%') or " +
            " e.eistatus_id.name like concat('%',:searchtext,'%'))")
    Page<EquipmentInventory> findAll(@Param("searchtext") String searchtext, Pageable of);
}
