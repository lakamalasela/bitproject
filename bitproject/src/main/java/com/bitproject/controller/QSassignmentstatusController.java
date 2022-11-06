package com.bitproject.controller;

import com.bitproject.model.QSassignmentstatus;
import com.bitproject.repository.QSstausRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/qsstatus")
public class QSassignmentstatusController {
    @Autowired
    private QSstausRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<QSassignmentstatus>qSassignmentstatusList(){
        return dao.findAll();
    }
}
