package com.bitproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "service")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Basic(optional = false)
    @Column(name = "serviceno")
    private String serviceno;


    @Basic(optional = false)
    @Column(name = "servicename")
    private String servicename;

    @Basic(optional = false)
    @Column(name = "servicecharge")
    private BigDecimal servicecharge;

    @Basic(optional = false)
    @Column(name = "addeddate")
    private LocalDate addeddate;

    @Basic(optional = true)
    @Column(name = "description")
    private String description;




    //foreign keys
    @JoinColumn(name = "servicetype_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Servicetype servicetype_id;

    @JoinColumn(name = "servicestatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch =FetchType.EAGER)
    private Servicestatus servicestatus_id;


    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee employee_id;


    public Service (String serviceno){
        this.serviceno = serviceno;
    }

    public Service(Integer id,String serviceno,String servicename,BigDecimal servicecharge){
        this.id = id;
        this.serviceno = serviceno;
        this.servicename = servicename;
        this.servicecharge = servicecharge;

    }

}
