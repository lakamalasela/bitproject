package com.bitproject.controller;

import com.bitproject.model.User;
import com.bitproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class UIController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/access-denied", method = RequestMethod.GET)
    public ModelAndView error(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("error.html");
        return modelAndView;
    }

    @RequestMapping(value = "/config", method = RequestMethod.GET)
    public ModelAndView config(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("config.html");
        return modelAndView;
    }

    @GetMapping(value = {"/employee" })
    public ModelAndView employeeui() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("employee.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }

    @GetMapping(path = "/employee/{id}")
    public ModelAndView employeessui() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("employee.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }

    @GetMapping(value = "/privilage")
    public ModelAndView privilageui() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("privilage.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }




    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ModelAndView user() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("user.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }

    @RequestMapping(value = "/customer", method = RequestMethod.GET)
    public ModelAndView customerUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("customer.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }


    @RequestMapping(value = "/equipment", method = RequestMethod.GET)
    public ModelAndView equipmentUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("equipment.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }


    @RequestMapping(value = "/bsr", method = RequestMethod.GET)
    public ModelAndView bsrUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("bsr.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }


    @RequestMapping(value = "/service", method = RequestMethod.GET)
    public ModelAndView serviceUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("service.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }



    @RequestMapping(value = "/estimation", method = RequestMethod.GET)
    public ModelAndView estimationUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("estimation.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }



    @RequestMapping(value = "/plan", method = RequestMethod.GET)
    public ModelAndView planUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("plan.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }

    @RequestMapping(value = "/reservation", method = RequestMethod.GET)
    public ModelAndView reservationUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("reservation.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }


    @RequestMapping(value = "/designerassign", method = RequestMethod.GET)
    public ModelAndView designerassignUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("designerassignment.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }


    @RequestMapping(value = "/qsassign", method = RequestMethod.GET)
    public ModelAndView qsassignUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("qsassignment.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }



    @RequestMapping(value = "/eqshiftment", method = RequestMethod.GET)
    public ModelAndView eqshiftmentUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("equipmentallocation.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }

    @RequestMapping(value = "/eqinventory", method = RequestMethod.GET)
    public ModelAndView eqinventoryUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("equipmentinventory.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }


    @RequestMapping(value = "/empshiftment", method = RequestMethod.GET)
    public ModelAndView empshiftmentUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("employeeallocation.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }

    @RequestMapping(value = "/cuspayment", method = RequestMethod.GET)
    public ModelAndView cuspaymentUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("customerpayment.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }


    @RequestMapping(value = "/rprogress", method = RequestMethod.GET)
    public ModelAndView resprogressUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
        if(user!= null){
            modelAndView.setViewName("reservationprogress.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }




//    @RequestMapping(value = "/planadd", method = RequestMethod.GET)
//    public ModelAndView planaddUi() {
//        ModelAndView modelAndView = new ModelAndView();
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        User user = userService.findUserByUserName(auth.getName());
//        if(user!= null){
//            modelAndView.setViewName("planadd.html");
//        }
//        else
//            modelAndView.setViewName("error.html");
//
//        return modelAndView;
//    }

//    @RequestMapping(value = "/estimationadd", method = RequestMethod.GET)
//    public ModelAndView estimationaddUi() {
//        ModelAndView modelAndView = new ModelAndView();
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        User user = userService.findUserByUserName(auth.getName());
//        if(user!= null){
//            modelAndView.setViewName("estimationadd.html");
//        }
//        else
//            modelAndView.setViewName("error.html");
//
//        return modelAndView;
//    }








}





