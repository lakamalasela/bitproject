package com.bitproject.controller;

import com.bitproject.model.Reservationstatus;
import com.bitproject.repository.ReservationstatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/reservationstatus")
public class ReservationstatusController {

    @Autowired
    private ReservationstatusRepository dao;


    @GetMapping(value = "/list",produces = "application/json")
    public List<Reservationstatus>reservationstatusList(){
        return dao.findAll();
    }
}
