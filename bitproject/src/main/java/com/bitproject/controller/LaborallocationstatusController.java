package com.bitproject.controller;

import com.bitproject.model.Laborallocationstatus;
import com.bitproject.repository.LaborallocationstatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/lastatus")
public class LaborallocationstatusController {

    @Autowired
    private LaborallocationstatusRepository daostatus;

    @GetMapping(value = "/list")
    public List<Laborallocationstatus> laborallocationstatusList(){
       return daostatus.findAll();
    }
}
