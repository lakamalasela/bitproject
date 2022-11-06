package com.bitproject.controller;

import com.bitproject.model.CustomerStatus;
import com.bitproject.repository.CustomerstatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/customerstatus")
public class CustomerstatusController {

    @Autowired
    private CustomerstatusRepository dao;

    @GetMapping(value = "/list", produces = "application/json")
    public List<CustomerStatus>customerstatusList(){
        return dao.findAll();
    }

}
