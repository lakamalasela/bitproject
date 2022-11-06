package com.bitproject.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "estimation_has_subcategory")
@AllArgsConstructor
@NoArgsConstructor
public class EstimationHasSubcategory {


    @Id
    @Column(name = "id")
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;



    @JoinColumn(name = "floorarea_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private FloorArea floorarea_id;


    @JoinColumn(name = "housesubparts_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private HouseSubparts housesubparts_id;




    @Column(name = "itemcode")
    @Basic(optional = false)
    private String itemcode;

    @Column(name = "description")
    @Basic(optional = false)
    private String description;

    @Column(name = "quantity")
    @Basic(optional = false)
    private BigDecimal quantity;

    @Column(name = "unit")
    @Basic(optional = false)
    private String unit;

    @Column(name = "rate")
    @Basic(optional = false)
    private BigDecimal rate;

    @Column(name = "lastprice")
    @Basic(optional = false)
    private BigDecimal lastprice;

    @Column(name = "totalarea")
    @Basic(optional = false)
    private BigDecimal totalarea;

    @Column(name = "subcount")
    @Basic(optional = false)
    private Integer subcount;





    @JoinColumn(name = "estimation_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    @JsonIgnore
    private Estimation estimation_id;

    @JoinColumn(name = "bsr_has_bsrsubcategory_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private BSRHasBSRsubcategory bsr_has_bsrsubcategory_id;
}
