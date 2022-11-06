package com.bitproject.controller;

import com.bitproject.model.PlanStatus;
import com.bitproject.repository.PlanStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/planstatus")
public class PlanStatusController {


    @Autowired
    private PlanStatusRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<PlanStatus>planStatusList(){
        return dao.findAll();
    }
}
