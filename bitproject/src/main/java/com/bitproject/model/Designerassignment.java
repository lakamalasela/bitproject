package com.bitproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "designerassignment")
public class Designerassignment {
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

    @JoinColumn(name = "designeremployee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee designeremployee_id;

    @Column(name = "completeddate")
    @Basic(optional = true)
    private LocalDate completeddate;

    @Column(name = "actualcompleteddate")
    @Basic(optional = true)
    private LocalDate actualcompleteddate;

    @Column(name = "description")
    @Basic(optional = true)
    private String description;

    @JoinColumn(name = "desingerstatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Designerassignmentstatus desingerstatus_id;

    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee employee_id;

    public Designerassignment(Employee designeremployee_id){
        this.designeremployee_id = designeremployee_id;
    }



}
