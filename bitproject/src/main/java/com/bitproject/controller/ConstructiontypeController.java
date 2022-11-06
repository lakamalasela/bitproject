package com.bitproject.controller;

import com.bitproject.model.Constructiontype;
import com.bitproject.repository.ConstructiontypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/constructiontype")
public class ConstructiontypeController {

    @Autowired
    private ConstructiontypeRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<Constructiontype>constructiontypeList(){
        return dao.findAll();
    }
}
