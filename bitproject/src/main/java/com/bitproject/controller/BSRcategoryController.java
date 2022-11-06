package com.bitproject.controller;


import com.bitproject.model.BSRcategory;
import com.bitproject.repository.BSRcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/bsrcategory")
public class BSRcategoryController {

    @Autowired
    private BSRcategoryRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<BSRcategory>bsrcategoryList(){
        return dao.findAll();
    }

//    @GetMapping(value = "/list",produces = "application/json")
//    public List<BSRcategory>bsRcategoryList(){
//            return dao.list();
//    }
}
