package com.bitproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "laborallocation")
@AllArgsConstructor
@NoArgsConstructor
public class Laborallocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Basic(optional = false)
    private Integer id;


    @Column(name = "lacode")
    @Basic(optional = false)
    private String lacode;

    @JoinColumn(name = "lafromreservation_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Reservation lafromreservation_id;

    @JoinColumn(name = "latype_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Laborallocationtype latype_id;


    @JoinColumn(name = "latoreservation_id",referencedColumnName = "id")
    @ManyToOne(optional = true,fetch = FetchType.EAGER)
    private Reservation latoreservation_id;

    @JoinColumn(name = "laboremployee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee laboremployee_id;

    @Column(name = "assigndatetime")
    @Basic(optional = true)
    private LocalDateTime assigndatetime;

    @Column(name = "removedatetime")
    @Basic(optional = true)
    private LocalDateTime removedatetime;


    @Column(name = "transferindatetime")
    @Basic(optional = true)
    private LocalDateTime transferindatetime;

    @Column(name = "transferoutdatetime")
    @Basic(optional = true)
    private LocalDateTime transferoutdatetime;


    @Column(name = "addeddatetime")
    @Basic(optional = false)
    private LocalDateTime addeddatetime;

    @Basic(optional = true)
    @Column(name = "description")
    private String description;

    @Basic(optional = true)
    @Column(name = "expectedremovedatetime")
    private LocalDateTime expectedremovedatetime;


    @JoinColumn(name = "lastatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Laborallocationstatus lastatus_id;


    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee employee_id;


    public Laborallocation(String lacode){
        this.lacode = lacode;
    }

}
