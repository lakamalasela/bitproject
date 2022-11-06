package com.bitproject.controller;

import com.bitproject.model.EquipmentStatus;
import com.bitproject.repository.EquipmentstatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/eqstatus")
public class EquipmentstatusController {

    @Autowired
    private EquipmentstatusRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<EquipmentStatus>equipmentstatuslist(){
        return dao.findAll();
    }
}
