package com.bitproject.controller;

import com.bitproject.model.EstimationHasSubcategory;
import com.bitproject.repository.EstimationHasSubcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/estimationhassubcategory")
public class EstimationHasSubcategoryController {

    @Autowired
    private EstimationHasSubcategoryRepository dao;

    @GetMapping(value = "/listbyreservationcode",params = {"itemcode","floorareaid","housesubpartid","reservationcode"},produces = "application/json")
    public EstimationHasSubcategory estimationHasSubcategoryList(@RequestParam("itemcode") int itemcode,@RequestParam("floorareaid") int floorareaid,@RequestParam("housesubpartid") int housesubpartid,@RequestParam("reservationcode") String reservationcode){
//        System.out.println("bbbbbbb "+bsrcategoryid+" "+ floorareaid+" "+housesubpartid+" "+reservationcode);
        return dao.getByreservationcode(itemcode,floorareaid,housesubpartid,reservationcode);
    }


}
