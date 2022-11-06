package com.bitproject.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "reservationprogress_has_estimation_has_subcategory")
@AllArgsConstructor
@NoArgsConstructor
public class ReservationprogressHasEstimationHasSubcategory {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Basic(optional = false)
    private Integer id;



    @JoinColumn(name = "reservationprogress_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    @JsonIgnore
    private Reservationprogress reservationprogress_id;



    @JoinColumn(name = "estimation_has_subcategory_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private EstimationHasSubcategory estimation_has_subcategory_id;


    @Column(name = "quantity")
    @Basic(optional = false)
    private BigDecimal quantity;

    @Column(name = "completedquantity")
    @Basic(optional = false)
    private BigDecimal completedquantity;

    @Column(name = "planedqty")
    @Basic(optional = false)
    private BigDecimal planedqty;


    @Column(name = "linetotalamount")
    @Basic(optional = false)
    private BigDecimal linetotalamount;


    @Column(name = "unit")
    @Basic(optional = false)
    private String unit;

    @Column(name = "lastprice")
    @Basic(optional = false)
    private BigDecimal lastprice;


    @Column(name = "rate")
    @Basic(optional = false)
    private BigDecimal rate;



    @JoinColumn(name = "prsubtaskstatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private PRsubtaskstatus prsubtaskstatus_id;





}
