package com.bitproject.controller;

import com.bitproject.model.Bsrstatus;
import com.bitproject.repository.BSRstatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/bsrstatus")
public class BSRstatusController {

    @Autowired
    private BSRstatusRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<Bsrstatus>bsRstatusList(){
        return dao.findAll();
    }
}
