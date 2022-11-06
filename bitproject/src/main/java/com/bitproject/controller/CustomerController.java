package com.bitproject.controller;

import com.bitproject.model.Customer;
import com.bitproject.model.User;
import com.bitproject.repository.CustomerRepository;
import com.bitproject.repository.CustomerstatusRepository;
import com.bitproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/customer")
public class CustomerController {

    @Autowired
    private CustomerRepository dao;

    @Autowired
    private CustomerstatusRepository daostatus;

    @Autowired
    private UserService userService;

    @Autowired
    private PrevilageController previlageController;


    //next customer code
    @GetMapping(value = "/nextnumber",produces = "application/json")
    public Customer nextnumber(){
        String nextnumber = dao.getNextNumber();
        Customer nextcustomer = new Customer(nextnumber);
        return  nextcustomer;
    }

    @GetMapping(value = "/list",produces = "application/json")
    public List<Customer>customerList(){
        return dao.list();
    }

    @GetMapping(value = "/findAll",params = {"page","size"},produces = "application/json")
    public Page<Customer>findAll(@RequestParam("page") int page, @RequestParam("size") int size){



        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"CUSTOMER");


        if(user!= null && priv != null && priv.get("select") ){

            return dao.findAll(PageRequest.of(page,size, Sort.Direction.DESC,"id"));
        }else
            return null;



    }

    //search
    @GetMapping(value = "/findAll",params = {"page","size","searchtext"},produces = "application/json")
    public Page<Customer>findAll(@RequestParam("page") int page, @RequestParam("size") int size,@RequestParam("searchtext") String searchtext){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"CUSTOMER");


        if(user!= null && priv != null && priv.get("select") ){
            return dao.findAll(searchtext,PageRequest.of(page,size, Sort.Direction.DESC,"id"));

        }else
            return null;





    }

    @GetMapping(value = "/bynic",params = "nic",produces = "application/json")
    public Customer customerByNic(@RequestParam("nic") String nic){
        return dao.findByNic(nic);
    }


    //insert data
    @PostMapping
    public String insert(@RequestBody Customer customer){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"CUSTOMER");


        if(user!= null && priv != null && priv.get("add") ){
            try{

                customer.setArrearsamount(BigDecimal.valueOf(0.00));
                customer.setVisitcount(Integer.valueOf(0));
                dao.save(customer);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Saving : You do not have previleges..!";







    }

    //update data
    @PutMapping
    public String update(@RequestBody Customer customer){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"CUSTOMER");


        if(user!= null && priv != null && priv.get("update") ){

            try{

                dao.save(customer);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data"+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }


        }else
            return "Error Updating: You do not have update to previlege";


    }


    //delete data
    @DeleteMapping
    public String delete(@RequestBody Customer customer){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        //userService kiynne variable ekak
        User user = userService.findUserByUserName(auth.getName());

        HashMap<String,Boolean> priv  = previlageController.getPrivilages(user,"CUSTOMER");


        if(user!= null && priv != null && priv.get("delete") ){
            try{
                customer.setCustomerstatus_id(daostatus.getById(3));//customer status object ekak illa gnnwa
                dao.save(customer);
                return "0";
            }catch (Exception ex){
                return "Not Save Your Data.."+ex.getMessage(); //save wenne neththan mokadda error eka kiyla
            }

        }else
            return "Error Deleting : You do not have delete to previlege";


    }



}
