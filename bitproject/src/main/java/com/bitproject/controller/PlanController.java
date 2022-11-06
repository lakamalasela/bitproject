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

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/plan")
public class PlanController {


    @Autowired
    private UserService userService;


    @Autowired
    private PrevilageController previlageController;

    @Autowired
    private PlanRepository dao;

    @Autowired
    private PlanStatusRepository daostatus;

    @Autowired
    private EmployeeRepository daoemp;

    @Autowired
    private EmployeestatusRepository daoempstatus;

    @Autowired
    private ReservationRepository daoreservation;


    @Autowired
    private DesignerassignmentRepository daodesignerassign;

    @GetMapping(value = "/nextnumber",produces = "application/json")
    public Plan nextnumber(){
        String nextnumber = dao.getNextNumber();
        Plan nextplan = new Plan(nextnumber);
        return nextplan;
    }

    @GetMapping(value = "/list",produces = "application/json")
    public List<Plan>planList(){
        return dao.list();
    }


    //plan/listbyrestitle?reservationtitle=Planning and estimation for single for house Kohuwala
    @GetMapping(value = "/listbyrestitle",params = {"reservationtitle"},produces = "application/json")
    public List<Plan> planbytitle(@RequestParam("reservationtitle") String reservationtitle){
        return dao.listbytitle(reservationtitle);
    }


    @GetMapping(value = "/findAll",params = {"page","size"},produces = "application/json")
    public Page<Plan> findAll(@RequestParam("page") int page, @RequestParam("size") int size){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"PLAN");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(PageRequest.of(page, size, Sort.Direction.DESC,"id"));
        }else
            return null;


    }


    //search

    @GetMapping(value = "/findAll",params = {"page","size","searchtext"},produces = "application/json")
    public Page<Plan>findAll(@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("searchtext") String searchtext){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"PLAN");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(searchtext,PageRequest.of(page,size, Sort.Direction.DESC,"id"));

        }else
            return null;


    }







    //insert
    @PostMapping
    @Transactional
    public String inset(@RequestBody Plan plan){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"PLAN");


        if(user!= null && priv != null && priv.get("add") ){
            try{

                for(PlanHasFloorarea phf: plan.getPlanHasFloorareaList()) {
                    phf.setPlan_id(plan);
                    for (PlanHasFloorareaHasHouseSubparts phfasp :phf.getPlanHasFloorareaHasHousesubpartsList())
                        phfasp.setPlan_has_floorarea_id(phf);
                }

               Plan savedplan =  dao.save(plan);
                Employee empdesigner = daoemp.getById(plan.getEmployee_id().getId());
                empdesigner.setEmployeestatusId(daoempstatus.getById(1));
                daoemp.save(empdesigner);

                Designerassignment designassign = daodesignerassign.designerbyReservation(savedplan.getRnowithprojecttitle().substring(11));
                designassign.setActualcompleteddate(savedplan.getAddeddate());
                daodesignerassign.save(designassign);
                //System.out.println("1616--- "+savedplan.getRnowithprojecttitle().substring(11));

//                List<Reservation> planreses = daoreservation.getByResTitle(savedplan.getRnowithprojecttitle().substring(11));
//                System.out.println("1616--- "+planreses.size());
//              if (planreses.size() > 0){
//                  Reservation planres =  planreses.get(0);
//                  System.out.println("1616----"+planres);
//                  planres.setPlan_id(savedplan);
//                  System.out.println("1616----1");
//                  planres.setPlancharge(savedplan.getPlancharge());
//                  System.out.println("1616----2");
//                  planres.setPlanaddeddate(savedplan.getAddeddate());
//                  System.out.println("1616----3");
//                  planres.setTotalarea(savedplan.getTotalarea());
//                  System.out.println("1616----4");
//                  planres.setTotalcharge(planres.getTotalcharge().add(savedplan.getPlancharge()));
//                  System.out.println("892");
//                  for (ConstructionsubtaskHasFloorarea chf: planres.getConstructionsubtaskHasFloorareaList()) {
//                      chf.setReservation_id(planres);
//                      for (ConstructionsubtaskHasfloorareaHasHousesubparts chfhs :chf.getConstructionsubtaskHasfloorareaHasHousesubpartsList())
//                          chfhs.setConstructionsubtask_has_floorarea_id(chf);
//
//                  }
//
//                  daoreservation.save(planres);
//
//              }
//
//                Designerassignment designerass = daodesignerassign.getById(plan.getDesigner_id().getId());
//                if(designerass.getActualcompleteddate() == null){
//                    designerass.setActualcompleteddate(plan.getAddeddate());
//                    daodesignerassign.save(designerass);
//
//                }

                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Saving : You do not have previleges..!";



    }



    //update
    @PutMapping
    public String update(@RequestBody Plan plan){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"PLAN");


        if(user!= null && priv != null && priv.get("update") ){

            try{


                for(PlanHasFloorarea phf: plan.getPlanHasFloorareaList()) {
                    phf.setPlan_id(plan);
                    for (PlanHasFloorareaHasHouseSubparts phfasp :phf.getPlanHasFloorareaHasHousesubpartsList())
                        phfasp.setPlan_has_floorarea_id(phf);

                }
                dao.save(plan);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }


        }else
            return "Error Updating: You do not have update to previlege";



    }











    //delete
    @DeleteMapping
    public String delete(@RequestBody Plan plan){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"BSR");


        if(user!= null && priv != null && priv.get("delete") ){
            try{
//                bsr.setBsrstatus_id(daostatus.getById(3));
                plan.setPlanstatus_id(daostatus.getById(3));

                for(PlanHasFloorarea phf: plan.getPlanHasFloorareaList()) {
                    phf.setPlan_id(plan);
                    for(PlanHasFloorareaHasHouseSubparts phfasp :phf.getPlanHasFloorareaHasHousesubpartsList())
                        phfasp.setPlan_has_floorarea_id(phf);

                }
                dao.save(plan);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data.."+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Deleting : You do not have delete to previlege";


    }










}
