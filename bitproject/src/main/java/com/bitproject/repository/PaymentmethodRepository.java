package com.bitproject.repository;

import com.bitproject.model.Paymentmethod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentmethodRepository extends JpaRepository<Paymentmethod,Integer> {
}
