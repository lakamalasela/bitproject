package com.bitproject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "plan_has_floorarea_has_housesubparts")
public class PlanHasFloorareaHasHouseSubparts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Basic(optional = false)
    private Integer id;


    @JoinColumn(name = "plan_has_floorarea_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    @JsonIgnore
    private PlanHasFloorarea plan_has_floorarea_id;

    @JoinColumn(name = "housesubparts_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private HouseSubparts housesubparts_id;


    @Column(name = "count")
    @Basic(optional = false)
    private Integer count;

    @Column(name = "width")
    @Basic(optional = false)
    private BigDecimal width;


    @Column(name = "height")
    @Basic(optional = false)
    private BigDecimal height;

    @Column(name = "area")
    @Basic(optional = false)
    private BigDecimal area;
}
