package com.bitproject.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "servicetype")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Servicetype {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Basic(optional = false)
    private Integer id;


    @Basic(optional = false)
    @Column(name = "name")
    private String name;
}
