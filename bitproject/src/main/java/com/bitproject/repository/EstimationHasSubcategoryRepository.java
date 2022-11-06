package com.bitproject.repository;

import com.bitproject.model.EstimationHasSubcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EstimationHasSubcategoryRepository extends JpaRepository<EstimationHasSubcategory,Integer> {

//    @Query("select ehsc from EstimationHasSubcategory ehsc where ehsc.itemcode=:itemcode and ehsc.floorarea_id.id=:floorareaid and ehsc.housesubparts_id.id=:housesubpartid and ehsc.estimation_id in(select e.id from Estimation e where (substring(e.rnowithprojecttitle,1,10))=:reservationcode)")
//    select brhsc from BSRHasBSRsubcategory brhsc where brhsc.bsrsubcategory_id in(select bsrc.id from BSRsubcategory bsrc where bsrc.bsrcategory_id.id=:bsrcategoryid) and brhsc.id in(select ehsc.bsr_has_bsrsubcategory_id.id from EstimationHasSubcategory ehsc where ehsc.floorarea_id.id=:floorareaid and ehsc.housesubparts_id.id=:housesubpartid and ehsc.estimation_id.id in (select e.id from Estimation e where (substring(e.rnowithprojecttitle,1,10))=:reservationcode))
    @Query("select ehsc from EstimationHasSubcategory ehsc where ehsc.bsr_has_bsrsubcategory_id.id=:itemcode and " +
            " ehsc.floorarea_id.id=:floorareaid and ehsc.housesubparts_id.id=:housesubpartid and ehsc.estimation_id.id in " +
            "(select e.id from Estimation e where (substring(e.rnowithprojecttitle,1,10))=:reservationcode)")
   EstimationHasSubcategory getByreservationcode( @Param("itemcode") int itemcode,@Param("floorareaid") int floorareaid,@Param("housesubpartid") int housesubpartid,@Param("reservationcode") String reservationcode);

}
