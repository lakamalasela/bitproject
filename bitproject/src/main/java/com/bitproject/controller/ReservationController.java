package com.bitproject.controller;

import com.bitproject.model.*;
import com.bitproject.repository.*;
import com.bitproject.service.SMSService;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/reservation")
public class ReservationController {


    @Autowired
    private UserService userService;


    @Autowired
    private PrevilageController previlageController;

    @Autowired
    private ReservationRepository dao;

    @Autowired
    private ReservationstatusRepository daostatus;

    @Autowired
    private EmployeestatusRepository daoempstatus;

    @Autowired
    private EmployeeRepository daoemp;

    @Autowired
    private CustomerRepository daocus;

    @Autowired
    private DesignerassignmentRepository daodesigner;

    @Autowired
    private SMSService smservice;



    @GetMapping(value = "/findAll",params = {"page","size"},produces = "application/json")
    public Page<Reservation> findAll(@RequestParam("page") int page, @RequestParam("size") int size){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"RESERVATION");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(PageRequest.of(page, size, Sort.Direction.DESC,"id"));
        }else
            return null;


    }


    //search
    @GetMapping(value = "/findAll",params = {"page","size","searchtext"},produces = "application/json")
    public Page<Reservation>findAll(@RequestParam("page") int page, @RequestParam("size") int size,@RequestParam("searchtext") String searchtext){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"RESERVATION");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(searchtext,PageRequest.of(page,size, Sort.Direction.DESC,"id"));

        }else
            return null;





    }




    @GetMapping(value = "/findAllactive", params = {"page","size"},produces = "application/json") //data set eka gnna json wedihata
    public Page<Reservation> findAllactive(@RequestParam("page") int page, @RequestParam("size") int size ){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());


        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"RESERVATION");


        if(user!= null && priv != null && priv.get("select") ){

            return dao.findAllactive(PageRequest.of(page, size, Sort.Direction.DESC,"id"));
        }else
            return null;




    }



    @GetMapping(value = "/nextnumber",produces = "application/json")
    public Reservation nextnumber(){
        String nextnumber = dao.getNextnumber();
        Reservation nextreservation = new Reservation(nextnumber);
        return  nextreservation;
    }

    @GetMapping(value = "/list",produces = "application/json")
    public List<Reservation>reservationList(){
        return dao.list();
    }

    @GetMapping(value = "/activelist",produces = "application/json")
    public List<Reservation> activereservation(){
        return dao.activereservationList();
    }

    @GetMapping(value = "/activeprogresslist",produces = "application/json")
    public List<Reservation> activeProgressreservation(){
        return dao.activeProgressreservationList();
    }

    //reservation/resbycustomer?customerid=11
    @GetMapping(value = "/resbycustomer",params = {"customerid"},produces = "application/json")
    public List<Reservation> customerbyreservation(@RequestParam("customerid") int customerid){
        return dao.getbyCustomer(customerid);
    }

    @GetMapping(value = "/resbyadded",params = {"designerid"},produces = "application/json")
    public List<Reservation> reservationListdesigner(@RequestParam("designerid") int designerid){
        return dao.getbyDesigner(designerid);
    }

    //reservation/avestimation
