package com.bitproject.controller;

import com.bitproject.model.Employee;
import com.bitproject.model.Reservation;
import com.bitproject.model.User;
import com.bitproject.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/avempreport")
public class EmployeeavailableReportController {


    @Autowired
    private EmployeeRepository dao;



    @GetMapping(value = "/avemplist",produces = "application/json")
    public List<Employee> assignemployeeList(){
        return dao.assignlaborList().stream().filter(e -> e.getCurrentreservationcode() == null).collect(Collectors.toList());
    }




//
//    @GetMapping(value = "/findAllactive", params = {"page","size"},produces = "application/json") //data set eka gnna json wedihata
//    public Page<Reservation> findAllactive(@RequestParam("page") int page, @RequestParam("size") int size ){
//
////        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
////
////        User user = userService.findUserByUserName(auth.getName());
////
////
////        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"RESERVATION");
//        return dao.findAllactive(PageRequest.of(page, size, Sort.Direction.DESC,"id")).stream().filter(e -> e.getCurrentreservationcode() == null).collect(Collectors.toList());
//
//
//
//
//
//    }



}
