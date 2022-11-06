package com.bitproject.repository;

import com.bitproject.model.HouseSubparts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HouseSubpartsRepository extends JpaRepository<HouseSubparts,Integer> {

    @Query("select new HouseSubparts(hsbdpc.id,hsbdpc.name) FROM HouseSubparts hsbdpc where hsbdpc.housepart_id.id=3")
    List<HouseSubparts> listBydpc();

    @Query("select new HouseSubparts(hsbdpc.id,hsbdpc.name) FROM HouseSubparts hsbdpc where hsbdpc.housepart_id.id=4")
    List<HouseSubparts> listbywall();

    @Query("select new HouseSubparts(hsbdpc.id,hsbdpc.name) FROM HouseSubparts hsbdpc where hsbdpc.housepart_id.id=9")
    List<HouseSubparts> listbydoorandwindow();

    @Query("select new HouseSubparts(hsbdpc.id,hsbdpc.name) FROM HouseSubparts hsbdpc where hsbdpc.housepart_id.id=5")
    List<HouseSubparts> listbyroof();

    @Query("select new HouseSubparts(hsbdpc.id,hsbdpc.name) FROM HouseSubparts hsbdpc where hsbdpc.housepart_id.id=6")
    List<HouseSubparts> listbyfloor();


    @Query("select hsp from HouseSubparts hsp where hsp.housepart_id.id=:housepartid")
    List<HouseSubparts> listbyhousepart(@Param("housepartid") int housepartid);

    @Query("select new HouseSubparts(hsbdpc.id,hsbdpc.name) FROM HouseSubparts hsbdpc where hsbdpc.id=31 or hsbdpc.name='Site Cleaning'")
    List<HouseSubparts> listbysiteclean();

    @Query("select new HouseSubparts(hsbdpc.id,hsbdpc.name) FROM HouseSubparts hsbdpc where hsbdpc.id=31 or hsbdpc.name='Foundation'")
    List<HouseSubparts> listbyfoundation();

    @Query("select new HouseSubparts(hsbdpc.id,hsbdpc.name) FROM HouseSubparts hsbdpc where hsbdpc.id=31 or hsbdpc.name='Columns'")
    List<HouseSubparts> listbycolumn();

    @Query("select new HouseSubparts(hsbdpc.id,hsbdpc.name) FROM HouseSubparts hsbdpc where hsbdpc.id=31 or hsbdpc.name='Parapet Wall'")
    List<HouseSubparts> listbyoutwall();


    @Query("select hsp from HouseSubparts hsp where hsp.housepart_id.id=:housepartid and hsp.id in (select chfhhsp.housesubparts_id.id from ConstructionsubtaskHasfloorareaHasHousesubparts chfhhsp where chfhhsp.constructionsubtask_has_floorarea_id.id in(select chfa.id from ConstructionsubtaskHasFloorarea chfa where chfa.reservation_id.id=:reservationid and chfa.floorarea_id.id=:floorareaid))")
    List<HouseSubparts> listbyhousesubpartresfla(@Param("reservationid") int reservationid,@Param("floorareaid") int floorareaid,@Param("housepartid") int housepartid);


    @Query("select hsp from HouseSubparts hsp where hsp.id in (select phfhhsp.housesubparts_id.id from PlanHasFloorareaHasHouseSubparts phfhhsp where phfhhsp.plan_has_floorarea_id.id in(select phfa.id from PlanHasFloorarea phfa where phfa.plan_id.id=:planid and phfa.floorarea_id.id=:floorareaid))")
    List<HouseSubparts> listbyplanfloorarea(@Param("planid") int planid,@Param("floorareaid") int floorareaid);


    @Query("select hsp from HouseSubparts hsp where hsp.id in(select ehsc.housesubparts_id.id from EstimationHasSubcategory ehsc where ehsc.floorarea_id.id=:floorareaid and ehsc.estimation_id.id in (select e.id from Estimation e where (substring(e.rnowithprojecttitle,1,10))=:reservationcode))")
    List<HouseSubparts> listbyresofest(@Param("floorareaid") int floorareaid,@Param("reservationcode") String reservationcode);

//    @Query("select flarea from FloorArea flarea where flarea.id in(select ehsc.floorarea_id.id from EstimationHasSubcategory ehsc where ehsc.estimation_id.id in(select e.id from Estimation e where (substring(e.rnowithprojecttitle,1,10))=:reservationcode))")

//    @Query("select new HouseSubparts(hsbdpc.id,hsbdpc.name) FROM HouseSubparts hsbdpc where hsbdpc.housepart_id.id=:housepartid and hsbdpc in(select chsp. from ConstructionsubtaskHasFloorarea chsp where chsp.reservation_id.id=:resid and chsp.floorarea_id.id=:flaid)")
//    List<HouseSubparts> listbyotshousepartresfla(@Param("housepartid") int housepartid,@Param("resid")  int resid,@Param("flaid")  int flaid);

//    @Query("select hsp from HouseSubparts hsp where hsp in(select chh.housesubparts_id from Constructionsubtask_has_housesubparts chh where chh.constructionsubtask_id.id=:constructionsubtaskid)")
//    List<HouseSubparts> listByReservation(@Param("constructionsubtaskid") Integer constructionsubtaskid);
//

}
