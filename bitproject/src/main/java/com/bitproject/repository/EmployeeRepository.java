package com.bitproject.repository;

import com.bitproject.model.Employee;
import com.bitproject.model.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    @Query(value="SELECT * FROM Employee e where e.callingname = ?1", nativeQuery=true)
    List<Employee> lists(String caname);


  @Query(value="SELECT new Employee(e.id,e.callingname) FROM Employee e")
  List<Employee> list();

    @Query(value = "SELECT max(e.number) FROM Employee e")
    String getNextNumber();

    @Query(value="SELECT new Employee(e.id,e.callingname) FROM Employee e WHERE e not in (Select u.employeeId from User u)")
    List<Employee> listWithoutUsers();

    @Query(value="SELECT new Employee(e.id,e.callingname) FROM Employee e WHERE e in (Select u.employeeId from User u)")
    List<Employee> listWithUseraccount();

    @Query("SELECT e FROM Employee e where e.callingname <> 'Admin' ORDER BY e.id DESC")
    Page<Employee> findAll(Pageable of);

    @Query("SELECT e FROM Employee e where (e.callingname like concat('%',:searchtext,'%')) and e.callingname<>'Admin' ORDER BY e.id DESC")
    Page<Employee> findAll(@Param("searchtext") String searchtext , Pageable of);

   @Query("SELECT e FROM Employee e WHERE e.nic= :nic")
    Employee findByNIC(@Param("nic") String nic);

    @Query("SELECT e FROM Employee e WHERE e.number= :number")
    Employee findByNumber(@Param("number") String number);


    @Query("select lemp from Employee lemp where lemp.designationId.id=6")
    List<Employee> getlaborEmployee();


    @Query("select qs from Employee qs where qs.designationId.id=5 and qs.employeestatusId.id=1")
    List<Employee> getqsemployee();

    @Query("select ds from Employee ds where ds.designationId.id=4 and ds.employeestatusId.id=1")
    List<Employee> getdesigneremployee();

    @Query("select new Employee(asl.id,asl.number,asl.callingname,asl.currentreservationcode) from Employee asl where  asl.designationId.id=6")
    List<Employee> assignlaborList();

    @Query("select new Employee (rl.id,rl.number,rl.callingname,rl.currentreservationcode) from Employee rl where rl.currentreservationcode=:avreservation and rl.designationId.id=6")
    List<Employee> removelaborList(@Param("avreservation") String avreservation);

    @Query("select new Employee (tinl.id,tinl.number,tinl.callingname,tinl.currentreservationcode) from Employee tinl where tinl.currentreservationcode=:avfromreservation and tinl.designationId.id=6")
    List<Employee> avlaborfromreservationtin(@Param("avfromreservation") String avfromreservation);

    @Query("select new Employee (toutl.id,toutl.number,toutl.callingname,toutl.currentreservationcode) from Employee toutl where toutl.currentreservationcode=:avtoreservation and toutl.designationId.id=6")
    List<Employee> avlabortoreservation(@Param("avtoreservation") String avtoreservation);

    @Query("select new Employee (wr.id,wr.number,wr.callingname,wr.currentreservationcode) from Employee wr where wr.id=:employeeid and wr.designationId.id=6")
    Employee getworkingreservation(@Param("employeeid") int employeeid);

    @Query("select sup from Employee sup where sup.designationId.id=3")
    List<Employee> getSupervisorlist();


    @Query("select desineremp from Employee desineremp where desineremp.id in (select demp.designeremployee_id.id from Designerassignment demp where demp.reservation_id.id=:reservationid)")
    List<Employee> getassigndesigner(@Param("reservationid") int reservationid);

    @Query("select new Employee(asl.id,asl.number,asl.callingname,asl.currentreservationcode) from Employee asl where  asl.designationId.id=6")
    Page<Reservation> findAllactive(PageRequest id);

    //available employee
    @Query("select new Employee(e.id,e.callingname) from Employee e where e.employeestatusId.id=:empstid and e.designationId.id=6")
    List<Employee> getAvemployee(@Param("empstid") int empstid);

    //not available employee
    @Query("select new Employee (nav.id,nav.callingname) from Employee nav where nav.employeestatusId.id=2 and nav.designationId.id=6")
    List<Employee> getNotavemployee(@Param("empsid") int empsid);
}