//    @GetMapping(value = "/avestimation",produces = "application/json")
//    public List<Reservation> avestimationreservationList(){
//        List<Reservation> aveslist = dao.getavestimation().stream().filter(e -> e.getEstimation_id().getId() == null).collect(Collectors.toList());
//
//        if(aveslist.size() !=0){
//            return aveslist;
//        }else{
//            return null;
//        }
//    }

    //reservation/resbyqs?qsid=4
    @GetMapping(value = "/resbyqs",params = {"qsid"},produces = "application/json")
    public List<Reservation> reservationListQs(@RequestParam("qsid") int qsid){
        return dao.getbyQs(qsid);
    }
    //insert
    @PostMapping
    public String inset(@RequestBody Reservation reservation){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"RESERVATION");


        if(user!= null && priv != null && priv.get("add") ){
            try{
                for (ConstructionsubtaskHasFloorarea chf: reservation.getConstructionsubtaskHasFloorareaList()) {
                    chf.setReservation_id(reservation);
                    for (ConstructionsubtaskHasfloorareaHasHousesubparts chfhs :chf.getConstructionsubtaskHasfloorareaHasHousesubpartsList())
                        chfhs.setConstructionsubtask_has_floorarea_id(chf);

                }

                if(reservation.getPlan_id() !=null || reservation.getEstimation_id() !=null){
                    reservation.setReservationstatus_id(daostatus.getById(1));
                }//plan eka hari estimation eka hari demmoth status eka active wenwa

                dao.save(reservation);

                //SMS sms = new SMS();
                //sms.setTo("+94756273298");
                //sms.setTo("+94"+reservation.getCustomer_id().getMobile().substring(1));
//
//
//                if(reservation.getPlan_id() !=null && reservation.getService_id().getId() == 1){
//                    sms.setMessage("Plan is Reday");
//                    smservice.send(sms);
//                }else if(reservation.getPlan_id() !=null && reservation.getService_id().getId() == 2){
//                    sms.setMessage("Estimation is Reday");
//                    smservice.send(sms);
//                }else if(reservation.getPlan_id() !=null && reservation.getService_id().getId() == 3){
//                    sms.setMessage("Service is Reday");
//                    smservice.send(sms);
//                }


                Customer   existcustomer = daocus.getById(reservation.getCustomer_id().getId());
                existcustomer.setVisitcount(existcustomer.getVisitcount()+1);
                System.out.println("VISIT COUNT "+existcustomer.getVisitcount());
                daocus.save(existcustomer);






                Employee supervisoremp = daoemp.getById(reservation.getSupervisor_id().getId());
                supervisoremp.setEmployeestatusId(daoempstatus.getById(2));
                daoemp.save(supervisoremp);

                //arrears amount ekta reservation eke last rice eka dd krnwa
                Customer cusarrears = daocus.getById(reservation.getCustomer_id().getId());
                cusarrears.setArrearsamount(cusarrears.getArrearsamount().add(reservation.getLastprice()));
               daocus.save(cusarrears);

                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Saving : You do not have previleges..!";



    }



    //update data
    @PutMapping
    public String update(@RequestBody Reservation reservation){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"RESERVATION");

        System.out.println("bkik-- "+user.getUserName() +"=== "+priv );
        if(user!= null && priv != null && priv.get("update") ){

            try {

                for (ConstructionsubtaskHasFloorarea chf : reservation.getConstructionsubtaskHasFloorareaList()) {
                    chf.setReservation_id(reservation);
                    for (ConstructionsubtaskHasfloorareaHasHousesubparts chfhs : chf.getConstructionsubtaskHasfloorareaHasHousesubpartsList())
                        chfhs.setConstructionsubtask_has_floorarea_id(chf);

                }

                if (reservation.getPlan_id() != null || reservation.getEstimation_id() != null) {
                    reservation.setReservationstatus_id(daostatus.getById(1));
                }

                dao.save(reservation);

//
               SMS sms = new SMS();
               sms.setTo("+94756273298");
                //sms.setTo("+94"+reservation.getCustomer_id().getMobile().substring(1,10));


                if(reservation.getPlan_id() !=null && reservation.getService_id().getId() == 1){
                    sms.setMessage("S-Plan is Reday. \n\n Thank You");
                    smservice.send(sms);
                }else if(reservation.getPlan_id() !=null && reservation.getEstimation_id() !=null && reservation.getService_id().getId() == 2){
                    sms.setMessage("S-Estimation is Reday. \n\n Thank You");
                    smservice.send(sms);
                }else if(reservation.getPlan_id() !=null && reservation.getEstimation_id() !=null && reservation.getService_id().getId() == 3){
                    sms.setMessage("Fully service is Reday.  \n\n Thank You");
                    smservice.send(sms);
                }else if(reservation.getPlan_id() !=null && reservation.getService_id().getId() == 4){
                  sms.setMessage("T-Plan is Reday.  \n\n Thank You");
                   smservice.send(sms);
                }else if(reservation.getPlan_id() !=null && reservation.getEstimation_id() !=null && reservation.getService_id().getId() == 5){
                   sms.setMessage("T-Estimation is Reday.  \n\n Thank You");
                   smservice.send(sms);
                }else if(reservation.getPlan_id() !=null && reservation.getEstimation_id() !=null && reservation.getService_id().getId() == 6){
                   sms.setMessage("Fully T-service is Reday.  \n\n Thank You");
                   smservice.send(sms);
                }


                //arrears amount ekta reservation eke last rice eka dd krnwa
                Customer cusarrears = daocus.getById(reservation.getCustomer_id().getId());
                cusarrears.setArrearsamount(cusarrears.getArrearsamount().add(reservation.getLastprice()));
                daocus.save(cusarrears);

//                if(reservation.getPlan_id()!=null){
//                    Designerassignment actDate = daodesigner.g;
//                    actDate.setActualcompleteddate(reservation.getPlanaddeddate());
//                    daodesigner.save(actDate);
//                }

                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }


        }else
            return "Error Updating: You do not have update to previlege";


    }





    //delete
    @DeleteMapping
    public String delete(@RequestBody Reservation reservation){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"RESERVATION");


        if(user!= null && priv != null && priv.get("delete") ){
            try{

                for (ConstructionsubtaskHasFloorarea chf: reservation.getConstructionsubtaskHasFloorareaList()){
                    chf.setReservation_id(reservation);

                    for (ConstructionsubtaskHasfloorareaHasHousesubparts chfhs :chf.getConstructionsubtaskHasfloorareaHasHousesubpartsList())
                        chfhs.setConstructionsubtask_has_floorarea_id(chf);

                }




//                bsr.setBsrstatus_id(daostatus.getById(3));//customer status object ekak illa gnnwa
                reservation.setReservationstatus_id(daostatus.getById(3));

                dao.save(reservation);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data.."+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Deleting : You do not have delete to previlege";


    }





}
