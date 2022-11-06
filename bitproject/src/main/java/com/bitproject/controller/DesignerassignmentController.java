package com.bitproject.controller;

import com.bitproject.model.*;
import com.bitproject.repository.DesignassignmentstatusRepository;
import com.bitproject.repository.DesignerassignmentRepository;
import com.bitproject.repository.EmployeeRepository;
import com.bitproject.repository.EmployeestatusRepository;
import com.bitproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/designerassignment")
public class DesignerassignmentController {

    @Autowired
    private UserService userService;


    @Autowired
    private PrevilageController previlageController;

    @Autowired
    private DesignerassignmentRepository dao;

    @Autowired
    private DesignassignmentstatusRepository daostatus;

    @Autowired
    private EmployeeRepository daoemp;

    @Autowired
    private EmployeestatusRepository daoempstatus;



    @GetMapping(value = "/findAll",params = {"page","size"},produces = "application/json")
    public Page<Designerassignment> findAll(@RequestParam("page") int page, @RequestParam("size") int size){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"DESIGNERASSIGNMENT");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(PageRequest.of(page, size, Sort.Direction.DESC,"id"));
        }else
            return null;


    }



    //search

    @GetMapping(value = "/findAll",params = {"page","size","searchtext"},produces = "application/json")
    public Page<Designerassignment>findAll(@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("searchtext") String searchtext){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"DESIGNERASSIGNMENT");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(searchtext,PageRequest.of(page,size, Sort.Direction.DESC,"id"));

        }else
            return null;


    }

//    @GetMapping(value = "/designerbyreservation",params = {"reservationid"},produces = "application/json")
//    public Designerassignment designerbyreservation(@RequestParam("reservationid") int reservationid){
//        return dao.designerbyReservation(reservationid);
//    }


    //insert data
    @PostMapping
    public String insert(@RequestBody Designerassignment designerassign){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"DESIGNERASSIGNMENT");


        if(user!= null && priv != null && priv.get("add") ){
            try{

                dao.save(designerassign);
                Employee designeremp = daoemp.getById(designerassign.getDesigneremployee_id().getId());
                designeremp.setEmployeestatusId(daoempstatus.getById(2));
                daoemp.save(designeremp);


                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Saving : You do not have previleges..!";







    }



    //update data
    @PutMapping
    public String update(@RequestBody Designerassignment designerassign){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"DESIGNERASSIGNMENT");


        if(user!= null && priv != null && priv.get("update") ){

            try{

                dao.save(designerassign);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }


        }else
            return "Error Updating: You do not have update to previlege";


    }




    //delete data
    @DeleteMapping
    public String delete(@RequestBody Designerassignment designerassign){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"DESIGNERASSIGNMENT");


        if(user!= null && priv != null && priv.get("delete") ){
            try{
                designerassign.setDesingerstatus_id(daostatus.getById(3));
                dao.save(designerassign);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data.."+ex.getMessage();
            }

        }else
            return "Error Deleting : You do not have delete to previlege";


    }








}
