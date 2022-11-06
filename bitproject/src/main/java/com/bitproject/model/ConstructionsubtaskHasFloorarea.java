package com.bitproject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "constructionsubtask_has_floorarea")
@AllArgsConstructor
@NoArgsConstructor
public class ConstructionsubtaskHasFloorarea {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Integer id;

    @JoinColumn(name = "reservation_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    @JsonIgnore
    private Reservation reservation_id;

    @JoinColumn(name = "floorarea_id",referencedColumnName = "id")
    @ManyToOne(optional = true,fetch = FetchType.EAGER)
    private FloorArea floorarea_id;




    @Column(name = "numberofbedroom")
    @Basic(optional = false)
    private Integer numberofbedroom;


    @Column(name = "numberofbathroom")
    @Basic(optional = false)
    private Integer numberofbathroom;


    @Column(name = "numberofkitchen")
    @Basic(optional = false)
    private Integer numberofkitchen;



    @Column(name = "numberoflivingroom")
    @Basic(optional = false)
    private Integer numberoflivingroom;


    @Column(name = "numberofdinningroom")
    @Basic(optional = false)
    private Integer numberofdinningroom;



    @Column(name = "numberofpantry")
    @Basic(optional = false)
    private Integer numberofpantry;

    @Column(name = "numberofguestroom")
    @Basic(optional = false)
    private Integer numberofguestroom;



    @OneToMany(cascade = CascadeType.ALL,mappedBy = "constructionsubtask_has_floorarea_id",fetch = FetchType.LAZY,orphanRemoval = true)
    private List<ConstructionsubtaskHasfloorareaHasHousesubparts> constructionsubtaskHasfloorareaHasHousesubpartsList;


//
//    @JoinColumn(name = "constructionsubtask_id",referencedColumnName = "id")
//    @ManyToOne(optional = false,fetch = FetchType.EAGER)
//
//    private Constructionsubtask constructionsubtask_id;


}
