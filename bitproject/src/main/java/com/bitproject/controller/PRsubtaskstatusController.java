package com.bitproject.controller;

import com.bitproject.model.PRsubtaskstatus;
import com.bitproject.repository.PRsubtaskstatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/prsubtaskstatus")
public class PRsubtaskstatusController {

    @Autowired
    private PRsubtaskstatusRepository dao;


    @GetMapping(value = "/list",produces = "application/json")
    public List<PRsubtaskstatus> pRsubtaskstatusList(){
        return dao.findAll();
    }
}
