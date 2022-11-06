package com.bitproject.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "plan")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    @Basic(optional = false)
    private Integer id;


    @Column(name = "plancode")
    @Basic(optional = false)
    private String plancode;

    @Column(name = "rnowithprojecttitle")
    @Basic(optional = false)
    private String rnowithprojecttitle;

    @Column(name = "planphoto")
    @Basic(optional = false)
    private byte[] planphoto;

    @Column(name = "persftcharge")
    @Basic(optional = true)
    private BigDecimal persftcharge;

    @Column(name = "totalarea")
    @Basic(optional = false)
    private BigDecimal totalarea;

    @Column(name = "plancharge")
    @Basic(optional = true)
    private BigDecimal plancharge;

    @Column(name = "addeddate")
    @Basic(optional = false)
    private LocalDate addeddate;

    @Column(name = "description")
    @Basic(optional = false)
    private String description;

    @JoinColumn(name = "designer_id",referencedColumnName = "id")
    @ManyToOne(optional = true,fetch = FetchType.EAGER)
    private Employee designer_id;

    @JoinColumn(name = "plantype_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private PlanType plantype_id;

    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee employee_id;

    @JoinColumn(name = "planstatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private PlanStatus planstatus_id;



    @OneToMany(cascade = CascadeType.ALL,mappedBy ="plan_id",orphanRemoval = true,fetch = FetchType.LAZY)
    private List<PlanHasFloorarea>planHasFloorareaList;

    public Plan(String plancode){
        this.plancode = plancode;
    }

    public Plan(Integer id,String plancode,String rnowithprojecttitle,byte[] planphoto,LocalDate addeddate,BigDecimal plancharge,BigDecimal totalarea){
        this.id = id;
        this.plancode = plancode;
        this.rnowithprojecttitle = rnowithprojecttitle;
        this.planphoto = planphoto;
        this.addeddate = addeddate;
        this.plancharge = plancharge;
        this.totalarea = totalarea;
    }


}
