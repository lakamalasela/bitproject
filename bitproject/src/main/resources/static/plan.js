

 

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

            //select2
            //$('.js-example-basic-single').select2();

            //get reservation belong floor area
            // cmdreservation.addEventListener("change",getFloorarea);

            privilages = httpRequest("../privilage?module=PLAN","GET");

            // subparthight.addEventListener("keyup",getSubtotalarea);
            subpartCount.addEventListener("change",getSubtotalarea);
            wacRatio.addEventListener("keyup",getWACamount);
            cmdplanType.addEventListener("change",getPersftcharge);
            // contactmedias = httpRequest("../contactmedia/list","GET");
            cmdhouseArea.addEventListener("change",getSubcount);

            //cmbfloorArea.addEventListener("change",getHouseSubpart);
            //zero not allow
            subpartCount.addEventListener("change",getzeroCount);
            subpartWidth.addEventListener("keyup",getzeroWidth);

            subparthight.addEventListener("keyup",getsubtaotalareainhight);


            cmbfloorArea.addEventListener("change",gethousepartinitial);
            // subparthight.addEventListener("keyup",getzeroHight);

            housepart = httpRequest("../housepart/list","GET");

            housesubparts = httpRequest("../housesubparts/list","GET");
            floorareas = httpRequest("../floorarea/list","GET");
            plantypes =httpRequest("../plantype/list","GET");

            planstatus = httpRequest("../planstatus/list","GET");

            employees = httpRequest("../employee/list","GET");

            desinersforplan = httpRequest("employee/designeremp","GET");

           // reservations = httpRequest("../reservation/activelist","GET");

            valid = "2px solid green";
            invalid = "2px solid red";
            initial = "2px solid #d6d6c2";
            updated = "2px solid #ff9900";
            active = "#90EE90";

            loadView();
            loadForm();


            //changeTab('form');
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
            plans = new Array();
          var data = httpRequest("/plan/findAll?page="+page+"&size="+size+query,"GET");
            if(data.content!= undefined) plans = data.content;
            createPagination('pagination',data.totalPages, data.number+1,paginate);
            fillTable('tblplan',plans,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblplan);

            if(activerowno!="")selectRow(tblplan,activerowno,active);

        }

        function getzeroCount(){
            if(subpartCount.value == 0){
                swal({
                    title: "You Can't Type the Zero for the Sub Count...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
            }else if((subpartCount.value)<1){
                swal({
                    title: "You Can't Type the Negative Number for the Sub Count...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
            }
        }

        function getzeroWidth(){
            if(subpartWidth.value == 0){
                swal({
                    title: "You Can't Type the Zero for the Sub Part Width...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
                subpartWidth.style.border = invalid;
            }
        }

        // function getzeroHight(){
        //
        //
        //
        // }

        function paginate(page) {


            checkerr = getErrors();

            if(oldplan == null && addvalue == ""){
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

        function viewitem(pln,rowno) {

            viewplan = JSON.parse(JSON.stringify(pln));

            tdpcode.innerHTML = viewplan.plancode;
            tdres.innerHTML = viewplan.rnowithprojecttitle;
            tdptype.innerHTML = viewplan.plantype_id.name;

            if(viewplan.planphoto==null)
                tdphoto.src= 'resources/image/noimage.png';
            else
                tdphoto.src = atob(viewplan.planphoto);


            //tddesigner.innerHTML = viewplan.designer_id.callingname;

            if(viewplan.persftcharge == null){
                tdpftcharge.innerHTML = "No Per ft Charge Added";
            }else{
                tdpftcharge.innerHTML = "Rs "+ parseFloat(viewplan.persftcharge).toFixed(2);
            }


            tdtarea.innerHTML = parseFloat(viewplan.totalarea).toFixed(2)+" Sqft";


            if(viewplan.plancharge == null){
                tdpcharge.innerHTML =  "No Plan Charge Added";
            }else{
                tdpcharge.innerHTML = "Rs "+ parseFloat(viewplan.plancharge).toFixed(2);
            }

            tdpstatus.innerHTML = viewplan.planstatus_id.name;





            if(viewplan.description == null){
                tddescription.innerHTML = "<p style='color: red;font-size: 15px;'>No Description Added</p>"
            }else{
                tddescription.innerHTML = viewplan.description;
            }

            tddate.innerHTML = viewplan.addeddate;


            tdaddedby.innerHTML = viewplan.employee_id.callingname;

            fillInnerTable("tblInnerrowprint", viewplan.planHasFloorareaList,innerplanModify,innerplanDelete,innerView);
            //fillInnerTable("tblInnerplanarea", plan.planHasFloorareaList,innerplanModify,innerplanDelete,true);
            // if(employee.photo==null)
            //     tdphoto.src= 'resourse/image/noimage.png';
            //  else
            // tdphoto.src = atob(employee.photo);


            $('#dataviewModal').modal('show');


         }
         function innerView(){

         }

         function btnPrintRowMC(){

             var format = printformtable.outerHTML;

             // var newwindow=window.open();
             // newwindow.document.write("<html>" +
             //     "<head><style type='text/css'>.google-visualization-table-th {text-align: left;}</style>" +
             //     "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/>"+
             //     "</head>" +
             //
             //     "<body><div style='margin-top: 150px'><h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Service Plan Details :</span> </h1></div>" +
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
                 "</address></div></div></di><hr> <h1>Plan Details :</h1></div>" +
                 "<div>"+format+"</div>" +
                 "<script>printformtable.removeAttribute('style')</script>" +
                 "</body></html>");
             setTimeout(function () {newwindow.print(); newwindow.close();},100);

         }

        function loadForm() {
            plan = new Object();
            oldplan = null;


            innerplansubparts = false;

            plan.planHasFloorareaList = new Array();
             fillCombo(cmdplanType,"Select the Plan Type",plantypes,"name","");
            //  // fillCombo(cmbDesignation,"Select Designation",designations,"name","");


            //fillCombo(cmdpDesinger,"Select Designer",desinersforplan,"number","");
            //plan.designer_id =  JSON.parse(cmdpDesinger.value);

            //cmdpDesinger.disabled = true;
            fillCombo(cmdAdded,"Select the Added By",employees,"callingname",session.getObject('activeuser').employeeId.callingname);
            plan.employee_id = JSON.parse(cmdAdded.value);
            cmdAdded.disabled = true;

            reservations = httpRequest("/reservation/resbyadded?designerid="+JSON.parse(cmdAdded.value).id,"GET");

            fillCombo(cmdreservation,"Select Res_Code",reservations,"reservationcode","");
            cmdreservation.disabled = false;

            fillCombo(cmdplanStatus,"Select the Plan status",planstatus,"name","Active");
            plan.planstatus_id = JSON.parse(cmdplanStatus.value);
            cmdplanStatus.disabled = true;

            perFeetCharge.disabled = true;


            //set reservation auto load
            var nextnumber = httpRequest("/plan/nextnumber","GET");
            planCode.value = nextnumber.plancode;
            plan.plancode =  planCode.value
            planCode.disabled = true;
            planCode.style.border = valid;


            rescode.value =  plan.plancode+"-";

            // //date load
            // addedDate.max = getCurrentDateTime('date');
            // var today = new Date();
            // var previousweek = new Date();
            // previousweek.setDate(today.getDate()-7);
            //
            // let month = previousweek.getMonth()+1;
            // if(month<10){
            //     month ="0" + month ;
            // }
            //
            // let day = previousweek.getDate();
            // if(day<10){
            //     day = "0"+day;
            // }
            // addedDate.min = previousweek.getFullYear()+"-"+month+"-"+day;

            addedDate.value = getCurrentDateTime('date');
            plan.addeddate =  addedDate.value;
            addedDate.disabled = true;
            addedDate.style.border = valid;


            // console.log( previousweek.setDate(today.getDate()-7));

            //set empty
            //rescode.value = "";
            perFeetCharge.value = "";
            TotalArea.value = "";
            planCharge.value = "";
            planDescription.value = "";
            //addedDate.value = "";

            removeFile('flePhoto');

            //  fillCombo(cmbEmployeestatus,"",employeestatuses,"name","Working");


            // customer.customerstatus_id=JSON.parse(cmbStatus.value);
            // cmbStatus.disabled = true;


             // var today = new Date();
             // var month = today.getMonth()+1;
             // if(month<10) month = "0"+month;
             // var date = today.getDate();
             // if(date<10) date = "0"+date;

             // assignDate.value=today.getFullYear()+"-"+month+"-"+date;
             // customer.addedate=assignDate.value;
             // assignDate.disabled = true;
            //
            // // Get Next Number Form Data Base
            // var nextNumber = httpRequest("/employee/nextNumber", "GET");
            // txtNumber.value = nextNumber.number;
            // employee.number = txtNumber.value;
            //  txtNumber.disabled="disabled";
            //
            // var nextnumber = httpRequest("../customer/nextnumber","GET");
            // cusReg.value = nextnumber.regno;
            // customer.regno =  cusReg.value;
            // cusReg.disabled = true;
            // cusReg.style.border = valid;
            //
            //set empty value
           // cusReg.value = "";
           //  cusName.value = "";
           //  cusFullname.value = "";
           //  cusNIC.value = "";
           //  cusMobile.value = "";
           //  cusAddress.value = "";
           //  cusTel.value = "";
           //  cusworkdetail.value = "";
           //  cusDescription.value = "";
           // // cmbContact.value = "";
           //  cusEmail.value = "";

            planDescription.style.border = initial;
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
            refreshPlanArea();


        }

        //fill to the province
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




        function getReservation(){
           // cmdreservation.style.border = valid;
            $('.Rescmbsearch .select2-selection').css('border',valid);

            var reservationDeatils = JSON.parse(cmdreservation.value).projecttitle;
            var reservationid = JSON.parse(cmdreservation.value).id;

            console.log("Reservation Object is ",JSON.parse(cmdreservation.value));

            flooararealistbyreservation = httpRequest("floorarea/listbyreservation?reservationid="+JSON.parse(cmdreservation.value).id,"GET");


             fillCombo(cmbfloorArea,"Select the Floor Area",flooararealistbyreservation,"name","");
            cmbfloorArea.style.border = initial;
           // fillCombopro(cmbfloorArea,"Select the Floor Area",constructionsubtasklistbyreservation,"floorarea_id.name","")

            //console.log("SubParts",constructionsubtasklistbyreservation.floorarea_id.name);
            //desingers = httpRequest("employee/pdesigners?reservationid="+JSON.parse(cmdreservation.value).id,"GET");
            // console.log(desingers)
            // cmdpDesinger.value = desingers.designeremployee_id.number;

            //fillCombo(cmdpDesinger,"Select Designer",desingers,"number","");

            //rescode.value = reservationDeatils;

            rescode.value = planCode.value+"-"+reservationDeatils;

            plan.rnowithprojecttitle = rescode.value;

            if(plan.rnowithprojecttitle != null){
                rescode.style.border = valid;
            }else{
                rescode.style.border = invalid;
            }




        }

        // function getHouseSubpart(){
        //    var getFloorArea = JSON.parse(cmbfloorArea.value).id;
        //     console.log( "Selected Reservation",JSON.parse(cmdreservation.value).id)
        //
        // housepartbyresfloor = httpRequest("/housesubparts/listbyhousepartresfla?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id,"GET");
        //
        //     //fillCombopro(cmdhousepart,"Select the House Part",housepartbyresfloor,"housepart_id.name","");
        //
        //
        //
        //     fillCombo(cmdhouseArea,"Select the House Sub Part",housepartbyresfloor,"name","");
        //
        //     console.log(getFloorArea);
        //     console.log("OutPut",housepartbyresfloor);
        // }

        // function getSubparts(){
        //     console.log("Sub Parts ",JSON.parse(cmbfloorArea.value));
        //     var columnid = JSON.parse(cmbfloorArea.value).columnhousesubparts_id.id;
        //     var foundationid = JSON.parse(cmbfloorArea.value).foundationhousesubparts_id.id;
        //     var dpcid =  JSON.parse(cmbfloorArea.value).dpchousesubparts_id.id;
        //     var roofid = JSON.parse(cmbfloorArea.value).roofhousesubpart_id.id;
        //     var sitecleanid = JSON.parse(cmbfloorArea.value).sitecleaninghousesubparts_id.id;
        //     var floortypeid = JSON.parse(cmbfloorArea.value).floorhousesubparts_id.id;
        //     var doorwindowid = JSON.parse(cmbfloorArea.value).doorwindowhousesubparts_id.id;
        //     var insideid =  JSON.parse(cmbfloorArea.value).insidewallhousesubparts_id.id;
        //     var outsideid = JSON.parse(cmbfloorArea.value).outsidewallhousesubparts_id.id;
        //
        //
        //     console.log("Subpart is",subparts);
        // }





        function getPersftcharge(){
            console.log(JSON.parse(cmdplanType.value).name);

            if(JSON.parse(cmdplanType.value).name == "In-House Plan"){

                cmbfloorArea.disabled = false;
                planCharge.value = parseFloat(0).toFixed(2);
                perFeetCharge.value =  parseFloat(1000).toFixed(2);
                plan.persftcharge =  perFeetCharge.value;
                perFeetCharge.style.border = valid;
                planCharge.style.border = valid;
                perFeetCharge.disabled = true;

                //
                // perFeetCharge.addEventListener("keyup",function (){
                //     planCharge.value  =  (parseFloat(TotalArea.value) * parseFloat(perFeetCharge.value)).toFixed(2);
                //     plan.plancharge = planCharge.value;
                //     planCharge.style.border = valid;
                //     perFeetCharge.disabled = false;
                //
                // })

            }else {
                planCharge.value = parseFloat(0).toFixed(2);
                perFeetCharge.value =  parseFloat(0).toFixed(2);
                plan.persftcharge =  perFeetCharge.value;
                 perFeetCharge.style.border = valid;
                 planCharge.style.border = valid;
                 perFeetCharge.disabled = true;
            }
        }

        //get the floor area and house sub part
        // function getFloorarea(){
        //     console.log("The Sub Task is",JSON.parse(cmdreservation.value).constructionsubtask_id.id);
        //
        //     floorareabyreservation = httpRequest("/floorarea/listbyreservation?constructionsubtaskid="+JSON.parse(cmdreservation.value).constructionsubtask_id.id,"GET");
        //     fillCombo(cmbfloorArea,"Select the Floor Area",floorareabyreservation,"name","");
        //
        //     housepartbyreservation = httpRequest("/housesubparts/listbyreservation?constructionsubtaskid="+JSON.parse(cmdreservation.value).constructionsubtask_id.id,"GET");
        //     fillCombo(cmdhouseArea,"Select the Floor Area",housepartbyreservation,"name","");
        // }


        function refreshPlanArea(){

            var maintotalarea = 0;

            planHasFloorarea = new Object();
            oldplanHasFloorarea = null;



            planHasFloorarea.planHasFloorareaHasHousesubpartsList = new Array();



            if(cmdreservation.value != ""){

                flooararealistbyreservation = httpRequest("floorarea/listbyreservation?reservationid="+JSON.parse(cmdreservation.value).id,"GET");
                fillCombo(cmbfloorArea,"Select the Floor Area",flooararealistbyreservation,"name","");

            }else{
                 fillCombo(cmbfloorArea,"Select the Floor Area",floorareas,"name","");
            }
            // fillCombo(cmbfloorArea,"Select the Floor Area",floorareas,"name","");


            fillInnerTable("tblInnerplanarea", plan.planHasFloorareaList,innerplanModify,innerplanDelete,true);

            wacRatio.value = "";
            wacRatioamount.value = "";
            finalFloorArea.value = "";


            btnplanAdd.disabled = false;
            btnplanAdd.style.cursor ="pointer";

            btnplanUpdate.disabled = true;
            btnplanUpdate.style.cursor ="not-allowed";


            //set initial
            cmbfloorArea.style.border = initial;
            wacRatio.style.border = initial;
            wacRatioamount.style.border = initial;
            finalFloorArea.style.border = initial;


            if(plan.planHasFloorareaList.length != 0){
                for(index in plan.planHasFloorareaList){
                    maintotalarea = parseFloat(maintotalarea)+ parseFloat(plan.planHasFloorareaList[index].finalfloorarea)
                }
            }

            TotalArea.value = parseFloat(maintotalarea).toFixed(2);
            plan.totalarea = TotalArea.value;

            if(plan.totalarea == 0.00){
                TotalArea.style.border = invalid;
            }else{
                TotalArea.style.border = valid;
                if(oldplan != null && plan.totalarea != oldplan.totalarea){
                    TotalArea.style.border = updated;
                }
            }

            if(perFeetCharge.value != "0.00"){
                planCharge.value  =  (parseFloat(TotalArea.value) * parseFloat(1000)).toFixed(2);
                plan.plancharge = planCharge.value;
                planCharge.style.border = valid;

            }





            console.log(planTotalArea.value);
            refreshInnerSubArea();


        }

        function gethousepartinitial(){

            fillCombo(cmdhousepart,"Select the House part",housepart,"name","");
            $('.Housepartcmbsearch .select2-selection').css('border',initial);
           // cmdhousepart.style.border = initial;

        }

        function innerplanModify(ob,innerplanrowno){
            innerplanrow = innerplanrowno;
            planHasFloorarea =  JSON.parse(JSON.stringify(ob));
            oldplanHasFloorarea = JSON.parse(JSON.stringify(ob));


            fillCombo(cmbfloorArea,"Select the Floor Area",floorareas,"name",planHasFloorarea.floorarea_id.name);
            wacRatio.value = planHasFloorarea.wallsandcirculationratio;
            wacRatio.style.border = valid;
            planTotalArea.value = planHasFloorarea.totalarea;

            getWACamount();

            btnplanAdd.disabled = true;
            btnplanAdd.style.cursor ="not-allowed";

            btnplanUpdate.disabled = false;
            btnplanUpdate.style.cursor ="pointer";

            refreshInnerSubArea();

        }
        function getplanineerUpdate(){
            var innerplanupdate = "";

            if(planHasFloorarea != null && oldplanHasFloorarea !=null){

                if(planHasFloorarea.floorarea_id.name != oldplanHasFloorarea.floorarea_id.name){
                    innerplanupdate = innerplanupdate +"\nFloor Area is Changed "+ oldplanHasFloorarea.floorarea_id.name + " In to "+planHasFloorarea.floorarea_id.name;
                }
                if(planHasFloorarea.totalarea != oldplanHasFloorarea.totalarea){
                    innerplanupdate = innerplanupdate +"\nSub Total Area is Changed "+ oldplanHasFloorarea.totalarea+ " In to "+planHasFloorarea.totalarea;
                }

                if(planHasFloorarea.wallsandcirculationratio != oldplanHasFloorarea.wallsandcirculationratio){
                    innerplanupdate = innerplanupdate +"\nWall And Circulation Ratio is Changed "+ oldplanHasFloorarea.wallsandcirculationratio+ " In to "+planHasFloorarea.wallsandcirculationratio;
                }
                if(planHasFloorarea.finalfloorarea != oldplanHasFloorarea.finalfloorarea){
                    innerplanupdate = innerplanupdate +"\nTotal Floor Area is Changed "+ oldplanHasFloorarea.finalfloorarea+ " In to "+planHasFloorarea.finalfloorarea;
                }
               if( isEqual(planHasFloorarea.planHasFloorareaHasHousesubpartsList,oldplanHasFloorarea.planHasFloorareaHasHousesubpartsList,'housesubparts_id'))
                   innerplansubparts = true;
                   innerplanupdate = innerplanupdate + "\nSub Area Details is Changed "
            }

            return innerplanupdate;
        }

        function planbtnUpdate(){

           var planinnerErrors = getPlanareaInnerErrors();

            if(planinnerErrors == ""){
                var innerplanUpdate = getplanineerUpdate();
                if(innerplanUpdate == ""){
                    swal({
                        title: 'Nothing Updated..!', icon: "warning",
                        text: '\n',
                        button: false,
                        timer: 1200
                    });
                }else{
                    swal({
                        title: "Are you sure to Inner Form update following details...?",
                        text: "\n" + innerplanUpdate,
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
                                plan.planHasFloorareaList[innerplanrow] = planHasFloorarea;


                                refreshPlanArea();
                                // console.log("New List", bsr.bsrHasBSRsubcategoryList);
                                // console.log("Old List", oldbsr.bsrHasBSRsubcategoryList);
                                //console.log(bsr.bsrHasBSRsubcategoryList == oldbsr.bsrHasBSRsubcategoryList);

                            }
                        });



                }
            }else{
                swal({
                    title: 'You have following errors in your form', icon: "error",
                    text: '\n ' + getPlanareaInnerErrors(),
                    button: true
                });
            }
          // var planinnerErrors = getplanineerUpdate();
          //


        }

        function innerplanDelete(planHasFloorarea,rowno){


            swal({
                title: "Are you sure...?",
                text: "Delete Following BSR Sub Task ... \n" +
                    "Floor Area : " + planHasFloorarea.floorarea_id.name,
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

                    plan.planHasFloorareaList.splice(rowno, 1);
                    refreshPlanArea();


                }
            });
        }

        function refreshInnerSubArea(){

            var totalfloorarea = 0;

            planHasFloorareaHasHouseSubparts = new Object();
            oldplanHasFloorareaHasHouseSubparts = null;

            //
            // if( planHasFloorarea.planHasFloorareaHasHousesubpartsList.length != 0){
            //     for(index in  planHasFloorarea.planHasFloorareaHasHousesubpartsList){
            //         if( planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].housesubparts_id.name == "Bedroom"){
            //             if(parseInt(subpartCount.value)>=1){
            //                 subpartCount.value =  (parseInt(subpartCount.value))-1;
            //             }
            //         }
            //     }
            // }


            //cmdhouseArea.disabled = true;

            fillCombo(cmdhousepart,"Select the House part",housepart,"name","");


            fillCombo(cmdhouseArea,"Select the House Sub Part",housesubparts,"name","");

            fillInnerTable("tblInnersubtask",planHasFloorarea.planHasFloorareaHasHousesubpartsList,innersubModify,innersubDelete,true);

            cmdhousepart.value = "";
            cmdhouseArea.value = "";

            subpartWidth.disabled = false;
            subparthight.disabled = false;


           subpartCount.value = "";
            subpartCount.disabled = false;
            //subpartCount.disabled = false;



            // if(parseInt(subpartCount.value)==0){
            //     subpartCount.value = "";
            // }
            // if(parseInt(subpartCount.value)>1){
            //     subpartCount.disabled = false;
            // }else {
            //     subpartCount.disabled = true;
            // }
            subpartWidth.value = "";
            subparthight.value = "";
            subtotalArea.value = "";


            //cmdhousepart.style.border = initial;
            $('.Housepartcmbsearch .select2-selection').css('border',initial);
           // $('.Housepartcmbsearch .select2-container').css('border',initial);
            cmdhouseArea.style.border = initial;
            subpartCount.style.border = initial;
            subpartWidth.style.border = initial;
            subparthight.style.border = initial;
            subtotalArea.style.border = initial;

            //subpartCount.disabled = false;

            btnsubupdate.disabled = true;
            btnsubadd.disabled = false;

            btnsubupdate.style.cursor = "not-allowed";
            btnsubadd.style.cursor ="pointer";




            if(planHasFloorarea.planHasFloorareaHasHousesubpartsList.length!=0){
                for(index in planHasFloorarea.planHasFloorareaHasHousesubpartsList){
                    console.log(planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].area);
                    totalfloorarea = parseFloat(totalfloorarea) + parseFloat(planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].area);
                }
            }

            planTotalArea.value = parseFloat(totalfloorarea).toFixed(2);
            planHasFloorarea.totalarea = planTotalArea.value;


            if(totalfloorarea == 0.00){
                planTotalArea.style.border = invalid;
            }else{
                planTotalArea.style.border = valid;
                // console.log("Old ",oldplanHasFloorarea.totalarea)
                console.log("New ",planHasFloorarea.totalarea)
                if(oldplanHasFloorarea != null && planHasFloorarea.totalarea != oldplanHasFloorarea.totalarea){
                    planTotalArea.style.border = updated;
                    getWACamount();
                }
            }


            // if(planHasFloorarea.totalarea == 0.00 || planHasFloorarea.totalarea == null){
            //     planTotalArea.style.border = invalid;
            // }else{
            //     planTotalArea.style.border = valid;
            // }

            console.log(planHasFloorarea.totalarea);

            if((parseInt(subpartCount.value))>=0){
                availableCount.style.display = "block";

                //avcount.innerHTML = subpartCount.value;

            }else{
                availableCount.style.display = "none";
            }


            // if(parseInt(subpartCount.value)!=0 || subpartCount.value !=""){
            //     availableCount.style.display = "block";
            //     avcount.innerHTML = subpartCount.value;
            //
            //
            //
            // }else {
            //
            //     availableCount.style.display = "none";
            //
            // }



        }

        function getSubcount(){

     if(cmdreservation.value != ""){


         allowedsubpartcount = httpRequest("/constructionsubtaskhasfloorarea/listnumberofparts?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id,"GET")
         console.log(allowedsubpartcount);


         if("Bedroom" ==(JSON.parse(cmdhouseArea.value).name)){

             subpartCount.disabled = true;//Bedroom select kra gththoth disabled wenwa field eka

             var totalbedroomcount = 0;
             if( planHasFloorarea.planHasFloorareaHasHousesubpartsList.length != 0){
                 for(index in  planHasFloorarea.planHasFloorareaHasHousesubpartsList){
                     if( planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].housesubparts_id.name == "Bedroom"){
                         totalbedroomcount = parseInt(totalbedroomcount)+parseInt(planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].count)

                     }
                 }
                 console.log("Taota",totalbedroomcount);
                 console.log("AsTaota",allowedsubpartcount.numberofbedroom);
                 if(parseInt(allowedsubpartcount.numberofbedroom)>parseInt(totalbedroomcount)){
                     console.log("AsTaota222");

                     subpartCount.value = parseInt(allowedsubpartcount.numberofbedroom)-parseInt(totalbedroomcount);



                     if((parseInt(subpartCount.value))!=0){
                         //availableCount.style.display = "block";

                         avcount.innerHTML = subpartCount.value;

                     }


                     subpartCount.style.border = valid;
                     planHasFloorareaHasHouseSubparts.count = subpartCount.value;
                     console.log("Sub Part Count",subpartCount.value);

                     // if(parseInt(subpartCount.value)>1){
                     //     subpartCount.disabled = false;
                     // }else{
                     //     subpartCount.disabled = true;
                     // }

                 }else if(parseInt(allowedsubpartcount.numberofbedroom)==parseInt(totalbedroomcount)){
                     swal({
                         title: "All Ready Added...!",
                         text: "\n",
                         icon: "warning",
                         className: "red-bg",
                         buttons: false,
                         timer:1500

                     });

                     subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
                     fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");
                     cmdhouseArea.style.border = initial;
                     // alert("Required bed room all Ready added")
                 }else if (parseInt(allowedsubpartcount.numberofbedroom)<parseInt(totalbedroomcount)){
                     swal({
                         title: "All the count are added...!",
                         text: "\n",
                         icon: "warning",
                         className: "gray-bg",
                         buttons: false,
                         timer:1500

                     });
                     subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
                     fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");
                     cmdhouseArea.style.border = initial;
                     // alert("NOt working")
                 }

             }else{

                 subpartCount.value = allowedsubpartcount.numberofbedroom;
                 planHasFloorareaHasHouseSubparts.count = subpartCount.value;
                 subpartCount.style.border = valid;
                 // if(parseInt(subpartCount.value)>1){
                 //     subpartCount.disabled = false;
                 // }else{
                 //     subpartCount.disabled = true;
                 // }




             }





         }else if("Kitchen" ==(JSON.parse(cmdhouseArea.value).name)){

             subpartCount.disabled = true;//Bedroom select kra gththoth disabled wenwa field eka

             var totalkitchencount = 0;
             if( planHasFloorarea.planHasFloorareaHasHousesubpartsList.length != 0){
                 for(index in  planHasFloorarea.planHasFloorareaHasHousesubpartsList){
                     if( planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].housesubparts_id.name == "Kitchen"){
                         totalkitchencount = parseInt(totalkitchencount)+parseInt(planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].count)

                     }
                 }
                 console.log("Taota",totalkitchencount);
                 console.log("AsTaota",allowedsubpartcount.numberofkitchen);
                 if(parseInt(allowedsubpartcount.numberofkitchen)>parseInt(totalkitchencount)){
                     console.log("AsTaota222");

                     subpartCount.value = parseInt(allowedsubpartcount.numberofkitchen)-parseInt(totalkitchencount);
                     subpartCount.style.border = valid;
                     planHasFloorareaHasHouseSubparts.count = subpartCount.value;
                     console.log("Sub Part Count",subpartCount.value);

                     // if(parseInt(subpartCount.value)>1){
                     //     subpartCount.disabled = false;
                     // }else{
                     //     subpartCount.disabled = true;
                     // }

                 }else if(parseInt(allowedsubpartcount.numberofkitchen)==parseInt(totalkitchencount)){
                     swal({
                         title: "All Ready Added...!",
                         text: "\n",
                         icon: "warning",
                         buttons: false,
                         timer:1500

                     });
                     subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
                     fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");
                     cmdhouseArea.style.border = initial;
                     // alert("Required bed room all Ready added")
                 }else if (parseInt(allowedsubpartcount.numberofkitchen)<parseInt(totalkitchencount)){
                     swal({
                         title: "All the Count Are Added...!",
                         text: "\n",
                         icon: "warning",
                         buttons: false,
                         timer:1500

                     });
                     subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
                     fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");
                     cmdhouseArea.style.border = initial;
                     // alert("NOt working")
                 }

             }else{

                 subpartCount.value = allowedsubpartcount.numberofkitchen;
                 planHasFloorareaHasHouseSubparts.count = subpartCount.value;
                 subpartCount.style.border = valid;
                 // if(parseInt(subpartCount.value)>1){
                 //     subpartCount.disabled = false;
                 // }else{
                 //     subpartCount.disabled = true;
                 // }




             }







         }else if("Bathroom"==(JSON.parse(cmdhouseArea.value).name)){

             subpartCount.disabled = true;//Bedroom select kra gththoth disabled wenwa field eka

             var totalbathroomcount = 0;
             if( planHasFloorarea.planHasFloorareaHasHousesubpartsList.length != 0){
                 for(index in  planHasFloorarea.planHasFloorareaHasHousesubpartsList){
                     if( planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].housesubparts_id.name == "Bathroom"){
                         totalbathroomcount = parseInt(totalbathroomcount)+parseInt(planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].count)

                     }
                 }
                 console.log("Taota",totalbathroomcount);
                 console.log("AsTaota",allowedsubpartcount.numberofbathroom);
                 if(parseInt(allowedsubpartcount.numberofbathroom)>parseInt(totalbathroomcount)){
                     console.log("AsTaota222");

                     subpartCount.value = parseInt(allowedsubpartcount.numberofbathroom)-parseInt(totalbathroomcount);
                     subpartCount.style.border = valid;
                     planHasFloorareaHasHouseSubparts.count = subpartCount.value;
                     console.log("Sub Part Count",subpartCount.value);

                     // if(parseInt(subpartCount.value)>1){
                     //     subpartCount.disabled = false;
                     // }else{
                     //     subpartCount.disabled = true;
                     // }

                 }else if(parseInt(allowedsubpartcount.numberofbathroom)==parseInt(totalbathroomcount)){
                     swal({
                         title: "All Ready Added...!",
                         text: "\n",
                         icon: "warning",
                         buttons: false,
                         timer:1500

                     });

                     subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
                     fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");
                     cmdhouseArea.style.border = initial;
                     // alert("Required bed room all Ready added")
                 }else if (parseInt(allowedsubpartcount.numberofbathroom)<parseInt(totalbathroomcount)){
                     swal({
                         title: "All the Count Are Added...!",
                         text: "\n",
                         icon: "warning",
                         buttons: false,
                         timer:1500

                     });

                     subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
                     fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");
                     cmdhouseArea.style.border = initial;
                     // alert("NOt working")
                 }

             }else{

                 subpartCount.value = allowedsubpartcount.numberofbathroom;
                 planHasFloorareaHasHouseSubparts.count = subpartCount.value;
                 subpartCount.style.border = valid;
                 // if(parseInt(subpartCount.value)>1){
                 //     subpartCount.disabled = false;
                 // }else{
                 //     subpartCount.disabled = true;
                 // }




             }




         }else if("Dinning"==(JSON.parse(cmdhouseArea.value).name)){

             subpartCount.disabled = true;//Bedroom select kra gththoth disabled wenwa field eka

             var totaldinningcount = 0;
             if( planHasFloorarea.planHasFloorareaHasHousesubpartsList.length != 0){
                 for(index in  planHasFloorarea.planHasFloorareaHasHousesubpartsList){
                     if( planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].housesubparts_id.name == "Dinning"){
                         totaldinningcount = parseInt(totaldinningcount)+parseInt(planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].count)

                     }
                 }
                 console.log("Taota",totaldinningcount);
                 console.log("AsTaota",allowedsubpartcount.numberofdinningroom);
                 if(parseInt(allowedsubpartcount.numberofdinningroom)>parseInt(totaldinningcount)){
                     console.log("AsTaota222");

                     subpartCount.value = parseInt(allowedsubpartcount.numberofdinningroom)-parseInt(totaldinningcount);
                     subpartCount.style.border = valid;
                     planHasFloorareaHasHouseSubparts.count = subpartCount.value;
                     console.log("Sub Part Count",subpartCount.value);

                     // if(parseInt(subpartCount.value)>1){
                     //     subpartCount.disabled = false;
                     // }else{
                     //     subpartCount.disabled = true;
                     // }

                 }else if(parseInt(allowedsubpartcount.numberofdinningroom)==parseInt(totaldinningcount)){
                     swal({
                         title: "All Ready Added...!",
                         text: "\n",
                         icon: "warning",
                         buttons: false,
                         timer:1500

                     });

                     subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
                     fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");
                     cmdhouseArea.style.border = initial;
                     // alert("Required bed room all Ready added")
                 }else if (parseInt(allowedsubpartcount.numberofdinningroom)<parseInt(totaldinningcount)){
                     swal({
                         title: "All the Count Are Added...!",
                         text: "\n",
                         icon: "warning",
                         buttons: false,
                         timer:1500

                     });

                     subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
                     fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");
                     cmdhouseArea.style.border = initial;
                     // alert("NOt working")
                 }

             }else{

                 subpartCount.value = allowedsubpartcount.numberofdinningroom;
                 planHasFloorareaHasHouseSubparts.count = subpartCount.value;
                 subpartCount.style.border = valid;
                 // if(parseInt(subpartCount.value)>1){
                 //     subpartCount.disabled = false;
                 // }else{
                 //     subpartCount.disabled = true;
                 // }




             }



         }else if("Living"==(JSON.parse(cmdhouseArea.value).name)){

             subpartCount.disabled = true;//Bedroom select kra gththoth disabled wenwa field eka

             var totallivingcount = 0;
             if( planHasFloorarea.planHasFloorareaHasHousesubpartsList.length != 0){
                 for(index in  planHasFloorarea.planHasFloorareaHasHousesubpartsList){
                     if( planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].housesubparts_id.name == "Living"){
                         totallivingcount = parseInt(totallivingcount)+parseInt(planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].count)

                     }
                 }
                 console.log("Taota",totallivingcount);
                 console.log("AsTaota",allowedsubpartcount.numberoflivingroom);
                 if(parseInt(allowedsubpartcount.numberoflivingroom)>parseInt(totallivingcount)){
                     console.log("AsTaota222");

                     subpartCount.value = parseInt(allowedsubpartcount.numberoflivingroom)-parseInt(totallivingcount);
                     subpartCount.style.border = valid;
                     planHasFloorareaHasHouseSubparts.count = subpartCount.value;
                     console.log("Sub Part Count",subpartCount.value);

                     // if(parseInt(subpartCount.value)>1){
                     //     subpartCount.disabled = false;
                     // }else{
                     //     subpartCount.disabled = true;
                     // }

                 }else if(parseInt(allowedsubpartcount.numberoflivingroom)==parseInt(totallivingcount)){
                     swal({
                         title: "All Ready Added...!",
                         text: "\n",
                         icon: "warning",
                         buttons: false,
                         timer:1500

                     });

                     subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
                     fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");
                     cmdhouseArea.style.border = initial;
                     // alert("Required bed room all Ready added")
                 }else if (parseInt(allowedsubpartcount.numberoflivingroom)<parseInt(totallivingcount)){
                     swal({
                         title: "All the Count Are Added...!",
                         text: "\n",
                         icon: "warning",
                         buttons: false,
                         timer:1500

                     });

                     subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
                     fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");
                     cmdhouseArea.style.border = initial;
                     // alert("NOt working")
                 }

             }else{

                 subpartCount.value = allowedsubpartcount.numberoflivingroom;
                 planHasFloorareaHasHouseSubparts.count = subpartCount.value;
                 subpartCount.style.border = valid;
                 // if(parseInt(subpartCount.value)>1){
                 //     subpartCount.disabled = false;
                 // }else{
                 //     subpartCount.disabled = true;
                 // }




             }

         }else if("Pantry"==(JSON.parse(cmdhouseArea.value).name)){

             subpartCount.disabled = true;//Bedroom select kra gththoth disabled wenwa field eka

             var totalpantrycount = 0;
             if( planHasFloorarea.planHasFloorareaHasHousesubpartsList.length != 0){
                 for(index in  planHasFloorarea.planHasFloorareaHasHousesubpartsList){
                     if( planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].housesubparts_id.name == "Pantry"){
                         totalpantrycount = parseInt(totalpantrycount)+parseInt(planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].count)

                     }
                 }
                 console.log("Taota",totalpantrycount);
                 console.log("AsTaota",allowedsubpartcount.numberofpantry);
                 if(parseInt(allowedsubpartcount.numberofpantry)>parseInt(totalpantrycount)){
                     console.log("AsTaota222");

                     subpartCount.value = parseInt(allowedsubpartcount.numberofpantry)-parseInt(totalpantrycount);
                     subpartCount.style.border = valid;
                     planHasFloorareaHasHouseSubparts.count = subpartCount.value;
                     console.log("Sub Part Count",subpartCount.value);

                     // if(parseInt(subpartCount.value)>1){
                     //     subpartCount.disabled = false;
                     // }else{
                     //     subpartCount.disabled = true;
                     // }

                 }else if(parseInt(allowedsubpartcount.numberofpantry)==parseInt(totalpantrycount)){
                     swal({
                         title: "All Ready Added...!",
                         text: "\n",
                         icon: "warning",
                         buttons: false,
                         timer:1500

                     });

                     subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
                     fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");
                     cmdhouseArea.style.border = initial;
                     // alert("Required bed room all Ready added")
                 }else if (parseInt(allowedsubpartcount.numberofpantry)<parseInt(totalpantrycount)){
                     swal({
                         title: "All the Count Are Added...!",
                         text: "\n",
                         icon: "warning",
                         buttons: false,
                         timer:1500

                     });

                     subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
                     fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");
                     cmdhouseArea.style.border = initial;
                     // alert("NOt working")
                 }

             }else{

                 subpartCount.value = allowedsubpartcount.numberofpantry;
                 planHasFloorareaHasHouseSubparts.count = subpartCount.value;
                 subpartCount.style.border = valid;
                 // if(parseInt(subpartCount.value)>1){
                 //     subpartCount.disabled = false;
                 // }else{
                 //     subpartCount.disabled = true;
                 // }




             }


         }else if("Guest Room"==(JSON.parse(cmdhouseArea.value).name)){

             subpartCount.disabled = true;//Bedroom select kra gththoth disabled wenwa field eka

             var totalguestroomcount = 0;
             if( planHasFloorarea.planHasFloorareaHasHousesubpartsList.length != 0){
                 for(index in  planHasFloorarea.planHasFloorareaHasHousesubpartsList){
                     if( planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].housesubparts_id.name == "Guest Room"){
                         totalguestroomcount = parseInt(totalguestroomcount)+parseInt(planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].count)

                     }
                 }
                 console.log("Taota",totalguestroomcount);
                 console.log("AsTaota",allowedsubpartcount.numberofguestroom);
                 if(parseInt(allowedsubpartcount.numberofguestroom)>parseInt(totalguestroomcount)){
                     console.log("AsTaota222");

                     subpartCount.value = parseInt(allowedsubpartcount.numberofguestroom)-parseInt(totalguestroomcount);
                     subpartCount.style.border = valid;
                     planHasFloorareaHasHouseSubparts.count = subpartCount.value;
                     console.log("Sub Part Count",subpartCount.value);

                     // if(parseInt(subpartCount.value)>1){
                     //     subpartCount.disabled = false;
                     // }else{
                     //     subpartCount.disabled = true;
                     // }

                 }else if(parseInt(allowedsubpartcount.numberofguestroom)==parseInt(totalguestroomcount)){
                     swal({
                         title: "All Ready Added...!",
                         text: "\n",
                         icon: "warning",
                         buttons: false,
                         timer:1500

                     });

                     subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
                     fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");
                     cmdhouseArea.style.border = initial;
                     // alert("Required bed room all Ready added")
                 }else if (parseInt(allowedsubpartcount.numberofguestroom)<parseInt(totalguestroomcount)){
                     swal({
                         title: "All the Count Are Added...!",
                         text: "\n",
                         icon: "warning",
                         buttons: false,
                         timer:1500

                     });

                     subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
                     fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");
                     cmdhouseArea.style.border = initial;
                     // alert("NOt working")
                 }

             }else{

                 subpartCount.value = allowedsubpartcount.numberofguestroom;
                 planHasFloorareaHasHouseSubparts.count = subpartCount.value;
                 subpartCount.style.border = valid;
                 // if(parseInt(subpartCount.value)>1){
                 //     subpartCount.disabled = false;
                 // }else{
                 //     subpartCount.disabled = true;
                 // }




             }

         }





     }else{

         //getSubtotalarea();

     }
        }

        function getsubtaotalareainhight(){

            var subtoalareainhight = 0;


            if(isNaN(subtotalArea.value)){
                subtotalArea.value = "00.00";
                subtotalArea.style.border = invalid;
            }

            if(subparthight.value == 0){
                swal({
                    title: "You Can't Type the Zero for the Sub Part Hight...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
                subparthight.style.border = invalid;
            }
            if(subpartWidth.value == 0){
                swal({
                    title: "You Can't Type the Zero for the Sub Part Width...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
                subpartWidth.style.border = invalid;
            }

            if(subpartWidth.value !=null && subparthight.value != null && subpartCount.value !=null){

                subtoalareainhight = (parseFloat(subtoalareainhight) + (subpartCount.value * parseFloat(subpartWidth.value)* parseFloat(subparthight.value))).toFixed(2);
                planHasFloorareaHasHouseSubparts.area = subtoalareainhight;
                subtotalArea.value = subtoalareainhight;
                subtotalArea.style.border = valid;
                console.log( "Sub Total",planHasFloorareaHasHouseSubparts.area );

            }
            if(oldplanHasFloorareaHasHouseSubparts !=null && planHasFloorareaHasHouseSubparts.area != oldplanHasFloorareaHasHouseSubparts.area){

                subtotalArea.style.border = updated;

            }

        }

        function getsubpartbyhousepart(){

            cmdhouseArea.disabled = false;
            cmdhouseArea.style.border = initial;

            $('.Housepartcmbsearch .select2-selection').css('border',valid);

            console.log(JSON.parse(cmdhousepart.value).name);

            if(JSON.parse(cmdhousepart.value).name == "Wiring" || JSON.parse(cmdhousepart.value).name == "Pumbling" || JSON.parse(cmdhousepart.value).name == "Doors" || JSON.parse(cmdhousepart.value).name == "Windows"){
                subpartWidth.disabled = true;
                subpartWidth.value = parseFloat(0).toFixed(2);
                planHasFloorareaHasHouseSubparts.width = subpartWidth.value;
                subpartWidth.style.border = valid;

                subparthight.disabled = true;
                subparthight.value = parseFloat(0).toFixed(2);
                planHasFloorareaHasHouseSubparts.height =   subparthight.value;
                subparthight.style.border = valid;


                subpartCount.disabled = true;
                subpartCount.value = 0;
                planHasFloorareaHasHouseSubparts.count =  subpartCount.value;
                subpartCount.style.border = valid;

                subtotalArea.disabled = true;
                subtotalArea.value = parseFloat(0).toFixed(2);
                planHasFloorareaHasHouseSubparts.area = subtotalArea.value;
                subtotalArea.style.border = valid;


            }

            if(cmdreservation.value != ""){
                subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");

                fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");

            }else{
                normalsubpartbyhousepart = httpRequest("/housesubparts/listbyhousepart?housepartid="+JSON.parse(cmdhousepart.value).id,"GET");
                fillCombo(cmdhouseArea,"Select the House Sub Part",normalsubpartbyhousepart,"name","");

            }
           // cmdhousepart.style.border = valid;
           // housepartid = JSON.parse(cmdhousepart.value).id;

            // subpartbyhousepart = httpRequest("/housesubparts/listbyhousepartresflahpt?reservationid="+JSON.parse(cmdreservation.value).id+"&floorareaid="+JSON.parse(cmbfloorArea.value).id+"&housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");
            //
            // fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name","");


            if(oldplanHasFloorareaHasHouseSubparts != null && oldplanHasFloorareaHasHouseSubparts.housesubparts_id.housepart_id.name != JSON.parse(cmdhousepart.value).name){
                $('.Housepartcmbsearch .select2-selection').css('border',updated);
                //cmdhousepart.style.border = updated;
            }else{
                $('.Housepartcmbsearch .select2-selection').css('border',valid);
                //cmdhousepart.style.border = valid;
            }


            planHasFloorareaHasHouseSubparts.housesubparts_id = null;

        }

        function subinnerClear(){

            swal({
                title: "Are you sure To Clear the Sub Area Details Form...?",
                text: " \n",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    refreshInnerSubArea();

                }
            });


        }

        function innersubDelete(planHasFloorareaHasHouseSubparts,rowno){
            swal({
                title: "Are you sure...?",
                text: "Delete Following Sub Area Detail ... \n" +
                    "Sub Area : " + planHasFloorareaHasHouseSubparts.housesubparts_id.name,
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

                    planHasFloorarea.planHasFloorareaHasHousesubpartsList.splice(rowno, 1);
                    refreshInnerSubArea();


                }
            });
        }

        function innersubModify(ob,innersubrowno){
            innersubrow = innersubrowno;
            planHasFloorareaHasHouseSubparts =  JSON.parse(JSON.stringify(ob));
            oldplanHasFloorareaHasHouseSubparts = JSON.parse(JSON.stringify(ob));

            btnsubupdate.disabled = false;
            btnsubadd.disabled = true;

            btnsubupdate.style.cursor = "pointer";
            btnsubadd.style.cursor ="not-allowed";

             fillCombo(cmdhousepart,"Select the House part",housepart,"name",planHasFloorareaHasHouseSubparts.housesubparts_id.housepart_id.name);

             subpartbyhousepart = httpRequest("/housesubparts/listbyhousepart?housepartid="+ JSON.parse(cmdhousepart.value).id,"GET");

             fillCombo(cmdhouseArea,"Select the House Sub Part",subpartbyhousepart,"name",planHasFloorareaHasHouseSubparts.housesubparts_id.name);



            // fillCombo(cmdhouseArea,"Select the House Area",housesubparts,"name",planHasFloorareaHasHouseSubparts.housesubparts_id.name);

            subpartCount.value = planHasFloorareaHasHouseSubparts.count;
            subpartWidth.value = planHasFloorareaHasHouseSubparts.width;
            subparthight.value = planHasFloorareaHasHouseSubparts.height;
            subtotalArea.value = planHasFloorareaHasHouseSubparts.area;

            //set valid
            $('.Housepartcmbsearch .select2-selection').css('border',valid);
            subpartCount.style.border = valid;
            subpartWidth.style.border = valid;
            subparthight.style.border = valid;
            subtotalArea.style.border = valid;

        }

        function getSubinnerUpdate(){

            var innersubupdate = "";

            if(planHasFloorareaHasHouseSubparts !=null && oldplanHasFloorareaHasHouseSubparts !=null){

                if(JSON.parse(cmdhousepart.value).name != oldplanHasFloorareaHasHouseSubparts.housesubparts_id.housepart_id.name){
                    innersubupdate = innersubupdate +"\nHouse Part is Changed "+ oldplanHasFloorareaHasHouseSubparts.housesubparts_id.housepart_id.name + " In to "+JSON.parse(cmdhousepart.value).name;
                }

                if(planHasFloorareaHasHouseSubparts.housesubparts_id.name != oldplanHasFloorareaHasHouseSubparts.housesubparts_id.name){
                    innersubupdate = innersubupdate +"\nHouse Sub Part is Changed "+ oldplanHasFloorareaHasHouseSubparts.housesubparts_id.name + " In to "+planHasFloorareaHasHouseSubparts.housesubparts_id.name;
                }

                if(planHasFloorareaHasHouseSubparts.count != oldplanHasFloorareaHasHouseSubparts.count){
                    innersubupdate = innersubupdate +"\nSub Part Count is Changed "+oldplanHasFloorareaHasHouseSubparts.count+ " In to "+planHasFloorareaHasHouseSubparts.count;
                }
                if(planHasFloorareaHasHouseSubparts.width != oldplanHasFloorareaHasHouseSubparts.width){
                    innersubupdate = innersubupdate +"\nSub Part Width is Changed "+parseFloat(oldplanHasFloorareaHasHouseSubparts.width).toFixed(2)+ " In to "+planHasFloorareaHasHouseSubparts.width;
                }
                if(planHasFloorareaHasHouseSubparts.height != oldplanHasFloorareaHasHouseSubparts.height){
                    innersubupdate = innersubupdate +"\nSub Part Width is Changed"+parseFloat(oldplanHasFloorareaHasHouseSubparts.height.toFixed(2))+ " In to "+planHasFloorareaHasHouseSubparts.height;
                }
                if(planHasFloorareaHasHouseSubparts.area != oldplanHasFloorareaHasHouseSubparts.area){
                    innersubupdate = innersubupdate +"\nSub Part Area is Changed "+parseFloat(oldplanHasFloorareaHasHouseSubparts.area).toFixed(2)+ " In to "+planHasFloorareaHasHouseSubparts.area;
                }


            }

            return innersubupdate;

        }
        function subinnerUpdate(){
            var subinnerErrors = getsubInnerErrors();

            if(subinnerErrors == ""){
                var innersubUpdate = getSubinnerUpdate();
                if(innersubUpdate == ""){
                    swal({
                        title: 'Nothing Updated..!', icon: "warning",
                        text: '\n',
                        button: false,
                        timer: 1200
                    });
                }else{
                    swal({
                        title: "Are you sure to Inner Form update following details...?",
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
                                planHasFloorarea.planHasFloorareaHasHousesubpartsList[innersubrow] = planHasFloorareaHasHouseSubparts;


                                refreshInnerSubArea();
                                // console.log("New List", bsr.bsrHasBSRsubcategoryList);
                                // console.log("Old List", oldbsr.bsrHasBSRsubcategoryList);
                                //console.log(bsr.bsrHasBSRsubcategoryList == oldbsr.bsrHasBSRsubcategoryList);

                            }
                        });



                }
            }else{
                swal({
                    title: 'You have following errors in your form', icon: "error",
                    text: '\n ' + getsubInnerErrors(),
                    button: true
                });
            }


        }

        function getSubtotalarea(){
            var subtoalarea = 0;


            if(isNaN(subtotalArea.value)){
                subtotalArea.value = "00.00";
                subtotalArea.style.border = invalid;
            }

            if(subparthight.value == 0){
                swal({
                    title: "You Can't Type the Zero for the Sub Part Hight...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
                subparthight.style.border = invalid;
            }

            if(subpartWidth.value !=null && subparthight.value != null && subpartCount.value !=null){

                subtoalarea = (parseFloat(subtoalarea) + (subpartCount.value * parseFloat(subpartWidth.value)* parseFloat(subparthight.value))).toFixed(2);
                planHasFloorareaHasHouseSubparts.area = subtoalarea;
                subtotalArea.value = subtoalarea;
                subtotalArea.style.border = valid;
                console.log( "Sub Total",planHasFloorareaHasHouseSubparts.area );

            }
            if(oldplanHasFloorareaHasHouseSubparts !=null && planHasFloorareaHasHouseSubparts.area != oldplanHasFloorareaHasHouseSubparts.area){

                subtotalArea.style.border = updated;

            }


        }


        function getsubInnerErrors(){
            var SubinnerErrors = "";
            var Subinneraddvalue = "";

            if(cmdhousepart.value == ""){
                console.log(cmdhousepart.value);
                SubinnerErrors = SubinnerErrors +"\n" +"House Part Not Selected";
                $('.Housepartcmbsearch .select2-selection').css('border',invalid);
                //cmdhousepart.style.border = invalid;
            }else
                Subinneraddvalue = 1;


            if(planHasFloorareaHasHouseSubparts.housesubparts_id == null){
                SubinnerErrors = SubinnerErrors +"\n" +"House Sub Part Not Selected";
                cmdhouseArea.style.border = invalid;
            }else
                Subinneraddvalue = 1;
            if(planHasFloorareaHasHouseSubparts.count == null){
                SubinnerErrors = SubinnerErrors +"\n"+"Sub Part Count Not Entered";
                subpartCount.style.border = invalid;
            }else
                Subinneraddvalue = 1;

            if(planHasFloorareaHasHouseSubparts.width == null){
                SubinnerErrors = SubinnerErrors+"\n" +"Sub Part Width Not Entered";
                subpartWidth.style.border = invalid;
            }else
                Subinneraddvalue = 1;

            if(planHasFloorareaHasHouseSubparts.height == null){
                SubinnerErrors = SubinnerErrors+"\n" +"Sub Part Height Not Entered";
                subparthight.style.border = invalid;
            }else
                Subinneraddvalue = 1;

            if(planHasFloorareaHasHouseSubparts.area == null){
                SubinnerErrors = SubinnerErrors+"\n" +"Sub Total Area Not Entered";
                subtotalArea.style.border = invalid;
            }else
                Subinneraddvalue = 1;

            return SubinnerErrors;
        }



        function subinnerAdd(){



            var subareaErrors = getsubInnerErrors();

            if (subareaErrors == "") {
                saveInnersubareadata();

            } else {
                swal({
                    title: "You don't fill some feilds...!",
                    text: subareaErrors,
                    icon: "warning",
                    buttons: true,

                });
            }

            // planHasFloorarea.planHasFloorareaHasHousesubpartsList.push(planHasFloorareaHasHouseSubparts);
            // console.log(planHasFloorarea.planHasFloorareaHasHousesubpartsList);
            //
            // fillInnerTable("tblInnersubtask",planHasFloorarea.planHasFloorareaHasHousesubpartsList,innerModify,innerDelete,false);
            // refreshInnerSubArea();
        }

        function saveInnersubareadata(){

            var subareaList = false;

            for(index in planHasFloorarea.planHasFloorareaHasHousesubpartsList){
                if(planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].housesubparts_id.name == planHasFloorareaHasHouseSubparts.housesubparts_id.name &&
                    planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].width == planHasFloorareaHasHouseSubparts.width &&
                    planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].height == planHasFloorareaHasHouseSubparts.height){

                    subareaList = true;
                    break;
                }
            }






            if(subareaList){
                swal({
                    title: " Allready Exisit...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer: 1500,
                });
                refreshInnerSubArea();

            }else{


                swal({
                    title: "Are you sure...?",
                    text: "Add Following Details ... \n" +

                         "\n House Part : " + JSON.parse(cmdhousepart.value).name +

                        "\n House Sub Part : " + planHasFloorareaHasHouseSubparts.housesubparts_id.name +
                        "\n House Sub Part Count: " + planHasFloorareaHasHouseSubparts.count+

                        "\n House Sub Part Width : " + parseFloat(planHasFloorareaHasHouseSubparts.width).toFixed(2) +
                        "\n House Sub Part Height : "+parseFloat( planHasFloorareaHasHouseSubparts.height).toFixed(2) +
                        "\n House Sub Part Total Area : "+ parseFloat(planHasFloorareaHasHouseSubparts.area).toFixed(2) ,




                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        swal({
                            title: "Sub Area Details Are Save Successfully...!",
                            text: "\n",
                            icon: "success",
                            buttons: false,
                            timer: 1500,
                        });



                        planHasFloorarea.planHasFloorareaHasHousesubpartsList.push(planHasFloorareaHasHouseSubparts);
                         console.log(planHasFloorarea.planHasFloorareaHasHousesubpartsList);
                        refreshInnerSubArea();


                    }
                });
            }



        }

        function innerModify(){

        }

        function innerDelete(){}

        function getWACamount(){
            console.log(planHasFloorarea.planHasFloorareaHasHousesubpartsList);

            //
            // for(index in planHasFloorarea.planHasFloorareaHasHousesubpartsList){
            //     if(planHasFloorarea.planHasFloorareaHasHousesubpartsList[index].housesubparts_id.housepart_id.name == "Outside"){
            //
            //         console.log("OutSide");
            //     }
            // }



            if(planTotalArea.value !=null && wacRatio.value!=null){
                var wacamount = planTotalArea.value * ((wacRatio.value)/100);
                wacRatioamount.value = wacamount;
                wacRatioamount.style.border = valid;

                finalFloorArea.value = (parseFloat(planTotalArea.value)+ parseFloat( wacRatioamount.value)).toFixed(2);
                planHasFloorarea.finalfloorarea = finalFloorArea.value;
                if( planHasFloorarea.finalfloorarea != null){
                    finalFloorArea.style.border = valid;
                    if(oldplanHasFloorarea !=null &&  planHasFloorarea.finalfloorarea != oldplanHasFloorarea.finalfloorarea){
                        finalFloorArea.style.border = updated;
                    }
                }else{
                    finalFloorArea.style.border = invalid;
                }
            }

            // finalFloorArea.value = (parseFloat(planTotalArea.value)+ parseFloat( wacRatioamount.value)).toFixed(2);
            // planHasFloorarea.finalfloorarea = finalFloorArea.value;


        }

        function getPlanareaInnerErrors() {

            var innerPlanareaErrors = "";
            var innerPlanareaaddvalue = "";


            if (planHasFloorarea.floorarea_id == null) {
                innerPlanareaErrors = innerPlanareaErrors + "\n" + "Select the Floor Area";
                cmbfloorArea.style.border = invalid;
            } else
                innerPlanareaaddvalue = 1;
            //
            if (planHasFloorarea.totalarea == null) {
                innerPlanareaErrors = innerPlanareaErrors + "\n" + "Enter the Total of Sub Area";
                planTotalArea.style.border = invalid;
            } else
                innerPlanareaaddvalue = 1;
            if (planHasFloorarea.wallsandcirculationratio == null) {
                innerPlanareaErrors = innerPlanareaErrors + "\n" + "Enter the Wall of Circulation Ratio";
                wacRatio.style.border = invalid;
            } else
                innerPlanareaaddvalue = 1;

            if (wacRatioamount.value == "") {
                innerPlanareaErrors = innerPlanareaErrors + "\n" + "Enter the Wall of Circulation Ratio Amount";
                wacRatioamount.style.border = invalid;
            } else
                innerPlanareaaddvalue = 1;

            if (planHasFloorarea.finalfloorarea == null) {
                innerPlanareaErrors = innerPlanareaErrors + "\n" + "Enter the Total Floor Area";
                finalFloorArea.style.border = invalid;
            } else
                innerPlanareaaddvalue = 1;

            if (planHasFloorarea.planHasFloorareaHasHousesubpartsList.length == 0){
                innerPlanareaErrors = innerPlanareaErrors + "\n" + "Sub Area Details Not Entered";
                getsubInnerErrors();
            } else
                innerPlanareaaddvalue = 1;

            return innerPlanareaErrors;

        }


        function planbtnAdd(){

            var planareaErrors = getPlanareaInnerErrors();

            if (planareaErrors == "") {
                saveInnerplanareadata();

            } else {
                swal({
                    title: "You don't fill some feilds...!",
                    text: planareaErrors,
                    icon: "warning",
                    buttons: true,

                });
            }


            //
            // plan.planHasFloorareaList.push(planHasFloorarea);
            // console.log(planHasFloorarea.planHasFloorareaHasHousesubpartsList);
            //
            //  fillInnerTable("tblInnerplanarea", plan.planHasFloorareaList,innerModify,innerDelete,false);
            // refreshPlanArea();
        }

        function setInitiateplanarea(){

        }

        function planbtnClear(){
            swal({
                title: "Are you sure To Clear the Plan Area Details Form...?",
                text: " \n",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    refreshPlanArea();

                }
            });
        }

        function saveInnerplanareadata(){

            var planareaList = false;

            for(index in plan.planHasFloorareaList){
                if(plan.planHasFloorareaList[index].floorarea_id.name == planHasFloorarea.floorarea_id.name){
                    planareaList = true;
                    break;
                }
            }




            if(planareaList){
                swal({
                    title: " Allready Exisit...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer: 1500,
                });
                refreshPlanArea();

            }else{


                swal({
                    title: "Are you sure...?",
                    text: "Add Following Details ... \n" +


                        "\n Foor Area : " + planHasFloorarea.floorarea_id.name +
                        "\n Total of Sub Area : " + planHasFloorarea.totalarea+

                        "\n Wall Circulation Ratio : " + parseFloat(planHasFloorarea.wallsandcirculationratio).toFixed(2) +
                        "\n  Wall Circulation Amount : "+ parseFloat( wacRatioamount.value).toFixed(2) +
                        "\n Total Foor Area  : "+ parseFloat(planHasFloorarea.finalfloorarea).toFixed(2) ,




                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        swal({
                            title: "Floor Area Details Are Save Successfully...!",
                            text: "\n",
                            icon: "success",
                            buttons: false,
                            timer: 1500,
                        });



                        plan.planHasFloorareaList.push(planHasFloorarea);
                        refreshPlanArea();


                    }
                });
            }

        }

        function setStyle(style) {
            $('.Rescmbsearch .select2-selection').css('border',style);
            rescode.style.border = style;
            cmdplanType.style.border = style;
            perFeetCharge.style.border = style;
            planCharge.style.border = style;

            //addedDate.style.border = style;
           // cusReg.style.border = style;
           //  cusName.style.border = style;
           //  cusFullname.style.border = style;
           //  cusNIC.style.border = style;
           //  cusMobile.style.border = style;
           //  cusAddress.style.border = style;
           //  cusTel.style.border = style;
           //  cusworkdetail.style.border = style;
           //  //cusDescription.style.border = style;
           //  cmbContact.style.border = style;
           //  cusEmail.style.border = style;

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
            for(index in plans){
                if(plans[index].planstatus_id.name =="Deleted"){
                    tblplan.children[1].children[index].style.color = "#f00";
                    tblplan.children[1].children[index].style.border = "2px solid red";
                    tblplan.children[1].children[index].lastChild.children[1].disabled = true;
                    tblplan.children[1].children[index].lastChild.children[1].style.cursor = "not-allowed";

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


            if (plan.plancode == null) {
                planCode.style.border = invalid;
                errors = errors + "\n" + "Plan Code not Entered";

            }else  addvalue = 1;

            if(plan.rnowithprojecttitle ==null){
                rescode.style.border = invalid;
                errors = errors + "\n" + "Reservation not Entered";
            }else addvalue = 1;
            //
            //
            if (plan.plantype_id == null){
                cmdplanType.style.border = invalid;
                errors = errors + "\n" + "Plan Type  not Selected";
            }
            else  addvalue = 1;


            // if (plan.planphoto == null){
            //     // cusNIC.style.border = invalid;
            //     errors = errors + "\n" + "Plan Photo not Entered";
            // }
            // else  addvalue = 1;

            // if (plan.designer_id == null){
            //     cmdpDesinger.style.border = invalid;
            //     errors = errors + "\n" + "Designer not Entered";
            // }
            //
            // else  addvalue = 1;


            // if (plan.persftcharge == null){
            //     perFeetCharge.style.border = invalid;
            //     errors = errors + "\n" + "Customer Address not Entered";
            // }

            // else  addvalue = 1;
            //
            if (plan.totalarea == null){
                TotalArea.style.border = invalid;
                errors = errors + "\n" + "Total Area not Entered";
            }

            else  addvalue = 1;

            if (plan.planstatus_id == null){
                addedDate.style.border = invalid;
                errors = errors + "\n" + "Plan Status Not Selected";
            }

            else  addvalue = 1;
            //
            if (plan.addeddate == null){
                addedDate.style.border = invalid;
                errors = errors + "\n" + "Plan Added Date Not Selected";
            }

            else  addvalue = 1;


            if(plan.planHasFloorareaList.length == 0){
                errors = errors + "\n" + "Plan Floor Area Details not Entered";
            }

            else  addvalue = 1;

            return errors;

        }

        function btnAddMC(){
            if(getErrors()==""){
                if(flePhoto.value=="" || cmdreservation.value == "" || perFeetCharge.value =="" || planCharge.value == "" || planDescription.value == ""){
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
                title: "Are you sure to add following Service Plan Details...?" ,
                text :  "\nPlan Code : " + plan.plancode +
                    "\nReservation Code : " + JSON.parse(cmdreservation.value).reservationcode +

                    "\nProject Title: " + plan.rnowithprojecttitle +
                    "\nPlan Type: " + plan.plantype_id.name +
                    // "\nGender : " + plan.genderId.name +
                    //  "\nCivil Status : " + plan.civilstatusId.name +
                    // "\nDesigner Name : " + plan.designer_id.callingname +
                    "\nPer ft Charge : " + plan.persftcharge +
                    "\nTotal Area : " + plan.totalarea +
                    "\nPlan Charge : " + plan.plancharge +
                    "\nPlan Status : " + plan.planstatus_id.name +
                    "\nAdded Date : " + plan.addeddate +
                    "\nAdded By : " + plan.employee_id.callingname,

                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    var response = httpRequest("/plan", "POST", plan);
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
                        $('#PlanAdding').modal('hide');


                        // changeTab('table');
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

            if(oldplan == null && addvalue == ""){
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

        function fillForm(pl,rowno){
            activerowno = rowno;

            if (oldplan==null) {
                filldata(pl);
            } else {
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        filldata(pl);
                    }

                });
            }

        }


        function filldata(pl) {
            clearSelection(tblplan);
            selectRow(tblplan,activerowno,active);

            plan = JSON.parse(JSON.stringify(pl));
            oldplan = JSON.parse(JSON.stringify(pl));

            planCode.value = plan.plancode;
            planCode.disabled="disabled";

            console.log("Full Object",plan)

            rescode.value = plan.rnowithprojecttitle;
            rescode.disabled = "disabled";

            setDefaultFile('flePhoto',plan.planphoto);

            perFeetCharge.value = parseFloat(plan.persftcharge).toFixed(2);

            console.log("PERFTT", plan.persftcharge);
            TotalArea.value = plan.totalarea;
            planCharge.value = parseFloat(plan.plancharge).toFixed(2);



            if(plan.description == null){
                planDescription.value = "No Description Added";
                planDescription.style.border = initial;
            }else {
                planDescription.value = plan.description;
                planDescription.style.border = valid;
            }

            console.log(plan.addeddate);
            addedDate.value = plan.addeddate;

            fillCombo(cmdAdded,"Select the Designer",employees,"callingname",plan.employee_id.callingname);

            //console.log("Reservation Code",plan.reservation_id);
            reservations = httpRequest("/reservation/resbyadded?designerid="+JSON.parse(cmdAdded.value).id,"GET");

            console.log("Reservation List",reservations);

            fillCombo(cmdreservation,"Select the Reservation Code",reservations,"reservationcode","");


            for(index in reservations){
              var gettitle = reservations[index].projecttitle;
              var rescodevalue =  reservations[index].reservationcode;
                var substrval =  (rescode.value).substring(11,500);
                console.log(substrval);
                 if(substrval == gettitle){

                     fillCombo(cmdreservation,"Select the Reservation Code",reservations,"reservationcode",rescodevalue);
                     cmdreservation.disabled = true;
                     $('.Rescmbsearch .select2-selection').css('border',valid);

                  }


            }


            //getReservation();
            //  fillCombo(cmdreservation,"Select the Reservation Code",reservations,"reservationcode","");


            fillCombo(cmdplanType,"Select the Plan Type",plantypes,"name",plan.plantype_id.name);

            // if(plan.reservation_id == null){
            //     fillCombo(cmdreservation,"Select the Reservation Code",reservations,"reservationcode","");
            // }else{
            //     fillCombo(cmdreservation,"Select the Reservation Code",reservations,"reservationcode",plan.reservation_id.reservationcode);
            // }

            // fillCombo(cmdreservation,"Select the Reservation Code",reservations,"reservationcode",plan.reservation_id.reservationcode);


            //fillCombo(cmdpDesinger,"Select the Designer",employees,"callingname",plan.designer_id.callingname);
            fillCombo(cmdplanStatus,"Select the Plan status",planstatus,"name",plan.planstatus_id.name);


            //setDefaultFile('flePhoto', employee.photo);
            refreshPlanArea();

            disableButtons(true, false, false);
            setStyle(valid);
            $('#PlanAdding').modal('show');

           // changeTab('form');
        }

        function getUpdates() {

            var updates = "";

            if(plan!=null && oldplan!=null) {


                if (plan.plantype_id.name != oldplan.plantype_id.name)
                    updates = updates + "\nPlan Type is Changed.." +oldplan.plantype_id.name +" into " +plantype_id.name  ;


                // if (plan.reservation_id != null){
                //     updates = updates + "\nPlan Type is Changed.."  +plan.reservation_id.reservationcode ;
                //
                // }else if(plan.reservation_id.reservationcode != oldplan.reservation_id.reservationcode){
                //     updates = updates + "\nPlan Type is Changed.." +oldplan.reservation_id.reservationcode +" into " +plan.reservation_id.reservationcode  ;
                //
                // }




                if (plan.planphoto != oldplan.planphoto)
                    updates = updates + "\nPlan Photo is Changed..";

                if (plan.persftcharge != oldplan.persftcharge)
                    updates = updates + "\nPer sf Charge is Changed.." + oldplan.persftcharge + " into "+ plan.persftcharge;

                if (plan.totalarea != oldplan.totalarea)
                    updates = updates + "\nTotal Area is Changed.." +oldplan.totalarea+ " into "+plan.totalarea;


                // if (customer.photo != oldcustomer.photo)
                //     updates = updates + "\nPhoto is Changed";

                if (plan.plancharge != oldplan.plancharge)
                    updates = updates + "\nPlan Charge is Changed.."+  oldplan.plancharge+ " into " +plan.plancharge ;

                if (plan.planstatus_id.name != oldplan.planstatus_id.name)
                    updates = updates + "\nPlan Status is Changed.."+oldplan.planstatus_id.name+ " into "+plan.planstatus_id.name;

                if (plan.description != oldplan.description)
                    updates = updates + "\nDescription is Changed.."+ oldplan.description+ " into "+plan.description;

                if (plan.addeddate != oldplan.addeddate)
                    updates = updates + "\nAdded Date is Changed.."+oldplan.addeddate+ " into "+plan.addeddate;

                if(isEqual( plan.planHasFloorareaList,oldplan.planHasFloorareaList,'floorarea_id'))
                    updates = updates + "\nPlan Floor Area Details is Change";

                if(innerplansubparts){
                    updates = updates + "\nInner Sub Part Details is Change";
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
                            var response = httpRequest("/plan", "PUT", plan);
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
                                $('#PlanAdding').modal('hide');

                                // changeTab('table');

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

        function btnDeleteMC(pl) {
            plan = JSON.parse(JSON.stringify(pl));

            swal({
                title: "Are you sure to delete following customer...?",
                text: "\n Plan Code : " + plan.plancode  +
                "\n Reservation with Project Title : " + plan.rnowithprojecttitle,
                icon: "warning", buttons: true, dangerMode: true,
            }).then((willDelete)=> {
                if (willDelete) {
                    var responce = httpRequest("/plan","DELETE",plan);
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

       function btnPrintTableMC(plan) {

            var newwindow=window.open();
            formattab = tblplan.outerHTML;

           newwindow.document.write("" +
                "<html>" +
                "<head><style type='text/css'>.google-visualization-table-th {text-align: left;} .modifybutton{display: none} .isort{display: none}</style>" +
                "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/></head>" +
                "<body><div style='margin-top: 150px; '> <h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Service Plan Details :</span></h1></div>" +
                "<div>"+ formattab+"</div>"+
               "</body>" +
                "</html>");
           setTimeout(function () {newwindow.print(); newwindow.close();},100) ;
        }

        function sortTable(cind) {
            cindex = cind;

         var cprop = tblplan.firstChild.firstChild.children[cindex].getAttribute('property');

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
            fillTable('tblplan',plans,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblplan);
            loadForm();

            if(activerowno!="")selectRow(tblplan,activerowno,active);



        }


        function btnCloseModalMc(){

            checkerr = getErrors();

            if(oldplan == null && addvalue == ""){
                $('#PlanAdding').modal('hide');

                loadForm();
            }else{
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        $('#PlanAdding').modal('hide');

                        loadForm();
                    }

                });
            }

        }