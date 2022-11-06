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
@RequestMapping(value = "/customerpayment")
public class CustomerpaymentController {

    @Autowired
    private CustomerpaymentRepository dao;

    @Autowired
    private UserService userService;

    @Autowired
    private PrevilageController previlageController;

    @Autowired
    private ReservationRepository daoreservation;

    @Autowired
    private PaymentstatusRepository daostatus;

    @Autowired
    private CustomerRepository daocus;

    @Autowired
    private RPRRepository daorprogress;

    @Autowired
    private RPRstatusRepository daorprstatus;



    @GetMapping(value = "/findAll",params = {"page","size"},produces = "application/json")
    public Page<Customerpayment> findAll(@RequestParam("page") int page, @RequestParam("size") int size){



        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"CUSTOMERPAYMENT");


        if(user!= null && priv != null && priv.get("select") ){

            return dao.findAll(PageRequest.of(page,size, Sort.Direction.DESC,"id"));
        }else
            return null;



    }

    //customerpayment/listbyreservation?reservationid=10
    @GetMapping(value = "/listbyreservation",params = {"reservationid"},produces = "application/json")
    public List<Customerpayment> customerpaymentList(@RequestParam("reservationid") int reservationid){
        return dao.getbyreservation(reservationid);
    }


    //search
    @GetMapping(value = "/findAll",params = {"page","size","searchtext"},produces = "application/json")
    public Page<Customerpayment>findAll(@RequestParam("page") int page, @RequestParam("size") int size,@RequestParam("searchtext") String searchtext){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"CUSTOMERPAYMENT");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(searchtext,PageRequest.of(page,size, Sort.Direction.DESC,"id"));

        }else
            return null;





    }

    @GetMapping(value = "/nextnumber",produces = "application/json")
    public Customerpayment nextnumber(){
        String nextnumber = dao.getNextNumber();
        Customerpayment nextcustomerpayment = new Customerpayment(nextnumber);
        return  nextcustomerpayment;
    }


    //insert data
    @Transactional
    @PostMapping
    public String insert(@RequestBody Customerpayment cuspayment){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"CUSTOMERPAYMENT");


        if(user!= null && priv != null && priv.get("add") ){
            try{

                dao.save(cuspayment);

                //reservation ekee paid amount ekta customer payment ekee paid amount ekta add krnwa
                Reservation padidAmount = daoreservation.getById(cuspayment.getReservation_id().getId());
                padidAmount.setPaidamount(padidAmount.getPaidamount().add(cuspayment.getPaidamount()));

                for (ConstructionsubtaskHasFloorarea chf: padidAmount.getConstructionsubtaskHasFloorareaList()) {
                    chf.setReservation_id(padidAmount);
                    for (ConstructionsubtaskHasfloorareaHasHousesubparts chfhs :chf.getConstructionsubtaskHasfloorareaHasHousesubpartsList())
                        chfhs.setConstructionsubtask_has_floorarea_id(chf);

                }

                daoreservation.save(padidAmount);

                //customer arrears eken adu krnwa paid amount eka
                Customer cusarrears = daocus.getById(cuspayment.getReservation_id().getCustomer_id().getId());
                cusarrears.setArrearsamount(cusarrears.getArrearsamount().subtract(cuspayment.getPaidamount()));
                daocus.save(cusarrears);
//
//                Reservation cuslp = daoreservation.getById(cuspayment.getReservation_id().getId());
//                cuslp.setLastprice(cuspayment.getLastbalance());
//                daoreservation.save(cuslp);
//

                //reservation progress ekee status eka set krnwa completed kiyla
                if(cuspayment.getReservationprogress_id() != null){
                    Reservationprogress rprstatus = daorprogress.getById(cuspayment.getReservationprogress_id().getId());
                    rprstatus.setRprstatus_id(daorprstatus.getById(1));


                    for(ReservationprogressHasEstimationHasSubcategory rphehsc: rprstatus.getReservationprogressHasEstimationHasSubcategoryList())
                        rphehsc.setReservationprogress_id(rprstatus);


                    daorprogress.save(rprstatus);

                }


                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Saving : You do not have previleges..!";




    }



    //delete data
    @DeleteMapping
    public String delete(@RequestBody Customerpayment cuspayment){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"CUSTOMERPAYMENT");


        if(user!= null && priv != null && priv.get("delete") ){
            try{
                cuspayment.setPaymentstatus_id(daostatus.getById(3));//customer status object ekak illa gnnwa
                dao.save(cuspayment);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data.."+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Deleting : You do not have delete to previlege";


    }



}
