package com.bitproject.repository;

import com.bitproject.model.Laborallocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ExpectedlaborRepository extends JpaRepository<Laborallocation,Integer> {

    @Query(value = "SELECT la.id,r.reservationcode,e.number,la.expectedremovedatetime FROM ceylon_engineering.laborallocation as la,ceylon_engineering.reservation r,ceylon_engineering.employee as e where la.lafromreservation_id= r.id and la.laboremployee_id = e.id and la.expectedremovedatetime < ?1 and (la.latype_id=1 or la.latype_id=3) order by la.id desc",nativeQuery = true)
    List getexplobor(LocalDateTime expdate);
}
