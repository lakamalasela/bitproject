package com.bitproject.controller;

import com.bitproject.model.Laborallocationtype;
import com.bitproject.repository.LaborallocationtypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/latype")
public class LaborallocationtypeController {

    @Autowired
    private LaborallocationtypeRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<Laborallocationtype> laborallocationtypeList(){
        return dao.findAll();
    }
}
