package com.bitproject.repository;

import com.bitproject.model.Equipmentallocation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EquipmentallocationRepository extends JpaRepository<Equipmentallocation,Integer> {

    @Query(value = "SELECT concat('ES',lpad(substring(max(el.escode),3)+1,8,0)) FROM ceylon_engineering.equipmentallocation as el",nativeQuery = true)
    String getNextNumber();

    @Query(value = "select el from Equipmentallocation el where el.fromreservation_id.id=:fromreservationid and el.equipment_id.id=:equipmentid and el.esstatus_id.id<>3 ORDER BY el.id DESC ")
    List<Equipmentallocation> getbyreservationqty(@Param("fromreservationid") int fromreservationid,@Param("equipmentid") int equipmentid);


    @Query("select eqsh from Equipmentallocation eqsh where (eqsh.escode like concat('%',:searchtext,'%') or " +
            " eqsh.estype_id.name like concat('%',:searchtext,'%') or "+
            "eqsh.fromreservation_id.reservationcode like concat('%',:searchtext,'%') or " +
            "eqsh.esstatus_id.name like concat('%',:searchtext,'%'))")
    Page<Equipmentallocation> findAll(@Param("searchtext") String searchtext, Pageable of);

    @Query("select eqsh from Equipmentallocation eqsh where eqsh.estype_id.id=:ettypeid and eqsh.fromreservation_id.id=:fromresid and eqsh.toreservation_id.id=:toresid")
    Equipmentallocation getByetout(@Param("ettypeid") int ettypeid,@Param("fromresid") Integer fromresid,@Param("toresid") Integer toresid);

    @Query("select eqshtin from Equipmentallocation eqshtin where eqshtin.estype_id.id=:etintypeid and eqshtin.fromreservation_id.id=:fromresid and eqshtin.toreservation_id.id=:toreseid")
    Equipmentallocation getByin(@Param("etintypeid") int etintypeid,@Param("fromresid") Integer fromresid,@Param("toreseid") Integer toreseid);


//    @Query(value = "select el from Equipmentallocation el where el.toreservation_id.id=:toreservationid and el.equipment_id.id=:equipmentid ORDER BY el.id DESC ")
//    List<Equipmentallocation> getbyreservationqtytransferin(@Param("toreservationid") int fromreservationid,@Param("equipmentid") int equipmentid);


}
