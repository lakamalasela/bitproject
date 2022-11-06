package com.bitproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Table(name = "qsassignment")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class QSassignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;


    @JoinColumn(name = "reservation_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Reservation reservation_id;

    @Column(name = "assigndate")
    @Basic(optional = false)
    private LocalDate assigndate;

    @JoinColumn(name = "qsemployee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee qsemployee_id;

    @Column(name = "completeddate")
    @Basic(optional = true)
    private LocalDate completeddate;

    @Column(name = "actualcompleteddate")
    @Basic(optional = true)
    private LocalDate actualcompleteddate;

    @Column(name = "description")
    @Basic(optional = true)
    private String description;


    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee employee_id;

    @JoinColumn(name = "qsstatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private QSassignmentstatus qsstatus_id;



}
