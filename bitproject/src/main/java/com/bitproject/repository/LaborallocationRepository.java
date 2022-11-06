package com.bitproject.repository;

import com.bitproject.model.Equipmentallocation;
import com.bitproject.model.Laborallocation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LaborallocationRepository extends JpaRepository<Laborallocation,Integer> {

    @Query(value = "SELECT concat('LS',lpad(substring(max(la.lacode),3)+1,8,0)) FROM ceylon_engineering.laborallocation as la",nativeQuery = true)
    String getNextnumber();


    @Query("select  avlabor from Laborallocation avlabor where avlabor.lafromreservation_id.id =:fromreservationid and avlabor.latype_id.id=1 ORDER BY avlabor.id desc ")
    List<Laborallocation> getavaliablelabor(@Param("fromreservationid") int fromreservationid);

    @Query("select la from Laborallocation la where (la.lacode like concat('%',:searchtext,'%') or " +
            " la.lafromreservation_id.reservationcode like concat('%',:searchtext,'%') or "+
            " la.latype_id.name like concat('%',:searchtext,'%') or " + "la.laboremployee_id.number like concat('%',:searchtext,'%') or " +
            "la.lastatus_id.name like concat('%',:searchtext,'%'))")
    Page<Laborallocation> findAll(@Param("searchtext") String searchtext, Pageable of);

    @Query("select  lae from Laborallocation lae where lae.latype_id.id=:eltype and lae.lafromreservation_id.id=:fromres and lae.latoreservation_id.id=:tores")
    Laborallocation getBytout(@Param("eltype") int eltype,@Param("fromres") Integer fromres, @Param("tores") Integer tores);

    @Query("select  laeout from Laborallocation laeout where laeout.latype_id.id=:eltype and laeout.lafromreservation_id.id=:toutfromres and laeout.latoreservation_id.id=:tintores")
    Laborallocation getByin(@Param("eltype") int eltype,@Param("toutfromres") Integer fromres,@Param("tintores") Integer tores);


    @Query(value = "SELECT e.number,lt.name,r.reservationcode FROM ceylon_engineering.laborallocation as la,ceylon_engineering.reservation as r," +
            "ceylon_engineering.employee as e,ceylon_engineering.latype as lt" +
            " where la.lafromreservation_id = r.id and" +
            " la.laboremployee_id= e.id and la.latype_id = lt.id and (la.latype_id = 1 or la.latype_id = 3) and cast(la.expectedremovedatetime as date) >= curdate() and cast(la.expectedremovedatetime as date) <= (curdate() + interval 9 day) order by la.id desc"
            ,nativeQuery = true)
    List labornotificationList();
}
