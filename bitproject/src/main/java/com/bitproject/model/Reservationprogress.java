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
@Table(name = "reservationprogress")
@AllArgsConstructor
@NoArgsConstructor
public class Reservationprogress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Basic(optional = false)
    private Integer id;

    @Column(name = "rpcode")
    @Basic(optional = false)
    private String rpcode;

    @JoinColumn(name = "reservation_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Reservation reservation_id;

    @Column(name = "reservationtotalamount")
    @Basic(optional = false)
    private BigDecimal reservationtotalamount;


    @Column(name = "reservationpaidamount")
    @Basic(optional = false)
    private BigDecimal reservationpaidamount;

    @Column(name = "stratdate")
    @Basic(optional = false)
    private LocalDate stratdate;


    @Column(name = "enddate")
    @Basic(optional = false)
    private LocalDate enddate;


    @Column(name = "progressreportamount")
    @Basic(optional = false)
    private BigDecimal progressreportamount;


    @Column(name = "addeddate")
    @Basic(optional = false)
    private LocalDate addeddate;

    @Column(name = "description")
    @Basic(optional = true)
    private String description;


    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee employee_id;



    @JoinColumn(name = "rprstatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private RPRstatus rprstatus_id;


    @OneToMany(cascade = CascadeType.ALL,mappedBy = "reservationprogress_id",fetch = FetchType.LAZY,orphanRemoval = true)
    private List<ReservationprogressHasEstimationHasSubcategory> reservationprogressHasEstimationHasSubcategoryList;


    public Reservationprogress(String rpcode){
        this.rpcode = rpcode;
    }

    public Reservationprogress(Integer id,String rpcode,BigDecimal progressreportamount){
        this.id = id;
        this.rpcode = rpcode;
        this.progressreportamount = progressreportamount;
    }
}
