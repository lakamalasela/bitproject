package com.bitproject.controller;


import com.bitproject.model.Customer;
import com.bitproject.model.EquipmentInventory;
import com.bitproject.model.User;
import com.bitproject.repository.EquipmentInventoryRepository;
import com.bitproject.service.UserService;
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

@RestController
@RequestMapping(value = "/eqpinventory")
public class EquipmentInventoryController {

    @Autowired
    private EquipmentInventoryRepository dao;

    @Autowired
    private UserService userService;

    @Autowired
    private PrevilageController previlageController;



    @GetMapping(value = "/findAll",params = {"page","size"},produces = "application/json")
    public Page<EquipmentInventory> findAll(@RequestParam("page") int page, @RequestParam("size") int size){



        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"EQINVENTORY");


        if(user!= null && priv != null && priv.get("select") ){

            return dao.findAll(PageRequest.of(page,size, Sort.Direction.DESC,"id"));
        }else
            return null;



    }


    //search
    @GetMapping(value = "/findAll",params = {"page","size","searchtext"},produces = "application/json")
    public Page<EquipmentInventory>findAll(@RequestParam("page") int page, @RequestParam("size") int size,@RequestParam("searchtext") String searchtext){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"EQINVENTORY");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(searchtext,PageRequest.of(page,size, Sort.Direction.DESC,"id"));

        }else
            return null;





    }

    @GetMapping(value = "/list",produces = "application/json")
    public List<EquipmentInventory> equipmentavailableInventoryList(){
        return dao.getavailableEquipments();
    }

    //eqpinventory/avqty?equipmentid=7
    @GetMapping(value = "/avqty",params = {"equipmentid"},produces = "application/json")
    public EquipmentInventory avequipmentInventoryList(@RequestParam("equipmentid") int equipmentid){
        return dao.getavqtybyequipmentid(equipmentid);
    }

}
