package com.bitproject.controller;

import com.bitproject.model.Paymentstatus;
import com.bitproject.repository.PaymentstatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/paymentstatus")
public class PaymentstatusController {

    @Autowired
    private PaymentstatusRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<Paymentstatus> paymentstatusList(){
        return dao.findAll();
    }
}
