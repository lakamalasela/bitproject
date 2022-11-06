package com.bitproject.controller;

import com.bitproject.model.HouseSubparts;
import com.bitproject.repository.HouseSubpartsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping(value = "/housesubparts")
@RestController
public class HouseSubpartsController {

    @Autowired
    private HouseSubpartsRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<HouseSubparts>houseSubparts(){
        return dao.findAll();
    }

    @GetMapping(value = "/listbydpclevel",produces = "application/json")
    public List<HouseSubparts>houseDpclevelSubparts(){
        return dao.listBydpc();
    }

    @GetMapping(value = "/listbywall",produces = "application/json")
    public List<HouseSubparts>houseWallSubpartsList(){
        return dao.listbywall();
    }

    @GetMapping(value = "/listbydoorwindow",produces = "application/json")
    public List<HouseSubparts>houseDAWSubpartsList(){
        return dao.listbydoorandwindow();
    }


    @GetMapping(value = "/listbyroof",produces = "application/json")
    public List<HouseSubparts>houseRoofSubpartsList(){
        return dao.listbyroof();
    }

    @GetMapping(value = "/listbyfloor",produces = "application/json")
    public List<HouseSubparts>houseFloorSubpartsList(){
        return dao.listbyfloor();
    }

    @GetMapping(value = "/listbysiteclean",produces = "application/json")
    public List<HouseSubparts>houseSitecleaningList(){
        return dao.listbysiteclean();
    }



    @GetMapping(value = "/listbyfoundation",produces = "application/json")
    public List<HouseSubparts>houseFoundationList(){
        return dao.listbyfoundation();
    }



    @GetMapping(value = "/listbycolumn",produces = "application/json")
    public List<HouseSubparts>houseColumnList(){
        return dao.listbycolumn();
    }



    @GetMapping(value = "/listbyoutwall",produces = "application/json")
    public List<HouseSubparts>houseOutwallList(){
        return dao.listbyoutwall();
    }




    @GetMapping(value = "/listbyhousepart",params = {"housepartid"},produces = "application/json")
    public List<HouseSubparts> houseSubpartsListbyHousepart(@RequestParam("housepartid") int housepartid){
        return dao.listbyhousepart(housepartid);

    }
    //ge [/housesubparts/listbyhousepartresflahpt?reservationid=1&floorareaid=1&housepartid=1]
    @GetMapping(value = "/listbyhousepartresflahpt",params = {"reservationid","floorareaid","housepartid"},produces = "application/json")
    public List<HouseSubparts>listbyhousesubpartresfla(@RequestParam("reservationid") int reservationid,@RequestParam("floorareaid") int floorareaid ,@RequestParam("housepartid") int housepartid){
        return dao.listbyhousesubpartresfla(reservationid,floorareaid,housepartid);
    }

    //housesubparts/listbyplanandfloorarea?planid=1&floorareaid=2
    @GetMapping(value = "/listbyplanandfloorarea",params = {"planid","floorareaid"},produces = "application/json")
    public List<HouseSubparts>houseSubpartsListbyplanandfloorarea(@RequestParam("planid") int planid,@RequestParam("floorareaid") int floorareaid){
        return dao.listbyplanfloorarea(planid,floorareaid);
    }

    //housesubparts/listbyestofres?floorareaid=1&reservationcode=R000000003
   @GetMapping(value = "/listbyestofres",params = {"floorareaid","reservationcode"},produces = "application/json")
    public List<HouseSubparts> houseSubpartsListreservation(@RequestParam("floorareaid") int floorareaid,@RequestParam("reservationcode") String reservationcode){
        return dao.listbyresofest(floorareaid,reservationcode);
   }

//    @GetMapping(value = "/byotshousepartresfla",params = {"housepartid","resid","flaid"},produces = "application/json")
//    public List<HouseSubparts> listbyotshousepartresfla(@RequestParam("housepartid") int housepartid,@RequestParam("resid") int resid,@RequestParam("flaid") int flaid){
//        return dao.listbyotshousepartresfla(housepartid,resid,flaid);
//
//    }



//    @GetMapping(value = "/listbyreservation",params = {"constructionsubtaskid"},produces = "application/json")
//    public List<HouseSubparts>houseSubpartsList(@RequestParam("constructionsubtaskid") int constructionsubtaskid){
//        return dao.listByReservation(constructionsubtaskid);
//    }

}
