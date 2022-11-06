package com.bitproject.controller;

import com.bitproject.model.Province;
import com.bitproject.repository.ProvinceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/province")
public class ProvinceController {

    @Autowired
    private ProvinceRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    private List<Province>provinceList(){
        return dao.findAll();
    }


    @GetMapping(value = "/listbtreservation",params = {"reservationid"},produces = "application/json")
    public Province provinceListbyreservation(@RequestParam("reservationid") int reservationid){
        return dao.listbyreservation(reservationid);
    }
}
