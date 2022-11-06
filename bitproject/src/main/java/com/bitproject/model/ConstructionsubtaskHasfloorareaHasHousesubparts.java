package com.bitproject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "constructionsubtask_has_floorarea_has_housesubparts")

public class ConstructionsubtaskHasfloorareaHasHousesubparts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;


    @JoinColumn(name = "constructionsubtask_has_floorarea_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    @JsonIgnore
    private ConstructionsubtaskHasFloorarea constructionsubtask_has_floorarea_id;


    @JoinColumn(name = "housesubparts_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private HouseSubparts housesubparts_id;



}
