package com.bitproject.repository;


import com.bitproject.model.CustomerStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerstatusRepository extends JpaRepository<CustomerStatus, Integer> {
}
