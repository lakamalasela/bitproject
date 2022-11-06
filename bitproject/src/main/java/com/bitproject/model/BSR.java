package com.bitproject.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "bsr")
@AllArgsConstructor
@NoArgsConstructor
public class BSR {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Basic(optional = false)
    private Integer id;


    @Column(name = "year")
    @Basic(optional = false)
    private String year;


    @Column(name = "bsrcode")
    @Basic(optional = false)
    private String bsrcode;

    @Column(name = "bsrname")
    @Basic(optional = false)
    private String bsrname;


    @Column(name = "startdate")
    @Basic(optional = false)
    private LocalDate startdate;


    @Column(name = "enddate")
    @Basic(optional = false)
    private LocalDate enddate;


    @Column(name = "addeddate")
    @Basic(optional = false)
    private LocalDate addeddate;


    @Column(name = "description")
    @Basic(optional = true)
    private String description;

    //foreign keys
    @JoinColumn(name = "province_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Province province_id;


    @JoinColumn(name = "bsrstatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Bsrstatus bsrstatus_id;

    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee employee_id;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "bsr_id",fetch = FetchType.LAZY,orphanRemoval = true)
    private List<BSRHasBSRsubcategory> bsrHasBSRsubcategoryList;


    public BSR(Integer id,Province province_id,String bsrcode){
        this.id = id;
        this.province_id = province_id;
        this.bsrcode = bsrcode;
    }
}
