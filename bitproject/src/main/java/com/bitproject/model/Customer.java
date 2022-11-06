package com.bitproject.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "customer")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Column(name = "regno")
    @Basic(optional = false)
    //@Pattern(regexp = "", message = "Invalid Number")
    private String regno;

    @Column(name = "fullname")
    @Basic(optional = false)
    private String fullname;

    @Column(name = "callingname")
    @Basic(optional = false)
    private String callingname;

    @Column(name = "nic")
    @Basic(optional = false)
    private String nic;

    @Column(name = "visitcount")
    @Basic(optional = true)
    private Integer visitcount;

    @Column(name = "address")
    @Basic(optional = false)
    private String address;

    @Column(name = "description")
    @Basic(optional = true)
    private String description;

    @Column(name = "mobile")
    @Basic(optional = false)
    private String mobile;

    @Column(name = "telephone")
    @Basic(optional = false)
    private String telephone;

    @Column(name = "workplacedetails")
    @Basic(optional = true)
    private String workplacedetails;

    @Column(name = "email")
    @Basic(optional = true)
    private String email;

    @Column(name = "addedate")
    @Basic(optional = false)
    private LocalDate addedate;

    @Column(name = "arrearsamount")
    @Basic(optional = false)
    private BigDecimal arrearsamount;


    //foriegn key
    @JoinColumn(name = "contactmedia_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private ContactMedia contactmedia_id;

    @JoinColumn(name = "customerstatus_id" ,referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private CustomerStatus customerstatus_id;

    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee employee_id;

    public Customer(String regno){
        this.regno = regno;
    }

    public Customer(Integer id,String regno){
        this.id = id;
        this.regno = regno;

    }
    public Customer(String fullname, BigDecimal arrearsamount){
        this.fullname = fullname;
        this.arrearsamount = arrearsamount;
    }

}
