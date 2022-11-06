package com.bitproject.controller;


import com.bitproject.model.ContactMedia;
import com.bitproject.repository.ContactmediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/contactmedia")
public class ContactmediaController {

    @Autowired
    private ContactmediaRepository dao;

    @GetMapping(value = "/list",produces = "application/json")
    public List<ContactMedia>contactmediaList(){
        return dao.findAll();
    }

}
