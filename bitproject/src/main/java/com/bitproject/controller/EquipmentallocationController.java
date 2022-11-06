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
@RequestMapping(value = "/eqallocation")
public class EquipmentallocationController {

    @Autowired
    private UserService userService;

    @Autowired
    private PrevilageController previlageController;

    @Autowired
    private EquipmentallocationtypeRepository daotype;

    @Autowired
    private EquipmentallocatiostatusRepository daostatus;

    @Autowired
    private EquipmentallocationRepository dao;

    @Autowired
    private EquipmentInventoryRepository daoinventory;

    @Autowired
    private EquipmentInventorystatusRepository daoniventorystatus;


    @GetMapping(value = "/findAll", params = {"page", "size"}, produces = "application/json")
    public Page<Equipmentallocation> findAll(@RequestParam("page") int page, @RequestParam("size") int size) {


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String, Boolean> priv = previlageController.getPrivilages(user, "EQSHIFTMENT");


        if (user != null && priv != null && priv.get("select")) {

            return dao.findAll(PageRequest.of(page, size, Sort.Direction.DESC, "id"));
        } else
            return null;


    }

    @GetMapping(value = "/nextnumber", produces = "application/json")
    public Equipmentallocation nextnumber() {
        String nextnumber = dao.getNextNumber();
        Equipmentallocation nextallocation = new Equipmentallocation(nextnumber);
        return nextallocation;
    }


    //search
    @GetMapping(value = "/findAll", params = {"page", "size", "searchtext"}, produces = "application/json")
    public Page<Equipmentallocation> findAll(@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("searchtext") String searchtext) {


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String, Boolean> priv = previlageController.getPrivilages(user, "EQSHIFTMENT");


        if (user != null && priv != null && priv.get("select")) {
            return dao.findAll(searchtext, PageRequest.of(page, size, Sort.Direction.DESC, "id"));

        } else
            return null;


    }


    //eqallocation/finalqty?fromreservationid=8&equipmentid=5
    @GetMapping(value = "/finalqty", params = {"fromreservationid", "equipmentid"}, produces = "application/json")
    public Equipmentallocation equipmentallocationqty(@RequestParam("fromreservationid") int fromreservationid, @RequestParam("equipmentid") int equipmentid) {
        List<Equipmentallocation> ellist = dao.getbyreservationqty(fromreservationid, equipmentid);
        System.out.println(ellist.size());
        if (ellist.size() != 0)
            return ellist.get(0);
        else return null;
    }

//    @GetMapping(value = "/finalqtyto",params = {"toreservationid","equipmentid"},produces = "application/json")
//    public Equipmentallocation equipmentallocationinqty(@RequestParam("toreservationid") int toreservationid,@RequestParam("equipmentid") int equipmentid){
//        return dao.getbyreservationqtytransferin(toreservationid,equipmentid).get(0);
//    }


