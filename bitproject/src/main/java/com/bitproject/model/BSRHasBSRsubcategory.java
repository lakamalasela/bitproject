package com.bitproject.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "bsr_has_bsrsubcategory")
@AllArgsConstructor
@NoArgsConstructor
public class BSRHasBSRsubcategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Basic(optional = false)
    private Integer id;

    @Column(name = "itemcode")
    @Basic(optional = false)
    private String itemcode;


    @Column(name = "description")
    @Basic(optional = false)
    private String description;

    @Column(name = "bsrrate")
    @Basic(optional = false)
    private BigDecimal bsrrate;

    //foreign keys
    @JoinColumn(name = "bsr_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    @JsonIgnore
    private BSR bsr_id;

    @JoinColumn(name = "bsrsubcategory_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private BSRsubcategory bsrsubcategory_id;

    @JoinColumn(name = "itemunit_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private Itemunit itemunit_id;

    public BSRHasBSRsubcategory(Integer id,String itemcode){
        this.id = id;
        this.itemcode = itemcode;
    }
}
