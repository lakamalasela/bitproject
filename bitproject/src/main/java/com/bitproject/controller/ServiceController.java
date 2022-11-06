package com.bitproject.controller;


import com.bitproject.model.Service;
import com.bitproject.model.User;
import com.bitproject.repository.ServiceRepository;
import com.bitproject.repository.ServicestatusRepository;
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
@RequestMapping(value = "/service")
public class ServiceController {

    @Autowired
    private ServiceRepository dao;


    @Autowired
    private UserService userService;

    @Autowired
    private PrevilageController previlageController;

    @Autowired
    private ServicestatusRepository daostatus;


    @GetMapping(value = "/findAll",params = {"page","size"},produces = "application/json")
    public Page<Service>findAll(@RequestParam("page") int page,@RequestParam("size") int size){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"SERVICE");


        if(user!= null && priv != null && priv.get("select") ){

            return dao.findAll(PageRequest.of(page,size, Sort.Direction.DESC,"id"));
        }else
            return null;


    }

    @GetMapping(value = "/list",produces = "application/json")
    public List<Service>serviceList(){
        return dao.list();
    }

    //next number
    @GetMapping(value = "/nextnumber",produces = "application/json")
    public Service nextNumber(){
        String nextnumber = dao.getNextNumber();
        Service nextservice = new Service(nextnumber);
        return nextservice;
    }

    //search

    @GetMapping(value = "/findAll",params = {"page","size","searchtext"},produces = "application/json")
    public Page<Service>findAll(@RequestParam("page") int page,@RequestParam("size") int size,@RequestParam("searchtext") String searchtext ){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"SERVICE");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(searchtext,PageRequest.of(page,size, Sort.Direction.DESC,"id"));

        }else
            return null;



    }

    //insert
    @PostMapping
    public String insert(@RequestBody Service service){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"SERVICE");


        if(user!= null && priv != null && priv.get("add") ){
            try{

                dao.save(service);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Saving : You do not have previleges..!";




    }

    //delete
    @DeleteMapping
    public String delete(@RequestBody Service service){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"SERVICE");


        if(user!= null && priv != null && priv.get("delete") ){
            try{
                service.setServicestatus_id(daostatus.getById(3));//customer status object ekak illa gnnwa
                dao.save(service);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data.."+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Deleting : You do not have delete to previlege";


    }


    //update
    @PutMapping
    public String update(@RequestBody Service service){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"SERVICE");


        if(user!= null && priv != null && priv.get("update") ){

            try{

                dao.save(service);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }


        }else
            return "Error Updating: You do not have update to previlege";


    }
}
