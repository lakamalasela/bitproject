package com.bitproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "customerpayment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customerpayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Column(name = "billcode")
    @Basic(optional = false)
    private String billcode;

    @JoinColumn(name = "reservation_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Reservation reservation_id;

    @JoinColumn(name = "paymentcategory_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Paymentcategory paymentcategory_id;

    @JoinColumn(name = "reservationprogress_id",referencedColumnName = "id")
    @ManyToOne(optional = true,fetch = FetchType.EAGER)
    private Reservationprogress reservationprogress_id;

    @Column(name = "progressamount")
    @Basic(optional =true)
    private BigDecimal progressamount;

    @Column(name = "totalamount")
    @Basic(optional =false)
    private BigDecimal totalamount;

    @Column(name = "lastbalance")
    @Basic(optional =false)
    private BigDecimal lastbalance;

    @Column(name = "paidamount")
    @Basic(optional =false)
    private BigDecimal paidamount;

    @Column(name = "newbalance")
    @Basic(optional =false)
    private BigDecimal newbalance;

    @Column(name = "paymentdate")
    @Basic(optional = false)
    private LocalDate paymentdate;


    @JoinColumn(name = "paymentmethod_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Paymentmethod paymentmethod_id;

    @Column(name = "chequenumber")
    @Basic(optional = true)
    private String chequenumber;

    @Column(name = "chequedate")
    @Basic(optional = true)
    private LocalDate chequedate;

    @Column(name = "bankname")
    @Basic(optional = true)
    private String bankname;

    @Column(name = "bankaccountno")
    @Basic(optional = true)
    private String bankaccountno;

    @Column(name = "holdername")
    @Basic(optional = true)
    private String holdername;

    @Column(name = "depositdatetime")
    @Basic(optional = true)
    private LocalDateTime depositdatetime;

    @Column(name = "bankbranchname")
    @Basic(optional = true)
    private String bankbranchname;

    @Column(name = "transferid")
    @Basic(optional = true)
    private String transferid;

    @Column(name = "description")
    @Basic(optional = true)
    private String description;


    @JoinColumn(name = "paymentstatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Paymentstatus paymentstatus_id;

    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee employee_id;


    public Customerpayment(String billcode){
        this.billcode = billcode;
    }


}
