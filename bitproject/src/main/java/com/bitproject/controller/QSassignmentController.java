package com.bitproject.controller;

import com.bitproject.model.Designerassignment;
import com.bitproject.model.Employee;
import com.bitproject.model.QSassignment;
import com.bitproject.model.User;
import com.bitproject.repository.EmployeeRepository;
import com.bitproject.repository.EmployeestatusRepository;
import com.bitproject.repository.QSassignmentRepository;
import com.bitproject.repository.QSstausRepository;
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
@RequestMapping(value = "/qsassignment")
public class QSassignmentController {


    @Autowired
    private UserService userService;


    @Autowired
    private PrevilageController previlageController;

    @Autowired
    private QSassignmentRepository dao;

    @Autowired
    private QSstausRepository daostatus;

    @Autowired
    private EmployeestatusRepository daoempstatus;

    @Autowired
    private EmployeeRepository daoemp;



    @GetMapping(value = "/findAll",params = {"page","size"},produces = "application/json")
    public Page<QSassignment> findAll(@RequestParam("page") int page, @RequestParam("size") int size){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"QSASSIGNMENT");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(PageRequest.of(page, size, Sort.Direction.DESC,"id"));
        }else
            return null;


    }

    //search
    @GetMapping(value = "/findAll",params = {"page","size","searchtext"},produces = "application/json")
    public Page<QSassignment>findAll(@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("searchtext") String searchtext){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"QSASSIGNMENT");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(searchtext,PageRequest.of(page,size, Sort.Direction.DESC,"id"));

        }else
            return null;


    }


    //insert data
    @PostMapping
    public String insert(@RequestBody QSassignment qsassign){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"QSASSIGNMENT");


        if(user!= null && priv != null && priv.get("add") ){
            try{
                dao.save(qsassign);

                Employee qsavemp = daoemp.getById(qsassign.getQsemployee_id().getId());
                qsavemp.setEmployeestatusId(daoempstatus.getById(2));
                daoemp.save(qsavemp);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Saving : You do not have previleges..!";







    }






    //update data
    @PutMapping
    public String update(@RequestBody QSassignment qsassign){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"QSASSIGNMENT");


        if(user!= null && priv != null && priv.get("update") ){

            try{

                dao.save(qsassign);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }


        }else
            return "Error Updating: You do not have update to previlege";


    }





    //delete data
    @DeleteMapping
    public String delete(@RequestBody QSassignment qsassign){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"QSASSIGNMENT");


        if(user!= null && priv != null && priv.get("delete") ){
            try{
                qsassign.setQsstatus_id(daostatus.getById(3));
                dao.save(qsassign);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data.."+ex.getMessage();
            }

        }else
            return "Error Deleting : You do not have delete to previlege";


    }


}
