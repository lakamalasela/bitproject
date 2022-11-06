package com.bitproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "equipmentallocation")
@AllArgsConstructor
@NoArgsConstructor
public class Equipmentallocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Basic(optional = false)
    @Column(name = "escode")
    private String escode;

    @JoinColumn(name = "fromreservation_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Reservation fromreservation_id;


    @JoinColumn(name = "estype_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Equipmentallocationtype estype_id;


    @JoinColumn(name = "toreservation_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Reservation toreservation_id;


    @JoinColumn(name = "equipment_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Equipment equipment_id;

    @Basic(optional = true)
    @Column(name = "assignqty")
    private Integer assignqty;

    @Basic(optional = true)
    @Column(name = "assigndatetime")
    private LocalDateTime assigndatetime;

    @Basic(optional = true)
    @Column(name = "removeqty")
    private Integer removeqty;


    @Basic(optional = true)
    @Column(name = "removedatetime")
    private LocalDateTime removedatetime;

    @Basic(optional = true)
    @Column(name = "transferinqty")
    private Integer transferinqty;


    @Basic(optional = true)
    @Column(name = "transferindatetime")
    private LocalDateTime transferindatetime;


    @Basic(optional = true)
    @Column(name = "transferoutqty")
    private Integer transferoutqty;

    @Basic(optional = true)
    @Column(name = "availablefromqty")
    private Integer availablefromqty;

    @Basic(optional = true)
    @Column(name = "availabletoqty")
    private Integer availabletoqty;



    @Basic(optional = true)
    @Column(name = "transferoutdatetime")
    private LocalDateTime transferoutdatetime;

    @Basic(optional = false)
    @Column(name = "finalavqty")
    private Integer finalavqty;

    @Basic(optional = true)
    @Column(name = "transfertofinalqty")
    private Integer transfertofinalqty;

    @Basic(optional = false)
    @Column(name = "addeddatetime")
    private LocalDateTime addeddatetime;

    @Basic(optional = true)
    @Column(name = "description")
    private String description;

    @Basic(optional = true)
    @Column(name = "expectedremovedatetime")
    private LocalDateTime expectedremovedatetime;



    @JoinColumn(name = "esstatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Equipmentallocationstatus esstatus_id;



    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee employee_id;



    public Equipmentallocation(String escode){
        this.escode = escode;
    }

    public Equipmentallocation(Reservation fromreservation_id,Integer finalavqty,LocalDateTime expectedremovedatetime, Equipment equipment_id){
        this.fromreservation_id = fromreservation_id;
        this.finalavqty = finalavqty;
        this.expectedremovedatetime = expectedremovedatetime;
        this.equipment_id = equipment_id;
    }
}
