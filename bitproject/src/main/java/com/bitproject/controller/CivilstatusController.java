package com.bitproject.controller;

import com.bitproject.model.Civilstatus;
import com.bitproject.repository.CivilstatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping(value = "/civilstatus")
@RestController
public class CivilstatusController {

    @Autowired
    private CivilstatusRepository dao;

    @GetMapping(value = "/list", produces = "application/json")
    public List<Civilstatus> civilstatuses() {
        return dao.list();
    }


}
