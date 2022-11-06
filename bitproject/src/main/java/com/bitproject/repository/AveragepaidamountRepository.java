package com.bitproject.repository;

import com.bitproject.model.Customerpayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AveragepaidamountRepository extends JpaRepository<Customerpayment,Integer> {

    @Query(value = "SELECT cast(avg(cp.paidamount) as decimal(10,2)) as AveragePaidAmount FROM ceylon_engineering.customerpayment as cp  where cp.reservation_id in (select r.id from ceylon_engineering.reservation as r,ceylon_engineering.customer as c where c.id = r.customer_id and c.arrearsamount<>0 and  r.customer_id = ?1 group by cp.paidamount)",nativeQuery = true)
    List getaveragepaidamount(int cusid);

    @Query(value = "SELECT cast(cp.paidamount as decimal(10,2) ) FROM ceylon_engineering.customerpayment as cp where cp.reservation_id in (select r.id from ceylon_engineering.reservation as r where r.customer_id=:cid)",nativeQuery = true)
    List getpaidamount(int cid);
}
