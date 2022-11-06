package com.bitproject.controller;

import com.bitproject.model.Itemunit;
import com.bitproject.repository.ItemunitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/itemunit")
public class ItemunitController {

    @Autowired
    private ItemunitRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<Itemunit>itemunitList(){
        return dao.findAll();
    }
}
