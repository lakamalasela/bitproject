package com.bitproject.controller;

import com.bitproject.model.User;
import com.bitproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping(value = "/report")
public class ReportUIController {


    @Autowired
    private UserService userService;

    @RequestMapping(value = "/eqallocation", method = RequestMethod.GET)
    public ModelAndView eqallocationreportUi() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/report/eqallocationreport.html");
        return modelAndView;
    }

    @RequestMapping(value = "/cusarrears", method = RequestMethod.GET)
    public ModelAndView cusarrearsreportUi() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUserName(auth.getName());
//        modelAndView.setViewName("/report/cusarrearsreport.html");
//        return modelAndView;
        if(user!= null){
            modelAndView.setViewName("/report/cusarrearsreport.html");
        }
        else
            modelAndView.setViewName("error.html");

        return modelAndView;
    }

    @RequestMapping(value = "/noassignemp", method = RequestMethod.GET)
    public ModelAndView noassignempreportUi() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/report/availableemployeereport.html");
        return modelAndView;
    }


    @RequestMapping(value = "/empworkingusage", method = RequestMethod.GET)
    public ModelAndView empworkingusagereportUi() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/report/empworkingprogressreport.html");
        return modelAndView;
    }

    @RequestMapping(value = "/income", method = RequestMethod.GET)
    public ModelAndView incomereportUi() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/report/Incomereport.html");
        return modelAndView;
    }


    @RequestMapping(value = "/expemp", method = RequestMethod.GET)
    public ModelAndView expreportUi() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/report/empexpectedreport.html");
        return modelAndView;
    }


    @RequestMapping(value = "/samplereport", method = RequestMethod.GET)
    public ModelAndView samplereport() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("ui/samplereport.html");
        return modelAndView;
    }

}
