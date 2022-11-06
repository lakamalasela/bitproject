package com.bitproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="contactmedia")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    @Basic(optional = false)
    private Integer id;

    @Column(name="name")
    @Basic(optional = false)
    private String name;
}
