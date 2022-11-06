package com.bitproject.controller;


import com.bitproject.model.PlanHasFloorareaHasHouseSubparts;
import com.bitproject.repository.PlanHasFloorareaHashousesubpartsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/planhasfloorareahashousesubparts")
public class PlanHasFloorareaHashousesubpartsController {

    @Autowired
    private PlanHasFloorareaHashousesubpartsRepository dao;



 //planhasfloorareahashousesubparts/listbyhosuesubpart?housesubpartid=4=&planid=1&floorareaid=1
@GetMapping(value = "/listbyhosuesubpart",params = {"housesubpartid","planid","floorareaid"},produces = "application/json")
    public  PlanHasFloorareaHasHouseSubparts hasFloorareaHasHouseSubpartsList(@RequestParam("housesubpartid") int housesubpartid,@RequestParam("planid") int planid, @RequestParam("floorareaid") int floorareaid){

    return dao.listbysubparts(housesubpartid,planid,floorareaid);

}
}
