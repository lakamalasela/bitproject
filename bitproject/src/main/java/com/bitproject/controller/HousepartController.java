package com.bitproject.controller;

import com.bitproject.model.Housepart;
import com.bitproject.repository.HousepartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/housepart")
public class HousepartController {

    @Autowired
    private HousepartRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<Housepart>housepartList(){
        return dao.findAll();
    }
}
