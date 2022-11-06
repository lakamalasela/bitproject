package com.bitproject.controller;

import com.bitproject.model.Estimationstatus;
import com.bitproject.repository.EstimationstatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/estimationstatus")
public class EstimationstatusController {

    @Autowired
    private EstimationstatusRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<Estimationstatus>estimationstatusList(){
        return dao.findAll();
    }

}
