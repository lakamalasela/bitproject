package com.bitproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="customerstatus")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerStatus {

  @Id
  @Column(name = "id")
  @Basic(optional = false)
  @GeneratedValue(strategy =GenerationType.IDENTITY)
  private Integer  id;

  @Column(name = "name")
  @Basic(optional = false)
  private  String  name;
}
