package com.bitproject.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "prsubtaskstatus")
@AllArgsConstructor
@NoArgsConstructor
public class PRsubtaskstatus {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Basic(optional = false)
    private Integer id;

    @Column(name = "name")
    @Basic(optional = true)
    private String name;
}
