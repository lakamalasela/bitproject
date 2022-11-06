package com.bitproject.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "equipmentinventory")
@AllArgsConstructor
@NoArgsConstructor
public class EquipmentInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;


    @JoinColumn(name = "equipment_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Equipment equipment_id;


    @Column(name = "availableqty")
    @Basic(optional = false)
    private Integer availableqty;

    @Column(name = "totalqty")
    @Basic(optional = false)
    private Integer totalqty;

    @Column(name = "uselessqty")
    @Basic(optional = false)
    private Integer uselessqty;

    @Column(name = "currentuseqty")
    @Basic(optional = false)
    private Integer currentuseqty;


    @JoinColumn(name = "eistatus_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private EquipmentInventorystatus eistatus_id;


}
