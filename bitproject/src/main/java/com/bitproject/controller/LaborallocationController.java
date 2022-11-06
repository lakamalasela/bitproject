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

import java.time.Duration;
import java.time.Period;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/lallocation")
public class LaborallocationController {

    @Autowired
    private UserService userService;

    @Autowired
    private PrevilageController previlageController;

    @Autowired
    private LaborallocationRepository dao;

    @Autowired
    private LaborallocationtypeRepository daotype;

    @Autowired
    private LaborallocationstatusRepository daostatus;

    @Autowired
    private EmployeeRepository daoemp;

    @Autowired
    private EmployeestatusRepository daoempstatus;

    @Autowired
    private EmptrackingRepository daoemtracking;


    @GetMapping(value = "/findAll", params = {"page", "size"}, produces = "application/json")
    public Page<Laborallocation> findAll(@RequestParam("page") int page, @RequestParam("size") int size) {


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String, Boolean> priv = previlageController.getPrivilages(user, "EMPSHIFTMENT");


        if (user != null && priv != null && priv.get("select")) {

            return dao.findAll(PageRequest.of(page, size, Sort.Direction.DESC, "id"));
        } else
            return null;


    }

    //search
    @GetMapping(value = "/findAll", params = {"page", "size", "searchtext"}, produces = "application/json")
    public Page<Laborallocation> findAll(@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("searchtext") String searchtext) {


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String, Boolean> priv = previlageController.getPrivilages(user, "EMPSHIFTMENT");


        if (user != null && priv != null && priv.get("select")) {
            return dao.findAll(searchtext, PageRequest.of(page, size, Sort.Direction.DESC, "id"));

        } else
            return null;


    }


    @GetMapping(value = "/nextnumber", produces = "application/json")
    public Laborallocation nextnumber() {
        String nextnumber = dao.getNextnumber();
        Laborallocation nextempallocation = new Laborallocation(nextnumber);
        return nextempallocation;

    }

    @GetMapping(value = "/avlabor", params = {"fromreservationid"}, produces = "application/json")
    public List<Laborallocation> avlaborallocationList(@RequestParam("fromreservationid") int fromreservationid) {
        return dao.getavaliablelabor(fromreservationid);
    }

//    @GetMapping(value = "/avlabor",params = {"fromreservationid"},produces = "application/json")
//    public Laborallocation avlaborbyreservation(@RequestParam("fromreservationid") int fromreservationid){
//
//        List<Laborallocation> lalist = dao.getavaliablelabor(fromreservationid);
//        if(lalist.size() !=0)
//        return lalist.get(0);
//        else return null;
//    }


