package com.bitproject.repository;

import com.bitproject.model.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service,Integer> {

    @Query("select i from Service i where (i.serviceno like concat('%',:searchtext,'%') or " +
            "i.servicename like concat('%',:searchtext,'%') or " +
            "trim(i.servicecharge) like concat('%',:searchtext,'%') or "+
            "i.servicestatus_id.name like concat('%',:searchtext,'%'))")
    Page<Service> findAll(@Param("searchtext") String searchtext, Pageable of);


    @Query(value = "SELECT concat('S',lpad(substring(max(s.serviceno),2)+1,9,0))  FROM ceylon_engineering.service as s;",nativeQuery = true)
    String getNextNumber();

    @Query("select new Service (s.id,s.serviceno,s.servicename,s.servicecharge) from Service s where s.servicestatus_id.id=1")
    List<Service> list();
}
