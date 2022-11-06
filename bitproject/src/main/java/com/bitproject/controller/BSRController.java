package com.bitproject.controller;


import com.bitproject.model.BSR;
import com.bitproject.model.BSRHasBSRsubcategory;
import com.bitproject.model.Customer;
import com.bitproject.model.User;
import com.bitproject.repository.BSRRepository;
import com.bitproject.repository.BSRstatusRepository;
import com.bitproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/bsr")
public class BSRController {

        @Autowired
        private UserService userService;


        @Autowired
        private PrevilageController previlageController;

        @Autowired
        private BSRRepository dao;

        @Autowired
        private BSRstatusRepository daostatus;


        @GetMapping(value = "/listbybsrcode",params = {"provinceid"},produces = "application/json")
        public List<BSR>bsrList(@RequestParam("provinceid") int provinceid){
                return dao.listbybsrcode(provinceid);
        }


        @GetMapping(value = "/findAll",params = {"page","size"},produces = "application/json")
        public Page<BSR> findAll(@RequestParam("page") int page, @RequestParam("size") int size){
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();

                User user = userService.findUserByUserName(auth.getName());

                HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"BSR");


                if(user!= null && priv != null && priv.get("select") ){
                        return dao.findAll(PageRequest.of(page, size, Sort.Direction.DESC,"id"));
                }else
                        return null;


        }

        //get the province of bsr
        @GetMapping(value = "/list",produces = "application/json")
        public List<BSR>list(){
                return dao.list();
        }


        //search

        @GetMapping(value = "/findAll",params = {"page","size","searchtext"},produces = "application/json")
        public Page<BSR>findAll(@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("searchtext") String searchtext){


                Authentication auth = SecurityContextHolder.getContext().getAuthentication();

                //userService kiynne variable ekak
                User user = userService.findUserByUserName(auth.getName());

                HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"BSR");


                if(user!= null && priv != null && priv.get("select") ){
                        return dao.findAll(searchtext,PageRequest.of(page,size, Sort.Direction.DESC,"id"));

                }else
                        return null;


        }

        //insert
        @PostMapping
        public String inset(@RequestBody BSR bsr){


                Authentication auth = SecurityContextHolder.getContext().getAuthentication();

                //userService kiynne variable ekak
                User user = userService.findUserByUserName(auth.getName());

                HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"BSR");


                if(user!= null && priv != null && priv.get("add") ){
                        try{

                                for(BSRHasBSRsubcategory shi: bsr.getBsrHasBSRsubcategoryList())
                                        shi.setBsr_id(bsr);


                                dao.save(bsr);
                                return "0";
                        }catch (Exception ex){
                                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
                        }

                }else
                        return "Error Saving : You do not have previleges..!";



        }

        //delete
        @DeleteMapping
        public String delete(@RequestBody BSR bsr){

                Authentication auth = SecurityContextHolder.getContext().getAuthentication();

                //userService kiynne variable ekak
                User user = userService.findUserByUserName(auth.getName());

                HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"BSR");


                if(user!= null && priv != null && priv.get("delete") ){
                        try{
                                bsr.setBsrstatus_id(daostatus.getById(3));//customer status object ekak illa gnnwa

                                for(BSRHasBSRsubcategory shi: bsr.getBsrHasBSRsubcategoryList())
                                        shi.setBsr_id(bsr);

                                dao.save(bsr);
                                return "0";
                        }catch (Exception ex){
                                return "Not Save Your Data.."+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
                        }

                }else
                        return "Error Deleting : You do not have delete to previlege";


        }

        //update
        @PutMapping
        public String update(@RequestBody BSR bsr){


                Authentication auth = SecurityContextHolder.getContext().getAuthentication();

                User user = userService.findUserByUserName(auth.getName());

                HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"BSR");


                if(user!= null && priv != null && priv.get("update") ){

                        try{


                                for(BSRHasBSRsubcategory shi: bsr.getBsrHasBSRsubcategoryList())
                                        shi.setBsr_id(bsr);


                                dao.save(bsr);
                                return "0";
                        }catch (Exception ex){
                                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
                        }


                }else
                        return "Error Updating: You do not have update to previlege";



        }










}
