package com.bitproject.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Basic(optional = false)
    private Integer id;

    @Column(name = "reservationcode")
    @Basic(optional = false)
    private String reservationcode;


    @JoinColumn(name = "customer_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Customer customer_id;

    @JoinColumn(name = "service_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Service service_id;

    @Column(name = "projecttitle")
    @Basic(optional = false)
    private String projecttitle;

    @Column(name = "projectlocation")
    @Basic(optional = false)
    private String projectlocation;

    @JoinColumn(name = "province_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Province province_id;

    @Column(name = "servicecharge")
    @Basic(optional = false)
    private BigDecimal servicecharge;

    @JoinColumn(name = "supervisor_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee supervisor_id;

    @JoinColumn(name = "plan_id",referencedColumnName = "id")
    @ManyToOne(optional = true,fetch = FetchType.EAGER)
    private Plan plan_id;

    @Column(name = "planaddeddate")
    @Basic(optional = true)
    private LocalDate planaddeddate;

    @Column(name = "plancharge")
    @Basic(optional = true)
    private BigDecimal plancharge;

    @Column(name = "totalarea")
    @Basic(optional = true)
    private BigDecimal totalarea;

    @JoinColumn(name = "estimation_id",referencedColumnName = "id")
    @ManyToOne(optional = true,fetch = FetchType.EAGER)
    private Estimation estimation_id;

    @Column(name = "estimationaddeddate")
    @Basic(optional = true)
    private LocalDate estimationaddeddate;


    @Column(name = "estimationcost")
    @Basic(optional = true)
    private BigDecimal estimationcost;

    @Column(name = "totalestimatedcost")
    @Basic(optional = true)
    private BigDecimal totalestimatedcost;

    @Column(name = "totalcharge")
    @Basic(optional = true)
    private BigDecimal totalcharge;

    @Column(name = "discountratio")
    @Basic(optional = true)
    private BigDecimal discountratio;

    @Column(name = "lastprice")
    @Basic(optional = true)
    private BigDecimal lastprice;

    @Column(name = "paidamount")
    @Basic(optional = true)
    private BigDecimal paidamount;

    @Column(name = "balanceamount")
    @Basic(optional = true)
    private BigDecimal balanceamount;

    @Column(name = "advance")
    @Basic(optional = true)
    private BigDecimal advance;

    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee employee_id;

    @JoinColumn(name = "reservationstatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Reservationstatus reservationstatus_id;

    @Column(name = "addeddate")
    @Basic(optional = false)
    private LocalDate addeddate;

    @Column(name = "description")
    @Basic(optional = true)
    private String description;

    @Column(name = "extplan")
    @Basic(optional = true)
    private Boolean extplan;


    @JoinColumn(name = "constructiontype_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Constructiontype constructiontype_id;
//
//    @OneToMany(cascade = CascadeType.ALL,mappedBy = "reservation_id",orphanRemoval = true,fetch = FetchType.LAZY)
//    private List<ConstructionsubtaskHasFloorarea>constructionsubtask_has_floorareaList;
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "reservation_id",orphanRemoval = true,fetch = FetchType.LAZY)
    private List<ConstructionsubtaskHasFloorarea> constructionsubtaskHasFloorareaList;
//    @JoinColumn(name = "constructionsubtask_id",referencedColumnName = "id")
//    @ManyToOne(optional = false,fetch = FetchType.EAGER)
//    private Constructionsubtask constructionsubtask_id;

    public Reservation(String reservationcode){
        this.reservationcode = reservationcode;
    }

    public Reservation(Integer id,String reservationcode,String projecttitle,Plan plan_id){
        this.id = id;
        this.reservationcode = reservationcode;
        this.projecttitle = projecttitle;
        this.plan_id =plan_id;


    }

}
