package com.bitproject.controller;

import com.bitproject.repository.ExpectedlaborRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/explabor")
public class ExpectedlaborController {

    @Autowired
    private ExpectedlaborRepository dao;


    // explabor/explanorlist?expdate=2022-04-25T13:31:00
    @GetMapping(value = "/explanorlist",params = {"expdate"},produces = "application/json")
    public List ExplaborList(@RequestParam("expdate") String expdate){
       return dao.getexplobor(LocalDateTime.parse(expdate));
    }
}
