package com.bitproject.controller;

import com.bitproject.model.Employeetracking;
import com.bitproject.repository.EmptrackingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/emptrack")
public class EmployeetrackingController {

    @Autowired
    private EmptrackingRepository dao;

    //emptrack/emptracklist?empid=6
    @GetMapping(value = "/emptracklist",params = {"empid"},produces = "application/json")
    public List<Employeetracking> employeetrackingList(@RequestParam("empid") int empid){
        return dao.emptrackingReservation(empid);
    }
}
