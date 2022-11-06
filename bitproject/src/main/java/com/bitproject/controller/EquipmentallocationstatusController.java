package com.bitproject.controller;

import com.bitproject.model.Equipmentallocationstatus;
import com.bitproject.repository.EquipmentallocatiostatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/eqallocationstatus")
public class EquipmentallocationstatusController {

    @Autowired
    private EquipmentallocatiostatusRepository dao;


    @GetMapping(value = "/list",produces = "application/json")
    public List<Equipmentallocationstatus>equipmentallocationstatuses(){
        return dao.findAll();
    }
}
