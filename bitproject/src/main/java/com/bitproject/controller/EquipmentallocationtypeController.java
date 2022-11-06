package com.bitproject.controller;

import com.bitproject.model.Equipmentallocationtype;
import com.bitproject.repository.EquipmentallocationtypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/eqallocationtype")
public class EquipmentallocationtypeController {

    @Autowired
    private EquipmentallocationtypeRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<Equipmentallocationtype>equipmentallocationtypeList(){
        return dao.findAll();
    }
}
