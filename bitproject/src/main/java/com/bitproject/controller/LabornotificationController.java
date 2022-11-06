package com.bitproject.controller;

import com.bitproject.repository.LaborallocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/lanotification")
public class LabornotificationController {

    @Autowired
    private LaborallocationRepository dao;

    //lanotification/listemp
    @GetMapping(value = "/listemp",produces = "application/json")
    public List labornotification(){
        return dao.labornotificationList();
    }

}
