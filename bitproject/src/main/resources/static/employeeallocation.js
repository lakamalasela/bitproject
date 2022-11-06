

 

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

            lastype = httpRequest("../latype/list","GET");

            lastatus  = httpRequest("../lastatus/list","GET");

            employees = httpRequest("../employee/list","GET");

            laboremployee =  httpRequest("../employee/laboremp","GET");

            // equipments =  httpRequest("../equipment/list","GET");

            reservations = httpRequest("../reservation/list","GET");

            valid = "2px solid green";
            invalid = "2px solid red";
            initial = "2px solid #d6d6c2";
            updated = "2px solid #ff9900";
            active = "#90EE90";


            cmbaltype.addEventListener('change', showCards);

            //assignDatetime.addEventListener('change', getTime);

            //assignreservation
            //CmbassignRes.addEventListener('change',getassignlabor);
            //assign
            //Cmbassignemployee.addEventListener('change',getassignTimeandcurrentres);

            //remove
           // Cmbremoveeployee.addEventListener('change',getremovetime);

            //remove reservation select
            //CmbremoveRes.addEventListener('change',getremovelabor);


            //tin
            //CmbTinemployee.addEventListener('change',gettintimeandemployee);

            //CmbTinFromRes.addEventListener('change',getavlabor) all ready comment;

            //tout
            //CmbToutemployee.addEventListener('change',gettouttime);
            //CmbToutFromRes.addEventListener('change',gettoutAvfromres);

            //from and to rservation dupplicate tin
            //CmbTinToRes.addEventListener('change',checkdupplicatetinandavlabor);

            //from and to rservation dupplicate tout
            //CmbToutToRes.addEventListener('change',checkdupplicatetoutandavlabor);

            Alassign.style.display = "block";
            Alremove.style.display = "none";
            Altin.style.display = "none";
            Altout.style.display = "none";


            initialColor = "1px solid #ced4da";
            updatedColor = "2px Solid Blue";
            validColor = "2px Solid Green";
            invalidColor = "2px Solid Red";

            loadView();
            loadForm();


            changeTab('form');
        }

        function getassignlabor(){
          assignlabor = httpRequest("/employee/assignlabor","GET");
          fillCombo(Cmbassignemployee,"Select the Labor",assignlabor,"number","");

        }


       function getassignTimeandcurrentres(){

           //  workingreservation = httpRequest("employee/workingreservation?employeeid="+JSON.parse(Cmbassignemployee.value).id,"GET");
           // console.log(workingreservation)
           //  console.log(Cmbassignemployee.value)
           //console.log(workingreservation);
           //  if(workingreservation != null){
           //      Cmbworkingres.value = workingreservation.currentreservationcode;
           //      Cmbworkingres.style.border = valid;
           //  }else{
           //      Cmbworkingres.value = "Not Yet Working";
           //      Cmbworkingres.style.border = valid;
           //  }

           assignDatetime.value = getCurrentDateTime('datetime');
           empallocation.assigndatetime = assignDatetime.value;
           assignDatetime.style.border = valid;
           assignDatetime.disabled = true;


       }
       function getremovetime(){
           removeDateandtime.value = getCurrentDateTime('datetime');
           empallocation.removedatetime = removeDateandtime.value;
           removeDateandtime.style.border = valid;
           removeDateandtime.disabled = true;

       }

       function getremovelabor(){
            removelabor = httpRequest("/employee/removelabor?avreservation="+JSON.parse(CmbremoveRes.value).reservationcode,"GET")

           fillCombo(Cmbremoveeployee,"Select the Labor",removelabor,"number","");
           $('.Removeempcmbsearch .select2-selection').css('border',initial);
       }
       function gettintimeandemployee(){
           TinDatetime.value = getCurrentDateTime('datetime');
           empallocation.transferindatetime = TinDatetime.value;
           TinDatetime.style.border = valid;
           TinDatetime.disabled = true;



       }

       function checkdupplicatetinandavlabor(){
            if((JSON.parse(CmbTinFromRes.value).reservationcode)== JSON.parse(CmbTinToRes.value).reservationcode){
                swal({
                    title: "From Reservation & To Reservation Can't Be Same...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer: 1500,
                });
                fillCombo(CmbTinToRes,"Select the Res_Code",reservations,"reservationcode","");
                empallocation.latoreservation_id = null;
                //CmbTinToRes.style.border = initial;
                $('.Tinfromrescmcsearch .select2-selection').css('border',initial);

            }else if((JSON.parse(CmbTinToRes.value).reservationcode)!=null){

                avalabortin = httpRequest("/employee/avfromlabortin?avfromreservation="+JSON.parse(CmbTinToRes.value).reservationcode,"GET");
                fillCombo(CmbTinemployee,"Select the Labor",avalabortin,"number","");


            }
            //
            // avalabortin = httpRequest("/employee/avfromlabortin?avfromreservation="+JSON.parse(CmbTinToRes.value).reservationcode,"GET");
            // fillCombo(CmbTinemployee,"Select the Labor",avalabortin,"number","");
            //


       }

       function checkdupplicatetoutandavlabor(){
           if((JSON.parse(CmbToutFromRes.value).reservationcode)== JSON.parse(CmbToutToRes.value).reservationcode){
               swal({
                   title: "From Reservation & To Reservation Can't Be Same...!",
                   text: "\n",
                   icon: "warning",
                   buttons: false,
                   timer: 1500,
               });
               fillCombo(CmbToutToRes,"Select the Res_Code",reservations,"reservationcode","");
               empallocation.latoreservation_id = null;
               //CmbToutToRes.style.border = initial;
               $('.Touttorescmbsearch .select2-selection').css('border',initial);
           }


           // toavreservation = httpRequest("/employee/avtolabortout?avtoreservation="+JSON.parse(CmbToutToRes.value).reservationcode,"GET")
           //
           // fillCombo(CmbToutemployee,"Select the Labor",toavreservation,"number","");



       }

       function gettoutAvfromres(){
           toavreservation = httpRequest("/employee/avtolabortout?avtoreservation="+JSON.parse(CmbToutFromRes.value).reservationcode,"GET")
            fillCombo(CmbToutemployee,"Select the Labor",toavreservation,"number","");

       }
        //fill to the available labor
        function fillCombopro(combo, message, list, attribute, selectedvalue) {
            combo.innerHTML = "";
            if (message != "") {
                var prompt = document.createElement("option");
                prompt.value = "";
                prompt.selected = "selected";
                prompt.disabled = "disabled";
                var prompttext = document.createTextNode(message);
                prompt.appendChild(prompttext);
                combo.appendChild(prompt);
            }

            for (index in list) {
                var option = document.createElement("option");
                option.value = JSON.stringify(list[index]);
                var text = document.createTextNode(getDatafromObjectList(list[index],attribute));
                for (ind in selectedvalue){
                    if (getDatafromObjectList(list[index],attribute) == selectedvalue) {

                        option.selected = "selected";
                        combo.style.border = "2px solid green";
                    }
                }
                option.appendChild(text);
                combo.appendChild(option);
            }
        }


       function getavlabor(){
           availableemployee = httpRequest("/lallocation/avlabor?fromreservationid="+JSON.parse(CmbTinFromRes.value).id,"GET")
          //avlabornumber = availableemployee.laboremployee_id.id;
           //console.log(typeof(avlabornumber))
           console.log(availableemployee)
          // console.log("Labor Id",avlabornumber)
          // fillCombo(CmbTinemployee,"Select the Labor",avlabornumber,"number","");

          // fillCombopro(CmbTinemployee,"Select the Labor",availableemployee,"laboremployee_id.number","");

       }
       function gettouttime(){
           ToutDatetime.value = getCurrentDateTime('datetime');
           empallocation.transferoutdatetime = ToutDatetime.value;
           ToutDatetime.style.border = valid;
           ToutDatetime.disabled = true;
       }
        function getassignavailableqtyinitial(){

            fillCombo(cmbAeqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            cmbAeqcatrgory.style.border = initial;
            Assignavailableqyt.value = ""
            Assignavailableqyt.style.border = initial;

            Assignqty.value = "";
            Assignqty.style.border = initial;
            eqallocation.assignqty = null;

            Fassignqty.value = "";
            Fassignqty.style.border = initial;
            eqallocation.finalavqty = null;
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
                Assignavailableqyt.style.border = valid;
            }

        }
        //get final quantity
        function getfinalqty(){


          var  totalfinalqty = parseInt(Assignavailableqyt.value) + parseInt(Assignqty.value);
            Fassignqty.value = totalfinalqty;
            console.log(Fassignqty.value);
            eqallocation.finalavqty =  Fassignqty.value;
            Fassignqty.style.border = valid;

            if(oldallocation != null && eqallocation.finalavqty != oldallocation.finalavqty){
                Fassignqty.style.border = updated;

                assignDatetime.value = getCurrentDateTime('datetime');
                eqallocation.assigndatetime = assignDatetime.value;
                assignDatetime.disabled = true;
                assignDatetime.style.border = updated;
            }



        }

        function removeavailableqtyinitial(){

            fillCombo(cmbReqcatrgory,"Select the Equipment",equipments,"equipmentname","");
            cmbReqcatrgory.style.border = initial;

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
                RemoveAvailableqyt.style.border = valid;

            }


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
            if((JSON.parse(SenderResNoTin.value).id) == (JSON.parse(ReciveResNoTin.value).id)){

                swal({
                    title: "From Reservation Code & To Reservation Code Can't be Same...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer: 1500,
                });

                fillCombo(ReciveResNoTin,"Select the Reservation",reservations,"reservationcode","");
                ReciveResNoTin.style.border = initial;
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
            cmbTineqcatrgory.style.border = initial;
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

            if(SenderAvailableqyt.value>0 && SenderAvailableqyt.value>=Tinqyt.value){
                Ftoutsenderqyt.value = parseInt(SenderAvailableqyt.value)-parseInt(Tinqyt.value);
                eqallocation.finalavqty = Ftoutsenderqyt.value;

                Ftoutsenderqyt.style.border = valid;

                Ftinreciveqyt.value = parseInt(ReciveAvailableqyt.value) + parseInt(Tinqyt.value);
                eqallocation.transfertofinalqty=   Ftinreciveqyt.value;
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
            if(FromResAvailableqyt.value >0 && FromResAvailableqyt.value >= Toutqyt.value){
                FFromqyt.value = parseInt(FromResAvailableqyt.value)- parseInt(Toutqyt.value);
               eqallocation.finalavqty = FFromqyt.value;
                FFromqyt.style.border = valid;

                Ftoqyt.value = parseInt(ToResAvailableqyt.value)+parseInt(Toutqyt.value);
                 eqallocation.transfertofinalqty = Ftoqyt.value;
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
            cmbTineqcatrgory.style.border = initial;


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
                ReciveResNoTin.style.border = initial;


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
            fillCombo(CmbremoveRes,"Select the Res_Code",reservations,"reservationcode","");
            empallocation.lafromreservation_id = null; //all the feild of fromreservation for set null
            //CmbremoveRes.style.border = initial;
            $('.Removerescmbsearch .select2-selection').css('border',initial);

            fillCombo(Cmbremoveeployee,"Select the Labor",laboremployee,"number","");
            empallocation.laboremployee_id = null; //all the feild of labor for set null
            //Cmbremoveeployee.style.border = initial;
            $('.Removeempcmbsearch .select2-selection').css('border',initial);

            removeDateandtime.value = "";
            empallocation.removedatetime = null;
            removeDateandtime.style.border = initial;





            //tin
            fillCombo(CmbTinFromRes,"Select the Res_Code",reservations,"reservationcode","");
            //CmbTinFromRes.style.border = initial;
            $('.Tinemprescmbsearch .select2-selection').css('border',initial);

            fillCombo(CmbTinToRes,"Select the Res_Code",reservations,"reservationcode","");
            empallocation.latoreservation_id = null; //all the feild of toreservation for set null
           // CmbTinToRes.style.border = initial;
            $('.Tinfromrescmcsearch .select2-selection').css('border',initial);

            fillCombo(CmbTinemployee,"Select the Labor",laboremployee,"number","");
            //CmbTinemployee.style.border = initial;
            $('.Tinavempcmbsearch .select2-selection').css('border',initial);

            TinDatetime.value = "";
            empallocation.transferindatetime = null;
            TinDatetime.style.border = initial;




            exprTinDatetime.min = getCurrentDateTime('datetime');
            var endtodaytin = new Date();
            var nextweektin = new Date();

            nextweektin.setDate(endtodaytin.getDate()+365);

            let getEndMonthtin = nextweektin.getMonth()+1;
            if(getEndMonthtin<10){
                getEndMonthtin = "0"+getEndMonthtin;
            }

            let getEnddatetin = nextweektin.getDate();
            if(getEnddatetin<10){
                getEnddatetin = "0"+getEnddatetin;
            }
            let hourstin = nextweektin.getHours();
            if(hourstin<10){
                hourstin = "0"+hourstin;
            }

            let minutestin = nextweektin.getMinutes();
            if(minutestin<10){
                minutestin = "0"+minutestin;
            }

            let secondsin = nextweektin.getSeconds();
            if(secondsin<10){
                secondsin = "0"+secondsin;
            }

            exprTinDatetime.max = nextweektin.getFullYear()+"-"+getEndMonthtin+"-"+getEnddatetin+"T"+hourstin+":"+minutestin+":"+secondsin;

            exprTinDatetime.value = "";
            //empallocation.expectedremovedatetime = null;
            exprTinDatetime.style.border = initial;


            //tout
            fillCombo(CmbToutFromRes,"Select the Res_Code",reservations,"reservationcode","");
            //CmbToutFromRes.style.border = initial;
            $('.Toutfrescmbserach .select2-selection').css('border',initial);

            fillCombo(CmbToutToRes,"Select the Res_Code",reservations,"reservationcode","");
            //CmbToutToRes.style.border = initial;
            $('.Touttorescmbsearch .select2-selection').css('border',initial);

            fillCombo(CmbToutemployee,"Select the Labor",laboremployee,"number","");
            //CmbToutemployee.style.border = initial;
            $('.Toutresempcmbsearch .select2-selection').css('border',initial);

            ToutDatetime.value = "";
            empallocation.transferoutdatetime = null;
            ToutDatetime.style.border = initial;





            exprToutDatetime.min = getCurrentDateTime('datetime');
            var endtodayout = new Date();
            var nextweekout = new Date();

            nextweekout.setDate(endtodayout.getDate()+365);

            let getEndMonth = nextweekout.getMonth()+1;
            if(getEndMonth<10){
                getEndMonth = "0"+getEndMonth;
            }

            let getEnddate = nextweekout.getDate();
            if(getEnddate<10){
                getEnddate = "0"+getEnddate;
            }
            let hours = nextweekout.getHours();
            if(hours<10){
                hours = "0"+hours;
            }

            let minutes = nextweekout.getMinutes();
            if(minutes<10){
                minutes = "0"+minutes;
            }

            let seconds = nextweekout.getSeconds();
            if(seconds<10){
                seconds = "0"+seconds;
            }

            exprToutDatetime.max = nextweekout.getFullYear()+"-"+getEndMonth+"-"+getEnddate+"T"+hours+":"+minutes+":"+seconds;

            exprToutDatetime.value = "";
            //empallocation.expectedremovedatetime = null;
            exprToutDatetime.style.border = initial;


        }
        //select remove
        function selectremove(){

            //assign
            fillCombo(CmbassignRes,"Select the Res_Code",reservations,"reservationcode","");
            empallocation.lafromreservation_id = null; //all the feild of fromreservation for set null
            //CmbassignRes.style.border = initial;
            $('.Empascmbsearch .select2-selection').css('border',initial);


            fillCombo(Cmbassignemployee,"Select the Labor",laboremployee,"number","");
            empallocation.laboremployee_id = null; //all the feild of labor for set null
           // Cmbassignemployee.style.border = initial;
            $('.Assignemp .select2-selection').css('border',initial);

            assignDatetime.value = "";
            empallocation.assigndatetime = null;
            assignDatetime.style.border = initial;

            //

            exprassDatetime.min = getCurrentDateTime('datetime');
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

            exprassDatetime.max = nextweek.getFullYear()+"-"+getEndMonth+"-"+getEnddate+"T"+hours+":"+minutes+":"+seconds;

            exprassDatetime.value = "";
            empallocation.expectedremovedatetime = null;
            exprassDatetime.style.border = initial;



            //tin
            fillCombo(CmbTinFromRes,"Select the Res_Code",reservations,"reservationcode","");
            //CmbTinFromRes.style.border = initial;
            $('.Tinemprescmbsearch .select2-selection').css('border',initial);

            fillCombo(CmbTinToRes,"Select the Res_Code",reservations,"reservationcode","");
            empallocation.latoreservation_id = null; //all the feild of toreservation for set null
            //CmbTinToRes.style.border = initial;
            $('.Tinfromrescmcsearch .select2-selection').css('border',initial);

            fillCombo(CmbTinemployee,"Select the Labor",laboremployee,"number","");
            //CmbTinemployee.style.border = initial;
            $('.Tinavempcmbsearch .select2-selection').css('border',initial);

            TinDatetime.value = "";
            empallocation.transferindatetime = null;
            TinDatetime.style.border = initial;



            exprTinDatetime.min = getCurrentDateTime('datetime');
            var endtintoday = new Date();
            var nexttinweek = new Date();

            nexttinweek.setDate(endtintoday.getDate()+365);

            let gettinEndMonth = nextweek.getMonth()+1;
            if(gettinEndMonth<10){
                gettinEndMonth = "0"+gettinEndMonth;
            }

            let gettinEnddate = nextweek.getDate();
            if(gettinEnddate<10){
                gettinEnddate = "0"+gettinEnddate;
            }
            let hourstin = nextweek.getHours();
            if(hourstin<10){
                hourstin = "0"+hourstin;
            }

            let minutestin = nextweek.getMinutes();
            if(minutestin<10){
                minutestin = "0"+minutestin;
            }

            let secondstin = nextweek.getSeconds();
            if(secondstin<10){
                secondstin = "0"+secondstin;
            }

            exprTinDatetime.max = nexttinweek.getFullYear()+"-"+gettinEndMonth+"-"+gettinEnddate+"T"+hourstin+":"+minutestin+":"+secondstin;

            exprTinDatetime.value = "";
            //empallocation.expectedremovedatetime = null;
            exprTinDatetime.style.border = initial;





            //tout
            fillCombo(CmbToutFromRes,"Select the Res_Code",reservations,"reservationcode","");
            //CmbToutFromRes.style.border = initial;
            $('.Toutfrescmbserach .select2-selection').css('border',initial);

            fillCombo(CmbToutToRes,"Select the Res_Code",reservations,"reservationcode","");
            //CmbToutToRes.style.border = initial;
            $('.Touttorescmbsearch .select2-selection').css('border',initial);

            fillCombo(CmbToutemployee,"Select the Labor",laboremployee,"number","");
            //CmbToutemployee.style.border = initial;
            $('.Toutresempcmbsearch .select2-selection').css('border',initial);

            ToutDatetime.value = "";
            empallocation.transferoutdatetime = null;
            ToutDatetime.style.border = initial;




            exprToutDatetime.min = getCurrentDateTime('datetime');
            var endtodayout = new Date();
            var nextweekout = new Date();

            nextweekout.setDate(endtodayout.getDate()+365);

            let getEndMonthtout = nextweekout.getMonth()+1;
            if(getEndMonthtout<10){
                getEndMonthtout = "0"+getEndMonthtout;
            }

            let getEnddateout = nextweekout.getDate();
            if(getEnddateout<10){
                getEnddateout = "0"+getEnddateout;
            }
            let hoursout = nextweekout.getHours();
            if(hoursout<10){
                hoursout = "0"+hoursout;
            }

            let minutesout = nextweekout.getMinutes();
            if(minutesout<10){
                minutesout = "0"+minutesout;
            }

            let secondsout = nextweekout.getSeconds();
            if(secondsout<10){
                secondsout = "0"+secondsout;
            }

            exprToutDatetime.max = nextweekout.getFullYear()+"-"+getEndMonthtout+"-"+getEnddateout+"T"+hoursout+":"+minutesout+":"+secondsout;


            exprToutDatetime.value = "";
            //empallocation.expectedremovedatetime = null;
            exprToutDatetime.style.border = initial;


        }
        function selecttransferin(){

            //assign
            fillCombo(CmbassignRes,"Select the Res_Code",reservations,"reservationcode","");
            empallocation.lafromreservation_id = null; //all the feild of fromreservation for set null
            //CmbassignRes.style.border = initial;
            $('.Empascmbsearch .select2-selection').css('border',initial);


            fillCombo(Cmbassignemployee,"Select the Labor",laboremployee,"number","");
            empallocation.laboremployee_id = null; //all the feild of labor for set null
            //Cmbassignemployee.style.border = initial;
            $('.Assignemp .select2-selection').css('border',initial);

            assignDatetime.value = "";
            empallocation.assigndatetime = null;
            assignDatetime.style.border = initial;



            exprassDatetime.min = getCurrentDateTime('datetime');
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

            exprassDatetime.max = nextweek.getFullYear()+"-"+getEndMonth+"-"+getEnddate+"T"+hours+":"+minutes+":"+seconds;



            exprassDatetime.value = "";
            empallocation.expectedremovedatetime = null;
            exprassDatetime.style.border = initial;


            //remove
            fillCombo(CmbremoveRes,"Select the Res_Code",reservations,"reservationcode","");
            //CmbremoveRes.style.border = initial;
            $('.Removerescmbsearch .select2-selection').css('border',initial);

            fillCombo(Cmbremoveeployee,"Select the Labor",laboremployee,"number","");
            //Cmbremoveeployee.style.border = initial;
            $('.Removeempcmbsearch .select2-selection').css('border',initial);

            removeDateandtime.value = "";
            empallocation.removedatetime = null;
            removeDateandtime.style.border = initial;



            //tout
            fillCombo(CmbToutFromRes,"Select the Res_Code",reservations,"reservationcode","");
            //CmbToutFromRes.style.border = initial;
            $('.Toutfrescmbserach .select2-selection').css('border',initial);

            fillCombo(CmbToutToRes,"Select the Res_Code",reservations,"reservationcode","");
            //CmbToutToRes.style.border = initial;
            $('.Touttorescmbsearch .select2-selection').css('border',initial);

            fillCombo(CmbToutemployee,"Select the Labor",laboremployee,"number","");
            //CmbToutemployee.style.border = initial;
            $('.Toutresempcmbsearch .select2-selection').css('border',initial);


            ToutDatetime.value = "";
            empallocation.transferoutdatetime = null;
            ToutDatetime.style.border = initial;



            exprToutDatetime.min = getCurrentDateTime('datetime');
            var endtodayout = new Date();
            var nextweekout = new Date();

            nextweekout.setDate(endtodayout.getDate()+365);

            let getEndMonthtout = nextweekout.getMonth()+1;
            if(getEndMonthtout<10){
                getEndMonthtout = "0"+getEndMonthtout;
            }

            let getEnddateout = nextweekout.getDate();
            if(getEnddateout<10){
                getEnddateout = "0"+getEnddateout;
            }
            let hoursout = nextweekout.getHours();
            if(hoursout<10){
                hoursout = "0"+hoursout;
            }

            let minutesout = nextweekout.getMinutes();
            if(minutesout<10){
                minutesout = "0"+minutesout;
            }

            let secondsout = nextweekout.getSeconds();
            if(secondsout<10){
                secondsout = "0"+secondsout;
            }

            exprToutDatetime.max = nextweekout.getFullYear()+"-"+getEndMonthtout+"-"+getEnddateout+"T"+hoursout+":"+minutesout+":"+secondsout;


            exprToutDatetime.value = "";
            //empallocation.expectedremovedatetime = null;
            exprToutDatetime.style.border = initial;


        }
        function selecttransferout(){

            //assign
            fillCombo(CmbassignRes,"Select the Res_Code",reservations,"reservationcode","");
            empallocation.lafromreservation_id = null; //all the feild of fromreservation for set null
            //CmbassignRes.style.border = initial;
            $('.Empascmbsearch .select2-selection').css('border',initial);

            fillCombo(Cmbassignemployee,"Select the Labor",laboremployee,"number","");
            empallocation.laboremployee_id = null; //all the feild of labor for set null
            //Cmbassignemployee.style.border = initial;
            $('.Assignemp .select2-selection').css('border',initial);

            assignDatetime.value = "";
            empallocation.assigndatetime = null;
            assignDatetime.style.border = initial;

            //

            exprassDatetime.min = getCurrentDateTime('datetime');
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


            exprassDatetime.max = nextweek.getFullYear()+"-"+getEndMonth+"-"+getEnddate+"T"+hours+":"+minutes+":"+seconds;

            exprassDatetime.value = "";
            empallocation.expectedremovedatetime = null;
            exprassDatetime.style.border = initial;



            //remove
            fillCombo(CmbremoveRes,"Select the Res_Code",reservations,"reservationcode","");
            //CmbremoveRes.style.border = initial;
            $('.Removerescmbsearch .select2-selection').css('border',initial);

            fillCombo(Cmbremoveeployee,"Select the Labor",laboremployee,"number","");
            //Cmbremoveeployee.style.border = initial;
            $('.Removeempcmbsearch .select2-selection').css('border',initial);

            removeDateandtime.value = "";
            empallocation.removedatetime = null;
            removeDateandtime.style.border = initial;



            //tin
            fillCombo(CmbTinFromRes,"Select the Res_Code",reservations,"reservationcode","");
            //CmbTinFromRes.style.border = initial;
            $('.Tinemprescmbsearch .select2-selection').css('border',initial);

            fillCombo(CmbTinToRes,"Select the Res_Code",reservations,"reservationcode","");
            empallocation.latoreservation_id = null; //all the feild of toreservation for set null
            //CmbTinToRes.style.border = initial;
            $('.Tinfromrescmcsearch .select2-selection').css('border',initial);

            fillCombo(CmbTinemployee,"Select the Labor",laboremployee,"number","");
            //CmbTinemployee.style.border = initial;
            $('.Tinavempcmbsearch .select2-selection').css('border',initial);

            TinDatetime.value = "";
            empallocation.transferindatetime = null;
            TinDatetime.style.border = initial;





            exprTinDatetime.min = getCurrentDateTime('datetime');
            var endtintoday = new Date();
            var nexttinweek = new Date();

            nexttinweek.setDate(endtintoday.getDate()+365);

            let gettinEndMonth = nextweek.getMonth()+1;
            if(gettinEndMonth<10){
                gettinEndMonth = "0"+gettinEndMonth;
            }

            let gettinEnddate = nextweek.getDate();
            if(gettinEnddate<10){
                gettinEnddate = "0"+gettinEnddate;
            }
            let hourstin = nextweek.getHours();
            if(hourstin<10){
                hourstin = "0"+hourstin;
            }

            let minutestin = nextweek.getMinutes();
            if(minutestin<10){
                minutestin = "0"+minutestin;
            }

            let secondstin = nextweek.getSeconds();
            if(secondstin<10){
                secondstin = "0"+secondstin;
            }

            exprTinDatetime.max = nexttinweek.getFullYear()+"-"+gettinEndMonth+"-"+gettinEnddate+"T"+hourstin+":"+minutestin+":"+secondstin;

            exprTinDatetime.value = "";
            //empallocation.expectedremovedatetime = null;
            exprTinDatetime.style.border = initial;





            // //tout
            // fillCombo(CmbToutFromRes,"Select the Res_Code",reservations,"reservationcode","");
            // CmbToutFromRes.style.border = initial;
            //
            // fillCombo(CmbToutToRes,"Select the Res_Code",reservations,"reservationcode","");
            // CmbToutToRes.style.border = initial;
            //
            // fillCombo(CmbToutemployee,"Select the Labor",laboremployee,"number","");
            // CmbToutemployee.style.border = initial;



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
            empallocations = new Array();
          var data = httpRequest("/lallocation/findAll?page="+page+"&size="+size+query,"GET");
            if(data.content!= undefined) empallocations = data.content;
            createPagination('pagination',data.totalPages, data.number+1,paginate);
            fillTable('tblLsallocation',empallocations,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblLsallocation);

            if(activerowno!="")selectRow(tblLsallocation,activerowno,active);

        }

        function paginate(page) {


            checkerr = getErrors();

            if(oldempallocation == null && addvalue == ""){
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

        function viewitem(empalo,rowno) {

            viewempallocation = JSON.parse(JSON.stringify(empalo));

            tdcode.innerHTML = viewempallocation.lacode;
            tdaltype.innerHTML = viewempallocation.latype_id.name;
            tdalstatus.innerHTML = viewempallocation.lastatus_id.name;
            tdfromres.innerHTML = viewempallocation.lafromreservation_id.reservationcode;




            if(viewempallocation.latoreservation_id == null){
                tdtores.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
            }else{
                tdtores.innerHTML = viewempallocation.latoreservation_id.reservationcode;
            }


            tdemp.innerHTML = viewempallocation.employee_id.number;


            if( viewempallocation.assigndatetime == null){
                tdassigndatetime.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
            }else{
                tdassigndatetime.innerHTML = viewempallocation.assigndatetime;
            }

            if( viewempallocation.removedatetime == null){
                tdremovedatetime.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
            }else{
                tdremovedatetime.innerHTML = viewempallocation.removedatetime;
            }

            if( viewempallocation.transferindatetime == null){
                tdtindatetime.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
            }else{
                tdtindatetime.innerHTML = viewempallocation.transferindatetime;
            }


            if( viewempallocation.transferoutdatetime == null){
                tdtoutdatetime.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
            }else{
                tdtoutdatetime.innerHTML = viewempallocation.transferoutdatetime;
            }




            if(viewempallocation.description == null){
                tddescription.innerHTML = "<p style='color: red;font-size: 15px;'>No Description Added</p>"
            }else{
                tddescription.innerHTML = viewempallocation.description;
            }




            tdaddedby.innerHTML = viewempallocation.employee_id.callingname;


            // if(employee.photo==null)
            //     tdphoto.src= 'resourse/image/noimage.png';
            //  else
            // tdphoto.src = atob(employee.photo);
            tdaddedtime.innerHTML = viewempallocation.addeddatetime;

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
             //     "<body><div style='margin-top: 150px'><h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Employee Shifting Details :</span> </h1></div>" +
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
                 "</address></div></div></di><hr> <h1>Employee Allocation Details :</h1></div>" +
                 "<div>"+format+"</div>" +
                 "<script>printformtable.removeAttribute('style')</script>" +
                 "</body></html>");
             setTimeout(function () {newwindow.print(); newwindow.close();},100);

         }

        function loadForm() {
            empallocation = new Object();
            oldempallocation  = null;

             fillCombo(cmbaltype,"Select the EQ Shiftment Type",lastype,"name","");
            fillCombo(cmbalstatus,"Select the EQ Shiftment Status",lastatus,"name","");


            fillCombo(cmbAssignby,"Select Added By",employees,"callingname",session.getObject('activeuser').employeeId.callingname);
            empallocation.employee_id = JSON.parse(cmbAssignby.value);
            cmbAssignby.disabled = true;


            fillCombo(cmbalstatus,"Select the Status",lastatus,"name","Completed");
            empallocation.lastatus_id = JSON.parse(cmbalstatus.value)
            cmbalstatus.disabled = true;
            cmbalstatus.style.border = valid;

            //assign labor
            fillCombo(CmbassignRes,"Select the Res_Code",reservations,"reservationcode","");
            fillCombo(Cmbassignemployee,"Select the Labor",laboremployee,"number","");

            assignDatetime.value = "";
            empallocation.assigndatetime = null;
            assignDatetime.style.border = initial;

           //
            exprassDatetime.min = getCurrentDateTime('datetime');
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

            exprassDatetime.max = nextweek.getFullYear()+"-"+getEndMonth+"-"+getEnddate+"T"+hours+":"+minutes+":"+seconds;

            exprassDatetime.value = "";
            empallocation.expectedremovedatetime = null;
            exprassDatetime.style.border = initial;





            //remove labor
            fillCombo(CmbremoveRes,"Select the Res_Code",reservations,"reservationcode","");
            fillCombo(Cmbremoveeployee,"Select the Labor",laboremployee,"number","");

            removeDateandtime.value = "";
            empallocation.removedatetime = null;
            removeDateandtime.style.border = initial;



            //transfer in labor
            fillCombo(CmbTinFromRes,"Select the Res_Code",reservations,"reservationcode","");
            fillCombo(CmbTinToRes,"Select the Res_Code",reservations,"reservationcode","");
            fillCombo(CmbTinemployee,"Select the Labor",laboremployee,"number","");

            TinDatetime.value = "";
            empallocation.transferindatetime = null;
            TinDatetime.style.border = initial;





            exprTinDatetime.min = getCurrentDateTime('datetime');
            var endtintoday = new Date();
            var nexttinweek = new Date();

            nexttinweek.setDate(endtintoday.getDate()+365);

            let gettinEndMonth = nextweek.getMonth()+1;
            if(gettinEndMonth<10){
                gettinEndMonth = "0"+gettinEndMonth;
            }

            let gettinEnddate = nextweek.getDate();
            if(gettinEnddate<10){
                gettinEnddate = "0"+gettinEnddate;
            }
            let hourstin = nextweek.getHours();
            if(hourstin<10){
                hourstin = "0"+hourstin;
            }

            let minutestin = nextweek.getMinutes();
            if(minutestin<10){
                minutestin = "0"+minutestin;
            }

            let secondstin = nextweek.getSeconds();
            if(secondstin<10){
                secondstin = "0"+secondstin;
            }

            exprTinDatetime.max = nexttinweek.getFullYear()+"-"+gettinEndMonth+"-"+gettinEnddate+"T"+hourstin+":"+minutestin+":"+secondstin;


            exprTinDatetime.value = "";
            empallocation.expectedremovedatetime = null;
            exprTinDatetime.style.border = initial;




            //transfer out labor
            fillCombo(CmbToutFromRes,"Select the Res_Code",reservations,"reservationcode","");
            fillCombo(CmbToutToRes,"Select the Res_Code",reservations,"reservationcode","");
            fillCombo(CmbToutemployee,"Select the Labor",laboremployee,"number","");

            ToutDatetime.value = "";
            empallocation.transferoutdatetime = null;
            ToutDatetime.style.border = initial;



            exprToutDatetime.min = getCurrentDateTime('datetime');
            var endtodayout = new Date();
            var nextweekout = new Date();

            nextweekout.setDate(endtodayout.getDate()+365);

            let getEndMonthtout = nextweekout.getMonth()+1;
            if(getEndMonthtout<10){
                getEndMonthtout = "0"+getEndMonthtout;
            }

            let getEnddateout = nextweekout.getDate();
            if(getEnddateout<10){
                getEnddateout = "0"+getEnddateout;
            }
            let hoursout = nextweekout.getHours();
            if(hoursout<10){
                hoursout = "0"+hoursout;
            }

            let minutesout = nextweekout.getMinutes();
            if(minutesout<10){
                minutesout = "0"+minutesout;
            }

            let secondsout = nextweekout.getSeconds();
            if(secondsout<10){
                secondsout = "0"+secondsout;
            }

            exprToutDatetime.max = nextweekout.getFullYear()+"-"+getEndMonthtout+"-"+getEnddateout+"T"+hoursout+":"+minutesout+":"+secondsout;

            exprToutDatetime.value = "";
            empallocation.expectedremovedatetime = null;
            exprToutDatetime.style.border = initial;



            //added date and time
            AddedDatetime.value = getCurrentDateTime('datetime');
            empallocation.addeddatetime = AddedDatetime.value;
            AddedDatetime.style.border = valid;
            AddedDatetime.disabled = true;




            //Get Next Number Form Data Base
             var nextNumber = httpRequest("/lallocation/nextnumber", "GET");
            txtallocateCode.value = nextNumber.lacode;
            empallocation.lacode =  txtallocateCode.value;
            txtallocateCode.disabled = true;
            txtallocateCode.style.border = valid;



            // assignDate.style.border=valid;
            //  removeFile('flePhoto');
            //
              setStyle(initial);


            disableButtons(false, true, true);
        }

        function showCards(){


            var getVal = JSON.parse(cmbaltype.value).name;
            console.log(getVal);

            if (getVal == "Emp-Assign") {
                Alassign.style.display = "block";
                Alremove.style.display = "none";
                Altin.style.display = "none";
                Altout.style.display = "none";
                selectAssign();
            } else if (getVal == "Emp-Remove") {
                Alassign.style.display = "none";
                Alremove.style.display = "block";
                Altin.style.display = "none";
                Altout.style.display = "none";
                selectremove();
            } else if (getVal == "Emp-Transfer In") {
                Alassign.style.display = "none";
                Alremove.style.display = "none";
                Altin.style.display = "block";
                Altout.style.display = "none";
                selecttransferout();
            }
            else if (getVal == "Emp-Transfer Out") {
                Alassign.style.display = "none";
                Alremove.style.display = "none";
                Altin.style.display = "none";
                Altout.style.display = "block";
                selecttransferin();
            }


        }

        function setStyle(style) {

            cmbaltype.style.border = style;
            //cmbalstatus.style.border = style;


           // assign
            //CmbassignRes.style.border = style;
            $('.Empascmbsearch .select2-selection').css('border',style);

            //Cmbassignemployee.style.border = style;
            $('.Assignemp .select2-selection').css('border',style);
            assignDatetime.style.border = style;

            //remove
           // CmbremoveRes.style.border = style;
            $('.Removerescmbsearch .select2-selection').css('border',style);

            //Cmbremoveeployee.style.border = style;
            $('.Removeempcmbsearch .select2-selection').css('border',style);

            removeDateandtime.style.border = style;

            //tin
            //CmbTinFromRes.style.border = style;
            $('.Tinemprescmbsearch .select2-selection').css('border',style);

            //CmbTinToRes.style.border = style;
            $('.Tinfromrescmcsearch .select2-selection').css('border',style);

            //CmbTinemployee.style.border = style;
            $('.Tinavempcmbsearch .select2-selection').css('border',style);

            TinDatetime.style.border = style;

            //tout
            //CmbToutFromRes.style.border = style;
            $('.Toutfrescmbserach .select2-selection').css('border',style);

            //CmbToutToRes.style.border = style;
            $('.Touttorescmbsearch .select2-selection').css('border',style);

            //CmbToutemployee.style.border = style;
            $('.Toutresempcmbsearch .select2-selection').css('border',style);

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

            for(index in empallocations){
                tblLsallocation.children[1].children[index].lastChild.children[0].disabled = true;
                tblLsallocation.children[1].children[index].lastChild.children[0].style.cursor = "not-allowed";
            }

            // select deleted data row
            for(index in empallocations){
                if(empallocations[index].lastatus_id.name =="Deleted"){
                    tblLsallocation.children[1].children[index].style.color = "#f00";
                    tblLsallocation.children[1].children[index].style.border = "2px solid red";
                    tblLsallocation.children[1].children[index].lastChild.children[0].disabled = true;
                    tblLsallocation.children[1].children[index].lastChild.children[0].style.cursor = "not-allowed";
                    tblLsallocation.children[1].children[index].lastChild.children[1].disabled = true;
                    tblLsallocation.children[1].children[index].lastChild.children[1].style.cursor = "not-allowed";

                }
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

            if(empallocation.lacode ==null){
                txtallocateCode.style.border = invalid;
                errors = errors + "\n" + "Labor Allocation Code not Entered";
            }else addvalue = 1;



            // if (empallocation.latype_id == null) {
            //     cmbaltype.style.border = invalid;
            //     errors = errors + "\n" + "Labor Allocation Type Not Selected";
            //
            // }else addvalue = 1;



            if (empallocation.latype_id == null) {
                cmbaltype.style.border = invalid;
                errors = errors + "\n" + "Labor Allocation Type Not Selected";

            }else {

                addvalue = 1;
                if (empallocation.latype_id.name == "Emp-Assign") {
                    if (empallocation.lafromreservation_id == null) {
                        errors = errors + "\n" + "Assign Reservation Not Entered";
                        //CmbassignRes.style.border = invalid;
                        $('.Empascmbsearch .select2-selection').css('border',invalid);
                    } else addvalue = 1;
                    if (empallocation.laboremployee_id == null) {
                        errors = errors + "\n" + "Labor Code Not Selected";
                        //Cmbassignemployee.style.border = invalid;
                        $('.Assignemp .select2-selection').css('border',invalid);
                    } else addvalue = 1;
                    if (empallocation.assigndatetime == null) {
                        errors = errors + "\n" + "Assign Date & Time Not Selected";
                        assignDatetime.style.border = invalid;
                    } else addvalue = 1;

                    if (empallocation.expectedremovedatetime == null) {
                        errors = errors + "\n" + "Expected remove Date & Time Not Selected";
                        exprassDatetime.style.border = invalid;
                    } else addvalue = 1;



                } else if (empallocation.latype_id.name == "Emp-Remove") {
                    if (empallocation.lafromreservation_id == null) {
                        //CmbremoveRes.style.border = invalid;
                        $('.Removerescmbsearch .select2-selection').css('border',invalid);
                        errors = errors + "\n" + "Labor Remove Reservation Not Entered";
                    } else addvalue = 1;

                    if (empallocation.laboremployee_id == null) {
                        //Cmbremoveeployee.style.border = invalid;
                        $('.Removeempcmbsearch .select2-selection').css('border',invalid);
                        errors = errors + "\n" + "Labor Code Not Selected";
                    } else addvalue = 1;

                    if (empallocation.removedatetime == null) {
                        removeDateandtime.style.border = invalid;
                        errors = errors + "\n" + "Removed Date & Time Not Selected";
                    } else addvalue = 1;


                } else if (empallocation.latype_id.name == "Emp-Transfer In") {
                    if (empallocation.lafromreservation_id == null) {
                       // CmbTinFromRes.style.border = invalid;
                        $('.Tinemprescmbsearch .select2-selection').css('border',invalid);
                        errors = errors + "\n" + "From Reservation Not Entered";
                    } else addvalue = 1;
                    if (empallocation.latoreservation_id == null) {
                        //CmbTinToRes.style.border = invalid;
                        $('.Tinfromrescmcsearch .select2-selection').css('border',invalid);
                        errors = errors + "\n" + "To Reservation Not Entered";
                    } else addvalue = 1;
                    if (empallocation.laboremployee_id == null) {
                        //CmbTinemployee.style.border = invalid;
                        $('.Tinavempcmbsearch .select2-selection').css('border',invalid);
                        errors = errors + "\n" + "Labor not Selected";
                    } else addvalue = 1;
                    if (empallocation.transferindatetime == null) {
                        TinDatetime.style.border = invalid;
                        errors = errors + "\n" + "Transfer In Date & Time Not Selected";
                    } else addvalue = 1;


                    if (empallocation.expectedremovedatetime == null) {
                        exprTinDatetime.style.border = invalid;
                        errors = errors + "\n" + "Expected remove Date & Time Not Selected";
                    } else addvalue = 1;


                    //final qty sender's reservation here


                } else if (empallocation.latype_id.name == "Emp-Transfer Out") {
                    if (empallocation.lafromreservation_id == null) {
                        //CmbToutFromRes.style.border = invalid;
                        $('.Toutfrescmbserach .select2-selection').css('border',invalid);
                        errors = errors + "\n" + "From Reservation Not Selected";
                    } else addvalue = 1;
                    if (empallocation.latoreservation_id == null) {
                        //CmbToutToRes.style.border = invalid;
                        $('.Touttorescmbsearch .select2-selection').css('border',invalid);
                        errors = errors + "\n" + "To Reservation Not Selected";
                    } else addvalue = 1;
                    if (empallocation.laboremployee_id == null) {
                        //CmbToutemployee.style.border = invalid;
                        $('.Toutresempcmbsearch .select2-selection').css('border',invalid);
                        errors = errors + "\n" + "Labor not Selected";
                    } else addvalue = 1;
                    if (empallocation.transferoutdatetime == null) {
                        ToutDatetime.style.border = invalid;
                        errors = errors + "\n" + "Transfer Out Date & Time Not Selected";
                    } else addvalue = 1;

                    if (empallocation.expectedremovedatetime == null) {
                        exprToutDatetime.style.border = invalid;
                        errors = errors + "\n" + "Expected remove Date & Time Not Selected";
                    } else addvalue = 1;


                }

            }//type check

            if (empallocation.lastatus_id == null){
                cmbalstatus.style.border = invalid;
                errors = errors + "\n" + "Allocation Status Not Selected";
            }
            else  addvalue = 1;


            if (empallocation.addeddatetime == null){
                AddedDatetime.style.border = invalid;
                errors = errors + "\n" + "Labor Allocation Added Time Not Selected";
            }
            else  addvalue = 1;


            return errors;

        }

        function btnAddMC(){
            if(getErrors()==""){
                if(txtDescription.value==""){
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

            if(empallocation.latype_id.name=="Emp-Assign"){


                swal({

                    title: "Are you sure to add following ES Assign...?" ,
                    text :"\nAllocation Code : " + empallocation.lacode+
                        "\nAssign Reservation Code : " + empallocation.lafromreservation_id.reservationcode +
                        "\nLabor Code : " + empallocation.laboremployee_id.number+
                        "\nAllocation Type : " + empallocation.latype_id.name+
                        "\nAssign Date & Time : " + empallocation.assigndatetime +
                        "\nExpected remove Date & Time : " + empallocation.expectedremovedatetime+

                        "\nAdded Date & Time : " + empallocation.addeddatetime +
                        "\nAllocation Status : " + empallocation.lastatus_id.name +
                        "\nAdded By : " + empallocation.employee_id.callingname ,


                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        var response = httpRequest("/lallocation", "POST", empallocation);
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



            }else if(empallocation.latype_id.name=="Emp-Remove"){

                swal({

                    title: "Are you sure to add following ES Remove...?" ,
                    text :"\nAllocation Code: " +  empallocation.lacode+
                        "\nRemove Reservation Code : " + empallocation.lafromreservation_id.reservationcode +
                        "\nLabor Code : " + empallocation.laboremployee_id.number+
                        "\nAllocation Type : " + empallocation.latype_id.name+
                        "\nRemove Date & Time : " + empallocation.removedatetime +


                        "\nAdded Date & Time : " +  empallocation.addeddatetime +
                        "\nAllocation Status : " + empallocation.lastatus_id.name +
                        "\nAdded By : " + empallocation.employee_id.callingname,


                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        var response = httpRequest("/lallocation", "POST", empallocation);
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

            }else if(empallocation.latype_id.name=="Emp-Transfer In"){

                swal({

                    title: "Are you sure to add following ES Transfer In...?" ,
                    text :"\nAllocation Code : " + empallocation.lacode+
                        "\nAllocation Type : " + empallocation.latype_id.name+
                        "\nTo Reservation Code : " + empallocation.lafromreservation_id.reservationcode +
                        "\nFrom Reservation Code : " +  empallocation.latoreservation_id.reservationcode  +
                        "\nLabor Code : " + empallocation.laboremployee_id.number +

                        "\nTrnasfer In Date & Time : " + empallocation.transferindatetime +
                        "\nExpected remove Date & Time : " + empallocation.expectedremovedatetime+


                        "\nAdded Date & Time : " + empallocation.addeddatetime  +
                        "\nAllocation Status : " + empallocation.lastatus_id.name +
                        "\nAdded By : " +  empallocation.employee_id.callingname ,


                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        var response = httpRequest("/lallocation", "POST", empallocation);
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
            else if(empallocation.latype_id.name=="Emp-Transfer Out"){


                swal({

                    title: "Are you sure to add following ES Transfer Out...?" ,
                    text :"\nAllocation Code : " + empallocation.lacode+
                        "\nAllocation Type : " + empallocation.latype_id.name+
                        "\nFrom Reservation Code : " + empallocation.lafromreservation_id.reservationcode +
                        "\nTo Reservation Code : " +  empallocation.latoreservation_id.reservationcode +
                        "\nLabor Code : " + empallocation.laboremployee_id.number+
                        "\nTrnasfer Out Date & Time : " + empallocation.transferoutdatetime +

                        "\nAdded Date & Time : " + empallocation.addeddatetime  +
                        "\nExpected remove Date & Time : " + empallocation.expectedremovedatetime+
                        "\nAllocation Status : " + empallocation.lastatus_id.name +
                        "\nAdded By : " + empallocation.employee_id.callingname ,


                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        var response = httpRequest("/lallocation", "POST", empallocation);
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

            if(oldempallocation == null && addvalue == ""){
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

            if (oldempallocation==null) {
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


        function filldata(empallo) {
            clearSelection(tblLsallocation);
            selectRow(tblLsallocation,activerowno,active);

            empallocation  = JSON.parse(JSON.stringify(empallo));
            oldempallocation = JSON.parse(JSON.stringify(empallo));

            txtallocateCode.value = empallocation.lacode;
            txtallocateCode.disabled = true;


            fillCombo(cmbaltype,"Select the EQ Shiftment Type",lastype,"name",empallocation.latype_id.name);
            cmbaltype.disabled = true;

            fillCombo(cmbalstatus,"Select the EQ Shiftment Status",lastatus,"name",empallocation.lastatus_id.name);
            cmbalstatus.disabled = false;

            fillCombo(cmbAssignby,"Select Added By",employees,"callingname",empallocation.employee_id.callingname);
            cmbAssignby.disabled = true;

            AddedDatetime.value = empallocation.addeddatetime;
            AddedDatetime.disabled = true;



            if(empallocation.latype_id.name == "Emp-Assign"){

                Alassign.style.display = "block";
                Alremove.style.display = "none";
                Altin.style.display = "none";
                Altout.style.display = "none";

                //assign
                fillCombo(CmbassignRes,"Select the Res_Code",reservations,"reservationcode",empallocation.lafromreservation_id.reservationcode);
                CmbassignRes.disabled = true;
                fillCombo(Cmbassignemployee,"Select the Labor",laboremployee,"number",empallocation.laboremployee_id.number);
                Cmbassignemployee.disabled = true;

                assignDatetime.value = empallocation.assigndatetime;
                assignDatetime.style.border = valid;




            }

            else if(empallocation.latype_id.name == "Emp-Remove"){

                Alassign.style.display = "none";
                Alremove.style.display = "block";
                Altin.style.display = "none";
                Altout.style.display = "none";


                fillCombo(CmbremoveRes,"Select the Res_Code",reservations,"reservationcode",empallocation.lafromreservation_id.reservationcode);
                CmbremoveRes.disabled = true;

                fillCombo(Cmbremoveeployee,"Select the Labor",laboremployee,"number",empallocation.laboremployee_id.number);
                Cmbremoveeployee.disabled = true;

                removeDateandtime.value = empallocation.removedatetime;
                removeDateandtime.style.border = valid;


            } else if(empallocation.latype_id.name == "Emp-Transfer In"){

                Alassign.style.display = "none";
                Alremove.style.display = "none";
                Altin.style.display = "block";
                Altout.style.display = "none";


                fillCombo(CmbTinFromRes,"Select the Res_Code",reservations,"reservationcode",empallocation.lafromreservation_id.reservationcode);
                CmbTinFromRes.disabled = true;


                fillCombo(CmbTinToRes,"Select the Res_Code",reservations,"reservationcode",empallocation.latoreservation_id.reservationcode);
                CmbTinToRes.disabled = true;

                fillCombo(CmbTinemployee,"Select the Labor",laboremployee,"number",empallocation.laboremployee_id.number);
                CmbTinemployee.disabled = true;


                TinDatetime.value = empallocation.transferindatetime;
                TinDatetime.style.border = valid;
                TinDatetime.disabled = true;



            }else if(empallocation.latype_id.name == "Emp-Transfer Out"){

                Alassign.style.display = "none";
                Alremove.style.display = "none";
                Altin.style.display = "none";
                Altout.style.display = "block";

                fillCombo(CmbToutFromRes,"Select the Res_Code",reservations,"reservationcode",empallocation.lafromreservation_id.reservationcode);
                fillCombo(CmbToutToRes,"Select the Res_Code",reservations,"reservationcode",empallocation.latoreservation_id.reservationcode);
                fillCombo(CmbToutemployee,"Select the Labor",laboremployee,"number",empallocation.laboremployee_id.number);

                ToutDatetime.value = empallocation.transferoutdatetime;
                ToutDatetime.style.border = valid;
                ToutDatetime.disabled = true;





            }


            //setDefaultFile('flePhoto', employee.photo);

            disableButtons(true, false, false);
            //setStyle(valid);
            changeTab('form');
        }

        function getUpdates() {

            var updates = "";

            if(empallocation!=null && oldempallocation!=null) {

                if(empallocation.lastatus_id.name != oldempallocation.lastatus_id.name){
                    updates = updates + "\nReservation Status is Changed.." + oldempallocation.lastatus_id.name +" into " + empallocation.lastatus_id.name;

                }


                if(empallocation.latype_id.name == "Emp-Assign"){


                     if(empallocation.lafromreservation_id.reservationcode !=oldempallocation.lafromreservation_id.reservationcode){
                         updates = updates + "\nAssign Reservation Code is Changed.." + oldempallocation.lafromreservation_id.reservationcode +" into " +empallocation.lafromreservation_id.reservationcode  ;

                     }
                    if(empallocation.laboremployee_id.number !=oldempallocation.laboremployee_id.number){
                        updates = updates + "\nLabor  is Changed.." + oldempallocation.laboremployee_id.number +" into " +empallocation.laboremployee_id.number;

                    }
                    if(empallocation.assigndatetime !=oldempallocation.assigndatetime){
                        updates = updates + "\nAssign Date & Time  is Changed.." + oldempallocation.assigndatetime+" into " +empallocation.assigndatetime;

                    }

                    if(empallocation.assigndatetime !=oldempallocation.assigndatetime){
                        updates = updates + "\nAssign Date & Time  is Changed.." + oldempallocation.assigndatetime +" into " +empallocation.assigndatetime;

                    }

                }else if(empallocation.latype_id.name == "Emp-Remove"){

                    if(empallocation.lafromreservation_id.reservationcode !=oldempallocation.lafromreservation_id.reservationcode){
                        updates = updates + "\nRemove Reservation Code is Changed.." + oldempallocation.lafromreservation_id.reservationcode +" into " +empallocation.lafromreservation_id.reservationcode ;

                    }
                    if(empallocation.laboremployee_id.number !=oldempallocation.laboremployee_id.number){
                        updates = updates + "\nLabor  is Changed.." + oldempallocation.laboremployee_id.number +" into " +empallocation.laboremployee_id.number;

                    }
                    if(empallocation.removedatetime !=oldempallocation.removedatetime){
                        updates = updates + "\nRemove Date & Time is Changed.." + oldempallocation.removedatetime +" into " +empallocation.removedatetime;

                    }



                }else if(empallocation.latype_id.name == "Emp-Transfer In"){
                    if(empallocation.lafromreservation_id.reservationcode !=oldempallocation.lafromreservation_id.reservationcode){
                        updates = updates + "\nFrom Reservation Code is Changed.." + oldempallocation.lafromreservation_id.reservationcode +" into " + empallocation.lafromreservation_id.reservationcode;

                    }

                    if(empallocation.latoreservation_id.reservationcode != oldempallocation.latoreservation_id.reservationcode){
                        updates = updates + "\nTo Reservation Code is Changed.." + oldempallocation.latoreservation_id.reservationcode +" into " +empallocation.latoreservation_id.reservationcode ;

                    }

                    if(empallocation.laboremployee_id.number !=oldempallocation.laboremployee_id.number){
                        updates = updates + "\nLabor Code is Changed.." + oldempallocation.laboremployee_id.number +" into " + empallocation.laboremployee_id.number;

                    }
                    if(empallocation.transferindatetime != oldempallocation.transferindatetime){
                        updates = updates + "\nTransfer In Date & time is Changed.." + oldempallocation.transferindatetime+" into " + empallocation.transferindatetime;

                    }



                }else if(empallocation.latype_id.name == "Emp-Transfer Out"){

                    if(empallocation.lafromreservation_id.reservationcode != oldempallocation.lafromreservation_id.reservationcode){
                        updates = updates + "\nFrom Reservation Code is Changed.." + oldempallocation.lafromreservation_id.reservationcode +" into " +empallocation.lafromreservation_id.reservationcode  ;

                    }

                    if(empallocation.latoreservation_id.reservationcode != oldempallocation.latoreservation_id.reservationcode){
                        updates = updates + "\nTo Reservation Code is Changed.." + oldempallocation.latoreservation_id.reservationcode +" into " + empallocation.latoreservation_id.reservationcode;

                    }

                    if(empallocation.laboremployee_id.number !=oldempallocation.laboremployee_id.number){
                        updates = updates + "\nLabor Code is Changed.." + oldempallocation.laboremployee_id.number+" into " +empallocation.laboremployee_id.number ;

                    }



                    if(empallocation.transferoutdatetime != oldempallocation.transferoutdatetime){
                        updates = updates + "\nTransfer Out Date & Time is Changed.." +   oldempallocation.transferoutdatetime +" into " +empallocation.transferoutdatetime ;

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
                            var response = httpRequest("/lallocation", "PUT", empallocation);
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

        function btnDeleteMC(empallo) {
            empallocation = JSON.parse(JSON.stringify(empallo));

            swal({
                title: "Are you sure to delete following customer...?",
                text: "\n ES Code : " + empallocation.lacode  +
                "\nES Type : " + empallocation.latype_id.name,
                icon: "warning", buttons: true, dangerMode: true,
            }).then((willDelete)=> {
                if (willDelete) {
                    var responce = httpRequest("/lallocation","DELETE",empallocation);
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