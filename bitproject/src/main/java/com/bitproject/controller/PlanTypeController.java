package com.bitproject.controller;


import com.bitproject.model.PlanType;
import com.bitproject.repository.PlanTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/plantype")
public class PlanTypeController {

    @Autowired
    private PlanTypeRepository dao;


    @GetMapping(value = "/list",produces = "application/json")
    public List<PlanType>planTypeList(){
        return dao.findAll();
    }
}
