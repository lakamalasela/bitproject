package com.bitproject.repository;

import com.bitproject.model.BSRHasBSRsubcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BSRHasSubcategoryRepository extends JpaRepository<BSRHasBSRsubcategory,Integer> {

   @Query("select bsrhas from BSRHasBSRsubcategory bsrhas where bsrhas.bsr_id.id = :bsrid and bsrhas.bsrsubcategory_id.id=:subcategoryid")
    List<BSRHasBSRsubcategory> listbybsrhassubcategory(@Param("bsrid") int bsrid,@Param("subcategoryid") int subcategoryid);

    @Query("select new BSRHasBSRsubcategory (bsri.id,bsri.itemcode) from BSRHasBSRsubcategory bsri")
    List<BSRHasBSRsubcategory> listitem();

   @Query("select brhsc from BSRHasBSRsubcategory brhsc where brhsc.bsrsubcategory_id in(select bsrc.id from BSRsubcategory bsrc where bsrc.bsrcategory_id.id=:bsrcategoryid) and brhsc.id in(select ehsc.bsr_has_bsrsubcategory_id.id from EstimationHasSubcategory ehsc where ehsc.floorarea_id.id=:floorareaid and ehsc.housesubparts_id.id=:housesubpartid and ehsc.estimation_id.id in (select e.id from Estimation e where (substring(e.rnowithprojecttitle,1,10))=:reservationcode))")
   List<BSRHasBSRsubcategory> listbyreservaionofestimation(@Param("bsrcategoryid") int bsrcategoryid,@Param("floorareaid") int floorareaid,@Param("housesubpartid") int housesubpartid,@Param("reservationcode") String reservationcode);



//    @Query("select bsrhas from BSRHasBSRsubcategory bsrhas where bsrhas.bsr_id.id = :bsrid and bsrhas.bsrsubcategory_id.id in (select bsrsub.id from BSRsubcategory bsrsub where bsrsub.bsrcategory_id.id=:categoryid)")
//    List<BSRHasBSRsubcategory> listbybsrhassubcategory(@Param("bsrid") int bsrid,@Param("categoryid") int categoryid);




}
