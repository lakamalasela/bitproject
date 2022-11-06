package com.bitproject.controller;

import com.bitproject.model.BSRsubcategory;
import com.bitproject.repository.BSRsubcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/bsrsubcategory")
public class BSRsubcategoryController {

    @Autowired
    private BSRsubcategoryRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<BSRsubcategory>bsrsubcategoryList(){
        return dao.findAll();
    }


    @GetMapping(value = "/listbycategory",params = {"categoryid"},produces = "application/json")
    public List<BSRsubcategory>bsrsubcategoryListbybsrcategory(@RequestParam("categoryid") int categoryid){
         return   dao.listbycategory(categoryid);
    }
}
