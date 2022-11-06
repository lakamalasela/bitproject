package com.bitproject.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "bsrsubcategory")
@AllArgsConstructor
@NoArgsConstructor
public class BSRsubcategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Basic(optional = false)
    private Integer id;


    @Column(name = "name")
    @Basic(optional = false)
    private String name;

    @JoinColumn(name = "bsrcategory_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private BSRcategory bsrcategory_id;
}
