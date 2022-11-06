

 

        window.addEventListener("load", initialize);

        //Initializing Functions

        function initialize() {

            $('[data-toggle="tooltip"]').tooltip()


            //select2
            $('.js-example-basic-single').select2();


            btnAdd.addEventListener("click",btnAddMC);
            btnClear.addEventListener("click",btnClearMC);
            btnUpdate.addEventListener("click",btnUpdateMC);

            // dteDOBirth.onchange = dteDOBirthCH;
            txtSearchName.addEventListener("keyup",btnSearchMC);

            privilages = httpRequest("../privilage?module=EQSHIFTMENT","GET");

            eqstype = httpRequest("../eqallocationtype/list","GET");

            eqsstatus  = httpRequest("../eqallocationstatus/list","GET");

            employees = httpRequest("../employee/list","GET");

            equipments =  httpRequest("../equipment/list","GET");

            //reservations = httpRequest("../reservation/list","GET");
            reservations = httpRequest("../reservation/activelist","GET");

            // assignDatetime.addEventListener('change',getResult);

            valid = "2px solid green";
            invalid = "2px solid red";
            initial = "2px solid #d6d6c2";
            updated = "2px solid #ff9900";
            active = "#90EE90";


            cmbestype.addEventListener('change', showCards);

            assignDatetime.addEventListener('change', getTime);

            //assign
            //cmbResNo.addEventListener('change',getassignavailableqtyinitial);
            //cmbAeqcatrgory.addEventListener('change',getavailbleqty);

            //remove
            //ResRemoveNo.addEventListener('change',removeavailableqtyinitial);
            //cmbReqcatrgory.addEventListener('change',getavailableremoveqty);
            Removeqty.addEventListener('change',getfinalremovedqty);

            Assignqty.addEventListener('change',getfinalqty);

            //tin
            //cmbTineqcatrgory.addEventListener('change',getReservationsavailableqty);
            Tinqyt.addEventListener('change',getallfinalqty);
           // ReciveResNoTin.addEventListener('change',getininitialqtytoreservation);old
           // ReciveResNoTin.addEventListener('change',gettinavailableqtytoreservation)old
            //SenderResNoTin.addEventListener('change',gettinavailableqtyfromreservation)old;

            //tout
            cmbTouteqcatrgory.addEventListener('change',getReservationtoutavailableqty);
            Toutqyt.addEventListener('change',getallfinalqtytout);

            //ReciveResNoTin.addEventListener('change',dupplicateCheck);
            //SenderResNoTin.addEventListener('change',fromreschangetin);
            //ReciveResNoTin.addEventListener('change',toreschangetin)

            ESassign.style.display = "block";
            ESremove.style.display = "none";
            EStin.style.display = "none";
            EStout.style.display = "none";


            initialColor = "1px solid #ced4da";
            updatedColor = "2px Solid Blue";
            validColor = "2px Solid Green";
            invalidColor = "2px Solid Red";

            loadView();
            loadForm();


            changeTab('form');
        }


        function getTime(){

            console.log(assignDatetime.value)
        }
        function getassignavailableqtyinitial(){

            cmbAeqcatrgory.disabled = false;
            fillCombo(cmbAeqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            //cmbAeqcatrgory.style.border = initial;
            $('.Aseqcmbsearch .select2-selection').css('border',initial);
            Assignavailableqyt.value = ""
            Assignavailableqyt.style.border = initial;

            Assignqty.value = "";
            Assignqty.style.border = initial;
            eqallocation.assignqty = null;

            txtInventoryqty.value = "";
            txtInventoryqty.style.border = initial;


            Fassignqty.value = "";
            Fassignqty.style.border = initial;
            eqallocation.finalavqty = null;




            expectedRDatetime.min = getCurrentDateTime('datetime');
            var endtoday = new Date();
            var nextweek = new Date();

            nextweek.setDate(endtoday.getDate()+365);

            let getEndMonth = nextweek.getMonth()+1;
            if(getEndMonth<10){
                getEndMonth = "0"+getEndMonth;
            }

            let getEnddate = nextweek.getDate();
            if(getEnddate<10){
                getEnddate = "0"+getEnddate;
            }
            let hours = nextweek.getHours();
            if(hours<10){
                hours = "0"+hours;
            }

            let minutes = nextweek.getMinutes();
            if(minutes<10){
                minutes = "0"+minutes;
            }

            let seconds = nextweek.getSeconds();
            if(seconds<10){
                seconds = "0"+seconds;
            }

            expectedRDatetime.max = nextweek.getFullYear()+"-"+getEndMonth+"-"+getEnddate+"T"+hours+":"+minutes+":"+seconds;
            expectedRDatetime.value = "";
            expectedRDatetime.style.border = initial;
            eqallocation.expectedremovedatetime = null;
            //
            // assignDatetime.value = getCurrentDateTime('datetime');
            // eqallocation.assigndatetime = assignDatetime.value;
            // assignDatetime.disabled = true;
            // assignDatetime.style.border = updated;
        }

        //available quantity show
        function getavailbleqty(){

            reservationbtfinalqty = httpRequest("/eqallocation/finalqty?fromreservationid="+JSON.parse(cmbResNo.value).id+"&equipmentid="+JSON.parse(cmbAeqcatrgory.value).id,"GET");
            // for(index in reservationbtfinalqty){
            //     var getfinalqty = reservationbtfinalqty[index].finalavqty;
            //     console.log("QTY set",getfinalqty);
            // }
            var getfinalqty = reservationbtfinalqty.finalavqty;
            console.log("Final Qty",getfinalqty)
            if(getfinalqty == null){
                Assignavailableqyt.value = 0;
                Assignavailableqyt.style.border = valid;

            }else{
                Assignavailableqyt.value = reservationbtfinalqty.finalavqty;
                eqallocation.availablefromqty = Assignavailableqyt.value;
                Assignavailableqyt.style.border = valid;
            }

            //assign
            assignDatetime.value = getCurrentDateTime('datetime');
            eqallocation.assigndatetime =  assignDatetime.value;
            assignDatetime.style.border = valid;
            assignDatetime.disabled = true;

            avqtyinventory = httpRequest("eqpinventory/avqty?equipmentid="+JSON.parse(cmbAeqcatrgory.value).id,"GET");
            txtInventoryqty.value = avqtyinventory.availableqty;
            txtInventoryqty.style.border = valid;
        }
        //get final quantity
        function getfinalqty(){

            if(txtInventoryqty.value>=Assignqty.value){
                var  totalfinalqty = parseInt(Assignavailableqyt.value) + parseInt(Assignqty.value);
                Fassignqty.value = totalfinalqty;
                console.log(Fassignqty.value);
                eqallocation.finalavqty =  Fassignqty.value;
                Fassignqty.style.border = valid;
            }else{
                swal({
                    title: "Assign quantity is greater than the Available Quantity of Inventory...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer: 1500,
                });
                Assignqty.value = "";
                eqallocation.assignqty = null;
                Assignqty.style.border = initial;

                Fassignqty.value = "";
                eqallocation.finalavqty = null;
                Fassignqty.style.border = initial;
            }

          // var  totalfinalqty = parseInt(Assignavailableqyt.value) + parseInt(Assignqty.value);
          //   Fassignqty.value = totalfinalqty;
          //   console.log(Fassignqty.value);
          //   eqallocation.finalavqty =  Fassignqty.value;
          //   Fassignqty.style.border = valid;

            if(oldallocation != null && eqallocation.finalavqty != oldallocation.finalavqty){
                Fassignqty.style.border = updated;

                assignDatetime.value = getCurrentDateTime('datetime');
                eqallocation.assigndatetime = assignDatetime.value;
                assignDatetime.disabled = true;
                assignDatetime.style.border = updated;
            }



        }

        function removeavailableqtyinitial(){
            cmbReqcatrgory.disabled = false;
            fillCombo(cmbReqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            //cmbReqcatrgory.style.border = initial;
            $('.Reeqcmbsearch .select2-selection').css('border',initial);

            Removeqty.value = "";
            eqallocation.removeqty = null;
            Removeqty.style.border = initial;

            Fremoveqty.value = "";
            eqallocation.finalavqty = null;
            Fremoveqty.style.border = initial;

            if(RemoveAvailableqyt.value != ""){
                RemoveAvailableqyt.value = "";
                RemoveAvailableqyt.style.border = initial;
            }
        }

        function getavailableremoveqty(){

            reservationbyremovefinalqty = httpRequest("/eqallocation/finalqty?fromreservationid="+JSON.parse(ResRemoveNo.value).id+"&equipmentid="+JSON.parse(cmbReqcatrgory.value).id,"GET");
            // for(index in reservationbyremovefinalqty){
            //     var getfinalremoveqty = reservationbyremovefinalqty[index].finalavqty;
            //     console.log("QTY set",getfinalremoveqty);
            // }
          var getfinalremoveqty = reservationbyremovefinalqty.finalavqty;

            if(getfinalremoveqty==null){
                RemoveAvailableqyt.value = 0;
                RemoveAvailableqyt.style.border = valid;
            }else{
                RemoveAvailableqyt.value = getfinalremoveqty;
                eqallocation.availablefromqty = RemoveAvailableqyt.value;
                RemoveAvailableqyt.style.border = valid;

            }

            //remove
            removeDatetime.value = getCurrentDateTime('datetime');
            eqallocation.removedatetime =   removeDatetime.value;
            removeDatetime.style.border = valid;
            removeDatetime.disabled = true;


        }
        function getfinalremovedqty(){

          var ravqty  =  parseInt(RemoveAvailableqyt.value);

          if(ravqty>0 && ravqty >= parseInt(Removeqty.value)){
              Fremoveqty.value = ravqty - parseInt(Removeqty.value);
              eqallocation.finalavqty = Fremoveqty.value;
              Fremoveqty.style.border = valid;
          }else{
              swal({
                  title: " Remove Quantity Greater than Available Quantity...!",
                  text: "\n",
                  icon: "warning",
                  buttons: false,
                  timer: 1500,
              });
              Removeqty.value = "";
              eqallocation.removeqty = null;
              Removeqty.style.border = initial;
              Fremoveqty.value = "";
              Fremoveqty.style.border = initial;
              eqallocation.finalavqty = null;

          }

        }
        function dupplicateCheck(){
            // console.log("TO ",JSON.parse(SenderResNoTin.value).id);
            let Tinfromres = JSON.parse(ReciveResNoTin.value).id;
            let Tintores = JSON.parse(SenderResNoTin.value).id;


            console.log("FROM ",(JSON.parse(ReciveResNoTin.value).id));
            if(Tintores == Tinfromres){

                swal({
                    title: "From Reservation Code & To Reservation Code Can't be Same...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer: 1500,
                });

                fillCombo(ReciveResNoTin,"Select the Reservation",reservations,"reservationcode","");
                //ReciveResNoTin.style.border = initial;
                $('.TinFrescmbsearch .select2-selection').css('border',initial);

           }

        }

        function fromreschangetin(){
            if(oldallocation != null && eqallocation.toreservation_id.reservationcode != oldallocation.toreservation_id.reservationcode){
                setInitialchangeres();
            }
        }
        function toreschangetin(){

            if(oldallocation != null && eqallocation.fromreservation_id.reservationcode != oldallocation.fromreservation_id.reservationcode){
                setInitialchangeres();
            }
        }

        function setInitialchangeres(){


            fillCombo(cmbTineqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            //cmbTineqcatrgory.style.border = initial;
            $('.Tineqcmbsearch .select2-selection').css('border',initial);

            eqallocation.equipment_id = null;

            SenderAvailableqyt.value = "";
            SenderAvailableqyt.style.border = initial;

            ReciveAvailableqyt.value = "";
            ReciveAvailableqyt.style.border = initial;


            Tinqyt.value = "";
            Tinqyt.style.border = initial;
            eqallocation.transferinqty = null;

            Ftoutsenderqyt.value = "";
            Ftoutsenderqyt.style.border = initial;
            eqallocation.transfertofinalqty = null;

            Ftinreciveqyt.value = "";
            Ftinreciveqyt.style.border = initial;
            eqallocation.finalavqty = null;


            TinDatetime.value = getCurrentDateTime('datetime');
            eqallocation.transferindatetime = TinDatetime.value;
            TinDatetime.style.border = updated;
            TinDatetime.disabled = true;




            TinexpectrDatetime.min = getCurrentDateTime('datetime');
            var endtodaytin = new Date();
            var nextweektin = new Date();

            nextweektin.setDate(endtodaytin.getDate()+365);

            let getEndMonthin = nextweektin.getMonth()+1;
            if(getEndMonthin<10){
                getEndMonthin = "0"+getEndMonthin;
            }

            let getEnddatein = nextweektin.getDate();
            if(getEnddatein<10){
                getEnddatein = "0"+getEnddatein;
            }
            let hoursin = nextweektin.getHours();
            if(hoursin<10){
                hoursin = "0"+hoursin;
            }

            let minutesin = nextweektin.getMinutes();
            if(minutesin<10){
                minutesin = "0"+minutesin;
            }

            let secondsin = nextweektin.getSeconds();
            if(secondsin<10){
                secondsin = "0"+secondsin;
            }

            TinexpectrDatetime.max = nextweektin.getFullYear()+"-"+getEndMonthin+"-"+getEnddatein+"T"+hoursin+":"+minutesin+":"+secondsin;

            TinexpectrDatetime.value = "";
            eqallocation.expectedremovedatetime = null;
            TinexpectrDatetime.style.border = initial;


        }

        function getReservationsavailableqty(){
            fromreservationbytinfinalqty = httpRequest("/eqallocation/finalqty?fromreservationid="+JSON.parse(SenderResNoTin.value).id+"&equipmentid="+JSON.parse(cmbTineqcatrgory.value).id,"GET");
           var fromavqty = fromreservationbytinfinalqty.finalavqty;


            if(fromavqty == null){
                SenderAvailableqyt.value = 0;
                eqallocation.availablefromqty = SenderAvailableqyt.value;


                SenderAvailableqyt.style.border = valid;
            }else{
                SenderAvailableqyt.value = fromavqty;
                eqallocation.availablefromqty = SenderAvailableqyt.value;
                SenderAvailableqyt.style.border = valid;
            }

            //transfer in date and time;
            TinDatetime.value = getCurrentDateTime('datetime');
            eqallocation.transferindatetime = TinDatetime.value;
            TinDatetime.style.border = valid;
            TinDatetime.disabled = true;


            toeservationbytinfinalqty = httpRequest("/eqallocation/finalqty?fromreservationid="+JSON.parse(ReciveResNoTin.value).id+"&equipmentid="+JSON.parse(cmbTineqcatrgory.value).id,"GET");

            console.log("TO RESERVATION ",JSON.parse(ReciveResNoTin.value).id);
            console.log("EQUIP",JSON.parse(cmbTineqcatrgory.value).id)
            console.log("SET ",toeservationbytinfinalqty)

            // if((JSON.parse(SenderResNoTin.value).id)==(JSON.parse(ReciveResNoTin.value).id)){
            //     swal({
            //         title: " You Selected the Same Reservation...!",
            //         text: "\n",
            //         icon: "warning",
            //         buttons: false,
            //         timer: 1500,
            //     });
            //     fillCombo(ReciveResNoTin,"Select the Reservation",reservations,"reservationcode","");
            //     eqallocation.toreservation_id = null;
            //     ReciveResNoTin.style.border = initial;
            //
            //
            // }
            var toqty = toeservationbytinfinalqty.finalavqty;

            if(toqty == null){
                ReciveAvailableqyt.value = 0;
                eqallocation.availabletoqty  =  ReciveAvailableqyt.value;
                ReciveAvailableqyt.style.border = valid;
            }else{
                ReciveAvailableqyt.value = toqty;
                eqallocation.availabletoqty  =  ReciveAvailableqyt.value;
                ReciveAvailableqyt.style.border = valid;
            }

            // if(oldallocation !=null && eqallocation.toreservation_id.reservationcode != oldallocation.toreservation_id.reservationcode){
            //
            // }

            if(oldallocation != null && eqallocation.equipment_id.equipmentname != oldallocation.equipment_id.equipmentname){
                //av qty
                SenderAvailableqyt.style.border = updated;
                ReciveAvailableqyt.style.border = updated;

                Tinqyt.value = "";
                Tinqyt.style.border = initial;
                eqallocation.transferinqty = null;
                Ftoutsenderqyt.value = "";
                eqallocation.transfertofinalqty = null;
                Ftoutsenderqyt.style.border = initial;

                Ftinreciveqyt.value = "";
                eqallocation.finalavqty = null;
                Ftinreciveqyt.style.border = initial;

                TinDatetime.value = getCurrentDateTime('datetime');
                eqallocation.transferindatetime = TinDatetime.value;
                TinDatetime.style.border = updated;
                TinDatetime.disabled = true;




            }




        }

        function getReservationtoutavailableqty(){
            fromreservationbytoutfinalqty = httpRequest("/eqallocation/finalqty?fromreservationid="+JSON.parse(cmbFromResNoTout.value).id+"&equipmentid="+JSON.parse(cmbTouteqcatrgory.value).id,"GET");

            var fromtoavqty = fromreservationbytoutfinalqty.finalavqty;


            if(fromtoavqty == null){
                FromResAvailableqyt.value = 0;
                eqallocation.availablefromqty =   FromResAvailableqyt.value;
                FromResAvailableqyt.style.border = valid;
            }else{
                FromResAvailableqyt.value = fromtoavqty;
                eqallocation.availablefromqty =   FromResAvailableqyt.value;
                FromResAvailableqyt.style.border = valid;
            }

            //tout
            ToutDatetime.value = getCurrentDateTime('datetime');
            eqallocation.transferoutdatetime = ToutDatetime.value;
            ToutDatetime.disabled = true;
            ToutDatetime.style.border = valid;

            toeservationbytoutfinalqty = httpRequest("/eqallocation/finalqty?fromreservationid="+JSON.parse(cmbToresNoTout.value).id+"&equipmentid="+JSON.parse(cmbTouteqcatrgory.value).id,"GET");


            var totoutqty = toeservationbytoutfinalqty.finalavqty;

            if(totoutqty == null){
                ToResAvailableqyt.value = 0;
                eqallocation.availabletoqty = ToResAvailableqyt.value;
                ToResAvailableqyt.style.border = valid;
            }else{
                ToResAvailableqyt.value = totoutqty;
                eqallocation.availabletoqty = ToResAvailableqyt.value;
                ToResAvailableqyt.style.border = valid;
            }

        }

        function getallfinalqty(){

            if(ReciveAvailableqyt.value>0 && ReciveAvailableqyt.value>=Tinqyt.value){
                Ftinreciveqyt.value = parseInt(ReciveAvailableqyt.value)-parseInt(Tinqyt.value);

                //eqallocation.finalavqty=   Ftinreciveqyt.value;



                //eqallocation.transfertofinalqty = Ftinreciveqyt.value;

                Ftoutsenderqyt.style.border = valid;

                Ftoutsenderqyt.value = parseInt(SenderAvailableqyt.value) + parseInt(Tinqyt.value);

                eqallocation.finalavqty = Ftoutsenderqyt.value;
                eqallocation.transfertofinalqty=   Ftinreciveqyt.value;
                //eqallocation.transfertofinalqty = Ftoutsenderqyt.value;
                //eqallocation.finalavqty=   Ftoutsenderqyt.value;

                Ftinreciveqyt.style.border = valid;

                if(oldallocation !=null && eqallocation.transfertofinalqty != oldallocation.transfertofinalqty){


                    Ftoutsenderqyt.style.border = updated;//from final qty
                    Ftinreciveqyt.style.border = updated;//to final qty

                }
                if(oldallocation !=null && eqallocation.finalavqty != oldallocation.finalavqty){
                    Ftinreciveqyt.style.border = updated;
                }


            }else {
                swal({
                    title: " Available  Quantity of From Reservation less than Transfer Quantity Quantity...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer: 1500,
                });
                Ftoutsenderqyt.value = "";
                Ftoutsenderqyt.style.border = initial;
                Ftinreciveqyt.value = "";
                Ftinreciveqyt.style.border = initial;

                Tinqyt.value = "";
                Tinqyt.style.border = initial;
                eqallocation.transferinqty = null;



            }


        }

        function getallfinalqtytout(){

            console.log("TOUT",eqallocation.transferoutqty)
            if(ToResAvailableqyt.value >0 && ToResAvailableqyt.value >= Toutqyt.value){
                Ftoqyt.value = parseInt(ToResAvailableqyt.value)- parseInt(Toutqyt.value);

               eqallocation.finalavqty = Ftoqyt.value;
                FFromqyt.style.border = valid;

                FFromqyt.value = parseInt(FromResAvailableqyt.value)+parseInt(Toutqyt.value);
                FromResAvailableqyt
                 eqallocation.transfertofinalqty = FFromqyt.value;
                Ftoqyt.style.border = valid;
            }else{
                swal({
                    title: " Available  Quantity of From Reservation less than Transfer Out Quantity Quantity...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer: 1500,
                });
                Ftoqyt.value = "";
                Ftoqyt.style.border = initial;
                eqallocation.transfertofinalqty = null;

                FFromqyt.value = "";
                FFromqyt.style.border = initial;
                eqallocation.finalavqty = null;

                Toutqyt.value = "";
                Toutqyt.style.border = initial;
                eqallocation.transferoutqty = null;


            }
        }

        function getininitialqtytoreservation(){
            fillCombo(cmbTineqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            //cmbTineqcatrgory.style.border = initial;
            $('.Tineqcmbsearch .select2-selection').css('border',initial);


            ReciveAvailableqyt.value = "";
            ReciveAvailableqyt.style.border = initial;

            // reservationbytinfinalqty = httpRequest("/eqallocation/finalqty?fromreservationid="+JSON.parse(ResRemoveNo.value).id+"&equipmentid="+JSON.parse(cmbReqcatrgory.value).id,"GET");

        }
        function gettinavailableqtytoreservation(){
             reservationbytinfinalqty = httpRequest("/eqallocation/finalqtyto?toreservationid="+JSON.parse(ReciveResNoTin.value).id+"&equipmentid="+JSON.parse(cmbTineqcatrgory.value).id,"GET");
            var toavqty = reservationbytinfinalqty.finalavqty;


            if((JSON.parse(SenderResNoTin.value).id) == (JSON.parse(ReciveResNoTin.value).id)){

                swal({
                    title: " You Selected the Same Reservation...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer: 1500,
                });
                fillCombo(ReciveResNoTin,"Select the Reservation",reservations,"reservationcode","");
                eqallocation.toreservation_id = null;
                //ReciveResNoTin.style.border = initial;
                $('.TinFrescmbsearch .select2-selection').css('border',initial);


            }


            if(toavqty == null){
                 ReciveAvailableqyt.value = 0;
                 ReciveAvailableqyt.style.border = valid;
             }else{
                 ReciveAvailableqyt.value = toavqty;
                 ReciveAvailableqyt.style.border = valid;
             }



        }

        function gettinavailableqtyfromreservation(){
            reservationbytinfinalqty = httpRequest("/eqallocation/finalqty?fromreservationid="+JSON.parse(SenderResNoTin.value).id+"&equipmentid="+JSON.parse(cmbTineqcatrgory.value).id,"GET");
            var fromavqty = reservationbytinfinalqty.finalavqty;





            if(fromavqty == null){
                SenderAvailableqyt.value = 0;
                SenderAvailableqyt.style.border = valid;
            }else{
                SenderAvailableqyt.value = fromavqty;
                SenderAvailableqyt.style.border = valid;
            }

        }


        //select assign
        function selectAssign(){
            //remove
            fillCombo(ResRemoveNo,"Select the Reservation",reservations,"reservationcode","");
            eqallocation.fromreservation_id = null; //all the feild of fromreservation for set null
            $('.Resremcmbsearch .select2-selection').css('border',initial);
            //ResRemoveNo.style.border = initial;

            fillCombo(cmbReqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            eqallocation.equipment_id = null;//all the feild of equipmet for set null
            //cmbReqcatrgory.style.border = initial;
            $('.Reeqcmbsearch .select2-selection').css('border',initial);

            RemoveAvailableqyt.value = "";
            RemoveAvailableqyt.style.border = initial;


            Removeqty.value = "";
            eqallocation.removeqty = null;
            Removeqty.style.border = initial;


            removeDatetime.value = "";
            eqallocation.removedatetime = null;
            removeDatetime.style.border = initial;

            Fremoveqty.value = "";
            eqallocation.finalavqty = null;//all the feild of final quantity for set null
            Fremoveqty.style.border = initial;

            removeDatetime.value = "";
            eqallocation.removedatetime = null;
            removeDatetime.style.border = initial;

            //tin
            fillCombo(ReciveResNoTin,"Select the Reservation",reservations,"reservationcode","");
            eqallocation.toreservation_id = null;
            //ReciveResNoTin.style.border = initial;
            $('.TinFrescmbsearch .select2-selection').css('border',initial);

            fillCombo(cmbTineqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            //cmbTineqcatrgory.style.border = initial;
            $('.Tineqcmbsearch .select2-selection').css('border',initial);

            ReciveAvailableqyt.value = "";
            ReciveAvailableqyt.style.border = initial;


            //sender's reservation transfer in
            fillCombo(SenderResNoTin,"Select the Reservation",reservations,"reservationcode","");
           // SenderResNoTin.style.border = initial;
            $('.Tinrescmbsearch .select2-selection').css('border',initial);

            SenderAvailableqyt.value = "";
            SenderAvailableqyt.style.border = initial;

            Tinqyt.value = "";
            eqallocation.transferinqty = null;
            Tinqyt.style.border = initial;

           TinDatetime.value = "";
           eqallocation.transferindatetime = null;
           TinDatetime.style.border = initial;

            Ftinreciveqyt.value = "";
            Ftinreciveqyt.style.border = initial;

            Ftoutsenderqyt.value = "";
            Ftoutsenderqyt.style.border = initial;



            TinexpectrDatetime.min = getCurrentDateTime('datetime');
            var endtodaytin = new Date();
            var nextweektin = new Date();

            nextweektin.setDate(endtodaytin.getDate()+365);

            let getEndMonthin = nextweektin.getMonth()+1;
            if(getEndMonthin<10){
                getEndMonthin = "0"+getEndMonthin;
            }

            let getEnddatein = nextweektin.getDate();
            if(getEnddatein<10){
                getEnddatein = "0"+getEnddatein;
            }
            let hoursin = nextweektin.getHours();
            if(hoursin<10){
                hoursin = "0"+hoursin;
            }

            let minutesin = nextweektin.getMinutes();
            if(minutesin<10){
                minutesin = "0"+minutesin;
            }

            let secondsin = nextweektin.getSeconds();
            if(secondsin<10){
                secondsin = "0"+secondsin;
            }

            TinexpectrDatetime.max = nextweektin.getFullYear()+"-"+getEndMonthin+"-"+getEnddatein+"T"+hoursin+":"+minutesin+":"+secondsin;

            TinexpectrDatetime.value = "";
            eqallocation.expectedremovedatetime = null;
            TinexpectrDatetime.style.border = initial;

            //tout
            //to reservation transfer out
            fillCombo(cmbToresNoTout,"Select the Reservation",reservations,"reservationcode","");
            cmbToresNoTout.style.border = initial;
            //from reservation transfer out
            fillCombo(cmbFromResNoTout,"Select the Reservation",reservations,"reservationcode","");
            cmbFromResNoTout.style.border = initial;

            fillCombo(cmbTouteqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            cmbTouteqcatrgory.style.border = initial;

            FromResAvailableqyt.value = "";
            FromResAvailableqyt.style.border = initial;

            ToResAvailableqyt.value = "";
            ToResAvailableqyt.style.border = initial;

            Toutqyt.value = "";
            eqallocation.transferoutqty = null;
            Toutqyt.style.border = initial;

           ToutDatetime.value = "";
           eqallocation.transferoutdatetime = null;
           ToutDatetime.style.border = initial;

            FFromqyt.value = "";
            FFromqyt.style.border = initial;

            Ftoqyt.value = "";
            Ftoqyt.style.border = initial;


        }
        //select remove
        function selectremove(){

            //assign
            fillCombo(cmbResNo,"Select the Reservation",reservations,"reservationcode","");
            eqallocation.fromreservation_id = null;
            //cmbResNo.style.border = initial;
            $('.Asrescmbsearch .select2-selection').css('border',initial);

            fillCombo(cmbAeqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            eqallocation.equipment_id = null;
            //cmbAeqcatrgory.style.border = initial;
            $('.Aseqcmbsearch .select2-selection').css('border',initial);

            Assignavailableqyt.value = "";
            Assignavailableqyt.style.border = initial;

            Assignqty.value = "";
            eqallocation.assignqty = null;
            Assignqty.style.border = initial;

            Fassignqty.value ="";
            eqallocation.finalavqty = null;
            Fassignqty.style.border = initial;

            assignDatetime.value = "";
            eqallocation.assigndatetime = null;
            assignDatetime.style.border = initial;




            expectedRDatetime.min = getCurrentDateTime('datetime');
            var endtoday = new Date();
            var nextweek = new Date();

            nextweek.setDate(endtoday.getDate()+365);

            let getEndMonth = nextweek.getMonth()+1;
            if(getEndMonth<10){
                getEndMonth = "0"+getEndMonth;
            }

            let getEnddate = nextweek.getDate();
            if(getEnddate<10){
                getEnddate = "0"+getEnddate;
            }
            let hours = nextweek.getHours();
            if(hours<10){
                hours = "0"+hours;
            }

            let minutes = nextweek.getMinutes();
            if(minutes<10){
                minutes = "0"+minutes;
            }

            let seconds = nextweek.getSeconds();
            if(seconds<10){
                seconds = "0"+seconds;
            }

            expectedRDatetime.max = nextweek.getFullYear()+"-"+getEndMonth+"-"+getEnddate+"T"+hours+":"+minutes+":"+seconds;

            expectedRDatetime.value = "";
            expectedRDatetime.style.border = initial;
            eqallocation.expectedremovedatetime = null;


            //tin
            fillCombo(ReciveResNoTin,"Select the Reservation",reservations,"reservationcode","");
            eqallocation.toreservation_id = null;
            //ReciveResNoTin.style.border = initial;
            $('.TinFrescmbsearch .select2-selection').css('border',initial);

            fillCombo(cmbTineqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            //cmbTineqcatrgory.style.border = initial;
            $('.Tineqcmbsearch .select2-selection').css('border',initial);

            ReciveAvailableqyt.value = "";
            ReciveAvailableqyt.style.border = initial;


            //sender's reservation transfer in
            fillCombo(SenderResNoTin,"Select the Reservation",reservations,"reservationcode","");
            $('.Tinrescmbsearch .select2-selection').css('border',initial);
            //SenderResNoTin.style.border = initial;

            SenderAvailableqyt.value = "";
            SenderAvailableqyt.style.border = initial;

            Tinqyt.value = "";
            eqallocation.transferinqty = null;
            Tinqyt.style.border = initial;

           TinDatetime.value = "";
           eqallocation.transferindatetime = null;
            TinDatetime.style.border = initial;

            Ftinreciveqyt.value = "";
            Ftinreciveqyt.style.border = initial;

            Ftoutsenderqyt.value = "";
            Ftoutsenderqyt.style.border = initial;



            TinexpectrDatetime.min = getCurrentDateTime('datetime');
            var endtodaytin = new Date();
            var nextweektin = new Date();

            nextweektin.setDate(endtodaytin.getDate()+365);

            let getEndMonthin = nextweektin.getMonth()+1;
            if(getEndMonthin<10){
                getEndMonthin = "0"+getEndMonthin;
            }

            let getEnddatein = nextweektin.getDate();
            if(getEnddatein<10){
                getEnddatein = "0"+getEnddatein;
            }
            let hoursin = nextweektin.getHours();
            if(hoursin<10){
                hoursin = "0"+hoursin;
            }

            let minutesin = nextweektin.getMinutes();
            if(minutesin<10){
                minutesin = "0"+minutesin;
            }

            let secondsin = nextweektin.getSeconds();
            if(secondsin<10){
                secondsin = "0"+secondsin;
            }

            TinexpectrDatetime.max = nextweektin.getFullYear()+"-"+getEndMonthin+"-"+getEnddatein+"T"+hoursin+":"+minutesin+":"+secondsin;


            TinexpectrDatetime.value = "";
            TinexpectrDatetime.style.border = initial;


            //tout
            //to reservation transfer out
            fillCombo(cmbToresNoTout,"Select the Reservation",reservations,"reservationcode","");
            cmbToresNoTout.style.border = initial;
            //from reservation transfer out
            fillCombo(cmbFromResNoTout,"Select the Reservation",reservations,"reservationcode","");
            cmbFromResNoTout.style.border = initial;

            fillCombo(cmbTouteqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            cmbTouteqcatrgory.style.border = initial;

            FromResAvailableqyt.value = "";
            FromResAvailableqyt.style.border = initial;

            ToResAvailableqyt.value = "";
            ToResAvailableqyt.style.border = initial;

            Toutqyt.value = "";
            eqallocation.transferoutqty = null;
            Toutqyt.style.border = initial;

           ToutDatetime.value = "";
           eqallocation.transferoutdatetime = null;
           ToutDatetime.style.border = initial;

            FFromqyt.value = "";
            FFromqyt.style.border = initial;

            Ftoqyt.value = "";
            Ftoqyt.style.border = initial;


        }
        function selecttransferin(){

            //assign
            fillCombo(cmbResNo,"Select the Reservation",reservations,"reservationcode","");
            eqallocation.fromreservation_id = null;
            //cmbResNo.style.border = initial;
            $('.Asrescmbsearch .select2-selection').css('border',initial);

            fillCombo(cmbAeqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            eqallocation.equipment_id = null;
            //cmbAeqcatrgory.style.border = initial;
            $('.Aseqcmbsearch .select2-selection').css('border',initial);

            Assignavailableqyt.value = "";
            Assignavailableqyt.style.border = initial;

            Assignqty.value = "";
            eqallocation.assignqty = null;
            Assignqty.style.border = initial;

            Fassignqty.value ="";
            eqallocation.finalavqty = null;
            Fassignqty.style.border = initial;

            assignDatetime.value = "";
            eqallocation.assigndatetime = null;
            assignDatetime.style.border = initial;




            expectedRDatetime.min = getCurrentDateTime('datetime');
            var endtoday = new Date();
            var nextweek = new Date();

            nextweek.setDate(endtoday.getDate()+365);

            let getEndMonth = nextweek.getMonth()+1;
            if(getEndMonth<10){
                getEndMonth = "0"+getEndMonth;
            }

            let getEnddate = nextweek.getDate();
            if(getEnddate<10){
                getEnddate = "0"+getEnddate;
            }
            let hours = nextweek.getHours();
            if(hours<10){
                hours = "0"+hours;
            }

            let minutes = nextweek.getMinutes();
            if(minutes<10){
                minutes = "0"+minutes;
            }

            let seconds = nextweek.getSeconds();
            if(seconds<10){
                seconds = "0"+seconds;
            }

            expectedRDatetime.max = nextweek.getFullYear()+"-"+getEndMonth+"-"+getEnddate+"T"+hours+":"+minutes+":"+seconds;
            expectedRDatetime.value = "";
            expectedRDatetime.style.border = initial;
            eqallocation.expectedremovedatetime = null;

            //remove
            fillCombo(ResRemoveNo,"Select the Reservation",reservations,"reservationcode","");
           // eqallocation.fromreservation_id = null; //all the feild of fromreservation for set null
            $('.Resremcmbsearch .select2-selection').css('border',initial);
            //ResRemoveNo.style.border = initial;

            fillCombo(cmbReqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            //eqallocation.equipment_id = null;//all the feild of equipmet for set null
            //cmbReqcatrgory.style.border = initial;
            $('.Reeqcmbsearch .select2-selection').css('border',initial);

            RemoveAvailableqyt.value = "";
            RemoveAvailableqyt.style.border = initial;


            Removeqty.value = "";
            eqallocation.removeqty = null;
            Removeqty.style.border = initial;


            removeDatetime.value = "";
            eqallocation.removedatetime = null;
            removeDatetime.style.border = initial;

            Fremoveqty.value = "";
            //eqallocation.finalavqty = null;//all the feild of final quantity for set null
            Fremoveqty.style.border = initial;


            //tout
            //to reservation transfer out
            fillCombo(cmbToresNoTout,"Select the Reservation",reservations,"reservationcode","");
            eqallocation.toreservation_id = null;
            cmbToresNoTout.style.border = initial;
            //from reservation transfer out
            fillCombo(cmbFromResNoTout,"Select the Reservation",reservations,"reservationcode","");
            cmbFromResNoTout.style.border = initial;

            fillCombo(cmbTouteqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            cmbTouteqcatrgory.style.border = initial;

            FromResAvailableqyt.value = "";
            FromResAvailableqyt.style.border = initial;

            ToResAvailableqyt.value = "";
            ToResAvailableqyt.style.border = initial;

            Toutqyt.value = "";
            eqallocation.transferoutqty = null;
            Toutqyt.style.border = initial;

           ToutDatetime.value = "";
           eqallocation.transferoutdatetime = null;
          ToutDatetime.style.border = initial;

            FFromqyt.value = "";
            FFromqyt.style.border = initial;

            Ftoqyt.value = "";
            Ftoqyt.style.border = initial;



        }
        function selecttransferout(){

            //assign
            fillCombo(cmbResNo,"Select the Reservation",reservations,"reservationcode","");
            eqallocation.fromreservation_id = null;
            //cmbResNo.style.border = initial;
            $('.Asrescmbsearch .select2-selection').css('border',initial);

            fillCombo(cmbAeqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            eqallocation.equipment_id = null;
            //cmbAeqcatrgory.style.border = initial;
            $('.Aseqcmbsearch .select2-selection').css('border',initial);

            Assignavailableqyt.value = "";
            Assignavailableqyt.style.border = initial;

            Assignqty.value = "";
            eqallocation.assignqty = null;
            Assignqty.style.border = initial;

            Fassignqty.value ="";
            eqallocation.finalavqty = null;
            Fassignqty.style.border = initial;

            assignDatetime.value = "";
            eqallocation.assigndatetime = null;
            assignDatetime.style.border = initial;




            expectedRDatetime.min = getCurrentDateTime('datetime');
            var endtoday = new Date();
            var nextweek = new Date();

            nextweek.setDate(endtoday.getDate()+365);

            let getEndMonth = nextweek.getMonth()+1;
            if(getEndMonth<10){
                getEndMonth = "0"+getEndMonth;
            }

            let getEnddate = nextweek.getDate();
            if(getEnddate<10){
                getEnddate = "0"+getEnddate;
            }
            let hours = nextweek.getHours();
            if(hours<10){
                hours = "0"+hours;
            }

            let minutes = nextweek.getMinutes();
            if(minutes<10){
                minutes = "0"+minutes;
            }

            let seconds = nextweek.getSeconds();
            if(seconds<10){
                seconds = "0"+seconds;
            }

            expectedRDatetime.max = nextweek.getFullYear()+"-"+getEndMonth+"-"+getEnddate+"T"+hours+":"+minutes+":"+seconds;
            expectedRDatetime.value = "";
            expectedRDatetime.style.border = initial;
            eqallocation.expectedremovedatetime = null;



            //remove
            fillCombo(ResRemoveNo,"Select the Reservation",reservations,"reservationcode","");
            // eqallocation.fromreservation_id = null; //all the feild of fromreservation for set null
            $('.Resremcmbsearch .select2-selection').css('border',initial);
            //ResRemoveNo.style.border = initial;

            fillCombo(cmbReqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            //eqallocation.equipment_id = null;//all the feild of equipmet for set null
            //cmbReqcatrgory.style.border = initial;
            $('.Reeqcmbsearch .select2-selection').css('border',initial);

            RemoveAvailableqyt.value = "";
            RemoveAvailableqyt.style.border = initial;


            Removeqty.value = "";
            eqallocation.removeqty = null;
            Removeqty.style.border = initial;


            removeDatetime.value = "";
            eqallocation.removedatetime = null;
            removeDatetime.style.border = initial;

            Fremoveqty.value = "";
            //eqallocation.finalavqty = null;//all the feild of final quantity for set null
            Fremoveqty.style.border = initial;




            //tin
            fillCombo(ReciveResNoTin,"Select the Reservation",reservations,"reservationcode","");
            eqallocation.toreservation_id = null;
            //ReciveResNoTin.style.border = initial;
            $('.TinFrescmbsearch .select2-selection').css('border',initial);

            fillCombo(cmbTineqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            //cmbTineqcatrgory.style.border = initial;
            $('.Tineqcmbsearch .select2-selection').css('border',initial);

            ReciveAvailableqyt.value = "";
            ReciveAvailableqyt.style.border = initial;


            //sender's reservation transfer in
            fillCombo(SenderResNoTin,"Select the Reservation",reservations,"reservationcode","");
            $('.Tinrescmbsearch .select2-selection').css('border',initial);
            //SenderResNoTin.style.border = initial;

            SenderAvailableqyt.value = "";
            SenderAvailableqyt.style.border = initial;

            Tinqyt.value = "";
            eqallocation.transferinqty = null;
            Tinqyt.style.border = initial;

           TinDatetime.value = "";
           eqallocation.transferindatetime = null;
           TinDatetime.style.border = initial;

            Ftinreciveqyt.value = "";
            Ftinreciveqyt.style.border = initial;

            Ftoutsenderqyt.value = "";
            Ftoutsenderqyt.style.border = initial;



            TinexpectrDatetime.min = getCurrentDateTime('datetime');
            var endtodaytin = new Date();
            var nextweektin = new Date();

            nextweektin.setDate(endtodaytin.getDate()+365);

            let getEndMonthin = nextweektin.getMonth()+1;
            if(getEndMonthin<10){
                getEndMonthin = "0"+getEndMonthin;
            }

            let getEnddatein = nextweektin.getDate();
            if(getEnddatein<10){
                getEnddatein = "0"+getEnddatein;
            }
            let hoursin = nextweektin.getHours();
            if(hoursin<10){
                hoursin = "0"+hoursin;
            }

            let minutesin = nextweektin.getMinutes();
            if(minutesin<10){
                minutesin = "0"+minutesin;
            }

            let secondsin = nextweektin.getSeconds();
            if(secondsin<10){
                secondsin = "0"+secondsin;
            }

            TinexpectrDatetime.max = nextweektin.getFullYear()+"-"+getEndMonthin+"-"+getEnddatein+"T"+hoursin+":"+minutesin+":"+secondsin;


            TinexpectrDatetime.value = "";
            TinexpectrDatetime.style.border = initial;




        }


        function loadView() {

            //Search Area
            txtSearchName.value="";
            txtSearchName.style.background = "";

            //Table Area
            activerowno = "";
            activepage = 1;
            var query = "&searchtext=";
            loadTable(1,cmbPageSize.value,query);
        }

        function loadTable(page,size,query) {
            page = page - 1;
            eqallocations = new Array();
          var data = httpRequest("/eqallocation/findAll?page="+page+"&size="+size+query,"GET");
            if(data.content!= undefined) eqallocations = data.content;
            createPagination('pagination',data.totalPages, data.number+1,paginate);
            fillTable('tblEsallocation',eqallocations,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblEsallocation);

            if(activerowno!="")selectRow(tblEsallocation,activerowno,active);

        }

        function paginate(page) {


            checkerr = getErrors();

            if(oldallocation == null && addvalue == ""){
                activepage=page;
                activerowno=""
                loadSearchedTable();
                loadForm();

            }else{
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        activepage=page;
                        activerowno=""
                        loadSearchedTable();
                        loadForm();
                    }

                });
            }


        }

        function viewitem(allo,rowno) {

            vieweqallocation = JSON.parse(JSON.stringify(allo));
            console.log(vieweqallocation.transferindatetime)

            //tdestype.innerHTML = vieweqallocation.estype_id.name;

            if(vieweqallocation.estype_id.name == "EQ-Assign"){
                tdassescode.innerHTML = vieweqallocation.escode;
                tdassignres.innerHTML =  vieweqallocation.fromreservation_id.reservationcode;
                tdassignequipment.innerHTML =  vieweqallocation.equipment_id.equipmentname;

                tdassignqty.innerHTML = vieweqallocation.assignqty;
                tdassigned.innerHTML = vieweqallocation.availablefromqty;
                tdassignfinalqty.innerHTML = vieweqallocation.finalavqty;
                tdassigndatetime.innerHTML = vieweqallocation.assigndatetime;
                tdexpecteddatetime.innerHTML = vieweqallocation.expectedremovedatetime;
                tdassignaddedby.innerHTML = vieweqallocation.employee_id.callingname;

                if(vieweqallocation.description == null){
                    tdassigndescription.innerHTML =  "<p style='color: red;'>None</p>";
                }else{
                    tdassigndescription.innerHTML = vieweqallocation.description;
                }

                //remove
                tdremoveescode.innerHTML =  "<p style='color: red;'>None</p>";
                tdremovenres.innerHTML =  "<p style='color: red;'>None</p>";
                tdremoveequipment.innerHTML =  "<p style='color: red;'>None</p>";
                tdremovedavqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdemovedqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdfinalqtyinremove.innerHTML =  "<p style='color: red;'>None</p>";
                tdremoveddatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdremovedescription.innerHTML =  "<p style='color: red;'>None</p>";
                tdremovedby.innerHTML =  "<p style='color: red;'>None</p>";

                //tin
                tdtinescode.innerHTML =  "<p style='color: red;'>None</p>";
                tdtintores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinequipment.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinavqtytores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinavqtyfromres.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdfinalqtytores.innerHTML =  "<p style='color: red;'>None</p>";
                tdfinalqtyfromres.innerHTML =  "<p style='color: red;'>None</p>";
                tdtindatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinexpectdatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdtindescription.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinby.innerHTML =  "<p style='color: red;'>None</p>";

                //tout
                tdtoutescode.innerHTML =  "<p style='color: red;'>None</p>";
                tdtouttores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutequipment.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutavqtytores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutavqtyfromres.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutfinalqtytores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutfinalqtyfromres.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutdatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutexpectdatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutdescription.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutby.innerHTML =  "<p style='color: red;'>None</p>";



            } else if(vieweqallocation.estype_id.name =="EQ-Remove Completed"||vieweqallocation.estype_id.name == "EQ-Remove Useless" || vieweqallocation.estype_id.name == "EQ-Remove Damage"){
                //assign
                tdassescode.innerHTML =  "<p style='color: red;'>None</p>";
                tdassignres.innerHTML =  "<p style='color: red;'>None</p>";
                tdassignequipment.innerHTML =  "<p style='color: red;'>None</p>";

                tdassignqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdassigned.innerHTML =  "<p style='color: red;'>None</p>";
                tdassignfinalqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdassigndatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdexpecteddatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdassignaddedby.innerHTML =  "<p style='color: red;'>None</p>";

                tdassigndescription.innerHTML =  "<p style='color: red;'>None</p>";

                //remove
                tdremoveescode.innerHTML =   vieweqallocation.escode;
                tdremovenres.innerHTML =  vieweqallocation.fromreservation_id.reservationcode;
                tdremoveequipment.innerHTML = vieweqallocation.equipment_id.equipmentname;
                tdremovedavqty.innerHTML = vieweqallocation.availablefromqty;
                tdemovedqty.innerHTML = vieweqallocation.removeqty;
                tdfinalqtyinremove.innerHTML =  vieweqallocation.finalavqty;
                tdremoveddatetime.innerHTML =  vieweqallocation.removedatetime;


                if(vieweqallocation.description == null){
                    tdremovedescription.innerHTML =  "<p style='color: red;'>None</p>";
                }else{
                    tdremovedescription.innerHTML = vieweqallocation.description;
                }



                tdremovedby.innerHTML =  vieweqallocation.employee_id.callingname;

                //tin
                tdtinescode.innerHTML =  "<p style='color: red;'>None</p>";
                tdtintores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinequipment.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinavqtytores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinavqtyfromres.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdfinalqtytores.innerHTML =  "<p style='color: red;'>None</p>";
                tdfinalqtyfromres.innerHTML =  "<p style='color: red;'>None</p>";
                tdtindatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinexpectdatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdtindescription.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinby.innerHTML =  "<p style='color: red;'>None</p>";

                //tout
                tdtoutescode.innerHTML =  "<p style='color: red;'>None</p>";
                tdtouttores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutequipment.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutavqtytores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutavqtyfromres.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutfinalqtytores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutfinalqtyfromres.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutdatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutexpectdatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutdescription.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutby.innerHTML =  "<p style='color: red;'>None</p>";







            }else if(vieweqallocation.estype_id.name == "EQ-Transfer In"){
                //assign
                tdassescode.innerHTML =  "<p style='color: red;'>None</p>";
                tdassignres.innerHTML =  "<p style='color: red;'>None</p>";
                tdassignequipment.innerHTML =  "<p style='color: red;'>None</p>";

                tdassignqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdassigned.innerHTML =  "<p style='color: red;'>None</p>";
                tdassignfinalqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdassigndatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdexpecteddatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdassignaddedby.innerHTML =  "<p style='color: red;'>None</p>";

                tdassigndescription.innerHTML =  "<p style='color: red;'>None</p>";

                //remove
                tdremoveescode.innerHTML =  "<p style='color: red;'>None</p>";
                tdremovenres.innerHTML =  "<p style='color: red;'>None</p>";
                tdremoveequipment.innerHTML =  "<p style='color: red;'>None</p>";
                tdremovedavqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdemovedqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdfinalqtyinremove.innerHTML =  "<p style='color: red;'>None</p>";
                tdremoveddatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdremovedescription.innerHTML =  "<p style='color: red;'>None</p>";
                tdremovedby.innerHTML =  "<p style='color: red;'>None</p>";

                //tin
                tdtinescode.innerHTML =    vieweqallocation.escode;
                tdtintores.innerHTML =  vieweqallocation.fromreservation_id.reservationcode;
                tdtinfromres.innerHTML = vieweqallocation.toreservation_id.reservationcode;
                tdtinequipment.innerHTML =  vieweqallocation.equipment_id.equipmentname;
                tdtinavqtytores.innerHTML =  vieweqallocation.availablefromqty;
                tdtinavqtyfromres.innerHTML =  vieweqallocation.availabletoqty;
                tdtinqty.innerHTML =  vieweqallocation.transferinqty;


                tdfinalqtytores.innerHTML =  vieweqallocation.finalavqty;
                tdfinalqtyfromres.innerHTML = vieweqallocation.transfertofinalqty;
                tdtindatetime.innerHTML =  vieweqallocation.transferindatetime;
                tdtinexpectdatetime.innerHTML = vieweqallocation.expectedremovedatetime;



                if(vieweqallocation.description == null){
                    tdtindescription.innerHTML =  "<p style='color: red;'>None</p>";
                }else{
                    tdtindescription.innerHTML = vieweqallocation.description;
                }


                tdtinby.innerHTML =   vieweqallocation.employee_id.callingname;

                //tout
                tdtoutescode.innerHTML =  "<p style='color: red;'>None</p>";
                tdtouttores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutequipment.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutavqtytores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutavqtyfromres.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutfinalqtytores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutfinalqtyfromres.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutdatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutexpectdatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutdescription.innerHTML =  "<p style='color: red;'>None</p>";
                tdtoutby.innerHTML =  "<p style='color: red;'>None</p>";





            }else if(vieweqallocation.estype_id.name == "EQ-Transfer Out"){
                //assign
                tdassescode.innerHTML =  "<p style='color: red;'>None</p>";
                tdassignres.innerHTML =  "<p style='color: red;'>None</p>";
                tdassignequipment.innerHTML =  "<p style='color: red;'>None</p>";

                tdassignqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdassigned.innerHTML =  "<p style='color: red;'>None</p>";
                tdassignfinalqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdassigndatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdexpecteddatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdassignaddedby.innerHTML =  "<p style='color: red;'>None</p>";

                tdassigndescription.innerHTML =  "<p style='color: red;'>None</p>";

                //remove
                tdremoveescode.innerHTML =  "<p style='color: red;'>None</p>";
                tdremovenres.innerHTML =  "<p style='color: red;'>None</p>";
                tdremoveequipment.innerHTML =  "<p style='color: red;'>None</p>";
                tdremovedavqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdemovedqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdfinalqtyinremove.innerHTML =  "<p style='color: red;'>None</p>";
                tdremoveddatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdremovedescription.innerHTML =  "<p style='color: red;'>None</p>";
                tdremovedby.innerHTML =  "<p style='color: red;'>None</p>";

                //tin
                tdtinescode.innerHTML =  "<p style='color: red;'>None</p>";
                tdtintores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinequipment.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinavqtytores.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinavqtyfromres.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinqty.innerHTML =  "<p style='color: red;'>None</p>";
                tdfinalqtytores.innerHTML =  "<p style='color: red;'>None</p>";
                tdfinalqtyfromres.innerHTML =  "<p style='color: red;'>None</p>";
                tdtindatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinexpectdatetime.innerHTML =  "<p style='color: red;'>None</p>";
                tdtindescription.innerHTML =  "<p style='color: red;'>None</p>";
                tdtinby.innerHTML =  "<p style='color: red;'>None</p>";

                //tout
                tdtoutescode.innerHTML =   vieweqallocation.escode;
                tdtouttores.innerHTML =   vieweqallocation.toreservation_id.reservationcode;
                tdtoutfromres.innerHTML = vieweqallocation.fromreservation_id.reservationcode;
                tdtoutequipment.innerHTML = vieweqallocation.equipment_id.equipmentname;
                tdtoutavqtytores.innerHTML = vieweqallocation.availabletoqty;
                tdtoutavqtyfromres.innerHTML =   vieweqallocation.availablefromqty;
                tdtoutqty.innerHTML = vieweqallocation.transferoutqty
                tdtoutfinalqtytores.innerHTML =  vieweqallocation.transfertofinalqty;
                tdtoutfinalqtyfromres.innerHTML =   vieweqallocation.finalavqty;
                tdtoutdatetime.innerHTML = vieweqallocation.transferoutdatetime;
                tdtoutexpectdatetime.innerHTML =  vieweqallocation.expectedremovedatetime;



                if(vieweqallocation.description == null){
                    tdtoutdescription.innerHTML =  "<p style='color: red;'>None</p>";
                }else{
                    tdtoutdescription.innerHTML = vieweqallocation.description;
                }
                tdtoutby.innerHTML =  vieweqallocation.employee_id.callingname;




            }
            // else if(vieweqallocation.estype_id.name == "EQ-Remove Completed"){
            //
            // }


            // if(vieweqallocation.toreservation_id == null){
            //     tdtores.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";
            // }else{
            //     tdtores.innerHTML = vieweqallocation.toreservation_id.reservationcode;
            // }

            // if(vieweqallocation.assignqty == null){
            //     tdassignqty.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";
            // }else{
            //     tdassignqty.innerHTML = vieweqallocation.assignqty;
            // }
            // if(vieweqallocation.assigndatetime == null){
            //     tdassigndtime.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";
            // }else{
            //     tdassigndtime.innerHTML = vieweqallocation.assigndatetime;
            // }

            // if(vieweqallocation.removeqty == null){
            //     tdremoveqty.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
            // }else{
            //     tdremoveqty.innerHTML =  vieweqallocation.removeqty;
            // }

            // if(vieweqallocation.removedatetime == null){
            //     tdremovedtime.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
            // }else{
            //     tdremovedtime.innerHTML =  vieweqallocation.removedatetime;
            // }

            // if(vieweqallocation.transferinqty == null){
            //     tdtinqty.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";
            // }else{
            //     tdtinqty.innerHTML = vieweqallocation.transferinqty ;
            // }

            // if(vieweqallocation.transferindatetime == null){
            //     tdtindtime.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
            // }else{
            //     tdtindtime.innerHTML =  vieweqallocation.transferindatetime;
            // }

            // if(vieweqallocation.transferoutqty == null){
            //     tdoutqty.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";
            // }else{
            //     tdoutqty.innerHTML = vieweqallocation.transferoutqty;
            // }

            // if(vieweqallocation.transferoutdatetime == null){
            //     tdtoutdtime.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
            // }else{
            //     tdtoutdtime.innerHTML =  vieweqallocation.transferoutdatetime ;
            // }
            // if(vieweqallocation.transfertofinalqty == null){
            //     tdtofinalqty.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
            // }else{
            //     tdtofinalqty.innerHTML =  vieweqallocation.transfertofinalqty;
            // }
            //tdescode.innerHTML = vieweqallocation.escode;

            //tdesstatus.innerHTML = vieweqallocation.esstatus_id.name;


            //tdfromres.innerHTML = vieweqallocation.fromreservation_id.reservationcode;


            // tdename.innerHTML = vieweqallocation.equipment_id.equipmentname;

            //tdtoavqty.innerHTML  = vieweqallocation.availablefromqty;

            // if(vieweqallocation.availabletoqty == null){
            //     tdfromavqty.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
            //     //tdfromavqty.innerHTML
            // }else{
            //     tdfromavqty.innerHTML= vieweqallocation.availabletoqty;
            // }
            //
            // tdfromfinalqty.innerHTML = vieweqallocation.finalavqty;
            //




            // if(vieweqallocation.description == null){
            //     tddescription.innerHTML = "<p style='color: red;font-size: 15px;'>No Description Added</p>"
            // }else{
            //     tddescription.innerHTML = vieweqallocation.description;
            // }
            //
            // tdaddeddatetime.innerHTML  = vieweqallocation.addeddatetime;
            //
            // tdaddedby.innerHTML = vieweqallocation.employee_id.callingname;

            // else if(vieweqallocation.estype_id.name == "EQ-Assign"){
            //
            // }






            // if(customer.workplacedetails == null){
            //     tdwork.innerHTML = "<p style='color: red;font-size: 15px;'>No Work Details Added</p>"
            // }else{
            //     tdwork.innerHTML = viewcustomer.workplacedetails;
            // }


            //





            // if(employee.photo==null)
            //     tdphoto.src= 'resourse/image/noimage.png';
            //  else
            // tdphoto.src = atob(employee.photo);


            $('#dataviewModal').modal('show');


         }

         function btnPrintRowMC(){

             var format = printformtable.outerHTML;

             // var newwindow=window.open();
             // newwindow.document.write("<html>" +
             //     "<head><style type='text/css'>.google-visualization-table-th {text-align: left;}</style>" +
             //     "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/>"+
             //     "</head>" +
             //
             //     "<body><div style='margin-top: 150px'><h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Shifting Details :</span> </h1></div>" +
             //     "<div>"+format+"</div>" +
             //     "<script>printformtable.removeAttribute('style')</script>" +
             //     "</body></html>");
             // setTimeout(function () {newwindow.print(); newwindow.close();},100);

             var newwindow=window.open();
             newwindow.document.write("<html>" +
                 "<head><style type='text/css'>.google-visualization-table-th {text-align: left;}</style>" +
                 "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/>"+
                 "</head>" +
                 "<body><div style='margin-top: 150px'><div class='row'><div class='col-md-8'><div class='row'><div class='col-md-3 text-right'><img class='cnew' src='../resources/image/cnew.jpg'></div><div class='col-md-9'><h1><span>Construction Of Ceylon Engineering</span></h1></div></div></div><div class='col-md-4 text-right'><address style='font-weight: 600'>Construction of Ceylon Engineering<br>\n" +
                 "16/C Aviriya Rd,<br>\n" +
                 "Alubomulla,<br>\n" +
                 "Panadura.\n" +
                 "<h6>Tel: 0777343425|0777353526</h6>"+
                 "</address></div></div></di><hr> <h1>Equipment Allocation Details :</h1></div>" +
                 "<div>"+format+"</div>" +
                 "<script>printformtable.removeAttribute('style')</script>" +
                 "</body></html>");
             setTimeout(function () {newwindow.print(); newwindow.close();},100);
         }

        function loadForm() {
            eqallocation = new Object();
            oldallocation  = null;

             fillCombo(cmbestype,"Select the EQ Shiftment Type",eqstype,"name","");
            fillCombo(cmbesStatus,"Select the EQ Shiftment Status",eqsstatus,"name","Completed");
            eqallocation.esstatus_id = JSON.parse(cmbesStatus.value);
            cmbesStatus.disabled = true;
            cmbesStatus.style.border = valid;

            fillCombo(cmbAssign,"Select Added By",employees,"callingname",session.getObject('activeuser').employeeId.callingname);
            eqallocation.employee_id = JSON.parse(cmbAssign.value);
            cmbAssign.disabled = true;
            //equipment for all transfer categories
            fillCombo(cmbAeqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            cmbAeqcatrgory.disabled = true;

            fillCombo(cmbReqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            cmbReqcatrgory.disabled = true;

            fillCombo(cmbTineqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            fillCombo(cmbTouteqcatrgory,"Select the Equipment",equipments,"equipmentname","");

            //assign reservation
            fillCombo(cmbResNo,"Select the Reservation",reservations,"reservationcode","");
            //remove reservation
            fillCombo(ResRemoveNo,"Select the Reservation",reservations,"reservationcode","");

            //recived reservation transfer in
            fillCombo(ReciveResNoTin,"Select the Reservation",reservations,"reservationcode","");








            //sender's reservation transfer in
            fillCombo(SenderResNoTin,"Select the Reservation",reservations,"reservationcode","");

            // //to reservation transfer out
            fillCombo(cmbToresNoTout,"Select the Reservation",reservations,"reservationcode","");



            //from reservation transfer out
            fillCombo(cmbFromResNoTout,"Select the Reservation",reservations,"reservationcode","");


            //transfer in sender reservation

            //  fillCombo(cmbEmployeestatus,"",employeestatuses,"name","Working");
            console.log(assignDatetime.value)
            assignDateandTime.value = getCurrentDateTime('datetime');
            eqallocation.addeddatetime = assignDateandTime.value;
            assignDateandTime.disabled = true;
            assignDateandTime.style.border = valid;

            //Es Assignment
            txtInventoryqty.value = "";
            Assignavailableqyt.value = "";
            Assignqty.value = "";
            assignDatetime.value = "";
            Fassignqty.value = "";


            expectedRDatetime.min = getCurrentDateTime('datetime');
            var endtoday = new Date();
            var nextweek = new Date();

            nextweek.setDate(endtoday.getDate()+365);

            let getEndMonth = nextweek.getMonth()+1;
            if(getEndMonth<10){
                getEndMonth = "0"+getEndMonth;
            }

            let getEnddate = nextweek.getDate();
            if(getEnddate<10){
                getEnddate = "0"+getEnddate;
            }
            let hours = nextweek.getHours();
            if(hours<10){
                hours = "0"+hours;
            }

            let minutes = nextweek.getMinutes();
            if(minutes<10){
                minutes = "0"+minutes;
            }

            let seconds = nextweek.getSeconds();
            if(seconds<10){
                seconds = "0"+seconds;
            }

            expectedRDatetime.max = nextweek.getFullYear()+"-"+getEndMonth+"-"+getEnddate+"T"+hours+":"+minutes+":"+seconds;
            expectedRDatetime.value = "";


            //Es Remove
            RemoveAvailableqyt.value = "";
            Removeqty.value = "";
            removeDatetime.value = "";
            Fremoveqty.value = "";

            //Es Transfer In
            ReciveAvailableqyt.value = "";
            SenderAvailableqyt.value = "";
            Tinqyt.value = "";
            //TinDatetime.value = "";
            Ftinreciveqyt.value = "";
            Ftoutsenderqyt.value = "";


            TinexpectrDatetime.min = getCurrentDateTime('datetime');
            var endtodaytin = new Date();
            var nextweektin = new Date();

            nextweektin.setDate(endtodaytin.getDate()+365);

            let getEndMonthin = nextweektin.getMonth()+1;
            if(getEndMonthin<10){
                getEndMonthin = "0"+getEndMonthin;
            }

            let getEnddatein = nextweektin.getDate();
            if(getEnddatein<10){
                getEnddatein = "0"+getEnddatein;
            }
            let hoursin = nextweektin.getHours();
            if(hoursin<10){
                hoursin = "0"+hoursin;
            }

            let minutesin = nextweektin.getMinutes();
            if(minutesin<10){
                minutesin = "0"+minutesin;
            }

            let secondsin = nextweektin.getSeconds();
            if(secondsin<10){
                secondsin = "0"+secondsin;
            }

            TinexpectrDatetime.max = nextweektin.getFullYear()+"-"+getEndMonthin+"-"+getEnddatein+"T"+hoursin+":"+minutesin+":"+secondsin;

            TinexpectrDatetime.value = "";


            //Es Trasnfer Out
            FromResAvailableqyt.value = "";
            ToResAvailableqyt.value = "";
            Toutqyt.value = "";
            // //ToutDatetime.value = "";
            FFromqyt.value = "";
            Ftoqyt.value = "";


            esDescription.value = "";


            // customer.employee_id = JSON.parse(cmbAssign.value);
            // cmbAssign.disabled = true;
            //
            // customer.customerstatus_id=JSON.parse(cmbStatus.value);
            // cmbStatus.disabled = true;


             // var today = new Date();
             // var month = today.getMonth()+1;
             // if(month<10) month = "0"+month;
             // var date = today.getDate();
             // if(date<10) date = "0"+date;
             //
             // assignDate.value=today.getFullYear()+"-"+month+"-"+date;
             // customer.addedate=assignDate.value;
             // assignDate.disabled = true;

            // // Get Next Number Form Data Base
            // var nextNumber = httpRequest("/employee/nextNumber", "GET");
            // txtNumber.value = nextNumber.number;
            // employee.number = txtNumber.value;
            //  txtNumber.disabled="disabled";

             var nextnumber = httpRequest("../eqallocation/nextnumber","GET");
            esCode.value = nextnumber.escode;
            eqallocation.escode =  esCode.value;
            esCode.disabled = true;
            esCode.style.border = valid;
            // cusReg.value = nextnumber.regno;
            // customer.regno =  cusReg.value;
            // cusReg.disabled = true;
            // cusReg.style.border = valid;


            //
             setStyle(initial);
            // assignDate.style.border=valid;
            //  removeFile('flePhoto');
            //
            //  setStyle(initial);
            //  cmbEmployeestatus.style.border=valid;
            //  dteDOAssignment.style.border=valid;
            // txtNumber.style.border=valid;
            //
            disableButtons(false, true, true);
        }

        function showCards(){


            var getVal = JSON.parse(cmbestype.value).name;
            console.log(getVal);

            if (getVal == "EQ-Assign") {
                ESassign.style.display = "block";
                ESremove.style.display = "none";
                EStin.style.display = "none";
                EStout.style.display = "none";
                selectAssign();
            } else if (getVal == "EQ-Remove Completed" || getVal == "EQ-Remove Useless" || getVal == "EQ-Remove Damage") {
                ESassign.style.display = "none";
                ESremove.style.display = "block";
                EStin.style.display = "none";
                EStout.style.display = "none";
                selectremove();
            }
            else if (getVal == "EQ-Transfer Out") {
                ESassign.style.display = "block";
                ESremove.style.display = "none";
                EStin.style.display = "none";
                EStout.style.display = "none";
                // ESassign.style.display = "none";
                // ESremove.style.display = "none";
                // EStin.style.display = "none";
                // EStout.style.display = "block";

                swal({
                    title: "This page is only view data for after the Transfer In....!",
                    text: "\n\n",
                    icon: "warning", button: false,timer:1500
                });
                //selecttransferout();
                loadForm();


            }
            else if (getVal == "EQ-Transfer In") {
                ESassign.style.display = "none";
                ESremove.style.display = "none";
                EStin.style.display = "block";
                EStout.style.display = "none";
                selecttransferin();
            }


        }

        function setStyle(style) {

            esDescription.style.border = style;

           //assign
            cmbestype.style.border = style;
            $('.Asrescmbsearch .select2-selection').css('border',style);
           // cmbResNo.style.border = style;
            //cmbAeqcatrgory.style.border = style;
            $('.Aseqcmbsearch .select2-selection').css('border',style);
            Assignavailableqyt.style.border = style;
            txtInventoryqty.style.border = style;
            Assignqty.style.border = style;
            Fassignqty.style.border = style;
            assignDatetime.style.border = style;
            expectedRDatetime.style.border = style;


            //remove
            //ResRemoveNo.style.border = style;
            $('.Resremcmbsearch .select2-selection').css('border',style);
            //cmbReqcatrgory.style.border = style;
            $('.Reeqcmbsearch .select2-selection').css('border',style);
            RemoveAvailableqyt.style.border = style;
            Removeqty.style.border = style;
            Fremoveqty.style.border = style;
            removeDatetime.style.border = style;

            //tin
            //SenderResNoTin.style.border = style;
            $('.Tinrescmbsearch .select2-selection').css('border',style);
            //ReciveResNoTin.style.border = style;
            $('.TinFrescmbsearch .select2-selection').css('border',style);
           // cmbTineqcatrgory.style.border = style;
            $('.Tineqcmbsearch .select2-selection').css('border',style);
            SenderAvailableqyt.style.border = style;
            ReciveAvailableqyt.style.border = style;
            Tinqyt.style.border = style;
            Ftoutsenderqyt.style.border = style;
            Ftinreciveqyt.style.border = style;
            TinDatetime.style.border = style;

            TinexpectrDatetime.style.border = style;

            //tout
            cmbFromResNoTout.style.border = style;
            cmbToresNoTout.style.border = style;
            cmbTouteqcatrgory.style.border = style;
            FromResAvailableqyt.style.border = style;
            ToResAvailableqyt.style.border = style;
            Toutqyt.style.border = style;
            FFromqyt.style.border = style;
            Ftoqyt.style.border = style;
            ToutDatetime.style.border = style;


        }

        function disableButtons(add, upd, del) {

            if (add || !privilages.add) {
                btnAdd.setAttribute("disabled", "disabled");
                $('#btnAdd').css('cursor','not-allowed');
            }
            else {
                btnAdd.removeAttribute("disabled");
                $('#btnAdd').css('cursor','pointer')
            }

            if (upd || !privilages.update) {
                btnUpdate.setAttribute("disabled", "disabled");
                $('#btnUpdate').css('cursor','not-allowed');
            }
            else {
                btnUpdate.removeAttribute("disabled");
                $('#btnUpdate').css('cursor','pointer');
             }

            if (!privilages.update) {
                $(".buttonup").prop('disabled', true);
                $(".buttonup").css('cursor','not-allowed');
            }
            else {
                $(".buttonup").removeAttr("disabled");
                $(".buttonup").css('cursor','pointer');
            }

            if (!privilages.delete){
                $(".buttondel").prop('disabled', true);
                $(".buttondel").css('cursor','not-allowed');
            }
            else {
                $(".buttondel").removeAttr("disabled");
                $(".buttondel").css('cursor','pointer');
            }

            for(index in eqallocations){
                tblEsallocation.children[1].children[index].lastChild.children[0].disabled = true;
                tblEsallocation.children[1].children[index].lastChild.children[0].style.cursor = "not-allowed";
            }


            // select deleted data row
            for(index in eqallocations){
                if(eqallocations[index].esstatus_id.name =="Deleted"){
                    tblEsallocation.children[1].children[index].style.color = "#f00";
                    tblEsallocation.children[1].children[index].style.border = "2px solid red";
                    tblEsallocation.children[1].children[index].lastChild.children[0].disabled = true;
                    tblEsallocation.children[1].children[index].lastChild.children[0].style.cursor = "not-allowed";
                    tblEsallocation.children[1].children[index].lastChild.children[1].disabled = true;
                    tblEsallocation.children[1].children[index].lastChild.children[1].style.cursor = "not-allowed";

                }
                // else if(eqallocations[index].estype_id.name =="EQ-Transfer Out"){
                //
                //     tblEsallocation.children[1].children[index].lastChild.children[2].disabled = true;
                //     tblEsallocation.children[1].children[index].lastChild.children[2].style.cursor = "not-allowed";
                // }
            }

        }

        function nicTestFieldBinder(field,pattern,ob,prop,oldob) {
            var regpattern = new RegExp(pattern);

            var val = field.value.trim();
            if (regpattern.test(val)) {
                    var dobyear, gendername,noOfDays = "";
                    if (val.length===10){
                        dobyear = "19"+val.substring(0,2);
                        noOfDays = val.substring(2,5);
                    }else{
                         dobyear = val.substring(0,4);
                         noOfDays = val.substring(4,7);
                    }
                    birthdate = new Date(dobyear+"-"+"01-01");
                if (noOfDays>=1 && noOfDays<=366){
                    gendername =  "Male";
                }else if(noOfDays>=501 && noOfDays<=866){
                    noOfDays = noOfDays-500;
                    gendername =  "Female";
                }
                if(gendername=== "Female" ||  gendername ===  "Male"){
                    fillCombo(cmbGender,"Select Gender",genders,"name",gendername);
                    birthdate.setDate(birthdate.getDate()+parseInt(noOfDays)-1)
                    dteDOBirth.value = birthdate.getFullYear()+"-"+getmonthdate(birthdate);

                    employee.genderId = JSON.parse(cmbGender.value);
                    employee.dobirth = dteDOBirth.value;
                    employee.nic = field.value;
                    if (oldemployee != null && oldemployee.nic != employee.nic){
                        field.style.border=updated;}else {field.style.border=valid;}
                    if (oldemployee != null && oldemployee.dobirth != employee.dobirth){
                        dteDOBirth.style.border=updated;}else {dteDOBirth.style.border=valid;}
                    if (oldemployee != null && oldemployee.genderId.name != employee.genderId.name){
                        cmbGender.style.border=updated;}else {cmbGender.style.border=valid;}
                    dteDOBirthCH();
                }else{
                    field.style.border = invalid;
                    cmbGender.style.border = initial;
                    dteDOBirth.style.border = initial;
                    fillCombo(cmbGender,"Select Gender",genders,"name","");
                    dteDOBirth.value = "";
                        employee.nic = null;
                }
            }else{
                field.style.border = invalid;
                employee.nic = null;
            }

        }

        function nicFieldBinder(field,pattern,ob,prop,oldob) {
            var regpattern = new RegExp(pattern);
    
            var val = field.value.trim();
            if (regpattern.test(val)) {
                employee.nic = val;
                if (oldemployee != null && oldemployee.nic != employee.nic){
                    field.style.border = updated;
                    gender = generate(val,field,cmbGender,dteDOBirth);
                   fillCombo(cmbGender,"Select Gender",genders,"name",gender);
                   cmbGender.style.border=updated;
                    dteDOBirth.style.border=updated;
                    employee.genderId = JSON.parse(cmbGender.value);
                    employee.dobirth = dteDOBirth.value;
                }else{
                    field.style.border = valid;
                    gender =  generate(val,field,cmbGender,dteDOBirth);
                    fillCombo(cmbGender,"Select Gender",genders,"name",gender);
                    cmbGender.style.border=valid;
                    dteDOBirth.style.border=valid;
                    employee.genderId = JSON.parse(cmbGender.value);
                    employee.dobirth = dteDOBirth.value;
                }
            }
            else {
                field.style.border = invalid;
                employee.nic = null;
            }
        }

        function dteDOBirthCH() {
            var today = new Date();
            var birthday = new Date(dteDOBirth.value);
            if((today.getTime()-birthday.getTime())>(18*365*24*3600*1000)) {
                employee.dobirth = dteDOBirth.value;
                dteDOBirth.style.border = valid;
            }
            else
            {
                employee.dobirth = null;
                dteDOBirth.style.border = invalid;
            }
        }

        function getErrors() {

            var errors = "";
            addvalue = "";

            if(eqallocation.escode ==null){
                esCode.style.border = invalid;
                errors = errors + "\n" + "ES Code not Entered";
            }else addvalue = 1;





            if (eqallocation.estype_id == null) {
                cmbestype.style.border = invalid;
                errors = errors + "\n" + "ES Type Not Selected";

            }else {

                addvalue = 1;

                if (eqallocation.estype_id.name == "EQ-Assign") {
                    if (eqallocation.fromreservation_id == null) {
                        errors = errors + "\n" + "ES Assign Reservation Not Entered";
                        //cmbResNo.style.border = invalid;
                        $('.Asrescmbsearch .select2-selection').css('border',invalid);
                    } else addvalue = 1;
                    if (eqallocation.equipment_id == null) {
                        errors = errors + "\n" + "Equipment Name Not Selected";
                       // cmbAeqcatrgory.style.border = invalid;
                        $('.Aseqcmbsearch .select2-selection').css('border',invalid);

                    } else addvalue = 1;

                    if (Assignavailableqyt.value == "") {
                        errors = errors + "\n" + "Available Quantity Not Entered";
                        Assignavailableqyt.style.border = invalid;
                    } else addvalue = 1;
                    if (eqallocation.assignqty == null) {
                        Assignqty.style.border = invalid;
                        errors = errors + "\n" + "Assign Quantity Not Entered";
                    } else addvalue = 1;
                    if (eqallocation.assigndatetime == null) {
                        assignDatetime.style.border = invalid;
                        errors = errors + "\n" + "Assign Date & Time Not Selected";
                    } else addvalue = 1;

                    if (eqallocation.expectedremovedatetime == null) {
                        expectedRDatetime.style.border = invalid;
                        errors = errors + "\n" + "Expected remove date &time Not Selected";
                    } else addvalue = 1;


                    if (eqallocation.finalavqty == null) {
                        Fassignqty.style.border = invalid;
                        errors = errors + "\n" + "Final Quantity Not Entered";
                    } else addvalue = 1;
                } else if (eqallocation.estype_id.name == "EQ-Remove Completed" ||eqallocation.estype_id.name == "EQ-Remove Useless" ||eqallocation.estype_id.name == "EQ-Remove Damage") {
                    if (eqallocation.fromreservation_id == null) {
                        $('.Resremcmbsearch .select2-selection').css('border',invalid);
                        //ResRemoveNo.style.border = invalid;
                        errors = errors + "\n" + "ES Remove Reservation Not Entered";
                    } else addvalue = 1;

                    if (eqallocation.equipment_id == null) {
                        //cmbReqcatrgory.style.border = invalid;
                        $('.Reeqcmbsearch .select2-selection').css('border',invalid);
                        errors = errors + "\n" + "Equipment Name Not Selected";
                    } else addvalue = 1;

                    if (RemoveAvailableqyt.value == "") {
                        RemoveAvailableqyt.style.border = invalid;
                        errors = errors + "\n" + "Removed Available Quantity  Not Entered";
                    } else addvalue = 1;
                    if (eqallocation.removeqty == null) {
                        Removeqty.style.border = invalid;
                        errors = errors + "\n" + "Removed Quantity  Not Entered";
                    } else addvalue = 1;
                    if (eqallocation.removedatetime == null) {
                        removeDatetime.style.border = invalid;
                        errors = errors + "\n" + "Removed Date & Time  Not Selected";
                    } else addvalue = 1;
                    if (eqallocation.finalavqty == null) {
                        Fremoveqty.style.border = invalid;
                        errors = errors + "\n" + "Final Quantity  Not Entered";
                    } else addvalue = 1;
                } else if (eqallocation.estype_id.name == "EQ-Transfer In") {
                    if (eqallocation.toreservation_id == null) {
                        //ReciveResNoTin.style.border = invalid;
                        $('.TinFrescmbsearch .select2-selection').css('border',invalid);
                        errors = errors + "\n" + "To Reservation Not Entered";
                    } else addvalue = 1;
                    if (eqallocation.equipment_id == null) {
                        //cmbTineqcatrgory.style.border = invalid;
                        $('.Tineqcmbsearch .select2-selection').css('border',invalid);

                        errors = errors + "\n" + "Equipment Name Not Selected";
                    } else addvalue = 1;
                    if (ReciveAvailableqyt.value == "") {
                        ReciveAvailableqyt.style.border = invalid;
                        errors = errors + "\n" + "To Reservation's available Quantity Not Entered";
                    } else addvalue = 1;
                    if (eqallocation.fromreservation_id == null) {
                        //SenderResNoTin.style.border = invalid;
                        $('.Tinrescmbsearch .select2-selection').css('border',invalid);
                        errors = errors + "\n" + "From Reservation Not Selected";
                    } else addvalue = 1;
                    if (SenderAvailableqyt.value == "") {
                        SenderAvailableqyt.style.border = invalid;
                        errors = errors + "\n" + "To Sender's available Quantity Not Entered";
                    } else addvalue = 1;
                    if (eqallocation.transferinqty == null) {
                        Tinqyt.style.border = invalid;
                        errors = errors + "\n" + "Transfer Quantity Not Entered";
                    } else addvalue = 1;
                    if (eqallocation.transferindatetime == null) {
                        TinDatetime.style.border = invalid;
                        errors = errors + "\n" + "Removed Date & Time  Not Selected";
                    } else addvalue = 1;

                    if (eqallocation.expectedremovedatetime == null) {
                        TinexpectrDatetime.style.border = invalid;
                        errors = errors + "\n" + "Expected remove Date & Time  Not Selected";
                    } else addvalue = 1;


                    if (eqallocation.finalavqty == null) {
                        Ftinreciveqyt.style.border = invalid;
                        errors = errors + "\n" + "To Reservation's Final Quantity Not Entered";
                    } else addvalue = 1;
                    if (eqallocation.transfertofinalqty == "") {
                        Ftoutsenderqyt.style.border = invalid;
                        errors = errors + "\n" + "Final Quantity of From Reservation Not Entered";
                    } else addvalue = 1;
                    //final qty sender's reservation here


                }
                else if (eqallocation.estype_id.name == "EQ-Transfer Out") {
                    if (eqallocation.fromreservation_id == null) {
                        cmbFromResNoTout.style.border = invalid;
                        errors = errors + "\n" + "From Reservation Not Selected";
                    } else addvalue = 1;
                    if (eqallocation.equipment_id == null) {
                        cmbTouteqcatrgory.style.border = invalid;
                        errors = errors + "\n" + "Equipment Name Not Selected";
                    } else addvalue = 1;
                    if (FromResAvailableqyt.value == "") {
                        FromResAvailableqyt.style.border = invalid;
                        errors = errors + "\n" + "From Reservation's Available Quantity Not Entered";
                    } else addvalue = 1;
                    if (eqallocation.toreservation_id == null) {
                        cmbToresNoTout.style.border = invalid;
                        errors = errors + "\n" + "To Reservation's Not Selected";
                    } else addvalue = 1;
                    if (eqallocation.availabletoqty == null) {
                        ToResAvailableqyt.style.border = invalid;
                        errors = errors + "\n" + "To Reservation's Available Quantity Not Entered";
                    } else addvalue = 1;
                    if (eqallocation.transferoutqty == null) {
                        Toutqyt.style.border = invalid;
                        errors = errors + "\n" + "Transfer Out Quantity Not Entered";
                    } else addvalue = 1;
                    if (eqallocation.transferoutdatetime == null) {
                        ToutDatetime.style.border = invalid;
                        errors = errors + "\n" + "Transfer Out Date & Time Not Selected";
                    } else addvalue = 1;
                    if (eqallocation.availablefromqty == null) {
                        FFromqyt.style.border = invalid;
                        errors = errors + "\n" + "Final Quantity of From Reservation Not Entered";
                    } else addvalue = 1;
                    if (eqallocation.finalavqty == null) {
                        Ftoqyt.style.border = invalid;
                        errors = errors + "\n" + "Final Quantity of To Reservation Not Entered";
                    } else addvalue = 1;


                }

            }//typecheck

            if (eqallocation.esstatus_id == null){
                cmbesStatus.style.border = invalid;
                errors = errors + "\n" + "ES Status Not Selected";
            }
            else  addvalue = 1;


            if (eqallocation.addeddatetime == null){
                assignDate.style.border = invalid;
                errors = errors + "\n" + "ES Added Time Not Selected";
            }
            else  addvalue = 1;


            return errors;

        }

        function btnAddMC(){
            if(getErrors()==""){
                if(esDescription.value==""){
                    swal({
                        title: "Are you sure to continue...?",
                        text: "Form has some empty fields.....",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then((willDelete) => {
                        if (willDelete) {
                            savedata();
                        }
                    });

                }else{
                    savedata();
                }
            }else{
                swal({
                    title: "You have following errors",
                    text: "\n"+getErrors(),
                    icon: "error",
                    button: true,
                });

            }
        }
        
        function savedata() {

            if(eqallocation.estype_id.name=="EQ-Assign"){


                swal({

                    title: "Are you sure to add following ES Assign...?" ,
                    text :"\nES Code : " + eqallocation.escode+
                        "\nAssign Reservation Code : " + eqallocation.fromreservation_id.reservationcode +
                        "\nES Type : " + eqallocation.estype_id.name+
                        "\nEquipment Name : " + eqallocation.equipment_id.equipmentname +
                        "\nAvailable Quantity : " + Assignavailableqyt.value +
                        "\nAssign Quantity : " + eqallocation.assignqty +
                        "\nAssign Date & Time : " + eqallocation.assigndatetime +
                        "\nFinal Qauntity : " + eqallocation.finalavqty +

                        "\nAdded Date & Time : " + eqallocation.addeddatetime +
                        "\nExpected remove Date & Time : " + eqallocation.expectedremovedatetime +
                        "\nES Status : " + eqallocation.esstatus_id.name +
                        "\nAdded By : " + eqallocation.employee_id.callingname ,


                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        var response = httpRequest("/eqallocation", "POST", eqallocation);
                        if (response == "0") {
                            swal({
                                position: 'center',
                                icon: 'success',
                                title: 'Your work has been Done \n Save SuccessFully..!',
                                text: '\n',
                                button: false,
                                timer: 1200
                            });
                            activepage = 1;
                            activerowno = 1;
                            loadSearchedTable();
                            loadForm();
                            changeTab('table');
                        }
                        else swal({
                            title: 'Save not Success... , You have following errors', icon: "error",
                            text: '\n ' + response,
                            button: true
                        });
                    }
                });



            }else if(eqallocation.estype_id.name=="EQ-Remove Completed" || eqallocation.estype_id.name=="EQ-Remove Useless" || eqallocation.estype_id.name=="EQ-Remove Damage"){

                swal({

                    title: "Are you sure to add following ES Remove...?" ,
                    text :"\nES Code : " + eqallocation.escode+
                        "\nRemove Reservation Code : " + eqallocation.fromreservation_id.reservationcode +
                        "\nES Type : " + eqallocation.estype_id.name+
                        "\nEquipment Name : " + eqallocation.equipment_id.equipmentname +
                        "\nAvailable Quantity : " + RemoveAvailableqyt.value +
                        "\nRemove Quantity : " + eqallocation.removeqty +
                        "\nRemove Date & Time : " + eqallocation.removedatetime +
                        "\nFinal Qauntity : " + eqallocation.finalavqty +

                        "\nAdded Date & Time : " + eqallocation.addeddatetime +
                        "\nES Status : " + eqallocation.esstatus_id.name +
                        "\nAdded By : " + eqallocation.employee_id.callingname ,


                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        var response = httpRequest("/eqallocation", "POST", eqallocation);
                        if (response == "0") {
                            swal({
                                position: 'center',
                                icon: 'success',
                                title: 'Your work has been Done \n Save SuccessFully..!',
                                text: '\n',
                                button: false,
                                timer: 1200
                            });
                            activepage = 1;
                            activerowno = 1;
                            loadSearchedTable();
                            loadForm();
                            changeTab('table');
                        }
                        else swal({
                            title: 'Save not Success... , You have following errors', icon: "error",
                            text: '\n ' + response,
                            button: true
                        });
                    }
                });

            }else if(eqallocation.estype_id.name=="EQ-Transfer In"){

                swal({

                    title: "Are you sure to add following ES Transfer In...?" ,
                    text :"\nES Code : " + eqallocation.escode+
                        "\nES Type : " + eqallocation.estype_id.name+
                        "\nFrom Reservation Code : " + eqallocation.toreservation_id.reservationcode +
                        "\nEquipment Name : " + eqallocation.equipment_id.equipmentname +
                        "\nAvailable Quantity of From Reservation : " + ReciveAvailableqyt.value +
                        "\nTo Reservation Code: " + eqallocation.fromreservation_id.reservationcode +
                        "\nAvailable Quantity of To Reservation : " + SenderAvailableqyt.value +
                        "\nTrnasfer In Qauntity : " + eqallocation.transferinqty +
                        "\nTrnasfer In Date & Time : " + eqallocation.transferindatetime +
                        "\nFinal Quantity of From Reservation : " + eqallocation.finalavqty +
                        "\nFinal Quantity of To Reservation : " + eqallocation.transfertofinalqty +

                        "\nExpected remove Date & Time : " + eqallocation.expectedremovedatetime +
                        "\nAdded Date & Time : " + eqallocation.addeddatetime +
                        "\nES Status : " + eqallocation.esstatus_id.name +
                        "\nAdded By : " + eqallocation.employee_id.callingname ,


                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        var response = httpRequest("/eqallocation", "POST", eqallocation);
                        if (response == "0") {
                            swal({
                                position: 'center',
                                icon: 'success',
                                title: 'Your work has been Done \n Save SuccessFully..!',
                                text: '\n',
                                button: false,
                                timer: 1200
                            });
                            activepage = 1;
                            activerowno = 1;
                            loadSearchedTable();
                            loadForm();
                            changeTab('table');
                        }
                        else swal({
                            title: 'Save not Success... , You have following errors', icon: "error",
                            text: '\n ' + response,
                            button: true
                        });
                    }
                });


            }
            else if(eqallocation.estype_id.name =="EQ-Transfer Out"){


                swal({

                    title: "Are you sure to add following ES Transfer Out...?" ,
                    text :"\nES Code : " + eqallocation.escode+
                        "\nES Type : " + eqallocation.estype_id.name+
                        "\nFrom Reservation Code : " + eqallocation.fromreservation_id.reservationcode +
                        "\nEquipment Name : " + eqallocation.equipment_id.equipmentname +
                        "\nAvailable Quantity of To Reservation : " + eqallocation.availabletoqty +
                        "\nFrom Reservation Code: " + eqallocation.fromreservation_id.reservationcode +
                        "\nAvailable Quantity of From Reservation : " +eqallocation.availablefromqty +
                        "\nTrnasfer Out Qauntity : " + eqallocation.transferoutqty +
                        "\nTrnasfer Out Date & Time : " + eqallocation.transferoutdatetime +
                        "\nFinal Quantity of From Reservation : " + eqallocation.finalavqty +
                        "\nFinal Quantity of To Reservation : " +  eqallocation.transfertofinalqty+

                        "\nAdded Date & Time : " + eqallocation.addeddatetime +
                        "\nES Status : " + eqallocation.esstatus_id.name +
                        "\nAdded By : " + eqallocation.employee_id.callingname ,


                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        var response = httpRequest("/eqallocation", "POST", eqallocation);
                        if (response == "0") {
                            swal({
                                position: 'center',
                                icon: 'success',
                                title: 'Your work has been Done \n Save SuccessFully..!',
                                text: '\n',
                                button: false,
                                timer: 1200
                            });
                            activepage = 1;
                            activerowno = 1;
                            loadSearchedTable();
                            loadForm();
                            changeTab('table');
                        }
                        else swal({
                            title: 'Save not Success... , You have following errors', icon: "error",
                            text: '\n ' + response,
                            button: true
                        });
                    }
                });

            }


        }

        function btnClearMC() {
            //Get Cofirmation from the User window.confirm();
            checkerr = getErrors();

            if(oldallocation == null && addvalue == ""){
                loadForm();
            }else{
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        loadForm();
                    }

                });
            }

        }

        function fillForm(allo,rowno){
            activerowno = rowno;

            if (oldallocation==null) {
                filldata(allo);
            } else {
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        filldata(allo);
                    }

                });
            }

        }


        function filldata(allo) {
            clearSelection(tblEsallocation);
            selectRow(tblEsallocation,activerowno,active);

            eqallocation  = JSON.parse(JSON.stringify(allo));
            oldallocation = JSON.parse(JSON.stringify(allo));

            esCode.value = eqallocation.escode;
            esCode.disabled = true;

            fillCombo(cmbestype,"Select the EQ Shiftment Type",eqstype,"name",eqallocation.estype_id.name);
            fillCombo(cmbesStatus,"Select the EQ Shiftment Status",eqsstatus,"name",eqallocation.esstatus_id.name);

            cmbestype.disabled = true;

            if(eqallocation.estype_id.name == "Deleted"){
                cmbesStatus.disabled = true;
            }else{
                cmbesStatus.disabled = false;
            }


            if(eqallocation.estype_id.name == "EQ-Assign"){

                ESassign.style.display = "block";
                ESremove.style.display = "none";
                EStin.style.display = "none";
                //EStout.style.display = "none";

                //assign
                fillCombo(cmbResNo,"Select the Reservation",reservations,"reservationcode",eqallocation.fromreservation_id.reservationcode);
                cmbResNo.disabled = true;
                fillCombo(cmbAeqcatrgory,"Select the Equipment",equipments,"equipmentname",eqallocation.equipment_id.equipmentname);
                cmbAeqcatrgory.disabled = true;


                Assignqty.value = eqallocation.assignqty;
                Assignqty.style.border = valid;
                Assignqty.disabled = true;

                Fassignqty.value = eqallocation.finalavqty;
                Fassignqty.style.border = valid;

                Assignavailableqyt.value = parseInt(eqallocation.finalavqty) - parseInt(eqallocation.assignqty);
                Assignavailableqyt.style.border = valid;


                assignDatetime.value = eqallocation.assigndatetime;
                assignDatetime.disabled = true;
                assignDatetime.style.border = valid;

                avqtyinventory = httpRequest("eqpinventory/avqty?equipmentid="+eqallocation.equipment_id.id,"GET");
                console.log("AVINVENTORY",avqtyinventory)
               txtInventoryqty.value = avqtyinventory.availableqty;
               txtInventoryqty.style.border = valid;


            }

            else if(eqallocation.estype_id.name == "EQ-Remove Completed" ||eqallocation.estype_id.name == "EQ-Remove Useless" || eqallocation.estype_id.name == "EQ-Remove Damage"){

                ESassign.style.display = "none";
                ESremove.style.display = "block";
                EStin.style.display = "none";
                //EStout.style.display = "none";


                fillCombo(ResRemoveNo,"Select the Reservation",reservations,"reservationcode",eqallocation.fromreservation_id.reservationcode);
                ResRemoveNo.disabled = true;
                fillCombo(cmbReqcatrgory,"Select the Equipment",equipments,"equipmentname",eqallocation.equipment_id.equipmentname);
                cmbReqcatrgory.disabled = true;

                Removeqty.value = eqallocation.removeqty;
                Removeqty.style.border = valid;
                Removeqty.disabled = true;

                Fremoveqty.value = eqallocation.finalavqty;
                Fremoveqty.style.border = valid;

                RemoveAvailableqyt.value = parseInt(eqallocation.finalavqty) + parseInt(eqallocation.removeqty);
                RemoveAvailableqyt.style.border = valid;

                removeDatetime.value = eqallocation.removedatetime;
                removeDatetime.disabled = true;
                removeDatetime.style.border = valid;




            } else if(eqallocation.estype_id.name == "EQ-Transfer In"){
                ESassign.style.display = "none";
                ESremove.style.display = "none";
                EStin.style.display = "block";
                //EStout.style.display = "none";

                fillCombo(SenderResNoTin,"Select the Reservation",reservations,"reservationcode",eqallocation.fromreservation_id.reservationcode);
                SenderResNoTin.disabled = true;
                fillCombo(ReciveResNoTin,"Select the Reservation",reservations,"reservationcode",eqallocation.toreservation_id.reservationcode);
                ReciveResNoTin.disabled = true;

                fillCombo(cmbTineqcatrgory,"Select the Equipment",equipments,"equipmentname",eqallocation.equipment_id.equipmentname);
                cmbTineqcatrgory.disabled = true;

                fromreservationbytinfinalqty = httpRequest("/eqallocation/finalqty?fromreservationid="+eqallocation.toreservation_id.id+"&equipmentid="+eqallocation.equipment_id.id,"GET");
                //var fromavqty =parseInt(eqallocation.transfertofinalqty) +parseInt(eqallocation.transferinqty);


                TinDatetime.value = eqallocation.transferindatetime;
                TinDatetime.style.border = valid;
                TinDatetime.disabled = true;

                if(eqallocation.availabletoqty == null){
                    SenderAvailableqyt.value = 0;
                    SenderAvailableqyt.style.border = valid;
                }else{
                    SenderAvailableqyt.value = eqallocation.availablefromqty;

                    SenderAvailableqyt.style.border = valid;
                }

                ReciveAvailableqyt.value = eqallocation.availabletoqty;
                ReciveAvailableqyt.style.border = valid;


                toeservationbytinfinalqty = httpRequest("/eqallocation/finalqty?fromreservationid="+eqallocation.fromreservation_id.id+"&equipmentid="+eqallocation.equipment_id.id,"GET");



                Tinqyt.value = eqallocation.transferinqty;
                Tinqyt.style.border = valid;
                Tinqyt.disabled = true;



                //Ftoutsenderqyt.value = eqallocation.finalavqty;
               Ftinreciveqyt.value = eqallocation.finalavqty;
                Ftinreciveqyt.style.border = valid;



                //Ftinreciveqyt.value = eqallocation.transfertofinalqty;
                Ftoutsenderqyt.value  = eqallocation.transfertofinalqty;
                Ftoutsenderqyt.style.border = valid;



                //ReciveAvailableqyt.value  =  parseInt(Ftinreciveqyt.value) - (parseInt( SenderAvailableqyt.value)-parseInt( Ftoutsenderqyt.value));

                //EStout.style.display = "none";
                //selecttransferin();
            }
            else if(eqallocation.estype_id.name == "EQ-Transfer Out"){

                ESassign.style.display = "none";
                ESremove.style.display = "none";
                EStin.style.display = "none";
                EStout.style.display = "block";

                console.log("dbvongdonsbsdbl")
                fillCombo(cmbFromResNoTout,"Select the Reservation",reservations,"reservationcode",eqallocation.fromreservation_id.reservationcode);
                cmbFromResNoTout.disabled = true;


                fillCombo(cmbToresNoTout,"Select the Reservation",reservations,"reservationcode", eqallocation.toreservation_id.reservationcode);
                cmbToresNoTout.disabled = true;

                fillCombo(cmbTouteqcatrgory,"Select the Equipment",equipments,"equipmentname",  eqallocation.equipment_id.equipmentname);
                cmbTouteqcatrgory.disabled = true;


                Toutqyt.value = eqallocation.transferoutqty;
                Toutqyt.style.border = valid;
                Toutqyt.disabled = true;



                FromResAvailableqyt.value = eqallocation.availablefromqty;
               // FromResAvailableqyt.value = eqallocation.availabletoqty;
                FromResAvailableqyt.style.border = valid;

                ToResAvailableqyt.value = eqallocation.availabletoqty
                //ToResAvailableqyt.value = eqallocation.availablefromqty;
                ToResAvailableqyt.style.border = valid;


                Ftoqyt.value = eqallocation.transfertofinalqty;
                //FFromqyt.value = eqallocation.transfertofinalqty;
                FFromqyt.style.border = valid;

                FFromqyt.value = eqallocation.finalavqty;
                //Ftoqyt.value = eqallocation.finalavqty;
                Ftoqyt.style.border = valid;



                ToutDatetime.value = eqallocation.transferoutdatetime;
                ToutDatetime.disabled = true;
                ToutDatetime.style.border = valid;
                // FromResAvailableqyt.value = parseInt(eqallocation.transfertofinalqty)-parseInt(eqallocation.transferoutqty);
                // FromResAvailableqyt.style.border = valid;

                // FFromqyt.value = parseInt(eqallocation.finalavqty)- parseInt(eqallocation.transferoutqty);
                // Ftoqyt.value = parseInt(eqallocation.transfertofinalqty) + parseInt(eqallocation.transferoutqty);

            }


            //setDefaultFile('flePhoto', employee.photo);

            disableButtons(true, false, false);
            //setStyle(valid);
            changeTab('form');
        }

        function getUpdates() {

            var updates = "";

            if(eqallocation!=null && oldallocation!=null) {

                if(eqallocation.esstatus_id.name != oldallocation.esstatus_id.name){
                    updates = updates + "\nAssign Reservation Code is Changed.." + oldallocation.esstatus_id.name +" into " +eqallocation.esstatus_id.name;

                }


                if(eqallocation.estype_id.name == "EQ-Assign"){


                     if(eqallocation.fromreservation_id.reservationcode !=oldallocation.fromreservation_id.reservationcode){
                         updates = updates + "\nAssign Reservation Code is Changed.." + oldallocation.fromreservation_id.reservationcode +" into " +eqallocation.fromreservation_id.reservationcode  ;

                     }
                    if(eqallocation.equipment_id.equipmentname !=oldallocation.equipment_id.equipmentname){
                        updates = updates + "\nEquipment  is Changed.." + oldallocation.equipment_id.equipmentname +" into " +eqallocation.equipment_id.equipmentname  ;

                    }
                    if(eqallocation.assignqty !=oldallocation.assignqty){
                        updates = updates + "\nAssign Quantity  is Changed.." + oldallocation.assignqty +" into " +eqallocation.assignqty;

                    }
                    if(eqallocation.finalavqty !=oldallocation.finalavqty){
                        updates = updates + "\nFinal Quantity  is Changed.." + oldallocation.finalavqty +" into " +eqallocation.finalavqty;

                    }
                    if(eqallocation.assigndatetime !=oldallocation.assigndatetime){
                        updates = updates + "\nAssign Date & Time  is Changed.." + oldallocation.assigndatetime +" into " +eqallocation.assigndatetime;

                    }

                }else if(eqallocation.estype_id.name == "EQ-Remove Completed" || eqallocation.estype_id.name == "EQ-Remove Useless" || eqallocation.estype_id.name == "EQ-Remove Damage"){

                    if(eqallocation.fromreservation_id.reservationcode !=oldallocation.fromreservation_id.reservationcode){
                        updates = updates + "\nFrom Reservation Code is Changed.." + oldallocation.fromreservation_id.reservationcode +" into " +eqallocation.fromreservation_id.reservationcode  ;

                    }
                    if(eqallocation.equipment_id.equipmentname !=oldallocation.equipment_id.equipmentname){
                        updates = updates + "\nEquipment  is Changed.." + oldallocation.equipment_id.equipmentname +" into " +eqallocation.equipment_id.equipmentname  ;

                    }
                    if(eqallocation.removeqty !=oldallocation.removeqty){
                        updates = updates + "\nRemove Quantity  is Changed.." + oldallocation.removeqty +" into " +eqallocation.removeqty;

                    }
                    if(eqallocation.finalavqty !=oldallocation.finalavqty){
                        updates = updates + "\nFinal Quantity  is Changed.." + oldallocation.finalavqty +" into " +eqallocation.finalavqty;

                    }
                    if(eqallocation.removedatetime !=oldallocation.removedatetime){
                        updates = updates + "\nRemove Date & Time  is Changed.." + oldallocation.removedatetime +" into " +eqallocation.removedatetime;

                    }


                }else if(eqallocation.estype_id.name == "EQ-Transfer In"){
                    if(eqallocation.toreservation_id.reservationcode != oldallocation.toreservation_id.reservationcode){
                        updates = updates + "\nFrom Reservation Code is Changed.." + oldallocation.toreservation_id.reservationcode +" into " +eqallocation.toreservation_id.reservationcode  ;

                    }

                    if(eqallocation.fromreservation_id.reservationcode != oldallocation.fromreservation_id.reservationcode){
                        updates = updates + "\nTo Reservation Code is Changed.." + oldallocation.fromreservation_id.reservationcode +" into " +eqallocation.fromreservation_id.reservationcode  ;

                    }

                    if(eqallocation.equipment_id.equipmentname != oldallocation.equipment_id.equipmentname){
                        updates = updates + "\nEquipment Name is Changed.." + oldallocation.equipment_id.equipmentname +" into " +eqallocation.equipment_id.equipmentname  ;

                    }
                    if(eqallocation.transferinqty != oldallocation.transferinqty){
                        updates = updates + "\nTransfer In Quantity is Changed.." + oldallocation.transferinqty +" into " +eqallocation.transferinqty;

                    }

                    if(eqallocation.transfertofinalqty != oldallocation.transfertofinalqty){
                        updates = updates + "\nFrom Reservation Final Quantity is Changed.." +  oldallocation.transfertofinalqty +" into " +eqallocation.transfertofinalqty;

                    }

                    if(eqallocation.finalavqty != oldallocation.finalavqty){
                        updates = updates + "\nTo Reservation Final Quantity is Change.." +   oldallocation.finalavqty +" into " +eqallocation.finalavqty ;

                    }
                    if(eqallocation.transferindatetime != oldallocation.transferindatetime){
                        updates = updates + "\nTransfer In Date & Time is Changed.." +   oldallocation.transferindatetime +" into " +eqallocation.transferindatetime ;

                    }

                }else if(eqallocation.estype_id.name == "EQ-Transfer Out"){

                    if(eqallocation.fromreservation_id.reservationcode != oldallocation.fromreservation_id.reservationcode){
                        updates = updates + "\nTo Reservation Code is Changed.." + oldallocation.fromreservation_id.reservationcode +" into " +eqallocation.fromreservation_id.reservationcode  ;

                    }

                    if(eqallocation.toreservation_id.reservationcode != oldallocation.toreservation_id.reservationcode){
                        updates = updates + "\nFrom Reservation Code is Changed.." + oldallocation.toreservation_id.reservationcode +" into " +eqallocation.toreservation_id.reservationcode  ;

                    }

                    if(eqallocation.equipment_id.equipmentname != oldallocation.equipment_id.equipmentname){
                        updates = updates + "\nEquipment Name is Changed.." + oldallocation.equipment_id.equipmentname +" into " +eqallocation.equipment_id.equipmentname  ;

                    }
                    if(eqallocation.transferoutqty != oldallocation.transferoutqty){
                        updates = updates + "\nTransfer Out Quantity is Changed.." + oldallocation.transferoutqty +" into " +eqallocation.transferoutqty;

                    }
                    if(eqallocation.finalavqty != oldallocation.finalavqty){
                        updates = updates + "\nTo Reservation Final Quantity is Change.." +   oldallocation.finalavqty +" into " +eqallocation.finalavqty ;

                    }

                    if(eqallocation.transfertofinalqty != oldallocation.transfertofinalqty){
                        updates = updates + "\nFrom Reservation Final Quantity is Changed.." +  oldallocation.transfertofinalqty +" into " +eqallocation.transfertofinalqty;

                    }

                    if(eqallocation.transferoutdatetime != oldallocation.transferoutdatetime){
                        updates = updates + "\nTransfer In Date & Time is Changed.." +   oldallocation.transferoutdatetime +" into " +eqallocation.transferoutdatetime ;

                    }



                }


            }

            return updates;

        }

        function btnUpdateMC() {
            var errors = getErrors();
            if (errors == "") {
                var updates = getUpdates();
                if (updates == "")
                    swal({
                    title: 'Nothing Updated..!',icon: "warning",
                    text: '\n',
                    button: false,
                    timer: 1200});
                else {
                    swal({
                        title: "Are you sure to update following Customer details...?",
                        text: "\n"+ updates,
                        icon: "warning", buttons: true, dangerMode: true,
                    })
                        .then((willDelete) => {
                        if (willDelete) {
                            var response = httpRequest("/eqallocation", "PUT", eqallocation);
                            if (response == "0") {
                                swal({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Your work has been Done \n Update SuccessFully..!',
                                    text: '\n',
                                    button: false,
                                    timer: 1200
                                });
                                loadSearchedTable();
                                loadForm();
                                changeTab('table');

                            }
                            else
                                swal({
                                    title: "Failed to add...!",icon: "error",
                                    text: 'You have following errors\n'+ response,
                                    buttons: true
                                });
                        }
                        });
                }
            }
            else
                swal({
                    title: 'You have following errors in your form',icon: "error",
                    text: '\n '+getErrors(),
                    button: true});

        }

        function btnDeleteMC(allo) {
            eqallocation = JSON.parse(JSON.stringify(allo));

            swal({
                title: "Are you sure to delete following customer...?",
                text: "\n ES Code : " + eqallocation.escode  +
                "\nES Type : " + eqallocation.estype_id.name,
                icon: "warning", buttons: true, dangerMode: true,
            }).then((willDelete)=> {
                if (willDelete) {
                    var responce = httpRequest("/eqallocation","DELETE",eqallocation);
                    if (responce==0) {
                        swal({
                            title: "Deleted Successfully....!",
                            text: "\n\n  Status change to delete",
                            icon: "success", button: false, timer: 1200,
                        });
                        loadSearchedTable();
                        loadForm();
                    } else {
                        swal({
                            title: "You have following erros....!",
                            text: "\n\n" + responce,
                            icon: "error", button: true,
                        });
                    }
                }
            });

       }

        function loadSearchedTable() {

            var searchtext = txtSearchName.value;

            var query ="&searchtext=";

            if(searchtext!="")
                query = "&searchtext=" + searchtext;
            //window.alert(query);
            loadTable(activepage, cmbPageSize.value, query);

            disableButtons(true, false, false);
        }

        function btnSearchMC(){
            activepage=1;
            loadSearchedTable();
        }

        function btnSearchClearMC(){
               loadView();
        }

       function btnPrintTableMC(customer) {

            var newwindow=window.open();
            formattab = tblCustomer.outerHTML;

           newwindow.document.write("" +
                "<html>" +
                "<head><style type='text/css'>.google-visualization-table-th {text-align: left;} .modifybutton{display: none} .isort{display: none}</style>" +
                "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/></head>" +
                "<body><div style='margin-top: 150px; '> <h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Customer Details :</span></h1></div>" +
                "<div>"+ formattab+"</div>"+
               "</body>" +
                "</html>");
           setTimeout(function () {newwindow.print(); newwindow.close();},100) ;
        }

        function sortTable(cind) {
            cindex = cind;

         var cprop = tblEmployee.firstChild.firstChild.children[cindex].getAttribute('property');

           if(cprop.indexOf('.') == -1) {
               employees.sort(
                   function (a, b) {
                       if (a[cprop] < b[cprop]) {
                           return -1;
                       } else if (a[cprop] > b[cprop]) {
                           return 1;
                       } else {
                           return 0;
                       }
                   }
               );
           }else {
               employees.sort(
                   function (a, b) {
                       if (a[cprop.substring(0,cprop.indexOf('.'))][cprop.substr(cprop.indexOf('.')+1)] < b[cprop.substring(0,cprop.indexOf('.'))][cprop.substr(cprop.indexOf('.')+1)]) {
                           return -1;
                       } else if (a[cprop.substring(0,cprop.indexOf('.'))][cprop.substr(cprop.indexOf('.')+1)] > b[cprop.substring(0,cprop.indexOf('.'))][cprop.substr(cprop.indexOf('.')+1)]) {
                           return 1;
                       } else {
                           return 0;
                       }
                   }
               );
           }
            fillTable('tblEmployee',employees,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblEmployee);
            loadForm();

            if(activerowno!="")selectRow(tblEmployee,activerowno,active);



        }

        function customerNICBinder(){

            var val = cusNIC.value.trim();


            if(val !=""){

                var regpattern = new RegExp('^(([0-9]{9}[vVxX])|([0-9]{12}))$');
                if(regpattern.test(val)){

                    var response = httpRequest("customer/bynic?nic="+val,"GET")
                    console.log(response);
                    if(response == ""){
                        customer.nic = val;
                        if(oldcustomer !=null && customer.nic != oldcustomer.nic){
                            cusNIC.style.border = updated;
                        }else{
                            cusNIC.style.border = valid;
                        }


                    }else{
                        swal({
                            title: "NIC All Ready Exist....!",
                            text: "\n\n",
                            icon: "warning", button: false,timer:1500
                        });
                    }

                }else{
                    cusNIC.style.border = invalid;
                    customer.nic = null;
                }
            }else{
                if(cusNIC.required){
                    cusNIC.style.border = invalid;
                }else{
                    cusNIC.style.border = initial;
                }
                customer.nic = null;
            }

        }