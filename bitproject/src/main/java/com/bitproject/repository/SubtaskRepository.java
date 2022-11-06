package com.bitproject.repository;

import com.bitproject.model.Subtask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SubtaskRepository extends JpaRepository<Subtask,Integer> {

    @Query(value = "SELECT concat('ST',lpad(substring(max(st.subtaskno),3)+1,8,0)) FROM ceylon_engineering.subtask as st",nativeQuery = true)
    String getNextnumber();
}
