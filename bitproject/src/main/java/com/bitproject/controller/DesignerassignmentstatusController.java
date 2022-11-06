package com.bitproject.controller;

import com.bitproject.model.Designerassignmentstatus;
import com.bitproject.repository.DesignassignmentstatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/designerassignmentstatus")
public class DesignerassignmentstatusController {

    @Autowired
    private DesignassignmentstatusRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<Designerassignmentstatus>designerassignmentstatusList(){
        return dao.findAll();
    }
}
