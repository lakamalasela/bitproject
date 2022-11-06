

 

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

            cmbplanCode.addEventListener("change",getplanDetails);

            cmbestimtionCode.addEventListener("change",getestimationDetails);
            cmbServicename.addEventListener("change",getServiceCharge)

            discountRatio.addEventListener("keyup",getlastPricees);

            privilages = httpRequest("../privilage?module=RESERVATION","GET");

            provinces = httpRequest("../province/list","GET");
            services  = httpRequest("../service/list","GET");

            employees = httpRequest("../employee/list","GET");

            activecustomers = httpRequest("../customer/list","GET");

            supervisors = httpRequest("../employee/supervisorslist","GET");

            //reservationstatus = httpRequest("../servicestatus/list","GET");
            reservationstatus = httpRequest("../reservationstatus/list","GET");


            //innerForm get data
            floorareas = httpRequest("../floorarea/list","GET");
            housesubparts = httpRequest("../housesubparts/list","GET");


            //innersubparts
            housepart = httpRequest("../housepart/list","GET");


            //plan details
            activeplans = httpRequest("../plan/list","GET");

            //estimation details
            activeestimations = httpRequest("../estimation/list","GET");

            constructiontype = httpRequest("../constructiontype/list","GET");

            //zero check
            noBed.addEventListener("keyup",zeroNobed);
            noKitchen.addEventListener("keyup",zeroNokitchen);
            noLiving.addEventListener("keyup",zeroNoLiving);
            noDinning.addEventListener("keyup",zeroNoDining);
            noPantry.addEventListener("keyup",zeroNoPantry);
            noBathroom.addEventListener("keyup",zeroNoBathroom);
            noGuestroom.addEventListener("keyup",zeroNoGuestroom);


            // constructionsubtask = httpRequest("../constructionsubtask/list","GET");
            advancePayment.addEventListener("keyup",getlastpriceByadvance);

            //plan select disabled or not
            //chkPlan.addEventListener("change",addDetailscontroll);



            valid = "2px solid green";
            invalid = "2px solid red";
            initial = "2px solid #d6d6c2";
            updated = "2px solid #ff9900";
            active = "#90EE90";

            loadView();
            loadForm();


            changeTab('form');
            plDetails.style.display = "none";
            esDetails.style.display = "none";
        }

        // function getCus(){
        //     console.log(cmbCustomer.value);
        // }

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
            reservations = new Array();
          var data = httpRequest("/reservation/findAll?page="+page+"&size="+size+query,"GET");
            if(data.content!= undefined) reservations = data.content;
            createPagination('pagination',data.totalPages, data.number+1,paginate);
            fillTable('tblReservation',reservations,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblReservation);

            if(activerowno!="")selectRow(tblReservation,activerowno,active);

        }

        function paginate(page) {


            checkerr = getErrors();

            if(oldreservation == null && addvalue == ""){
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

        function viewitem(res,rowno) {

            viewreservation = JSON.parse(JSON.stringify(res));
            console.log("ViewItem",viewreservation)

            tdrescode.innerHTML = viewreservation.reservationcode;
            tdptitle.innerHTML = viewreservation.projecttitle;
            tdlocation.innerHTML = viewreservation.projectlocation;
            tdcuscode.innerHTML = viewreservation.customer_id.regno;
            tdprovince.innerHTML = viewreservation.province_id.name;
            tdsupervisor.innerHTML = viewreservation.supervisor_id.number;
            tdsname.innerHTML = viewreservation.service_id.servicename;
            tdscharge.innerHTML = "Rs "+ parseFloat( viewreservation.servicecharge).toFixed(2);
            // if(viewreservation.extplan == 0){
            //     tdexnewplan.innerHTML = "<p style='color: green;font-size: 14px;font-weight: 500';>New Plan</p>";;
            // }else{
            //     tdexnewplan.innerHTML = "<p style='color: dodgerblue;font-size: 14px;font-weight: 500'>New Plan</p>";;
            //
            // }
            tdcontype.innerHTML = viewreservation.constructiontype_id.name;


            if(viewreservation.constructionsubtaskHasFloorareaList.length !=0){
                for(index in viewreservation.constructionsubtaskHasFloorareaList){
                    var constructionsubparts = viewreservation.constructionsubtaskHasFloorareaList[index].floorarea_id;
                    if(constructionsubparts.name == "Ground Floor"){
                        tdnfloor.innerHTML = 0;
                    }else if(constructionsubparts.name == "First Floor"){
                        tdnfloor.innerHTML = 1;
                    }else if(constructionsubparts.name == "Second Floor"){
                        tdnfloor.innerHTML = 2;
                    }else if(constructionsubparts.name == "Third Floor"){
                        tdnfloor.innerHTML = 3;
                    }

                }
            }
            tdtcharge.innerHTML = "Rs "+parseFloat(viewreservation.totalcharge).toFixed(2);
            if(viewreservation.discountratio != null){
                tddratio.innerHTML = parseFloat(viewreservation.discountratio).toFixed(2)+" %";

            }else{
                tddratio.innerHTML = "<p style='color: red;font-size: 14px;'>No Discount</p>";

            }
            tdlprice.innerHTML = "Rs "+ parseFloat(viewreservation.lastprice).toFixed(2);
            tdapayment.innerHTML = "Rs "+ parseFloat(viewreservation.advance).toFixed(2);

            if(viewreservation.paidamount != null){
                tdpaidamount.innerHTML = "Rs "+ parseFloat(viewreservation.paidamount).toFixed(2);
            }else {
                tdpaidamount.innerHTML =  "<p style='color: red;font-size: 14px;'>No Paid Amount</p>";
            }


            if(viewreservation.plan_id !=null){
                tdpcode.innerHTML = viewreservation.plan_id.plancode;
                tdpadedddate.innerHTML = viewreservation.plan_id.addeddate;
                tdpcharge.innerHTML = "Rs "+ parseFloat(viewreservation.plan_id.plancharge).toFixed(2);
                tdtotalarea.innerHTML = viewreservation.plan_id.totalarea + " Sqft";
            }else{
                tdpcode.innerHTML =  "<p style='color: red;font-size: 14px;'>None</p>";
                tdpadedddate.innerHTML = "<p style='color: red;font-size: 14px;'>None</p>";
                tdpcharge.innerHTML = "<p style='color: red;font-size: 14px;'>None</p>";
                tdtotalarea.innerHTML = "<p style='color: red;font-size: 14px;'>None</p>";
            }

            if(viewreservation.estimation_id != null){
                tdescode.innerHTML = viewreservation.estimation_id.estimationcode;
                tdeadedddate.innerHTML = viewreservation.estimationaddeddate;
                tdescost.innerHTML = "Rs "+ parseFloat( viewreservation.estimationcost).toFixed(2);
                tdtotalescost.innerHTML = "Rs "+ parseFloat(viewreservation.totalestimatedcost).toFixed(2);
            }else{
                tdescode.innerHTML =  "<p style='color: red;font-size: 14px;'>None</p>";
                tdeadedddate.innerHTML =  "<p style='color: red;font-size: 14px;'>None</p>";
                tdescost.innerHTML =  "<p style='color: red;font-size: 14px;'>None</p>";
                tdtotalescost.innerHTML =  "<p style='color: red;font-size: 14px;'>None</p>";
            }
            tdstatus.innerHTML = viewreservation.reservationstatus_id.name;


            if(viewreservation.description == null){
                tddescription.innerHTML  = "<p style='color: red;font-size: 14px;'>No Description Added</p>"
            }else{
                tddescription.innerHTML = viewreservation.description;
            }

            tdaddeddate.innerHTML = viewreservation.addeddate;
            tdaddedby.innerHTML = viewreservation.employee_id.callingname;

            fillInnerTable("tblInnerrowprint", viewreservation.constructionsubtaskHasFloorareaList,innerModify,innerDelete,false);

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
             //     "<body><div style='margin-top: 150px'><h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Reservation Details :</span> </h1></div>" +
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
                 "</address></div></div></di><hr> <h1>Reservation Details :</h1></div>" +
                 "<div>"+format+"</div>" +
                 "<script>printformtable.removeAttribute('style')</script>" +
                 "</body></html>");
             setTimeout(function () {newwindow.print(); newwindow.close();},100);

         }


        function loadForm() {
            reservation = new Object();
            oldreservation = null;

            reservation.constructionsubtaskHasFloorareaList = new Array();

            innerbedroom = false;
            innerkitchen = false;
            innerlivingroom = false;
            innerdinningroom = false;
            innerpantry = false;
            innerbathroom = false;
            innerguestroom = false;

            innerlistchange = false;

            // console.log(reservation.extplan);
            fillCombo(cmbCustomer,"Select the Customer",activecustomers,"regno","");
            fillCombo(cmbProvince,"Select the Province",provinces,"name","");
            //fillCombo(cmbSupervisor,"Select the Supervisor",supervisors,"number","");
            // fillCombo(cmbSupervisor,"Select the Supervisor",employees,"number",session.getObject('activeuser').employeeId.callingname);
            fillCombo(cmbSupervisor,"Select Civil Status",employees,"callingname",session.getObject('activeuser').employeeId.callingname);

            // fillCombo(cmbStatus,"Select the customer status",customerstatus,"name","Active");
            reservation.supervisor_id = JSON.parse(cmbSupervisor.value);
            cmbSupervisor.disabled = true;

             fillCombo(cmbServicename,"Selec the Service name",services,"servicename","");

            fillCombo(cmbreservationStatus,"Selec the Reservation Status",reservationstatus,"name","In-Progress");
            fillCombo(cmbaddedBy,"Select Civil Status",employees,"callingname",session.getObject('activeuser').employeeId.callingname);

            //plan details
            fillCombo(cmbplanCode,"Selec the Plan Code",activeplans,"plancode","");

            //estimation details
            fillCombo(cmbestimtionCode,"Selec the Estimation Code",activeestimations,"estimationcode","");

            fillCombo(cmbcontype,"Selec the Construction Type",constructiontype,"name","");


            $('#subparts').collapse({
                hide: true
            })

            //internal details load hide
            $('#collapseIntern').collapse({
                hide: true
            })

             reservation.employee_id = JSON.parse(cmbaddedBy.value);
             cmbaddedBy.disabled = true;
            //
             reservation.reservationstatus_id=JSON.parse(cmbreservationStatus.value);
             cmbreservationStatus.disabled = true;

            reservation.paidamount = parseFloat(0).toFixed(2);
            //  //supervisor
            // reservation.supervisor_id = JSON.parse(cmbSupervisor.value);
            // cmbSupervisor.disabled = true;

             var today = new Date();
             var month = today.getMonth()+1;
             if(month<10) month = "0"+month;
             var date = today.getDate();
             if(date<10) date = "0"+date;

            addedDate.value=today.getFullYear()+"-"+month+"-"+date;
             reservation.addeddate=addedDate.value;
            addedDate.disabled = true;
            addedDate.style.border = valid;

            //
            // chkPlan.checked = false;
            // reservation.extplan = false;
            // $('#chkPlan').bootstrapToggle('off');


            //initial value

            projectTitle.value = "";
            projectLocation.value = "";
            serviceCharge.value = "";

            // totalCharge.value = "";
            // discountRatio.value = "";
            // lastPrice.value = "";

            addPaymentload();

            NumberOfFloor.value = "";
            resDescription.value = "";

            //plan load
            addPlanload();

            //estimation load
            addEstimtionload();


            var nextnumber = httpRequest("../reservation/nextnumber","GET");
            reservationCode.value = nextnumber.reservationcode;
             reservation.reservationcode =  reservationCode.value ;
            reservationCode.disabled = true;
            reservationCode.style.border = valid;

            //
            // if(reservation.extplan){
            //     planDetailsAdd.disabled = true;
            //     planDetailsAdd.style.cursor ="not-allowed";
            //     estimationDetailsAdd.disabled = true;
            //     estimationDetailsAdd.style.cursor ="not-allowed";
            //
            // }else {
            //     planDetailsAdd.disabled = false;
            //     planDetailsAdd.style.cursor ="pointer";
            //     estimationDetailsAdd.disabled = false;
            //     estimationDetailsAdd.style.cursor ="pointer";
            //
            // }

            // planDetailsAdd.disabled = true;
            // $('#planDetailsAdd').css('cursor','not-allowed');
            // estimationDetailsAdd.disabled = true;
            // $('#estimationDetailsAdd').css('cursor','not-allowed');
            // AddDesignerbtn.disabled = true;
            // $('#AddDesignerbtn').css('cursor','not-allowed');
            // addQs.disabled = true;
            // $('#addQs').css('cursor','not-allowed');






            setStyle(initial);

            disableButtons(false, true, true);
             refreshInnerForm();
        }

        function zeroNobed(){
            if(noBed.value == 0){
                swal({
                    title: "You Can't Type the Zero for the No of Bed...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
                noBed.style.border = invalid;
            }
        }
        function zeroNokitchen(){

            if(noKitchen.value == 0){
                swal({
                    title: "You Can't Type the Zero for the No of Kitchen...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
                noKitchen.style.border = invalid;
            }

        }
        function zeroNoLiving(){

            if(noLiving.value == 0){
                swal({
                    title: "You Can't Type the Zero for the No of Living...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
                noLiving.style.border = invalid;
            }

        }
        function zeroNoDining(){

            if(noDinning.value == 0){
                swal({
                    title: "You Can't Type the Zero for the No of Dinning...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
                noDinning.style.border = invalid;
            }


        }
        function zeroNoPantry(){


            if(noPantry.value == 0){
                swal({
                    title: "You Can't Type the Zero for the No of Guest Room-02...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
                noPantry.style.border = invalid;
            }

        }
        function zeroNoBathroom(){

            if(noBathroom.value == 0){
                swal({
                    title: "You Can't Type the Zero for the No of Bath Room...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
                noBathroom.style.border = invalid;
            }
        }

        function zeroNoGuestroom(){

            if(noGuestroom.value == 0){
                swal({
                    title: "You Can't Type the Zero for the No of Guest Room...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
                noGuestroom.style.border = invalid;
            }

        }




        function addDetailscontroll(){

            console.log("Check Box here")
            // if(reservation.extplan){
            //     planDetailsAdd.disabled = true;
            //     planDetailsAdd.style.cursor ="not-allowed";
            //
            // }else {
            //     planDetailsAdd.disabled = false;
            //     planDetailsAdd.style.cursor ="pointer";
            // }

        }

        function getplanDetails(){
            // console.log("plan Details Are",JSON.parse(cmbplanCode.value));
            var plandetails = JSON.parse(cmbplanCode.value)

            planaddedDate.value = plandetails.addeddate;
            reservation.planaddeddate = planaddedDate.value;

            planCharge.value = parseFloat(plandetails.plancharge).toFixed(2);
            reservation.plancharge = planCharge.value;

            totalArea.value = parseFloat(plandetails.totalarea).toFixed(2);
            reservation.totalarea =  totalArea.value;

            //disabled
            planaddedDate.disabled = true;
            planCharge.disabled = true;
            totalArea.disabled = true;

            //valid
            planaddedDate.style.border = valid;
            planCharge.style.border = valid;
            totalArea.style.border = valid;

            if(oldreservation != null && (oldreservation.plan_id == null || oldreservation.plan_id.plancode != reservation.plan_id.plancode)){
                cmbplanCode.style.border = updated;
                planaddedDate.style.border = updated;
                planCharge.style.border = updated;
                totalArea.style.border = updated;
            }else{
                cmbplanCode.style.border = valid;
            }


            //payment
            if((cmbestimtionCode.value)!=""){
                totalCharge.value = (parseFloat(plandetails.plancharge) + parseFloat(serviceChargeSet)+ parseFloat(estimationdetails.estimationcharge)+parseFloat(estimationdetails.totalestimationcost)).toFixed(2);
               // totalCharge.value = (parseFloat(plandetails.plancharge) + parseFloat(estimationdetails.estimationcharge)+parseFloat(estimationdetails.totalestimationcost)).toFixed(2);

                totalCharge.style.border = valid;
                reservation.totalcharge = totalCharge.value;
                lastPrice.value =   reservation.totalcharge;
                reservation.lastprice =   lastPrice.value;
                lastPrice.style.border = valid;

                advancePayment.value = parseFloat(lastPrice.value * 0.1).toFixed(2);
                reservation.advance = advancePayment.value;
                advancePayment.style.border = valid;


                //
                // if((discountRatio.value) != null){
                //     disRatio = totalCharge.value * ((discountRatio.value)/100);
                //     lastPrice.value = (parseFloat(totalCharge.value) - parseFloat(disRatio)).toFixed(2);
                //     reservation.lastprice = lastPrice.value;
                //     lastPrice.style.border = valid;
                // }else{
                //     lastPrice.value = parseFloat(totalCharge.value).toFixed(2);
                //     reservation.lastprice = lastPrice.value;
                // }
                // lastPrice.value = totalCharge.value *
            }else{
                totalCharge.value = (parseFloat(plandetails.plancharge)+ parseFloat( serviceCharge.value)).toFixed(2);
               // totalCharge.value = parseFloat(plandetails.plancharge).toFixed(2);

                totalCharge.style.border = valid;
                reservation.totalcharge = totalCharge.value;
                lastPrice.value =   reservation.totalcharge;
                reservation.lastprice =   lastPrice.value;
                lastPrice.style.border = valid;

                advancePayment.value = parseFloat(lastPrice.value * 0.1).toFixed(2);
                reservation.advance = advancePayment.value;
                advancePayment.style.border = valid;

                // if((discountRatio.value) != null){
                //     disRatio = totalCharge.value * ((discountRatio.value)/100);
                //     lastPrice.value = (parseFloat(totalCharge.value) - parseFloat(disRatio)).toFixed(2);
                //     reservation.lastprice = lastPrice.value;
                //     lastPrice.style.border = valid;
                // }else{
                //     lastPrice.value = parseFloat(totalCharge.value).toFixed(2);
                //     reservation.lastprice = lastPrice.value;
                //     lastPrice.style.border = valid;
                // }

            }


            if(oldreservation != null && (oldreservation.totalcharge == null || oldreservation.totalcharge != reservation.totalcharge)){
                totalCharge.style.border = updated;
            }else{
                totalCharge.style.border = valid;
            }

            if(oldreservation != null && (oldreservation.lastprice == null || oldreservation.lastprice != reservation.lastprice)){
                lastPrice.style.border = updated;
            }else{
                lastPrice.style.border = valid;
            }

            if(oldreservation != null && (oldreservation.advance == null || oldreservation.advance != reservation.advance)){
                advancePayment.style.border = updated;
            }else{
                advancePayment.style.border = valid;
            }




        }

        function getestimationDetails(){
            // console.log("Estimation Details",JSON.parse(cmbestimtionCode.value));
            estimationdetails = JSON.parse(cmbestimtionCode.value);

            estimationaddedDate.value = estimationdetails.addeddate;
            reservation.estimationaddeddate = estimationaddedDate.value;

            estimationCost.value  = parseFloat(estimationdetails.estimationcharge).toFixed(2);
            reservation.estimationcost = estimationCost.value;

            estimatedCost.value = parseFloat(estimationdetails.totalestimationcost).toFixed(2);
            reservation.totalestimatedcost =  estimatedCost.value;

            //vaild
            estimationaddedDate.style.border = valid;
            estimationCost.style.border = valid;
            estimatedCost.style.border = valid;

            //disabled
            estimationaddedDate.disabled = true;
            estimationCost.disabled = true;
            estimatedCost.disabled = true;

            //
            if(oldreservation != null && (oldreservation.estimation_id == null || oldreservation.estimation_id.estimationcode != reservation.estimation_id.estimationcode)){
                cmbestimtionCode.style.border = updated;
                estimationaddedDate.style.border = updated;
                estimationCost.style.border = updated;
                estimatedCost.style.border = updated;

            }else{
                cmbestimtionCode.style.border = valid;
            }




            //payment
            if((cmbplanCode.value)!=""){
                totalCharge.value = (parseFloat(JSON.parse(cmbplanCode.value).plancharge) + parseFloat(serviceCharge.value)+ parseFloat(estimationdetails.estimationcharge)+parseFloat(estimationdetails.totalestimationcost)).toFixed(2);
                //totalCharge.value = (parseFloat(JSON.parse(cmbplanCode.value).plancharge) +  parseFloat(estimationdetails.estimationcharge)+parseFloat(estimationdetails.totalestimationcost)).toFixed(2);

                totalCharge.style.border = valid;
                reservation.totalcharge = totalCharge.value;
                lastPrice.value =   reservation.totalcharge;
                reservation.lastprice =   lastPrice.value;
                lastPrice.style.border = valid;

                advancePayment.value = parseFloat(lastPrice.value * 0.1).toFixed(2);
                reservation.advance = advancePayment.value;
                advancePayment.style.border = valid;



                // if((discountRatio.value) != ""){
                //     disRatio = totalCharge.value * ((discountRatio.value)/100);
                //     lastPrice.value = (parseFloat(totalCharge.value) - parseFloat(disRatio)).toFixed(2);
                //     reservation.lastprice = lastPrice.value;
                //     lastPrice.style.border = valid;
                // }else{
                //     //lastPrice.value = parseFloat(totalCharge.value).toFixed(2);
                //     lastPrice.value =  totalCharge.value;
                //     console.log("Last Price",totalCharge.value)
                //     reservation.lastprice = lastPrice.value;
                // }
                // if((discountRatio.value) == "No Discount Added"){
                //
                //     //lastPrice.value = parseFloat(totalCharge.value).toFixed(2);
                //     lastPrice.value =  totalCharge.value;
                //     console.log("Last Price",totalCharge.value)
                //     reservation.lastprice = lastPrice.value;
                // }
                // lastPrice.value = totalCharge.value *
            }else{
                totalCharge.value = (parseFloat(estimationdetails.estimationcharge)+ parseFloat( serviceCharge.value)).toFixed(2);
                //totalCharge.value = parseFloat(estimationdetails.estimationcharge).toFixed(2);

                totalCharge.style.border = valid;
                reservation.totalcharge = totalCharge.value;
                lastPrice.value =   reservation.totalcharge;
                reservation.lastprice =   lastPrice.value;
                lastPrice.style.border = valid;

                advancePayment.value = parseFloat(lastPrice.value * 0.1).toFixed(2);
                reservation.advance = advancePayment.value;
                advancePayment.style.border = valid;



                // if((discountRatio.value) != ""){
                //     disRatio = totalCharge.value * ((discountRatio.value)/100);
                //     lastPrice.value = (parseFloat(totalCharge.value) - parseFloat(disRatio)).toFixed(2);
                //     reservation.lastprice = lastPrice.value;
                //     lastPrice.style.border = valid;
                // }else{
                //     lastPrice.value = parseFloat(totalCharge.value).toFixed(2);
                //     reservation.lastprice = lastPrice.value;
                //     lastPrice.style.border = valid;
                // }

            }

            if(oldreservation != null && (oldreservation.totalcharge == null || oldreservation.totalcharge != reservation.estimation_id.totalcharge)){
                totalCharge.style.border = updated;
            }else{
                totalCharge.style.border = valid;
            }

            if(oldreservation != null && (oldreservation.lastprice == null || oldreservation.lastprice != reservation.estimation_id.lastprice)){
                lastPrice.style.border = updated;
            }else{
                lastPrice.style.border = valid;
            }

            if(oldreservation != null && (oldreservation.advance == null || oldreservation.advance != reservation.estimation_id.advance)){
                advancePayment.style.border = updated;
            }else{
                advancePayment.style.border = valid;
            }


        }

        function getlastpriceByadvance(){
            if((parseFloat(totalCharge.value)) >(parseFloat(advancePayment.value))){
                if(discountRatio.value !=""){
                  disrationwithadvance = totalCharge.value * ((discountRatio.value)/100);
                    lastPrice.value = (parseFloat(totalCharge.value) -(parseFloat(disrationwithadvance)+ parseFloat(advancePayment.value))).toFixed(2);
                    reservation.lastprice =  lastPrice.value;
                    lastPrice.style.border = valid;
                }else{
                    lastPrice.value = (parseFloat(totalCharge.value) - parseFloat(advancePayment.value)).toFixed(2);
                    reservation.lastprice =  lastPrice.value;
                    lastPrice.style.border = valid;
                }

            }else{
                swal({
                    title: "Payment Was Completed...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer: 1500,
                });
                advancePayment.value = "";
                advancePayment.style.border = initial;
                reservation.advance = null;

                //total charge
                lastPrice.value = totalCharge.value;
                reservation.lastprice =  lastPrice.value;

            }


            if(oldreservation != null && (oldreservation.lastprice == null || oldreservation.lastprice != reservation.estimation_id.lastprice)){
                lastPrice.style.border = updated;
            }else{
                lastPrice.style.border = valid;
            }

        }
        function getlastPricees(){

            if((discountRatio.value) != ""){
                disRatio = totalCharge.value * ((discountRatio.value)/100);
                lastPrice.value = (parseFloat(totalCharge.value) - parseFloat(disRatio)).toFixed(2);
                reservation.lastprice = lastPrice.value;
                lastPrice.style.border = valid;
            }else if((advancePayment.value) !=""){
                lastPrice.value = parseFloat(totalCharge.value).toFixed(2);
                reservation.lastprice = lastPrice.value;
                lastPrice.style.border = valid;
            }


            if(oldreservation != null && (oldreservation.lastprice == null || oldreservation.lastprice != reservation.estimation_id.lastprice)){
                lastPrice.style.border = updated;
            }else{
                lastPrice.style.border = valid;
            }

        }
        function getServiceCharge(){



            var serviceChargeSet = JSON.parse(cmbServicename.value).servicecharge;
            console.log("ALL",JSON.parse(cmbServicename.value));

           // projectTitle.value = JSON.parse(cmbServicename.value).servicename;

            serviceCharge.value = parseFloat(serviceChargeSet).toFixed(2);
            reservation.servicecharge = serviceCharge.value;

            if(reservation.servicecharge != null){
                serviceCharge.style.border = valid;
            }else{
                serviceCharge.style.border = invalid;
            }
            if(oldreservation != null && oldreservation.service_id.serviceno != reservation.service_id.serviceno){
                serviceCharge.style.border = updated;
            }else{
                serviceCharge.style.border = valid;
            }


            if(cmbplanCode.value !="" || cmbestimtionCode.value != ""){

                totalCharge.value = (parseFloat(JSON.parse(cmbplanCode.value).plancharge) + parseFloat(serviceCharge.value)+ parseFloat(estimationdetails.estimationcharge)+parseFloat(estimationdetails.totalestimationcost)).toFixed(2);
                //totalCharge.value = (parseFloat(JSON.parse(cmbplanCode.value).plancharge) + parseFloat(estimationdetails.estimationcharge)+parseFloat(estimationdetails.totalestimationcost)).toFixed(2);
                totalCharge.style.border = valid;
                reservation.totalcharge = totalCharge.value;
                lastPrice.value =   reservation.totalcharge;
                reservation.lastprice =   lastPrice.value;
                lastPrice.style.border = valid;

                advancePayment.value = parseFloat(lastPrice.value * 0.1).toFixed(2);
                reservation.advance = advancePayment.value;
                advancePayment.style.border = valid;


            }else if(cmbplanCode.value !=""){
               // totalCharge.value = parseFloat(plandetails.plancharge).toFixed(2);
                totalCharge.value = (parseFloat(plandetails.plancharge)+ parseFloat( serviceCharge.value)).toFixed(2);
                totalCharge.style.border = valid;
                reservation.totalcharge = totalCharge.value;
                lastPrice.value =   reservation.totalcharge;
                reservation.lastprice =   lastPrice.value;
                lastPrice.style.border = valid;

                advancePayment.value = parseFloat(lastPrice.value * 0.1).toFixed(2);
                reservation.advance = advancePayment.value;
                advancePayment.style.border = valid;

            }else if(cmbestimtionCode.value != ""){
                totalCharge.value = (parseFloat(estimationdetails.estimationcharge)+ parseFloat( serviceCharge.value)).toFixed(2);
               // totalCharge.value = parseFloat(estimationdetails.estimationcharge).toFixed(2);
                totalCharge.style.border = valid;
                reservation.totalcharge = totalCharge.value;
                lastPrice.value =   reservation.totalcharge;
                reservation.lastprice =   lastPrice.value;
                lastPrice.style.border = valid;

                advancePayment.value = parseFloat(lastPrice.value * 0.1).toFixed(2);
                reservation.advance = advancePayment.value;
                advancePayment.style.border = valid;

            }else {
                totalCharge.value = reservation.servicecharge;
                reservation.totalcharge =  totalCharge.value;
                totalCharge.style.border = valid;

                lastPrice.value = reservation.servicecharge;
                reservation.lastprice =  lastPrice.value;
                lastPrice.style.border = valid;
                advancePayment.value = parseFloat(0).toFixed(2);
               // advancePayment.value = parseFloat(totalCharge.value).toFixed(2);
                reservation.advance = advancePayment.value;
                advancePayment.style.border = valid;

                discountRatio.value = parseFloat(0).toFixed(2);
                reservation.discountratio =  discountRatio.value;
                discountRatio.style.border = valid;




            }
        }


         function refreshInnerForm(){
             subpart = new Object();
             oldsubpart = null;
             // innerlistchange = false;

             noBed.disabled = true;
             noKitchen.disabled = true;
             noLiving.disabled = true;
             noDinning.disabled = true;
             noGuestroom.disabled = true;
             noBathroom.disabled = true;
             noPantry.disabled = true;


             subpart.constructionsubtaskHasfloorareaHasHousesubpartsList = new Array();

             fillCombo(cmbdFloorArea,"Select Floor Area",floorareas,"name","");


             fillInnerTable("tblInnersubpart",reservation.constructionsubtaskHasFloorareaList,innerModify,innerDelete,true);

             btnInnerUpdate.disabled = true;
             btnInnerUpdate.style.cursor = "not-allowed";

             btnInnerAdd.disabled = false;
             btnInnerAdd.style.cursor = "pointer";

             cmbdFloorArea.value = "";
             cmbdFloorArea.style.border = initial;


             noBed.value = "";
             noBed.style.border = initial;

             noKitchen.value = "";
             noKitchen.style.border = initial;

             noLiving.value = "";
             noLiving.style.border = initial;

             noDinning.value = "";
             noDinning.style.border = initial;

             noPantry.value = "";
             noPantry.style.border = initial;

             noBathroom.value = "";
             noBathroom.style.border = initial;

             noGuestroom.value = "";
             noGuestroom.style.border = initial;


             if(reservation.constructionsubtaskHasFloorareaList.length !=0){
                 for(index in reservation.constructionsubtaskHasFloorareaList){
                     // console.log(reservation.constructionsubtaskHasFloorareaList)
                     var constructionsubparts = reservation.constructionsubtaskHasFloorareaList[index].floorarea_id;
                     // console.log( JSON.parse(constructionsubparts.floorarea_id));
                     console.log(constructionsubparts);
                     if(constructionsubparts.name == "Ground Floor"){
                         NumberOfFloor.value = 0;
                         NumberOfFloor.style.border = valid;
                     }else if(constructionsubparts.name == "First Floor"){
                         NumberOfFloor.value = 1;
                         NumberOfFloor.style.border = valid;
                     }else if(constructionsubparts.name == "Second Floor"){
                         NumberOfFloor.value = 2;
                         NumberOfFloor.style.border = valid;
                     }else if(constructionsubparts.name == "Third Floor"){
                         NumberOfFloor.value = 3;
                         NumberOfFloor.style.border = valid;
                     }

                 }
             }


        //
        //    var nextsubtask = httpRequest("../subtask/nextnumber","GET");
        //     subtaskCode.value = nextsubtask.subtaskno;
        //     subtask.subtaskno = subtaskCode.value;
        //     subtaskCode.disabled = true;
        //     subtaskCode.style.border = valid;
        //
        //     subtaskDescription.value = "";
             refreshInnerSubparts();
        }

        function refreshInnerSubparts(){

            constructionsubtaskhasfloorareahashousesubpart = new Object();
            oldconstructionsubtaskhasfloorareahashousesubpart = null;


            fillCombo(cmbHouesepart,"Select the House Part",housepart,"name","");
            fillCombo(cmbHouseSubPart,"Select the House Sub Part",housesubparts,"name","");

            fillInnerTable("tblInnerHousesubtask",subpart.constructionsubtaskHasfloorareaHasHousesubpartsList,innersubtaskModify,innersubtaskDelete,true);

            if(subpart.constructionsubtaskHasfloorareaHasHousesubpartsList.length !=0){
                for(index in subpart.constructionsubtaskHasfloorareaHasHousesubpartsList){
                    if((subpart.constructionsubtaskHasfloorareaHasHousesubpartsList[index].housesubparts_id.name)=="Bedroom"){
                        noBed.disabled = false;
                    }else if((subpart.constructionsubtaskHasfloorareaHasHousesubpartsList[index].housesubparts_id.name)=="Dinning"){
                        noDinning.disabled = false;
                    }else if((subpart.constructionsubtaskHasfloorareaHasHousesubpartsList[index].housesubparts_id.name)=="Kitchen"){
                        noKitchen.disabled = false;
                    }else if((subpart.constructionsubtaskHasfloorareaHasHousesubpartsList[index].housesubparts_id.name)=="Living"){
                        noLiving.disabled = false;
                    }else if((subpart.constructionsubtaskHasfloorareaHasHousesubpartsList[index].housesubparts_id.name)=="Guest Room-01"){
                        noGuestroom.disabled = false;
                    }else if((subpart.constructionsubtaskHasfloorareaHasHousesubpartsList[index].housesubparts_id.name)=="Guest Room-02"){
                        noPantry.disabled = false;
                    }else if((subpart.constructionsubtaskHasfloorareaHasHousesubpartsList[index].housesubparts_id.name)=="Bathroom"){
                        noBathroom.disabled = false;
                    }
                }
            }


            cmbHouesepart.value = "";
            cmbHouseSubPart.value = "";

            //cmbHouesepart.style.border = initial;
            $('.Housepartcmbsearch .select2-selection').css('border',initial);
            cmbHouseSubPart.style.border = initial;

            btnsubpartupdate.style.cursor = "not-allowed";
            btnsubpartupdate.disabled = true;

            btnsubpartadd.style.cursor ="pointer";
            btnsubpartadd.disabled = false;


        }
        function getsubparts(){

            subpartbyhousepart = httpRequest("/housesubparts/listbyhousepart?housepartid="+ JSON.parse(cmbHouesepart.value).id,"GET");

            fillCombo(cmbHouseSubPart,"Select the House Sub Part",subpartbyhousepart,"name","");
            cmbHouseSubPart.style.border = initial;
            if(oldconstructionsubtaskhasfloorareahashousesubpart != null && constructionsubtaskhasfloorareahashousesubpart.housesubparts_id.housepart_id.name != JSON.parse(cmbHouesepart.value).name){
                //cmbHouesepart.style.border = updated;
                $('.Housepartcmbsearch .select2-selection').css('border',updated);
            }else{
                //cmbHouesepart.style.border = valid;
                $('.Housepartcmbsearch .select2-selection').css('border',valid);
            }

            constructionsubtaskhasfloorareahashousesubpart.housesubparts_id == null;
        }

        function getsubtaskInnerErrors(){
            var SubpartinnerErrors = "";
            var Subpartinneraddvalue = "";

            if(cmbHouesepart.value == null){

                SubpartinnerErrors = SubpartinnerErrors +"\n" +"House Part Not Selected";
                //cmbHouesepart.style.border = invalid;
                $('.Housepartcmbsearch .select2-selection').css('border',invalid);
            }else
                Subpartinneraddvalue = 1;


            if(constructionsubtaskhasfloorareahashousesubpart.housesubparts_id == null){
                SubpartinnerErrors = SubpartinnerErrors +"\n" +"House Sub Part Not Selected";
                cmbHouseSubPart.style.border = invalid;
            }else
                Subpartinneraddvalue = 1;

            return SubpartinnerErrors;

        }

        function innersubtaskModify(ob,innersubrowno){
            innersubrow = innersubrowno;

            constructionsubtaskhasfloorareahashousesubpart = JSON.parse(JSON.stringify(ob));
            oldconstructionsubtaskhasfloorareahashousesubpart = JSON.parse(JSON.stringify(ob));


            fillCombo(cmbHouesepart,"Select the Floor Area",housepart,"name",constructionsubtaskhasfloorareahashousesubpart.housesubparts_id.housepart_id.name);
            fillCombo(cmbHouseSubPart,"Select the House Sub Part",housesubparts,"name",constructionsubtaskhasfloorareahashousesubpart.housesubparts_id.name);


            btnsubpartupdate.disabled = false;
            btnsubpartadd.disabled = true;

            btnsubpartupdate.style.cursor = "pointer";
            btnsubpartadd.style.cursor ="not-allowed";


        }



        function innersubtaskDelete(constructionsubtaskhasfloorareahashousesubpart,rowno){


            swal({
                title: "Are you sure...?",
                text: "Delete Following Sub Parts ... \n" +

                    "House Sub Part  : " + constructionsubtaskhasfloorareahashousesubpart.housesubparts_id.housepart_id.name,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    swal({
                        title: "Delete Successfully...!",
                        text: "\n",
                        icon: "success",
                        buttons: false,
                        timer: 1500,
                    });

                    subpart.constructionsubtaskHasfloorareaHasHousesubpartsList.splice(rowno, 1);
                   refreshInnerSubparts();


                }
            });


        }


        function getinnersubupdate(){

            var innersubupdate = "";

            if (constructionsubtaskhasfloorareahashousesubpart !=null && oldconstructionsubtaskhasfloorareahashousesubpart !=null){


                if (constructionsubtaskhasfloorareahashousesubpart.housesubparts_id.housepart_id.name != oldconstructionsubtaskhasfloorareahashousesubpart.housesubparts_id.housepart_id.name)
                    innersubupdate = innersubupdate + "\nHouse Part is Changed.." + oldconstructionsubtaskhasfloorareahashousesubpart.housesubparts_id.housepart_id.name + " into " + constructionsubtaskhasfloorareahashousesubpart.housesubparts_id.housepart_id.name;


                if (constructionsubtaskhasfloorareahashousesubpart.housesubparts_id.name != oldconstructionsubtaskhasfloorareahashousesubpart.housesubparts_id.name)
                    innersubupdate = innersubupdate + "\nHouse Sub Part is Changed.." + oldconstructionsubtaskhasfloorareahashousesubpart.housesubparts_id.name + " into " + constructionsubtaskhasfloorareahashousesubpart.housesubparts_id.name;

                // if( isEqual(subpart.constructionsubtaskHasfloorareaHasHousesubpartsList,subpart.constructionsubtaskHasfloorareaHasHousesubpartsList,'housesubparts_id'))
                //     innerplanupdate = innerplanupdate + "\nSub Area Details is Changed "

            }
            return innersubupdate;


        }


        function subinnerClearHP(){

            swal({
                title: "Are you sure To Clear the Sub Area Details Form...?",
                text: " \n",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    refreshInnerSubparts();

                }
            });


        }

        function subinnerUpdate(){



            var innersubErrors = getsubtaskInnerErrors();
            if(innersubErrors == ""){
                var innersubUpdate = getinnersubupdate();
                if(innersubUpdate == ""){
                    swal({
                        title: 'Nothing Updated..!', icon: "warning",
                        text: '\n',
                        button: false,
                        timer: 1200
                    });
                }else{
                    swal({
                        title: "Are you sure to House Sub Part Form update following details...?",
                        text: "\n" + innersubUpdate,
                        icon: "warning", buttons: true, dangerMode: true,
                    })


                        .then((willDelete) => {
                            if (willDelete) {

                                swal({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Your work has been Done \n Update SuccessFully..!',
                                    text: '\n',
                                    button: false,
                                    timer: 1200
                                });
                                // console.log(innerrow);
                                subpart.constructionsubtaskHasfloorareaHasHousesubpartsList[innersubrow] = constructionsubtaskhasfloorareahashousesubpart;
                                refreshInnerSubparts();
                                //console.log(reservation.constructionsubtaskHasFloorareaList[innerrow])
                                //refreshInnerForm();

                            }
                        });



                }
            }else{
                swal({
                    title: 'You have following errors in your form', icon: "error",
                    text: '\n ' + getInnerErrors(),
                    button: true
                });
            }


        }



        function subinnerAdd(){


            var subtaskErrors = getsubtaskInnerErrors();

            if (subtaskErrors == "") {
                saveInnersubareadata();

            } else {
                swal({
                    title: "You don't fill some feilds...!",
                    text: subtaskErrors,
                    icon: "warning",
                    buttons: true,

                });
            }




        }

        function saveInnersubareadata(){


            var subpartList = false;

            for(index in  subpart.constructionsubtaskHasfloorareaHasHousesubpartsList){
                if( subpart.constructionsubtaskHasfloorareaHasHousesubpartsList[index].housesubparts_id.name== constructionsubtaskhasfloorareahashousesubpart.housesubparts_id.name){

                    subpartList = true;
                    break;
                }
            }



            if(subpartList){
                swal({
                    title: " Allready Exisit...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer: 1500,
                });
                refreshInnerSubparts();

            }else{


                swal({
                    title: "Are you sure...?",
                    text: "Add Following Details ... \n" +

                        "\n House Part : " + JSON.parse(cmbHouesepart.value).name +

                        "\n House Sub Part : " + constructionsubtaskhasfloorareahashousesubpart.housesubparts_id.name,




                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        swal({
                            title: "Save Successfully...!",
                            text: "\n",
                            icon: "success",
                            buttons: false,
                            timer: 1500,
                        });


                        subpart.constructionsubtaskHasfloorareaHasHousesubpartsList.push(constructionsubtaskhasfloorareahashousesubpart);
                        console.log(subpart.constructionsubtaskHasfloorareaHasHousesubpartsList);
                        refreshInnerSubparts();

                    }
                });
            }





        }

        function innerModify(ob,innerrowno){
            innerrow = innerrowno;

            subpart = JSON.parse(JSON.stringify(ob));
            oldsubpart = JSON.parse(JSON.stringify(ob));

            btnInnerUpdate.disabled = false;
            btnInnerAdd.disabled = true;

            btnInnerUpdate.style.cursor = "pointer";
            btnInnerAdd.style.cursor ="not-allowed";


            fillCombo(cmbdFloorArea,"Select the Floor Area",floorareas,"name",subpart.floorarea_id.name);



            if(subpart.numberofbedroom != null){
                noBed.value = subpart.numberofbedroom;
                noBed.style.border = valid;
            }

            if(subpart.numberofkitchen != null){
                noKitchen.value = subpart.numberofkitchen;
                noKitchen.style.border = valid;
            }
            if(subpart.numberoflivingroom != null){
                noLiving.value = subpart.numberoflivingroom;
                noLiving.style.border = valid;
            }
            if(subpart.numberofdinningroom != null){
                noDinning.value = subpart.numberofdinningroom;
                noDinning.style.border = valid;
            }
            if(subpart.numberofpantry != null){
                noPantry.value = subpart.numberofpantry;
                noPantry.style.border = valid;
            }
            if(subpart.numberofbathroom != null){
                noBathroom.value = subpart.numberofbathroom;
                noBathroom.style.border = valid;
            }
            if(subpart.numberofguestroom != null){
                noGuestroom.value = subpart.numberofguestroom;
                noGuestroom.style.border = valid;
            }

            refreshInnerSubparts();


        }
        function innerDelete(subpart,rowno){

            swal({
                title: "Are you sure...?",
                text: "Delete Following Sub Parts ... \n" +
                    "Floor Area  : " + subpart.floorarea_id.name,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    swal({
                        title: "Delete Successfully...!",
                        text: "\n",
                        icon: "success",
                        buttons: false,
                        timer: 1500,
                    });

                    reservation.constructionsubtaskHasFloorareaList.splice(rowno, 1);
                    refreshInnerForm();


                }
            });


        }



        function getInnerUpdate(){

            var innerupdate = "";

            if(subpart != null && oldsubpart != null ){

                if (subpart.numberofbedroom != oldsubpart.numberofbedroom){
                    innerupdate = innerupdate + "\nNo of Bed Room is Changed.."  + subpart.numberofbedroom;
                    innerbedroom = true;

                }


                if (subpart.numberofkitchen != oldsubpart.numberofkitchen){
                    innerupdate = innerupdate + "\nNo of Kitchen is Changed.." +  subpart.numberofkitchen;
                    innerkitchen = true;

                }

                if (subpart.numberoflivingroom != oldsubpart.numberoflivingroom){
                    innerupdate = innerupdate + "\nNo of Living Room is Changed.." +  subpart.numberoflivingroom;
                    innerlivingroom = true;
                }


                if (subpart.numberofdinningroom != oldsubpart.numberofdinningroom){
                    innerupdate = innerupdate + "\nNo of Dinning Room is Changed.." +  subpart.numberofdinningroom;
                    innerdinningroom = true;

                }


                if (subpart.numberofpantry != oldsubpart.numberofpantry){
                    innerupdate = innerupdate + "\nNo of Guest Room-02 is Changed.." +  subpart.numberofpantry;
                    innerpantry = true;

                }
                if(subpart.numberofbathroom != oldsubpart.numberofbathroom){
                    innerupdate = innerupdate + "\nNo of Bath Room is Changed.." +  subpart.numberofbathroom;
                    innerbathroom = true;

                }
                if(subpart.numberofguestroom != oldsubpart.numberofguestroom){
                    innerupdate = innerupdate + "\nNo of Guest Room-01 is Changed.." +  subpart.numberofguestroom;
                    innerguestroom = true;

                }


                if(isEqual( subpart.constructionsubtaskHasfloorareaHasHousesubpartsList, oldsubpart.constructionsubtaskHasfloorareaHasHousesubpartsList,'housesubparts_id')){
                    innerlistchange = true;
                    innerupdate = innerupdate + "\nHouse Sub Part Details is Change";
                }

            }
            return innerupdate;
        }

        function btnInnerUpdateMC(){


            var innerErrors = getInnerErrors();
            if(innerErrors == ""){
                var innerUpdate = getInnerUpdate();
                if(innerUpdate == ""){
                    swal({
                        title: 'Nothing Updated..!', icon: "warning",
                        text: '\n',
                        button: false,
                        timer: 1200
                    });
                }else{
                    swal({
                        title: "Are you sure to Inner Form update following details...?",
                        text: "\n" + innerUpdate,
                        icon: "warning", buttons: true, dangerMode: true,
                    })


                        .then((willDelete) => {
                            if (willDelete) {

                                swal({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Your work has been Done \n Update SuccessFully..!',
                                    text: '\n',
                                    button: false,
                                    timer: 1200
                                });
                                // console.log(innerrow);
                                reservation.constructionsubtaskHasFloorareaList[innerrow] = subpart;

                                console.log(reservation.constructionsubtaskHasFloorareaList[innerrow])
                                refreshInnerForm();

                            }
                        });



                }
            }else{
                swal({
                    title: 'You have following errors in your form', icon: "error",
                    text: '\n ' + getInnerErrors(),
                    button: true
                });
            }


        }


        function setStyle(style) {


            projectTitle.style.border = style;
            projectLocation.style.border = style;
            $('.Cuscmbsearch .select2-selection').css('border',style);
            //cmbCustomer.style.border = style;
            //cmbProvince.style.border = style;
            $('.Procmbsearch .select2-selection').css('border',style);

            cmbServicename.style.border = style;
            serviceCharge.style.border = style;
            cmbcontype.style.border = style;
            NumberOfFloor.style.border = style;
            // totalCharge.style.border = style;
            // discountRatio.style.border = style;
            // lastPrice.style.border = style;


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

            // select deleted data row
            for(index in reservations){
                if(reservations[index].reservationstatus_id.name =="Deleted"){
                    tblReservation.children[1].children[index].style.color = "#f00";
                    tblReservation.children[1].children[index].style.border = "2px solid red";
                    tblReservation.children[1].children[index].lastChild.children[1].disabled = true;
                    tblReservation.children[1].children[index].lastChild.children[1].style.cursor = "not-allowed";

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


        function getInnerErrors(){
            var innerErrors = "";
            var inneraddvalue = "";


            if(subpart.floorarea_id == null){
                innerErrors = innerErrors +"\n" +"Enter the Floor Area";
                cmbdFloorArea.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(subpart.constructionsubtaskHasfloorareaHasHousesubpartsList == 0){
                innerErrors = innerErrors +"\n" +"House Sub Parts Not Entered";

            }else
                inneraddvalue = 1;



            return innerErrors;
        }

        function btnInnerAddMC(){
            var innerErrors = getInnerErrors();

            if(innerErrors == ""){
                if(noBed.value == "" || noKitchen.value=="" || noLiving.value =="" || noDinning.value == "" || noPantry.value =="" || noBathroom.value =="" || noGuestroom.value == ""){

                    swal({
                        title: "Are you sure to continue...?",
                        text: "Form has some empty fields.....",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then((willDelete) => {
                        if (willDelete) {
                            saveInnerData();
                        }
                    });

                }else{
                    saveInnerData();
                }


            }else{
                swal({
                    title: "You don't fill some feilds...!",
                    text: innerErrors,
                    icon: "warning",
                    buttons: true,

                });
            }

        }

        function saveInnerData(){

            var subtaskListset = false;

            for(index in reservation.subtaskList ){
                if(reservation.constructionsubtaskHasFloorareaList[index].floorarea_id.name == floorarea_id.name){
                    subtaskListset = true;
                    break;
                }
            }

            if(subtaskListset){
                swal({
                    title: " Allready Exisit...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer: 1500,
                });
                refreshInnerForm();

            }else{


                swal({
                    title: "Are you sure...?",
                    text: "Add Following Details ... \n" +

                        "\n Floor Area : " + subpart.floorarea_id.name,





                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        swal({
                            title: "Save Successfully...!",
                            text: "\n",
                            icon: "success",
                            buttons: false,
                            timer: 1500,
                        });


                        //
                        reservation.constructionsubtaskHasFloorareaList.push(subpart);
                        // console.log(BSRHasBSRsubcategory);
                        refreshInnerForm();


                    }
                });
            }

        }

function btnInnerClearMC(){
    swal({
        title: "Are you sure To Clear the Construction Sub Part Form...?",
        text: " \n",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            refreshInnerForm();

        }
    });
}



        function getErrors() {

            var errors = "";
            addvalue = "";


            if (reservation.reservationcode == null) {
                reservationCode.style.border = invalid;
                errors = errors + "\n" + "Reservation Code not Entered";

            }else  addvalue = 1;

            if(reservation.projecttitle ==null){
                projectTitle.style.border = invalid;
                errors = errors + "\n" + "Project Title  not Entered";
            }else addvalue = 1;


            if (reservation.projectlocation == null){
                projectLocation.style.border = invalid;
                errors = errors + "\n" + "Project Location not Entered";
            }
            else  addvalue = 1;


            if (reservation.customer_id == null){
                $('.Cuscmbsearch .select2-selection').css('border',invalid);
                //cmbCustomer.style.border = invalid;
                errors = errors + "\n" + "Customer Code Entered";
            }
            else  addvalue = 1;

            if (reservation.province_id == null){
                $('.Procmbsearch .select2-selection').css('border',invalid);
                //cmbProvince.style.border = invalid;
                errors = errors + "\n" + "Province not Entered";
            }

            else  addvalue = 1;


            if (reservation.supervisor_id == null){
                cmbSupervisor.style.border = invalid;
                errors = errors + "\n" + "Supervisor not Entered";
            }

            else  addvalue = 1;

            if (reservation.service_id == null){
                cmbServicename.style.border = invalid;
                errors = errors + "\n" + "Service Code not Entered";
            }

            else  addvalue = 1;

            if (reservation.servicecharge == null){
                serviceCharge.style.border = invalid;
                errors = errors + "\n" + "Service Charge Not Entered";
            }

            else  addvalue = 1;

            // if (reservation.extplan == null){
            //     // cusEmail.style.border = invalid;
            //     errors = errors + "\n" + "Plan Type Not Entered";
            // }
            //
            // else  addvalue = 1;


            if (reservation.constructiontype_id == null){
                cmbcontype.style.border = invalid;
                errors = errors + "\n" + "Construction Type Not Selected";
            }

            else  addvalue = 1;

            if (NumberOfFloor.value == ""){
                NumberOfFloor.style.border = invalid;
                errors = errors + "\n" + "No Of Floor Not Entered";
            }

            else  addvalue = 1;


            if( reservation.constructionsubtaskHasFloorareaList.length ==0){
                errors = errors + "\n" + "Sub Part List not Entered";
            }

            else  addvalue = 1;

            return errors;

        }

        function btnpaymentAddMc(){

            if(totalCharge.value !="" || discountRatio.value !="" || lastPrice.value !="" || advancePayment.value !=""){

                swal({
                    title: "Your work has been Done \n Save SuccessFully",
                    text: "\n",
                    icon: "success",
                    buttons: false,
                    timer:1000

                });
                $('#paymentAdd').modal('hide');


            }else{

                swal({
                    title: "Payment Added Data Not Filled",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1200

                });
            }

        }

        function addPaymentload(){
            totalCharge.value = "";
            discountRatio.value = "";
            lastPrice.value = "";
            advancePayment.value = "";

            totalCharge.style.border = initial;
            discountRatio.style.border = initial;
            lastPrice.style.border = initial;
            advancePayment.style.border = initial;


        }

        function btnpaymentClearMc(){

            swal({
                title: "Are you sure To Clear the Plan Added Form...?",
                text: " \n",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    addPaymentload();
                }
            });

        }

        function addPlanload(){
            fillCombo(cmbplanCode,"Selec the Plan Code",activeplans,"plancode","");

            planaddedDate.value = "";
            planCharge.value = "";
            totalArea.value = "";

            cmbplanCode.style.border = initial;
            planaddedDate.style.border = initial;
            planCharge.style.border = initial;
            totalArea.style.border = initial;

            reservation.planaddeddate = null;
            reservation.plancharge = null;
            reservation.totalarea = null;

        }

        function btnplanAddMc(){
            if(cmbplanCode.value !="" || planaddedDate.value !="" || planCharge.value !="" || totalArea.value !=""){

                swal({
                    title: "Your work has been Done \n Save SuccessFully",
                    text: "\n",
                    icon: "success",
                    buttons: false,
                    timer:1000

                });
                $('#planAdd').modal('hide');
                planDetailsShow(reservation);

            }else{

                swal({
                    title: "Plan Added Data Not Filled",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1200

                });
            }
        }

        function planDetailsShow(res){

            plDetails.style.display = "block";
            plCode.innerHTML = res.plan_id.plancode;

            if(res.plan_id.planphoto==null)
                plphoto.src= 'resources/image/noimage.png';
            else
                plphoto.src = atob(res.plan_id.planphoto);

            plCharge.innerHTML = res.plancharge;




            // reservation.plancharge





        }
        function btnplanClearMc(){
            swal({
                title: "Are you sure To Clear the Plan Added Form...?",
                text: " \n",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    addPlanload();
                }
            });


        }
        function btnestimationAddMc(){
            if(cmbestimtionCode.value !="" || estimationaddedDate.value !="" || estimationCost.value !="" || estimatedCost.value !=""){

                swal({
                    title: "Your work has been Done \n Save SuccessFully",
                    text: "\n",
                    icon: "success",
                    buttons: false,
                    timer:1000

                });
                $('#estimationAdd').modal('hide');
                estimationDetailsShow(reservation);

            }else{

                swal({
                    title: "Estimation Added Data Not Filled",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1200

                });
            }

        }
        function estimationDetailsShow(res){

            esDetails.style.display = "block";

            esCode.innerHTML =  res.estimation_id.estimationcode;
            esCost.innerHTML = res.estimationcost;
            estedCost.innerHTML = res.totalestimatedcost;

            // reservation.estimationcost
            //
            //
            // reservation.totalestimatedcost



        }
        function addEstimtionload(){
            fillCombo(cmbestimtionCode,"Selec the Estimation Code",activeestimations,"estimationcode","");

            estimationaddedDate.value = "";
            estimationCost.value = "";
            estimatedCost.value = "";

            cmbestimtionCode.style.border = initial;
            estimationaddedDate.style.border = initial;
            estimationCost.style.border = initial;
            estimatedCost.style.border = initial;

            reservation.estimationaddeddate = null;
            reservation.estimationcost = null;
            reservation.totalestimatedcost = null;

            // if(oldreservation != null && oldreservation.estimation_id.estimationcode != reservation.estimation_id.estimationcode){
            //     cmbestimtionCode.style.border = updated;
            // }else{
            //     cmbestimtionCode.style.border = valid;
            // }


        }
        function btnestimationClearMc(){
            swal({
                title: "Are you sure To Clear the Estimation Added Form...?",
                text: " \n",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    addEstimtionload();
                }
            });

        }

        function btnAddMC(){
            if(getErrors()==""){
                if(discountRatio.value == "" ||  advancePayment.value == "" || totalCharge.value == "" ||  lastPrice.value == "" || cmbplanCode.value=="" || planaddedDate.value =="" || planCharge.value == "" || totalArea.value =="" ||
                    cmbestimtionCode.value == ""||estimationaddedDate.value == "" || estimationCost.value == "" ||estimatedCost.value == "" ) {
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

            swal({
                title: "Are you sure to add following customer...?" ,
                text :  "\nReservation Code : " + reservation.reservationcode +
                    "\nProject Title : " + reservation.projecttitle +
                    "\nProject Location : " + reservation.projectlocation +
                    // "\nGender : " + customer.genderId.name +
                    //  "\nCivil Status : " + customer.civilstatusId.name +
                    "\nCustomer Code : " + reservation.customer_id.regno +
                    "\nProvince : " + reservation.province_id.name +
                    "\nSupervisor : " + reservation.supervisor_id.callingname +
                    "\nService Code : " + reservation.service_id.serviceno +
                    "\nService Charge : " + reservation.servicecharge +
                    "\nAdded By : " + reservation.employee_id.callingname +
                    "\nAdded Date : " + reservation.addeddate +
                    "\nStatus : " + reservation.reservationstatus_id.name,

                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    var response = httpRequest("/reservation", "POST", reservation);
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



        function btnClearMC() {
            //Get Cofirmation from the User window.confirm();
            checkerr = getErrors();

            if(oldreservation == null && addvalue == ""){
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

        function fillForm(res,rowno){
            activerowno = rowno;

            if (oldreservation==null) {
                filldata(res);
            } else {
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        filldata(res);
                    }

                });
            }

        }


        function filldata(res) {
            clearSelection(tblReservation);
            selectRow(tblReservation,activerowno,active);

            reservation = JSON.parse(JSON.stringify(res));
            oldreservation = JSON.parse(JSON.stringify(res));

            reservationCode.value = reservation.reservationcode;
            reservationCode.disabled="disabled";
            projectTitle.value = reservation.projecttitle;
            projectLocation.value = reservation.projectlocation;



            serviceCharge.value  = parseFloat(reservation.servicecharge).toFixed(2);

            console.log("esti is",reservation.estimation_id)

            // if(!reservation.extplan){
            //     chkPlan.checked = false;
            //     $('#chkPlan').bootstrapToggle('off')
            // }else {
            //     chkPlan.checked = true;
            //     $('#chkPlan').bootstrapToggle('on')
            // }


            //plan added fill
            //  console.log("Plan Code ",reservation.plan_id.plancode);
            // fillCombo(cmbplanCode,"Selec the Plan Code",activeplans,"plancode",reservation.plan_id.plancode);
            // getplanDetails();

            console.log("Active Plans",activeplans);

        //var subtitle = (reservation.projecttitle).substring()

            console.log("RES_TITLE",reservation.projecttitle);
            appliedtitle = reservation.projecttitle;




            if(reservation.plan_id == null){
                 addPlanload();

                 getapplyplan = httpRequest("/plan/listbyrestitle?reservationtitle="+appliedtitle,"GET");

                 if(getapplyplan != ""){
                     fillCombo(cmbplanCode,"Selec the Plan Code",getapplyplan,"plancode","");

                 }else{
                     fillCombo(cmbplanCode,"Selec the Plan Code",activeplans,"plancode","");

                 }


                // for(index in activeplans){
                //      var plannowithtitle = activeplans[index].rnowithprojecttitle;
                //      var plancodewithtitle = activeplans[index].plancode;
                //     var subout =  plannowithtitle.substring(11,500);
                //      console.log("SubOut",subout);
                //
                //      if(subout ==  projectTitle.value){
                //          fillCombo(cmbplanCode,"Selec the Plan Code",activeplans,"plancode",plancodewithtitle);
                //
                //      }
                //
                //
                //  }

                  //fillCombo(cmbplanCode,"Selec the Plan Code",activeplans,"plancode","");
                 console.log(activeplans);
             }else{
                 fillCombo(cmbplanCode,"Selec the Plan Code",activeplans,"plancode",reservation.plan_id.plancode);
                 //getplanDetails();
                planaddedDate.value = reservation.planaddeddate;
                planaddedDate.style.border = valid;

                planCharge.value = parseFloat(reservation.plancharge).toFixed(2);
                planCharge.style.border = valid;

                totalArea.value = parseFloat(reservation.totalarea).toFixed(2);
                totalArea.style.border = valid;

                // console.log("LAST PRICE",reservation.lastprice);
                // if(reservation.lastprice == ""){
                //     lastPrice.value = "No Last Price Added";
                //     lastPrice.style.border = initial;
                // }else {
                //     lastPrice.value = parseFloat(reservation.lastprice).toFixed(2);
                //
                //     lastPrice.style.border = valid;
                // }
            }

            //estimation added fill

             if(reservation.estimation_id == null){

                 addEstimtionload();
                 getapplyestimation = httpRequest("estimation/listbytitle?reservationtitle="+appliedtitle,"GET");

                 if(getapplyestimation !=""){
                     fillCombo(cmbestimtionCode,"Selec the Estimation Code",getapplyestimation,"estimationcode","");

                 }else{
                     fillCombo(cmbestimtionCode,"Selec the Estimation Code",activeestimations,"estimationcode","");

                 }


             }else{
                 fillCombo(cmbestimtionCode,"Selec the Estimation Code",activeestimations,"estimationcode",reservation.estimation_id.estimationcode);
                 // addEstimtionload();

                 //getestimationDetails();gg
                 estimationaddedDate.value =  reservation.estimationaddeddate;
                 estimationaddedDate.style.border = valid;

                 estimationCost.value = parseFloat(reservation.estimationcost).toFixed(2);
                 estimationCost.style.border = valid;

                 estimatedCost.value =  parseFloat( reservation.totalestimatedcost).toFixed(2);
                 estimatedCost.style.border = valid;
             }
            //
            if(reservation.totalcharge == null){
                totalCharge.value = "No Total Charge Added";
                totalCharge.style.border = initial;
            }else {
                totalCharge.value = parseFloat(reservation.totalcharge).toFixed(2);
                totalCharge.style.border = valid;
            }

            if(reservation.advance == null){
                // advancePayment.value = "No Advance Added";
                advancePayment.style.border = initial;
                advancePayment.disabled = false;
            }else {
                advancePayment.value = parseFloat(reservation.advance).toFixed(2);
                advancePayment.style.border = valid;
            }


            if(reservation.discountratio == null){
                // discountRatio.value = "No Discount Added";
                discountRatio.style.border = initial;
            }else {
                discountRatio.value = parseFloat(reservation.discountratio).toFixed(2);
                discountRatio.style.border = valid;
            }



            console.log("LAST PRICE",reservation.lastprice);
            if(reservation.lastprice == null){
                lastPrice.value = "No Last Price Added";
                lastPrice.style.border = initial;
            }else {
                lastPrice.value = parseFloat(reservation.lastprice).toFixed(2);

                lastPrice.style.border = valid;
            }






            if(reservation.description == null){
                resDescription.value = "No Description Added";
                resDescription.style.border = initial;
            }else {
                resDescription.value = reservation.description;
                resDescription.style.border = valid;
            }




            fillCombo(cmbCustomer,"Select the Customer",activecustomers,"regno",reservation.customer_id.regno);
            fillCombo(cmbProvince,"Select the Province",provinces,"name",reservation.province_id.name);
            fillCombo(cmbSupervisor,"Select Civil Status",employees,"callingname",reservation.supervisor_id.callingname);

            //console.log("Service name",reservation.service_id.servicename);

            fillCombo(cmbServicename,"Selec the Service Code",services,"servicename",reservation.service_id.servicename);

            //setDefaultFile('flePhoto', employee.photo);

            fillCombo(cmbreservationStatus,"Selec the Reservation Status",reservationstatus,"name",reservation.reservationstatus_id.name);
            fillCombo(cmbaddedBy,"Select Civil Status",employees,"callingname",reservation.employee_id.callingname);


            fillCombo(cmbcontype,"Selec the Construction Type",constructiontype,"name",reservation.constructiontype_id.name);

            // fillCombo(cmbconsubtask,"Selec the Construction Sub Task",constructionsubtask,"name",reservation.constructionsubtask_id.name);
            planDetailsAdd.disabled = false;
            $('#planDetailsAdd').css('cursor','pointer');
            estimationDetailsAdd.disabled = false;
            $('#estimationDetailsAdd').css('cursor','pointer');
            AddDesignerbtn.disabled = false;
            $('#AddDesignerbtn').css('cursor','pointer');
            addQs.disabled = false;
            $('#addQs').css('cursor','pointer');

            disableButtons(true, false, false);
            setStyle(valid);
            refreshInnerForm();

            changeTab('form');
        }

        function getUpdates() {

            var updates = "";

            if(reservation!=null && oldreservation!=null) {


                if (reservation.customer_id.regno != oldreservation.customer_id.regno)
                    updates = updates + "\nCustomer Code is Changed.." +oldreservation.customer_id.regno +" into " +reservation.customer_id.regno ;

                if (reservation.service_id.serviceno != oldreservation.service_id.serviceno)
                    updates = updates + "\nService Code is Changed.." + oldreservation.service_id.serviceno +" into "+reservation.service_id.serviceno ;

                if (reservation.servicecharge != oldreservation.servicecharge)
                    updates = updates + "\nService Charge is Changed.." + oldreservation.service_id.servicecharge +" into "+reservation.servicecharge ;


                if (reservation.projecttitle != oldreservation.projecttitle){
                    updates = updates + "\nProject Title is Changed.." + oldreservation.projecttitle + " into "+ reservation.projecttitle;
                    // fillCombo(cmbreservationStatus,"Selec the Reservation Status",reservationstatus,"name","In-Progress");
                    // reservation.reservationstatus_id=JSON.parse(cmbreservationStatus.value);
                    // cmbreservationStatus.disabled = true;
                    // cmbreservationStatus.style.border = updated;


                }

                if (reservation.projectlocation != oldreservation.projectlocation)
                    updates = updates + "\nProject Location is Changed.." +oldreservation.projectlocation+ " into "+reservation.projectlocation;


                // if (customer.photo != oldcustomer.photo)
                //     updates = updates + "\nPhoto is Changed";

                if (reservation.province_id.name != oldreservation.province_id.name)
                    updates = updates + "\nProvince is Changed.."+ oldreservation.province_id.name+ " into " +reservation.province_id.name;

                if (reservation.totalcharge != oldreservation.totalcharge)
                    updates = updates + "\nTotal Charge is Changed.."+oldreservation.totalcharge+ " into "+reservation.totalcharge  ;

                if (reservation.discountratio != oldreservation.discountratio)
                    updates = updates + "\nDiscount Ratio is Changed.."+ oldreservation.discountratio+ " into "+reservation.discountratio;

                if (reservation.lastprice != oldreservation.lastprice)
                    updates = updates + "\nLast Price is Changed.."+oldreservation.lastprice+ " into "+reservation.lastprice ;

                if (reservation.constructiontype_id.name != oldreservation.constructiontype_id.name)
                    updates = updates + "\nConstruction Type is Changed.."+oldreservation.constructiontype_id.name+ " into "+reservation.constructiontype_id.name;


                // if (reservation.constructionsubtask_id.name != oldreservation.constructionsubtask_id.name)
                //     updates = updates + "\nConstruction Sub Task is Changed.."+oldreservation.constructionsubtask_id.name +" into "+reservation.constructionsubtask_id.name;


                if (reservation.description != oldreservation.description)
                    updates = updates + "\nDescription is Changed.."+oldreservation.description+" into "+reservation.description;

                // if (reservation.extplan != oldreservation.extplan)
                //     updates = updates + "\nPlan Type is Changed..";


                if(oldreservation.plan_id != null){
                    if(reservation.plan_id.plancode != oldreservation.plan_id.plancode){
                        updates = updates + "\nPlan Code is Changed.."+oldreservation.plan_id.plancode+ " into "+reservation.plan_id.plancode;
                        updates = updates + "\nPlan Code is Changed.."+oldreservation.planaddeddate+ " into "+reservation.planaddeddate;
                        updates = updates + "\nPlan Charge is Changed.."+parseFloat(oldreservation.plancharge).toFixed(2)+ " into "+parseFloat(reservation.plancharge).toFixed(2);
                        updates = updates + "\nPlan Total Area is Changed.."+parseFloat(oldreservation.totalarea).toFixed(2)+" sqft "+ " into "+parseFloat(reservation.totalarea).toFixed(2);
                    }


                }else if(reservation.plan_id != null){
                    updates = updates + "\nPlan Code is Add.."+reservation.plan_id.plancode,
                        updates = updates + "\nPlan Added Date Add.."+reservation.planaddeddate;
                    updates = updates + "\nPlan Charge is Add.."+" Rs "+reservation.plancharge;
                    updates = updates + "\nPlan Total Area is Add.."+" Sfts "+reservation.totalarea;
                }

                //Reservation Details add
                if(oldreservation.estimation_id != null){
                    if(reservation.estimation_id.estimationcode != oldreservation.estimation_id.estimationcode){
                        updates = updates + "\nEstimation Code is Changed.."+oldreservation.estimation_id.estimationcode+ " into "+reservation.estimation_id.estimationcode;
                        updates = updates + "\nEstimation Added Date is Changed.."+oldreservation.estimationaddeddate+ " into "+reservation.estimationaddeddate;
                        updates = updates + "\nEstimation Cost is Changed.."+parseFloat(oldreservation.estimationcost).toFixed(2)+ " into "+parseFloat(reservation.estimationcost).toFixed(2);
                        updates = updates + "\nTotal Estimated Cost is Changed.."+parseFloat(oldreservation.totalestimatedcost).toFixed(2)+ " into "+parseFloat(reservation.totalestimatedcost).toFixed(2);
                    }


                }else if(reservation.estimation_id !=null){
                    updates = updates + "\nEstimation Code is Add.."+reservation.estimation_id.estimationcode,
                        updates = updates + "\nEstimation Added Date is Add.."+reservation.estimationaddeddate;
                    updates = updates + "\nEstimation Cost is Add.."+" Rs "+parseFloat(reservation.estimationcost).toFixed(2);
                    updates = updates + "\nTotal Estimated Cost is Add.."+" Rs "+parseFloat(reservation.totalestimatedcost).toFixed(2);

                }

                if(isEqual( reservation.constructionsubtaskHasFloorareaList,oldreservation.constructionsubtaskHasFloorareaList,'floorarea_id'))

                updates = updates + "\nConstruction Sub Part is Changed..";


                //
                // if (reservation.planaddeddate != oldreservation.planaddeddate)
                //     updates = updates + "\nPlan Added Date is Changed.."+oldreservation.planaddeddate +" into "+reservation.planaddeddate;
                //
                //
                // if (reservation.plancharge != oldreservation.plancharge)
                //     updates = updates + "\nPlan Charge is Changed.."+oldreservation.plancharge+" into "+reservation.plancharge;
                //
                // if (reservation.totalarea != oldreservation.totalarea)
                //     updates = updates + "\nTotal Area is Changed..";

                if(innerlistchange){
                    updates = updates + "\nConstruction Main Sub Part is Changed..";
                }
                if(innerbedroom){
                    updates = updates + "\nNumber of Bed Room Sub Part is Changed..";
                    console.log("No of Bed Rooms is ",innerbedroom);
                }
                if(innerkitchen){
                    updates = updates + "\nNumber of Kitchen Sub Part is Changed..";
                }

                if(innerlivingroom){
                    updates = updates + "\nNumber of Living Room Sub Part is Changed..";
                }
                if(innerdinningroom){
                    updates = updates + "\nNumber of Dinning Room Sub Part is Changed..";
                }
                if(innerpantry){
                    updates = updates + "\nNumber of Guest Room-01 Sub Part is Changed..";
                }
                if(innerbathroom){
                    updates = updates + "\nNumber of Bath Room Sub Part is Changed..";
                }
                if(innerguestroom){
                    updates = updates + "\nNumber of Guest Room-02 Sub Part is Changed..";
                }


                // if(innerlistchange){
                //     updates = updates + "\House Sub Parts is Change Changed..";
                // }
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
                        title: "Are you sure to update following Reservation details...?",
                        text: "\n"+ updates,
                        icon: "warning", buttons: true, dangerMode: true,
                    })
                        .then((willDelete) => {
                        if (willDelete) {
                            var response = httpRequest("/reservation", "PUT", reservation);
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

        function btnDeleteMC(res) {
            reservation = JSON.parse(JSON.stringify(res));

            swal({
                title: "Are you sure to delete following Reservation...?",
                text: "\n Reservation Code : " + reservation.reservationcode  +
                "\n Service Code : " + reservation.service_id.serviceno,
                icon: "warning", buttons: true, dangerMode: true,
            }).then((willDelete)=> {
                if (willDelete) {
                    var responce = httpRequest("/reservation","DELETE",reservation);
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

       function btnPrintTableMC(reservation) {

            var newwindow=window.open();
            formattab = tblReservation.outerHTML;

           newwindow.document.write("" +
                "<html>" +
                "<head><style type='text/css'>.google-visualization-table-th {text-align: left;} .modifybutton{display: none} .isort{display: none}</style>" +
                "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/></head>" +
                "<body><div style='margin-top: 150px; '> <h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Reservation Details :</span></h1></div>" +
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