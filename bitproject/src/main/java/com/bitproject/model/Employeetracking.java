package com.bitproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "epmrtracking")
public class Employeetracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Basic(optional = false)
    private Integer id;


    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee employee_id;

    @JoinColumn(name = "reservation_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Reservation reservation_id;


    @Column(name = "assigndatetime")
    @Basic(optional = false)
    private LocalDateTime assigndatetime;


    @Column(name = "removedatetime")
    @Basic(optional = false)
    private LocalDateTime removedatetime;


    @Column(name = "nofoworkingdates")
    @Basic(optional = false)
    private Long nofoworkingdates;





}
