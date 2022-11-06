package com.bitproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "eistatus")
@AllArgsConstructor
@NoArgsConstructor
public class EquipmentInventorystatus {


    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Id
    private Integer id;


    @Column(name = "name")
    @Basic(optional = false)
    private String name;
}
