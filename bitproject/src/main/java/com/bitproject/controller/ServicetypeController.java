package com.bitproject.controller;

import com.bitproject.model.Servicetype;
import com.bitproject.repository.ServicetypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/servicetype")
public class ServicetypeController {

    @Autowired
    private ServicetypeRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<Servicetype>servicetypeList(){
        return dao.findAll();
    }
}
