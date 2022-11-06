package com.bitproject.controller;

import com.bitproject.model.EquipmentInventorystatus;
import com.bitproject.repository.EquipmentInventorystatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/eistatus")
public class EquipmentInventorystatusController {

    @Autowired
    private EquipmentInventorystatusRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<EquipmentInventorystatus> equipmentInventorystatusList(){
        return dao.findAll();
    }

}
