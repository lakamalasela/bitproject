package com.bitproject.controller;


import com.bitproject.model.Equipmentcategory;
import com.bitproject.repository.EquipmentcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/eqcategory")
public class EquipmentcategoryController {

    @Autowired
    private EquipmentcategoryRepository dao;

    @GetMapping(value = "/list",produces="application/json")
    public List<Equipmentcategory> equipmentcategorylist(){
            return dao.findAll();
    }


}
