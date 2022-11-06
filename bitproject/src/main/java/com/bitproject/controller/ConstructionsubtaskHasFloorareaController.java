package com.bitproject.controller;

import com.bitproject.model.ConstructionsubtaskHasFloorarea;
import com.bitproject.repository.ConstructionsubtaskHasFloorareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/constructionsubtaskhasfloorarea")
public class ConstructionsubtaskHasFloorareaController {

    @Autowired
    private ConstructionsubtaskHasFloorareaRepository dao;


    @GetMapping(value = "/listbyreservation",params = {"reservationid"},produces = "application/json")
    public List<ConstructionsubtaskHasFloorarea>constructionsubtaskHasFloorareaList(@RequestParam("reservationid") int reservationid){
     return dao.listbyreservation(reservationid);
    }

    @GetMapping(value = "/listnumberofparts",params = {"reservationid","floorareaid"},produces = "application/json")
    public ConstructionsubtaskHasFloorarea constructionsubtaskHasFloorareaCount(@RequestParam("reservationid") int reservationid,@RequestParam("floorareaid") int floorareaid){
        return dao.countsubparts(reservationid,floorareaid);
    }

}
