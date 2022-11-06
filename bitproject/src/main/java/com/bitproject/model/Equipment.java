package com.bitproject.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="equipment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name="id")
    private Integer id;

    @Column(name = "equipmentcode")
    @Basic(optional = false)
    private String equipmentcode;



    @Column(name = "equipmentname")
    @Basic(optional = false)
    private String equipmentname;


    @Column(name = "addeddate")
    @Basic(optional = false)
    private LocalDate addeddate;


    @Column(name = "description")
    @Basic(optional = true)
    private String description;


    @Column(name = "quantity")
    @Basic(optional = false)
    private Integer quantity;


    //foreign keys

    @JoinColumn(name = "equipmentcategory_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Equipmentcategory equipmentcategory_id;

    @JoinColumn(name="equipmentownby_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private EquipmentownBy equipmentownby_id;



    @JoinColumn(name = "equipmentstatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private EquipmentStatus equipmentstatus_id;

    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Employee employee_id;

    public Equipment(String equipmentcode){
        this.equipmentcode = equipmentcode;
    }


}
