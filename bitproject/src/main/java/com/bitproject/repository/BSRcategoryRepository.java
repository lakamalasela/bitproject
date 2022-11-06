package com.bitproject.repository;

import com.bitproject.model.BSRcategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BSRcategoryRepository extends JpaRepository<BSRcategory,Integer> {
    //List<BSRcategory> list();
}
