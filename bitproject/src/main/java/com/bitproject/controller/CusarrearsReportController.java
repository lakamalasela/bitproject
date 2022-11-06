package com.bitproject.controller;


import com.bitproject.model.Customer;
import com.bitproject.repository.CusarrearsreportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/cusarrearsreport")
public class CusarrearsReportController {

    @Autowired
    private CusarrearsreportRepository dao;

    @GetMapping(value = "/customerarrears",produces = "application/json")
    public List<Customer> customerarrearsList(){
        return dao.customerArrearsList();
    }

}
