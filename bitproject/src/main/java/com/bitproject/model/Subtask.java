package com.bitproject.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "subtask")
@AllArgsConstructor
@NoArgsConstructor
public class Subtask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Integer id;

    @JoinColumn(name = "reservation_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    @JsonIgnore
    private Reservation reservation_id;

    @Column(name = "subtaskno")
    @Basic(optional = false)
    private String subtaskno;

    @JoinColumn(name = "floorarea_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private FloorArea floorarea_id;

    @JoinColumn(name = "housesubparts_id",referencedColumnName = "id")
    @ManyToOne(optional = false,fetch = FetchType.EAGER)
    private HouseSubparts housesubparts_id;

    @Column(name = "description")
    @Basic(optional = true)
    private String description;

    public Subtask(String subtaskno){
        this.subtaskno = subtaskno;
    }
}
