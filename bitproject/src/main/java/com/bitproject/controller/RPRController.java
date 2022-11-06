package com.bitproject.controller;

import com.bitproject.model.*;
import com.bitproject.repository.RPRRepository;
import com.bitproject.repository.RPRstatusRepository;
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
@RequestMapping(value = "/reservationprogress")
public class RPRController {

    @Autowired
    private UserService userService;


    @Autowired
    private PrevilageController previlageController;

    @Autowired
    private RPRRepository dao;

    @Autowired
    private RPRstatusRepository daostatus;



    @GetMapping(value = "/findAll",params = {"page","size"},produces = "application/json")
    public Page<Reservationprogress> findAll(@RequestParam("page") int page, @RequestParam("size") int size){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"RESERVATIONPROGRESS");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(PageRequest.of(page, size, Sort.Direction.DESC,"id"));
        }else
            return null;


    }

    @GetMapping(value = "/nextnumber",produces = "application/json")
    public Reservationprogress getNextnumber(){
        String nextnumber = dao.getnextnumber();
        Reservationprogress nextprogress = new Reservationprogress(nextnumber);
        return nextprogress;
    }



    //search

    @GetMapping(value = "/findAll",params = {"page","size","searchtext"},produces = "application/json")
    public Page<Reservationprogress>findAll(@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("searchtext") String searchtext){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"RESERVATIONPROGRESS");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(searchtext,PageRequest.of(page,size, Sort.Direction.DESC,"id"));

        }else
            return null;


    }

    //reservationprogress/byreservation?reservationid=16
    @GetMapping(value = "/byreservation",params = {"reservationid"},produces = "application/json")
    public List<Reservationprogress> reservationprogressListbyres(@RequestParam("reservationid") int reservationid){
        return dao.getbyreservation(reservationid);
    }

    //reservationprogress/listall
    @GetMapping(value = "/listall",produces = "application/json")
    public List<Reservationprogress> reservationprogressListall(){
        return dao.listall();
    }


    //insert
    @PostMapping
    public String inset(@RequestBody Reservationprogress rprogress){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"RESERVATIONPROGRESS");


        if(user!= null && priv != null && priv.get("add") ){
            try{

                for(ReservationprogressHasEstimationHasSubcategory rphehsc: rprogress.getReservationprogressHasEstimationHasSubcategoryList())
                    rphehsc.setReservationprogress_id(rprogress);


                dao.save(rprogress);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Saving : You do not have previleges..!";



    }




    //delete
    @DeleteMapping
    public String delete(@RequestBody Reservationprogress rprogress){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"BSR");


        if(user!= null && priv != null && priv.get("delete") ){
            try{
                rprogress.setRprstatus_id(daostatus.getById(3));//customer status object ekak illa gnnwa

                for(ReservationprogressHasEstimationHasSubcategory rphehsc: rprogress.getReservationprogressHasEstimationHasSubcategoryList())
                    rphehsc.setReservationprogress_id(rprogress);
//

                dao.save(rprogress);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data.."+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Deleting : You do not have delete to previlege";


    }

}