    //insert data
    @PostMapping
    public String insert(@RequestBody Laborallocation empallocation) {


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String, Boolean> priv = previlageController.getPrivilages(user, "EMPSHIFTMENT");


        if (user != null && priv != null && priv.get("add")) {
            try {

                dao.save(empallocation);

                if (empallocation.getLatype_id().getName().equals("Emp-Assign")) {
                    Employee avlaboremployee = daoemp.getById(empallocation.getLaboremployee_id().getId());
                    avlaboremployee.setEmployeestatusId(daoempstatus.getById(2));
                    avlaboremployee.setCurrentreservationcode(empallocation.getLafromreservation_id().getReservationcode());
                    avlaboremployee.setProjecttitle(empallocation.getLafromreservation_id().getProjecttitle());
                    daoemp.save(avlaboremployee);


                } else if (empallocation.getLatype_id().getName().equals("Emp-Remove")) {
                    Employee relaboremployee = daoemp.getById(empallocation.getLaboremployee_id().getId());
                    relaboremployee.setEmployeestatusId(daoempstatus.getById(1));
                    relaboremployee.setCurrentreservationcode(null);
                    relaboremployee.setProjecttitle(null);
                    daoemp.save(relaboremployee);
                }

                if (empallocation.getLatype_id().getName().equals("Emp-Transfer In")) {
                    Laborallocation newlatin = new Laborallocation();
                    newlatin.setLacode(dao.getNextnumber());
                    newlatin.setLatype_id(daotype.getById(4));
                    newlatin.setLastatus_id(empallocation.getLastatus_id());
                    //newlatin.setLastatus_id(daostatus.getById(2));

                    newlatin.setLafromreservation_id(empallocation.getLatoreservation_id());
                    newlatin.setLatoreservation_id(empallocation.getLafromreservation_id());

                    newlatin.setLaboremployee_id(empallocation.getLaboremployee_id());

                    newlatin.setTransferoutdatetime(empallocation.getTransferindatetime());

                    newlatin.setDescription(empallocation.getDescription());
                    newlatin.setAddeddatetime(empallocation.getAddeddatetime());
                    newlatin.setEmployee_id(empallocation.getEmployee_id());
                    newlatin.setExpectedremovedatetime(empallocation.getExpectedremovedatetime());


                    dao.save(newlatin);

                    Employee avlaboremployee = daoemp.getById(empallocation.getLaboremployee_id().getId());
                    avlaboremployee.setEmployeestatusId(daoempstatus.getById(2));
                    avlaboremployee.setCurrentreservationcode(empallocation.getLafromreservation_id().getReservationcode());
                    avlaboremployee.setProjecttitle(empallocation.getLafromreservation_id().getProjecttitle());
                    daoemp.save(avlaboremployee);
                } else if (empallocation.getLatype_id().getName().equals("Emp-Transfer Out")) {
                    Laborallocation newlatout = new Laborallocation();

                    newlatout.setLacode(dao.getNextnumber());
                    newlatout.setLatype_id(daotype.getById(3));
                    newlatout.setLastatus_id(empallocation.getLastatus_id());
                    //newlatout.setLastatus_id(daostatus.getById(2));

                    newlatout.setLafromreservation_id(empallocation.getLatoreservation_id());
                    newlatout.setLatoreservation_id(empallocation.getLafromreservation_id());

                    newlatout.setLaboremployee_id(empallocation.getLaboremployee_id());

                    newlatout.setTransferindatetime(empallocation.getTransferoutdatetime());

                    newlatout.setDescription(empallocation.getDescription());
                    newlatout.setAddeddatetime(empallocation.getAddeddatetime());
                    newlatout.setEmployee_id(empallocation.getEmployee_id());
                    newlatout.setExpectedremovedatetime(empallocation.getExpectedremovedatetime());

                    dao.save(newlatout);

                    Employee avltoutaboremployee = daoemp.getById(empallocation.getLaboremployee_id().getId());
                    avltoutaboremployee.setEmployeestatusId(daoempstatus.getById(2));
                    avltoutaboremployee.setCurrentreservationcode(empallocation.getLatoreservation_id().getReservationcode());
                    avltoutaboremployee.setProjecttitle(empallocation.getLatoreservation_id().getProjecttitle());
                    daoemp.save(avltoutaboremployee);
                }

                //add to tracking table
                if (empallocation.getLatype_id().getName().equals("Emp-Assign")) {
                    Employeetracking emptrack = new Employeetracking();
                    emptrack.setEmployee_id(empallocation.getLaboremployee_id());
                    emptrack.setReservation_id(empallocation.getLafromreservation_id());
                    emptrack.setAssigndatetime(empallocation.getAssigndatetime());
                    emptrack.setRemovedatetime(empallocation.getExpectedremovedatetime());

                //    emptrack.setNofoworkingdates(Integer.parseInt(String.valueOf(Duration.between(empallocation.getAssigndatetime(),empallocation.getExpectedremovedatetime()))));
                    emptrack.setNofoworkingdates(Long.valueOf(0));

                    daoemtracking.save(emptrack);
//

                }else if (empallocation.getLatype_id().getName().equals("Emp-Remove")) {
                    Employeetracking emptrck = daoemtracking.getByReservationId(empallocation.getLafromreservation_id().getId(),empallocation.getLaboremployee_id().getId());//assign wela thiyena adaala reservation eka saha employee select kra geneema
                    emptrck.setRemovedatetime(empallocation.getRemovedatetime());
                    Duration duration = Duration.between(emptrck.getAssigndatetime(),empallocation.getAddeddatetime());

                    emptrck.setNofoworkingdates(duration.toDays());

                    daoemtracking.save(emptrck);
                }else if (empallocation.getLatype_id().getName().equals("Emp-Transfer In")) {

                    Employeetracking emptrck = daoemtracking.getByReservationId(empallocation.getLatoreservation_id().getId(),empallocation.getLaboremployee_id().getId());
                    emptrck.setRemovedatetime(empallocation.getAddeddatetime());
                    Duration duration = Duration.between(emptrck.getAssigndatetime(),empallocation.getAddeddatetime());
                    emptrck.setNofoworkingdates(duration.toDays());
                    daoemtracking.save(emptrck);

                    //transfer in una employee save kra gnnwa ee addala reservation ekta assign ekak wedihata
                    Employeetracking emptrack = new Employeetracking();
                    emptrack.setEmployee_id(empallocation.getLaboremployee_id());
                    emptrack.setReservation_id(empallocation.getLafromreservation_id());
                    emptrack.setAssigndatetime(empallocation.getTransferindatetime());
                    emptrack.setRemovedatetime(empallocation.getExpectedremovedatetime());
                    emptrack.setNofoworkingdates(Long.valueOf(0));

                    daoemtracking.save(emptrack);
                }

                return "0";
            } catch (Exception ex) {
                return "Not Save Your Data" + ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        } else
            return "Error Saving : You do not have previleges..!";


    }


    //update data
    @PutMapping
    public String update(@RequestBody Laborallocation empallocation) {


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String, Boolean> priv = previlageController.getPrivilages(user, "EMPSHIFTMENT");


        if (user != null && priv != null && priv.get("update")) {

            try {

                dao.save(empallocation);

                if(empallocation.getLastatus_id().getName().equals("Deleted")){
                    if(empallocation.getLatype_id().getName().equals("Emp-Transfer In")){
                        Laborallocation emptin = dao.getBytout(4,empallocation.getLatoreservation_id().getId(),empallocation.getLafromreservation_id().getId());
                        emptin.setLastatus_id(daostatus.getById(3));
                        dao.save(emptin);
                    }else if(empallocation.getLatype_id().getName().equals("Emp-Transfer Out")){
                        Laborallocation emptout = dao.getByin(3,empallocation.getLatoreservation_id().getId(),empallocation.getLafromreservation_id().getId());
                        emptout.setLastatus_id(daostatus.getById(3));
                        dao.save(emptout);
                    }
                }

                return "0";
            } catch (Exception ex) {
                return "Not Save Your Data" + ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }


        } else
            return "Error Updating: You do not have update to previlege";


    }


    //delete data
    @DeleteMapping
    public String delete(@RequestBody Laborallocation empallocation) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String, Boolean> priv = previlageController.getPrivilages(user, "EMPSHIFTMENT");


        if (user != null && priv != null && priv.get("delete")) {
            try {
                empallocation.setLastatus_id(daostatus.getById(3));//customer status object ekak illa gnnwa
                dao.save(empallocation);
                return "0";
            } catch (Exception ex) {
                return "Not Save Your Data.." + ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        } else
            return "Error Deleting : You do not have delete to previlege";


    }
}
