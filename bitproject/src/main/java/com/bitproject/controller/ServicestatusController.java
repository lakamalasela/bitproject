package com.bitproject.controller;

import com.bitproject.model.Servicestatus;
import com.bitproject.repository.ServicestatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/servicestatus")
public class ServicestatusController {

    @Autowired
    private ServicestatusRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<Servicestatus>servicestatusList(){
        return dao.findAll();
    }

}
