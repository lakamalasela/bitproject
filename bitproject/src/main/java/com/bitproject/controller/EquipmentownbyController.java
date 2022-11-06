package com.bitproject.controller;

import com.bitproject.model.EquipmentownBy;
import com.bitproject.repository.EquipmentownbyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/eqownby")
public class EquipmentownbyController {

    @Autowired
    private EquipmentownbyRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<EquipmentownBy>equipmentownbylist(){
        return dao.findAll();
    }
}
