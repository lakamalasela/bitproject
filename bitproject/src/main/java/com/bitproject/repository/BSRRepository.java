package com.bitproject.repository;

import com.bitproject.model.BSR;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BSRRepository extends JpaRepository<BSR,Integer> {


    @Query("select i from BSR i where (i.province_id.name like concat('%',:searchtext,'%') or " +
            " i.year like concat('%',:searchtext,'%') or " + "i.bsrcode like concat('%',:searchtext,'%') or " +
            "i.bsrstatus_id.name like concat('%',:searchtext,'%') or "+
            "concat(i.addeddate,'') like concat('%',:searchtext,'%') or "+
            "i.bsrname like concat('%',:searchtext,'%'))")
    Page<BSR> findAll(@Param("searchtext") String searchtext, Pageable of);

    @Query("SELECT new BSR (b.id,b.province_id,b.bsrcode) FROM BSR b")
    List<BSR> list();

    @Query("select b from BSR b where b.province_id.id =:provinceid and b.bsrstatus_id.id=1")
    List<BSR> listbybsrcode(@Param("provinceid") Integer provinceid);
}