    //insert data
    @Transactional
    @PostMapping
    public String insert(@RequestBody Equipmentallocation eqallocation) {


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String, Boolean> priv = previlageController.getPrivilages(user, "EQSHIFTMENT");


        if (user != null && priv != null && priv.get("add")) {
            try {

                dao.save(eqallocation);
                Equipmentallocation eqt = new Equipmentallocation();




                if (eqallocation.getEstype_id().getName().equals("EQ-Transfer In")) {

                   // Equipmentallocation eqr = new Equipmentallocation();

                    //remove
//                    eqr.setEscode(dao.getNextNumber());
//                    eqr.setEsstatus_id(eqallocation.getEsstatus_id());
//                    eqr.setEstype_id(daotype.getById(5));
//                    eqr.setDescription(eqallocation.getDescription());
//                    eqr.setAddeddatetime(eqallocation.getAddeddatetime());
//                    eqr.setEmployee_id(eqallocation.getEmployee_id());
//
//                    eqr.setFromreservation_id(eqallocation.getToreservation_id());
//                    eqr.setEquipment_id(eqallocation.getEquipment_id());
//                    eqr.setAvailablefromqty(eqallocation.getAvailabletoqty());
//
//                    eqr.setRemoveqty(eqallocation.getTransfertofinalqty());
//                    eqr.setFinalavqty(eqallocation.getFinalavqty());
//
//                    eqr.setRemovedatetime(eqallocation.getTransferindatetime());
//
//                    dao.save(eqr);
                    //remove end

                    //inventory
//                    EquipmentInventory eqtin = daoinventory.getByEquipment(eqallocation.getEquipment_id().getId());
//                    eqtin.setAvailableqty(eqtin.getAvailableqty());
//                    eqtin.setCurrentuseqty(eqtin.getCurrentuseqty());
//                    if (eqtin.getAvailableqty() == 0) {
//                        eqtin.setEistatus_id(daoniventorystatus.getById(2));
//                    } else {
//                        eqtin.setEistatus_id(daoniventorystatus.getById(1));
//                    }
//                    daoinventory.save(eqtin);
//



                    Equipmentallocation neweqa = new Equipmentallocation();
                    neweqa.setEscode(dao.getNextNumber());


                   neweqa.setFromreservation_id(eqallocation.getToreservation_id());
                  neweqa.setToreservation_id(eqallocation.getFromreservation_id());

                    neweqa.setEstype_id(daotype.getById(4));





                    neweqa.setAvailabletoqty(eqallocation.getAvailablefromqty());
                    neweqa.setAvailablefromqty(eqallocation.getAvailabletoqty());


                    neweqa.setTransferoutdatetime(eqallocation.getTransferindatetime());

                    neweqa.setFinalavqty(eqallocation.getTransfertofinalqty());

                    neweqa.setTransfertofinalqty(eqallocation.getFinalavqty());

                    neweqa.setEsstatus_id(eqallocation.getEsstatus_id());
                    neweqa.setAddeddatetime(eqallocation.getAddeddatetime());
                    neweqa.setExpectedremovedatetime(eqallocation.getExpectedremovedatetime());
                    neweqa.setEquipment_id(eqallocation.getEquipment_id());

                    neweqa.setTransferoutqty(eqallocation.getTransferinqty());

                    neweqa.setEmployee_id(eqallocation.getEmployee_id());
                    neweqa.setDescription(eqallocation.getDescription());

                    dao.save(neweqa);



                }
                else if (eqallocation.getEstype_id().getName().equals("EQ-Transfer Out")) {

                    Equipmentallocation eqrout = new Equipmentallocation();


                    //remove
                    eqrout.setEscode(dao.getNextNumber());
                    eqrout.setEsstatus_id(eqallocation.getEsstatus_id());
                    eqrout.setEstype_id(daotype.getById(5));
                    eqrout.setDescription(eqallocation.getDescription());
                    eqrout.setAddeddatetime(eqallocation.getAddeddatetime());
                    eqrout.setEmployee_id(eqallocation.getEmployee_id());

                    eqrout.setFromreservation_id(eqallocation.getToreservation_id());
                    eqrout.setEquipment_id(eqallocation.getEquipment_id());
                    eqrout.setAvailablefromqty(eqallocation.getAvailabletoqty());
                    eqrout.setRemoveqty(eqallocation.getTransfertofinalqty());
                    eqrout.setFinalavqty(eqallocation.getFinalavqty());

                    eqrout.setRemovedatetime(eqallocation.getTransferindatetime());

                    dao.save(eqrout);
                    //remove end

                    //invenory
                    EquipmentInventory eqtout = daoinventory.getByEquipment(eqallocation.getEquipment_id().getId());

                    eqtout.setAvailableqty(eqtout.getAvailableqty());
                    eqtout.setCurrentuseqty(eqtout.getCurrentuseqty());
                    if (eqtout.getAvailableqty() == 0) {
                        eqtout.setEistatus_id(daoniventorystatus.getById(2));
                    } else {
                        eqtout.setEistatus_id(daoniventorystatus.getById(1));
                    }
                    daoinventory.save(eqtout);

                    //inventory end




                    System.out.println("gukkhilh");
                    Equipmentallocation neweqout = new Equipmentallocation();

                    neweqout.setEscode(dao.getNextNumber());
                    neweqout.setEquipment_id(eqallocation.getEquipment_id());
//
//                    neweqout.setToreservation_id(eqallocation.getFromreservation_id());
//                    neweqout.setFromreservation_id(eqallocation.getToreservation_id());


                    neweqout.setToreservation_id(eqallocation.getToreservation_id());
                    neweqout.setFromreservation_id(eqallocation.getFromreservation_id());

                    neweqout.setEstype_id(daotype.getById(3));

                    //set final qty
                    neweqout.setFinalavqty(eqallocation.getTransfertofinalqty());

                    neweqout.setTransfertofinalqty(eqallocation.getFinalavqty());

                    //available qty
                    neweqout.setAvailabletoqty(eqallocation.getAvailabletoqty());
                    neweqout.setAvailablefromqty(eqallocation.getAvailablefromqty());


                    neweqout.setTransferinqty(eqallocation.getTransferoutqty());

                    neweqout.setTransferindatetime(eqallocation.getTransferoutdatetime());

                    neweqout.setEsstatus_id(eqallocation.getEsstatus_id());
                    neweqout.setAddeddatetime(eqallocation.getAddeddatetime());
                    neweqout.setDescription(eqallocation.getDescription());
                    neweqout.setEmployee_id(eqallocation.getEmployee_id());

                    dao.save(neweqout);

                }

                EquipmentInventory eqi = daoinventory.getByEquipment(eqallocation.getEquipment_id().getId());

                if (eqallocation.getEstype_id().getName().equals("EQ-Assign")) {

                    eqi.setAvailableqty(eqi.getAvailableqty() - eqallocation.getAssignqty());
                    eqi.setCurrentuseqty(eqi.getCurrentuseqty() + eqallocation.getAssignqty());
                    if (eqi.getAvailableqty() == 0) {
                        eqi.setEistatus_id(daoniventorystatus.getById(2));
                    } else {
                        eqi.setEistatus_id(daoniventorystatus.getById(1));
                    }
                    daoinventory.save(eqi);
                } else if (eqallocation.getEstype_id().getName().equals("EQ-Remove Completed") || eqallocation.getEstype_id().getName().equals("EQ-Remove Useless")) {

                    eqi.setAvailableqty(eqi.getAvailableqty() + eqallocation.getRemoveqty());
                    eqi.setCurrentuseqty(eqi.getCurrentuseqty() - eqallocation.getRemoveqty());
                    if (eqi.getAvailableqty() == 0) {
                        eqi.setEistatus_id(daoniventorystatus.getById(2));
                    } else {
                        eqi.setEistatus_id(daoniventorystatus.getById(1));
                    }
                    daoinventory.save(eqi);
                } else if (eqallocation.getEstype_id().getName().equals("EQ-Remove Damage")) {
                    eqi.setUselessqty(eqi.getUselessqty() + eqallocation.getRemoveqty());
                    eqi.setCurrentuseqty(eqi.getCurrentuseqty() - eqallocation.getRemoveqty());
                    if (eqi.getAvailableqty() == 0) {
                        eqi.setEistatus_id(daoniventorystatus.getById(2));
                    } else {
                        eqi.setEistatus_id(daoniventorystatus.getById(1));
                    }

                    daoinventory.save(eqi);
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
    public String update(@RequestBody Equipmentallocation eqallocation) {


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String, Boolean> priv = previlageController.getPrivilages(user, "EQSHIFTMENT");


        if (user != null && priv != null && priv.get("update")) {

            try {

                dao.save(eqallocation);

                if (eqallocation.getEsstatus_id().getName().equals("Deleted")) {
                    EquipmentInventory aseqi = daoinventory.getByEquipment(eqallocation.getEquipment_id().getId());

                    if (eqallocation.getEstype_id().getName().equals("EQ-Assign")) {
                        aseqi.setAvailableqty(aseqi.getAvailableqty() + eqallocation.getAssignqty());
                        aseqi.setCurrentuseqty(aseqi.getCurrentuseqty() - eqallocation.getAssignqty());
                        daoinventory.save(aseqi);
                    } else if (eqallocation.getEstype_id().getName().equals("EQ-Remove Completed") || eqallocation.getEstype_id().getName().equals("EQ-Remove Useless")) {
                        aseqi.setAvailableqty(aseqi.getAvailableqty() - eqallocation.getRemoveqty());
                        aseqi.setCurrentuseqty(aseqi.getCurrentuseqty() + eqallocation.getRemoveqty());
                        daoinventory.save(aseqi);
                    } else if (eqallocation.getEstype_id().getName().equals("EQ-Remove Damage")) {
                        aseqi.setUselessqty(aseqi.getUselessqty() - eqallocation.getRemoveqty());
                        aseqi.setCurrentuseqty(aseqi.getCurrentuseqty() + eqallocation.getRemoveqty());
                        daoinventory.save(aseqi);
                    }
                    else if (eqallocation.getEstype_id().getName().equals("EQ-Transfer In")) {
                        Equipmentallocation eqtin = dao.getByetout(4, eqallocation.getToreservation_id().getId(), eqallocation.getFromreservation_id().getId());
                        eqtin.setEsstatus_id(daostatus.getById(3));
                        dao.save(eqtin);
                    }
                    else if (eqallocation.getEstype_id().getName().equals("EQ-Transfer Out")) {
                        Equipmentallocation etout = dao.getByin(3, eqallocation.getToreservation_id().getId(), eqallocation.getFromreservation_id().getId());
                        etout.setEsstatus_id(daostatus.getById(3));
                        dao.save(etout);
                    }

                }


                //if status deleted
                //check krnna transfer in or transfer out 2ma status change wenna ooni
                //assign ekeedi qty eka ain kraoth aai inventory ekata ee ain krpu qty eka add wenna ooni
                //remove ekeedi qty eka ain kroth aai inven

                return "0";
            } catch (Exception ex) {
                return "Not Save Your Data" + ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }


        } else
            return "Error Updating: You do not have update to previlege";


    }


    //delete data
    @DeleteMapping
    public String delete(@RequestBody Equipmentallocation eqallocation) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String, Boolean> priv = previlageController.getPrivilages(user, "EQSHIFTMENT");


        if (user != null && priv != null && priv.get("delete")) {
            try {


                eqallocation.setEsstatus_id(daostatus.getById(3));//customer status object ekak illa gnnwa
                dao.save(eqallocation);

//
                if (eqallocation.getEsstatus_id().getName().equals("Deleted")) {
                    EquipmentInventory aseqi = daoinventory.getByEquipment(eqallocation.getEquipment_id().getId());

                    if (eqallocation.getEstype_id().getName().equals("EQ-Assign")) {
                        aseqi.setAvailableqty(aseqi.getAvailableqty() + eqallocation.getAssignqty());
                        aseqi.setCurrentuseqty(aseqi.getCurrentuseqty() - eqallocation.getAssignqty());
                        daoinventory.save(aseqi);
                    } else if (eqallocation.getEstype_id().getName().equals("EQ-Remove Completed") || eqallocation.getEstype_id().getName().equals("EQ-Remove Useless")) {
                        aseqi.setAvailableqty(aseqi.getAvailableqty() - eqallocation.getRemoveqty());
                        aseqi.setCurrentuseqty(aseqi.getCurrentuseqty() + eqallocation.getRemoveqty());
                        daoinventory.save(aseqi);
                    } else if (eqallocation.getEstype_id().getName().equals("EQ-Remove Damage")) {
                        aseqi.setUselessqty(aseqi.getUselessqty() - eqallocation.getRemoveqty());
                        aseqi.setCurrentuseqty(aseqi.getCurrentuseqty() + eqallocation.getRemoveqty());
                        daoinventory.save(aseqi);
                    }
                    else if (eqallocation.getEstype_id().getName().equals("EQ-Transfer In")) {
                        Equipmentallocation eqtin = dao.getByetout(4, eqallocation.getToreservation_id().getId(), eqallocation.getFromreservation_id().getId());
                        eqtin.setEsstatus_id(daostatus.getById(3));
                        dao.save(eqtin);
                    }
                    else if (eqallocation.getEstype_id().getName().equals("EQ-Transfer Out")) {
                        Equipmentallocation etout = dao.getByin(3, eqallocation.getFromreservation_id().getId(), eqallocation.getToreservation_id().getId());
                        etout.setEsstatus_id(daostatus.getById(3));
                        dao.save(etout);
                    }

                }


                return "0";
            } catch (Exception ex) {
                return "Not Save Your Data.." + ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        } else
            return "Error Deleting : You do not have delete to previlege";


    }


}
