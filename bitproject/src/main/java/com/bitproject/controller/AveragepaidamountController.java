package com.bitproject.controller;

import com.bitproject.repository.AveragepaidamountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/averagepaid")
public class AveragepaidamountController {

    @Autowired
    private AveragepaidamountRepository dao;

    //averagepaid/paidlist?cusid=19
    @GetMapping(value = "/paidlist",params = {"cusid"},produces = "application/json")
    public List averagePaidlist(@RequestParam("cusid") int cusid){
        return dao.getaveragepaidamount(cusid);
    }

    //averagepaid/paidamountlist?cid=19
    @GetMapping(value = "/paidamountlist",params = {"cid"},produces = "application/json")
    public List paidamountlist(@RequestParam("cid") int cid){
        return dao.getpaidamount(cid);
    }
}
