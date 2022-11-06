package com.bitproject.controller;

import com.bitproject.model.Paymentcategory;
import com.bitproject.repository.PaymentcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/paymentcategory")
public class PaymentcategoryController {

    @Autowired
    private PaymentcategoryRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<Paymentcategory> paymentcategoryList(){
        return dao.findAll();
    }


    @GetMapping(value = "/listonlyfulladvance",produces = "application/json")
    public List<Paymentcategory> paymentcategoryListonlyfullad(){
        return dao.getlistbyfullad();
    }
}
