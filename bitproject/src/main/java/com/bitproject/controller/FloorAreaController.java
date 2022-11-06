package com.bitproject.controller;

import com.bitproject.model.FloorArea;
import com.bitproject.repository.FloorAreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/floorarea")
public class FloorAreaController {

    @Autowired
    private FloorAreaRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<FloorArea>floorAreaList(){
        return dao.findAll();
    }


    @GetMapping(value = "/listbyreservation",params = {"reservationid"},produces = "application/json")
    public List<FloorArea>floorAreaListByReservation(@RequestParam("reservationid") int reservationid){
        return dao.floorarealistbyreservation(reservationid);
    }

    @GetMapping(value = "/listbyplan",params = {"planid"},produces = "application/json")
    public List<FloorArea>floorAreaListbyplan(@RequestParam("planid") int planid){
        return dao.listbyplan(planid);
    }


    @GetMapping(value = "/listbyestimation",params = {"reservationcode"},produces = "application/json")
    public List<FloorArea> floorAreaListbyEstimation(@RequestParam("reservationcode") String reservationcode){
        return dao.listbyreservationofestimation(reservationcode);
    }
}
