package com.bitproject.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "plan_has_floorarea")
public class PlanHasFloorarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;


    @JoinColumn(name = "plan_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    @JsonIgnore
    private Plan plan_id;

    @JoinColumn(name = "floorarea_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private FloorArea floorarea_id;


    @Column(name = "totalarea")
    @Basic(optional = false)
    private BigDecimal totalarea;


    @Column(name = "wallsandcirculationratio")
    @Basic(optional = false)
    private BigDecimal wallsandcirculationratio;


    @Column(name = "finalfloorarea")
    @Basic(optional = false)
    private BigDecimal finalfloorarea;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "plan_has_floorarea_id",fetch = FetchType.LAZY,orphanRemoval = true)
    private List<PlanHasFloorareaHasHouseSubparts>planHasFloorareaHasHousesubpartsList;

}
