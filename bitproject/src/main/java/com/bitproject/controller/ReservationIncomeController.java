package com.bitproject.controller;

import com.bitproject.model.Reservation;
import com.bitproject.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/resincome")
public class ReservationIncomeController {

    @Autowired
    private ReservationRepository dao;

    //resincome/listincome?startdate=2022-03-01&enddate=2022-04-30
    @GetMapping(value = "/listincome",params = {"startdate","enddate"},produces = "application/json")
    public List reservationicomeList(@RequestParam("startdate") String startdate,@RequestParam("enddate") String enddate){
        return dao.resincomelist(LocalDate.parse(startdate),LocalDate.parse(enddate));
    }

    @GetMapping(value = "/expincome",produces = "application/json")
    public List expIncome(){
        return dao.expincomelist();
    }

}
