package com.bitproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "bsrcategory")
@AllArgsConstructor
@NoArgsConstructor
public class BSRcategory {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Integer id;


    @Column(name = "name")
    @Basic(optional = false)
    private String name;

    @Column(name = "code")
    @Basic(optional = false)
    private String code;
}
