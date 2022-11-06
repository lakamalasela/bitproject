package com.bitproject.repository;

import com.bitproject.model.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation,Integer> {



    @Query(value = "SELECT concat('R',lpad(substring(max(r.reservationcode),2)+1,9,0)) FROM ceylon_engineering.reservation as r",nativeQuery = true)
    String getNextnumber();


    @Query("select r from Reservation r where (r.reservationcode like concat('%',:searchtext,'%') or " +
            " r.projectlocation like concat('%',:searchtext,'%') or "+
            " r.service_id.serviceno like concat('%',:searchtext,'%') or "+
            " r.reservationstatus_id.name like concat('%',:searchtext,'%') or "+
            " r.employee_id.callingname like concat('%',:searchtext,'%') or "+
            " r.customer_id.regno like concat('%',:searchtext,'%') or " + "r.province_id.name like concat('%',:searchtext,'%') or " +
            "r.supervisor_id.callingname like concat('%',:searchtext,'%'))")
    Page<Reservation> findAll(@Param("searchtext") String searchtext, Pageable of );

    @Query(value = "select new Reservation (r.id,r.reservationcode,r.projecttitle,r.plan_id) from Reservation r")
    List<Reservation> list();


    @Query(value = "select ar from Reservation ar where ar.reservationstatus_id.id=2")
    Page<Reservation> findAllactive(PageRequest id);

    @Query(value = "select acr from Reservation acr where acr.reservationstatus_id.id=2 or acr.reservationstatus_id.id=1")
    List<Reservation> activereservationList();

    @Query(value = "select rs from Reservation rs where rs.customer_id in (select cus.id from Customer cus where cus.id=:customerid )")
    List<Reservation> getbyCustomer(int customerid);

    @Query(value = "select rsd from Reservation rsd where rsd.id in (select res.reservation_id.id from Designerassignment res where res.designeremployee_id.id=:designerid)")
    List<Reservation> getbyDesigner(@Param("designerid") int designerid);

    @Query(value = "select rsq from Reservation rsq where rsq.id in (select resq.reservation_id.id from QSassignment resq where resq.qsemployee_id.id=:qsid)")
    List<Reservation> getbyQs(@Param("qsid") int qsid);

    @Query(value = "select rsq from Reservation rsq where rsq.projecttitle='Planning for signle floor house Maradhana 02'")
    List<Reservation> getByResTitle(String restitle);//param eka use wenne neththan param number eka witharai daanne

    @Query(value = "select acr from Reservation acr where acr.reservationstatus_id.id=1")
    List<Reservation> activeProgressreservationList();

//    @Query(value = "SELECT r.reservationcode,c.id,c.regno,r.paidamount,cp.lastbalance FROM ceylon_engineering.reservation as r,ceylon_engineering.customerpayment as cp,ceylon_engineering.customer as c where cp.reservation_id = r.id and r.customer_id = c.id and " +
//            "c.arrearsamount<>0 group by paidamount",nativeQuery = true)
    //@Query(value = "SELECT r.reservationcode,c.id,c.regno,r.paidamount,cp.lastbalance,cast(avg(cp.paidamount) as decimal(10,2)) as AveargePaidAmount FROM ceylon_engineering.reservation as r,ceylon_engineering.customerpayment as cp,ceylon_engineering.customer as c where cp.reservation_id = r.id and r.customer_id = c.id and c.arrearsamount<>0 group by paidamount",nativeQuery = true)
    //@Query(value = "SELECT r.reservationcode,c.id,c.regno,r.paidamount,(cp.lastbalance-cp.paidamount) as lastbalance,cast(avg(cp.paidamount) as decimal(10,2)) as AveargePaidAmount FROM ceylon_engineering.reservation as r,ceylon_engineering.customerpayment as cp,ceylon_engineering.customer as c where cp.reservation_id = r.id and r.customer_id = c.id and c.arrearsamount<>0 group by paidamount",nativeQuery = true)
    @Query(value = "SELECT r.reservationcode,c.id,c.regno,r.paidamount,(cp.lastbalance-cp.paidamount) as lastbalance,cast(avg(cp.paidamount) as decimal(10,2)) as AveargePaidAmount FROM ceylon_engineering.reservation as r,ceylon_engineering.customerpayment as cp,ceylon_engineering.customer as c where  cp.reservation_id = r.id and  r.customer_id = c.id and (cp.paymentdate between ?1  and  ?2) and c.arrearsamount<>0 group by paidamount",nativeQuery = true)
    List resincomelist(LocalDate startdate,LocalDate enddate);

    @Query("select allcus from Reservation allcus")
    List<Reservation> getAllcus();

    @Query(value = "SELECT r.reservationcode,c.id,r.totalcharge,(r.totalcharge-cp.paidamount) as Balance FROM ceylon_engineering.reservation as r,ceylon_engineering.customerpayment as cp,ceylon_engineering.customer as c where r.customer_id=c.id and cp.reservation_id=r.id and c.arrearsamount<>0 and c.customerstatus_id=1",nativeQuery = true)
    List expincomelist();


    @Query(value = "SELECT * FROM ceylon_engineering.reservation as r where (r.service_id=2 or r.service_id=3 or r.service_id=5 or r.service_id=6)",nativeQuery = true)
    List<Reservation> getavestimation();
}
