package com.bitproject.controller;

import com.bitproject.model.BSRHasBSRsubcategory;
import com.bitproject.repository.BSRHasSubcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/bsrhassubcategory")
public class BSRHasSubcategoryController {

    @Autowired
    private BSRHasSubcategoryRepository dao;

    @GetMapping(value = "/listbybsrhassubcategory",params = {"bsrid","subcategoryid"},produces = "application/json")
    public List<BSRHasBSRsubcategory>bsrHasBSRsubcategoryList(@RequestParam("bsrid") int bsrid,@RequestParam("subcategoryid") int subcategoryid){
        return dao.listbybsrhassubcategory(bsrid,subcategoryid);
    }

    @GetMapping(value = "/listitem",produces = "application/json")
    public List<BSRHasBSRsubcategory>bsrHasItem(){
        return dao.listitem();

    }

    @GetMapping(value = "/listbyestofres",params = {"bsrcategoryid","floorareaid","housesubpartid","reservationcode"},produces = "application/json")
    public List<BSRHasBSRsubcategory> bsrHasBSRsubcategoryListbyresofest(@RequestParam("bsrcategoryid") int bsrcategoryid,@RequestParam("floorareaid") int floorareaid,@RequestParam("housesubpartid") int housesubpartid,@RequestParam("reservationcode") String reservationcode){
        return dao.listbyreservaionofestimation(bsrcategoryid,floorareaid,housesubpartid,reservationcode);
    }


//    @GetMapping(value = "/listbybsrhassubcategory",params = {"bsrid","categoryid"},produces = "application/json")
//    public List<BSRHasBSRsubcategory>bsrHasBSRsubcategoryList(@RequestParam("bsrid") int bsrid,@RequestParam("categoryid") int categoryid){
//        return dao.listbybsrhassubcategory(bsrid,categoryid);
//    }
}
