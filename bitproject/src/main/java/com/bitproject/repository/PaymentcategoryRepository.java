package com.bitproject.repository;

import com.bitproject.model.Paymentcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaymentcategoryRepository extends JpaRepository<Paymentcategory,Integer> {

    @Query("select pc from Paymentcategory pc where pc.id=1 or pc.id=2")
    List<Paymentcategory> getlistbyfullad();

}
