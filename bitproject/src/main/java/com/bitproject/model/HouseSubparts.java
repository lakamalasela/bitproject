package com.bitproject.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "housesubparts")
public class HouseSubparts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name="id")
    private Integer id;


    @Column(name = "name")
    @Basic(optional = false)
    private String name;

//    @OneToMany(cascade = CascadeType.ALL,mappedBy = "housesubparts_id",fetch = FetchType.LAZY,orphanRemoval = true)
//    private List<Constructionsubtask_has_housesubparts>constructionsubtask_has_housesubpartsList;

    @JoinColumn(name = "housepart_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Housepart housepart_id;


    public HouseSubparts( Integer id,String name){
        this.id = id;
        this.name = name;
    }

}
