package com.bitproject.controller;

import com.bitproject.model.RPRstatus;
import com.bitproject.repository.RPRstatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/RPRstatus")
public class RPRstatusController {

    @Autowired
    private RPRstatusRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<RPRstatus> rpRstatusList (){
        return dao.findAll();
    }
}
