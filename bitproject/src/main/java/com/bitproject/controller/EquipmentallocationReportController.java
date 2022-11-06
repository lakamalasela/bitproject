package com.bitproject.controller;

import com.bitproject.model.Equipmentallocation;
import com.bitproject.repository.EqallocationreportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/eqallocationreport")
public class EquipmentallocationReportController {

    @Autowired
    private EqallocationreportRepository dao;

    // eqallocationreport/eqallocationexpdate?expremovedatetime=2022-03-28 12:52:00&eqid=2
    //eqallocationreport/eqallocationexpdate?expremovedatetime=2022-03-28T12:52:00&eqid=2
    @GetMapping(value = "/eqallocationexpdate",params = {"expremovedatetime","eqid"},produces = "application/json")
    public List equipmentallocationexpdateList(@RequestParam("expremovedatetime")  String expremovedatetime, @RequestParam("eqid") int eqid){
        return dao.eqallocationexpdatetList(LocalDateTime.parse(expremovedatetime),eqid);
    }
}
