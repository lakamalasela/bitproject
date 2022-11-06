package com.bitproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "estimation")
@AllArgsConstructor
@NoArgsConstructor
public class Estimation {

    @Id
    @Column(name = "id")
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "estimationcode")
    @Basic(optional = false)
    private String estimationcode;

    @Column(name = "rnowithprojecttitle")
    @Basic(optional = false)
    private String rnowithprojecttitle;


    @Column(name = "addeddate")
    @Basic(optional = false)
    private LocalDate addeddate;

    @Column(name = "description")
    @Basic(optional = true)
    private String description;

    @Column(name = "totalestimationcost")
    @Basic(optional = false)
    private BigDecimal totalestimationcost;

    @Column(name = "estimationcharge")
    @Basic(optional = false)
    private BigDecimal estimationcharge;

    @Column(name = "totaldays")
    @Basic(optional = false)
    private Integer totaldays;


    //foreign key
    @JoinColumn(name = "bsr_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private BSR bsr_id;

    @JoinColumn(name = "estimationstatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Estimationstatus estimationstatus_id;

    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee employee_id;


    @OneToMany(cascade = CascadeType.ALL,mappedBy = "estimation_id",fetch = FetchType.LAZY,orphanRemoval = true)
    private List<EstimationHasSubcategory>estimationHasSubcategoryList;

    public Estimation(String estimationcode){
        this.estimationcode = estimationcode;
    }

    public Estimation(Integer id,String estimationcode,LocalDate addeddate,BigDecimal estimationcharge,BigDecimal totalestimationcost){
        this.id = id;
        this.estimationcode = estimationcode;
        this.addeddate = addeddate;
        this.estimationcharge = estimationcharge;
        this.totalestimationcost = totalestimationcost;

    }
}
