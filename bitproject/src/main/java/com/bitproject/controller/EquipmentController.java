package com.bitproject.controller;

import com.bitproject.model.Equipment;
import com.bitproject.model.EquipmentInventory;
import com.bitproject.model.User;
import com.bitproject.repository.EquipmentInventoryRepository;
import com.bitproject.repository.EquipmentInventorystatusRepository;
import com.bitproject.repository.EquipmentRepository;
import com.bitproject.repository.EquipmentstatusRepository;
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
@RequestMapping(value = "/equipment")
public class EquipmentController {

    @Autowired
    private EquipmentRepository dao;

    @Autowired
    private EquipmentstatusRepository daostatus;

    @Autowired
    private UserService userService;

    @Autowired
    private PrevilageController previlageController;


    @Autowired
    private EquipmentInventoryRepository daoinventory;

    @Autowired
    private EquipmentInventorystatusRepository daoniventorystatus;


    //next equipment code
    @GetMapping(value = "/nextnumber",produces = "application/json")
    public Equipment nextnumber(){
        String nextnumber = dao.getNextNumber();
        Equipment nextequipment = new Equipment(nextnumber);
        return nextequipment;
    }


    @GetMapping(value = "/findAll",params = {"page","size"},produces = "application/json")
    public Page<Equipment> findAll(@RequestParam("page") int page,@RequestParam("size") int size){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"EQUIPMENT");


        if(user!= null && priv != null && priv.get("select") ){

            return dao.findAll(PageRequest.of(page, size,Sort.Direction.DESC,"id"));
        }else
            return null;



    }


    @GetMapping(value = "/list",produces = "application/json")
    public List<Equipment>equipmentList(){
        return dao.findAll();
    }

    //search data
    @GetMapping(value = "/findAll",params = {"page","size","searchtext"},produces = "application/json")
    public Page<Equipment> findAll(@RequestParam("page") int page,@RequestParam("size") int size,@RequestParam("searchtext") String searchtext){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"EQUIPMENT");


        if(user!= null && priv != null && priv.get("select") ){

            return dao.findAll(searchtext,PageRequest.of(page, size,Sort.Direction.DESC,"id"));
        }else
            return null;



    }

    @GetMapping(value = "/byeqname",params = {"eqname"},produces = "application/json")
    public Equipment equipmentbyeqname(@RequestParam("eqname") String eqname){
        return dao.findByeqname(eqname);
    }



    //insert data
    @PostMapping
    public String insert(@RequestBody Equipment equipment){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"EQUIPMENT");


        if(user!= null && priv != null && priv.get("add") ){
            try{
                dao.save(equipment);
                System.out.println(equipment);//aluthin equipment 1kak add kra gnna kota inventory ekath ee haa samaanawa update kra geneema
                EquipmentInventory eqi = new EquipmentInventory();//instance 1kak hadaa gththa EqInventory eken
                eqi.setEquipment_id(equipment);//inventory ekee eq_id ekta equipment eken arn set kra gaththa
                eqi.setAvailableqty(equipment.getQuantity());//Inventory ekee Availavle qty eka set kra gththa equipment ekee quantity eken
                eqi.setTotalqty(equipment.getQuantity());//Inventory ekee Total qty eka set kra gththa equipment qty eken aran
                eqi.setCurrentuseqty(0);//inventory ekee current qty eka set kra gththa 0i kiyla
                eqi.setUselessqty(0);//inventory ekee useless qty eka set kra gththa 0i kiyla
                eqi.setEistatus_id(daoniventorystatus.getById(1));//inventory ekee status eka set kra gththa Available kiyla

               daoinventory.save(eqi);

                return "0";

            }catch (Exception ex){
                return "Do not Save Your Data"+ex.getMessage();
            }

        }else
            return "Error Saving : You do not have previleges..!";


    }


    //update data
    @PutMapping
    public String update(@RequestBody Equipment equipment){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"EQUIPMENT");


        if(user!= null && priv != null && priv.get("update") ){

            try{

                dao.save(equipment);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage();
            }


        }else
            return "Error Updating: You do not have update to previlege";


    }

    //delete
    @DeleteMapping
    public String delete(@RequestBody Equipment equipment){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"EQUIPMENT");


        if(user!= null && priv != null && priv.get("delete") ){

            try {

                equipment.setEquipmentstatus_id(daostatus.getById(3));
                dao.save(equipment);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data.."+ex.getMessage();
            }
        }else
            return "Error Deleting : You do not have delete to previlege";

    }


}
