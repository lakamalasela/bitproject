package com.bitproject.controller;

import com.bitproject.model.Paymentmethod;
import com.bitproject.repository.PaymentmethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/paymentmethod")
public class PaymentmethodController {

    @Autowired
    private PaymentmethodRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<Paymentmethod> paymentmethodList(){
        return dao.findAll();
    }
}
