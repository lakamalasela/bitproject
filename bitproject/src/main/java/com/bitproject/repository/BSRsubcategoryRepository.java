package com.bitproject.repository;

import com.bitproject.model.BSRsubcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BSRsubcategoryRepository extends JpaRepository<BSRsubcategory,Integer> {
    @Query("select sc from BSRsubcategory sc where sc.bsrcategory_id.id = :categoryid")
    List<BSRsubcategory>listbycategory(@Param("categoryid") Integer categoryid);
}
