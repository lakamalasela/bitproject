package com.bitproject.controller;


import com.bitproject.model.*;
import com.bitproject.repository.*;
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
@RequestMapping(value = "/estimation")
public class EstimationController {

    @Autowired
    private EstimationRepository dao;

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeRepository daoemp;

    @Autowired
    private EmployeestatusRepository daoempstatus;


    @Autowired
    private PrevilageController previlageController;

    @Autowired
    private EstimationstatusRepository daostatus;

    @Autowired
    private QSassignmentRepository daoqsassign;


    @GetMapping(value = "/nextnumber",produces = "application/json")
    public Estimation nextnumber(){
        String nextnumber = dao.getNextNumber();
        Estimation nextestimation = new Estimation(nextnumber);
        return nextestimation;
    }

    @GetMapping(value = "/list",produces = "application/json")
    public List<Estimation>estimationList(){
        return dao.list();
    }

    //estimation/listbytitle?reservationtitle=Planning and estimation single floor house in Kirulapana
    @GetMapping(value = "/listbytitle",params = {"reservationtitle"},produces = "application/json")
    public List<Estimation> listBytitle(@RequestParam("reservationtitle") String reservationtitle){
        return dao.listbyrestitle(reservationtitle);
    }


    @GetMapping(value = "/findAll",params = {"page","size"},produces = "application/json")
    public Page<Estimation>findAll(@RequestParam("page") int page,@RequestParam("size") int size){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"ESTIMATION");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(PageRequest.of(page, size, Sort.Direction.DESC,"id"));
        }else
            return null;




    }

    //search
    @GetMapping(value = "/findAll",params = {"page","size","searchtext"},produces = "application/json")
    public Page<Estimation>findAll(@RequestParam("page") int page,@RequestParam("size") int size,@RequestParam("searchtext") String searchtext){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"ESTIMATION");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(searchtext,PageRequest.of(page,size, Sort.Direction.DESC,"id"));

        }else
            return null;

    }

    //insert data
    @PostMapping
    public String insert(@RequestBody Estimation estimation){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"ESTIMATION");


        if(user!= null && priv != null && priv.get("add") ){
            try{

               for(EstimationHasSubcategory ehs: estimation.getEstimationHasSubcategoryList())
                   ehs.setEstimation_id(estimation);

                dao.save(estimation);
                Employee empqs = daoemp.getById(estimation.getEmployee_id().getId());
                empqs.setEmployeestatusId(daoempstatus.getById(1));
                daoemp.save(empqs);

                QSassignment qsassignres = daoqsassign.qsbyReservation(estimation.getRnowithprojecttitle().substring(11));//reservation code ek substring krla yawanawa parameter ekak wedihata
                qsassignres.setActualcompleteddate(estimation.getAddeddate());
                daoqsassign.save(qsassignres);



                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Saving : You do not have previleges..!";

    }


    //update
    @PutMapping
    public String update(@RequestBody Estimation estimation){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"ESTIMATION");


        if(user!= null && priv != null && priv.get("update") ){

            try{

                for(EstimationHasSubcategory ehs: estimation.getEstimationHasSubcategoryList())
                    ehs.setEstimation_id(estimation);

                dao.save(estimation);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }


        }else
            return "Error Updating: You do not have update to previlege";






    }

    //delete data
    @DeleteMapping
    public String delete(@RequestBody Estimation estimation){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"ESTIMATION");


        if(user!= null && priv != null && priv.get("delete") ){
            try{
                estimation.setEstimationstatus_id(daostatus.getById(3));

                for(EstimationHasSubcategory ehs: estimation.getEstimationHasSubcategoryList())
                    ehs.setEstimation_id(estimation);

                dao.save(estimation);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data.."+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Deleting : You do not have delete to previlege";


    }


}
