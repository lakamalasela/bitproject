

 

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

           // cmdprovince.addEventListener("change",getbsrcode);
           // cmdcode.addEventListener("change",categorytrue);
           //  subQty.addEventListener("keyup",getLastprice);

            //
            // cmdfloorArea.addEventListener("change",getSubpartsbyfloorarea);
            // cmdhousesubpart.addEventListener("change",getTotalArea);
            // cmdSubtask.addEventListener("change",function (){
            //
            //
            //     throwbsrid(Bsrid);
            //
            // })
            // cmdSubtask.addEventListener("change",throwbsrid);

            privilages = httpRequest("../privilage?module=ESTIMATION","GET");
            bsrcategory =httpRequest("../bsrcategory/list","GET");
            bsrsubcategory =httpRequest("../bsrsubcategory/list","GET");
            // bsrcategory =httpRequest("../bsrcategory/list","GET");
            // bsrsubcategory =httpRequest("../bsrsubcategory/list","GET");
            // itemunits =httpRequest("../itemunit/list","GET");
           listitem = httpRequest("../bsrhassubcategory/listitem","GET");
            // provinces =httpRequest("../province/list","GET");
             rprstatus =httpRequest("../RPRstatus/list","GET");

            provinces = httpRequest("../bsr/list","GET");

            //reservations = httpRequest("../reservation/list","GET");

            //reservations = httpRequest("../reservation/activelist","GET");
            reservations = httpRequest("../reservation/activeprogresslist","GET");


            // bsrYear.addEventListener("keyup",getBSRcode);
            floorareas = httpRequest("../floorarea/list","GET");
            housesubparts = httpRequest("../housesubparts/list","GET");

            prsubtaskstatus =  httpRequest("../prsubtaskstatus/list","GET");

            //cmbreservation.addEventListener('change',getestimationhassubcategory);
            cmdItemCode.addEventListener("change",getOtherDetails);
            cmdhousesubpart.addEventListener('change',getvalidHousesubparts)
            cmdfloorArea.addEventListener('change',getHousesubarts);
            txtComQty.addEventListener('keyup',getsubstatus);

            //get line amount
            txtPlQty.addEventListener('keyup',getLineAmount);
            txtPlQty.addEventListener('keyup',getPlanQty);

            employees = httpRequest("../employee/list","GET");

            valid = "2px solid green";
            invalid = "2px solid red";
            initial = "2px solid #d6d6c2";
            updated = "2px solid #ff9900";
            active = "#90EE90";

            loadView();
            loadForm();


            changeTab('form');
        }

        function getestimationhassubcategory(){


            $('#collapseSubtask').collapse('show');
            btnSubtask.disabled = false;



            cmdfloorArea.disabled = false;
            console.log(JSON.parse(cmbreservation.value));

            if((JSON.parse(cmbreservation.value).paidamount) != null){
              ReservationPaidamount = JSON.parse(cmbreservation.value).paidamount;
                txtPaidamount.value = parseFloat(ReservationPaidamount).toFixed(2);
                rprogress.reservationpaidamount = txtPaidamount.value;
                txtPaidamount.style.border = valid;
            }else{
                txtPaidamount.value = parseFloat(0).toFixed(2);
                rprogress.reservationpaidamount = txtPaidamount.value;
                txtPaidamount.style.border = valid;
            }

            if((JSON.parse(cmbreservation.value).lastprice) != null){
                ReservationLastprice =  JSON.parse(cmbreservation.value).lastprice;
                txtTotalamount.value = parseFloat(ReservationLastprice).toFixed(2);
                rprogress.reservationtotalamount =  txtTotalamount.value;
                txtTotalamount.style.border = valid;
            }
            // else{
            //     txtTotalamount.value = parseFloat(0).toFixed(2);
            //     rprogress.reservationtotalamount =  txtTotalamount.value;
            //     txtTotalamount.style.border = valid;
            // }


            //
            // listbyrservationcode = httpRequest("/estimationhassubcategory/listbyreservationcode?reservationcode="+JSON.parse(cmbreservation.value).reservationcode,"GET");
            // console.log("ESTIMATIO HAS SUB",listbyrservationcode);

            listbyfloorareaofreservation = httpRequest("/floorarea/listbyestimation?reservationcode="+JSON.parse(cmbreservation.value).reservationcode,"GET");
            //console.log(listbyrservationcode.floorarea_id);
            fillCombo(cmdfloorArea,"Select the Floor Area",listbyfloorareaofreservation,"name","");
            cmdfloorArea.style.border = initial;


        }

        function getPlanQty(){

            if(parseFloat(subQty.value)<parseFloat(txtPlQty.value)){
                swal({
                    title: "You Can't Exceed Real Quantity...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
                txtPlQty.style.border = invalid;
                txtPlQty.value = "";
            }
        }

        function getsubstatus(){
            if(parseFloat(subQty.value) == parseFloat(txtComQty.value)){
                fillCombo(cmbPrstatus,"Select Subtask Status",prsubtaskstatus,"name","Completed");
                reservationprogressHasEstimationHasSubcategory.prsubtaskstatus_id = JSON.parse(cmbPrstatus.value);
                cmbPrstatus.disabled = true;


            }else if(parseFloat(txtComQty.value)<parseFloat(subQty.value)){
                fillCombo(cmbPrstatus,"Select Subtask Status",prsubtaskstatus,"name","Not-Completed");
                reservationprogressHasEstimationHasSubcategory.prsubtaskstatus_id = JSON.parse(cmbPrstatus.value);
                cmbPrstatus.disabled = true;
            }

            if(parseFloat(txtComQty.value)> parseFloat(subQty.value)){
                swal({
                    title: "You Can't Exceed Real Quantity...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1500

                });
                txtComQty.style.border = invalid;
                txtComQty.value = "";
                fillCombo(cmbPrstatus,"Select Subtask Status",prsubtaskstatus,"name","");

                // if(noBed.value == 0){
                //     swal({
                //         title: "You Can't Type the Zero for the No of Bed...!",
                //         text: "\n",
                //         icon: "warning",
                //         buttons: false,
                //         timer:1500
                //
                //     });
                //     noBed.style.border = invalid;
                // }
            }
        }

        function getvalidHousesubparts(){
            cmdhousesubpart.style.border = valid;
            cmdCategory.disabled = false;
        }

        function getHousesubarts(){
            cmdhousesubpart.disabled = false;

            console.log(JSON.parse(cmdfloorArea.value));
            listbyfla = httpRequest("/housesubparts/listbyestofres?floorareaid="+JSON.parse(cmdfloorArea.value).id+"&reservationcode="+JSON.parse(cmbreservation.value).reservationcode,"GET");
            fillCombo(cmdhousesubpart,"Select the Floor Area",listbyfla,"name","");
            cmdfloorArea.style.border = valid;

        }
        function getbsrcode(){
            cmdcode.disabled = false;
            cmdprovince.style.border = valid;
            console.log(JSON.parse(cmdprovince.value))

             bsrcodebyprovince = httpRequest("bsr/listbybsrcode?provinceid="+JSON.parse(cmdprovince.value).id,"GET")

            //fill the bsrcode
             fillCombo(cmdcode,"Select the BSR Code",bsrcodebyprovince,"bsrcode","");
            //fillCombopro(cmdprovince,"Select the Province Code",provinces,"province_id.id","");
            //
            // console.log(JSON.parse(cmdprovince.value).province_id.id);
            // console.log(bsrcodebyprovince);


        }



        function categorytrue(){
            cmdCategory.disabled = false;
        }

        function getItemCode(){

            if(cmdcode.value != ""){
                cmdItemCode.disabled = false;
                cmdSubtask.disabled =false;
                cmdSubtask.style.border = valid;
            }else{
                cmdItemCode.disabled = true;
                cmdSubtask.disabled =true;
                cmdSubtask.style.border = invalid;
            }

            getbsrItem = httpRequest("bsrhassubcategory/listbybsrhassubcategory?bsrid="+JSON.parse(cmdcode.value).id+"&subcategoryid="+JSON.parse(cmdSubtask.value).id,"GET")
            console.log("BSR CODE",JSON.parse(cmdcode.value).id);
            console.log("BSR SUB TASK",cmdSubtask.value)
            fillCombo(cmdItemCode,"Select the Item Code",getbsrItem,"itemcode","");


        }

        function getOtherDetails(){
            cmdItemCode.style.border = valid;


        listbydetails = httpRequest("/estimationhassubcategory/listbyreservationcode?itemcode="+JSON.parse(cmdItemCode.value).id+"&floorareaid="+JSON.parse(cmdfloorArea.value).id+"&housesubpartid="+JSON.parse(cmdhousesubpart.value).id+"&reservationcode="+JSON.parse(cmbreservation.value).reservationcode,"GET");

            //estimation_has_subcategory eken ena object eka reservation progress ekee inner table ekee
            // estimation_has_subcategory_id ekta bind kraa
            reservationprogressHasEstimationHasSubcategory.estimation_has_subcategory_id = listbydetails;

            console.log("FINAL OUT",listbydetails)
            subUnit.value = listbydetails.unit;
            reservationprogressHasEstimationHasSubcategory.unit =  subUnit.value;
            subUnit.style.border = valid;

             subDescription.value = listbydetails.description;
             subDescription.style.border = valid;

            subQty.value = listbydetails.quantity;
            reservationprogressHasEstimationHasSubcategory.quantity = subQty.value;
            subQty.style.border = valid;

            subRate.value = parseFloat(listbydetails.rate).toFixed(2);
            reservationprogressHasEstimationHasSubcategory.rate =  subRate.value;
            subRate.style.border = valid;

            totalArea.value =  parseFloat(listbydetails.totalarea).toFixed(2);
            totalArea.style.border = valid;

            subLastprice.value = parseFloat(listbydetails.lastprice).toFixed(2);
            reservationprogressHasEstimationHasSubcategory.lastprice = subLastprice.value;
            subLastprice.style.border = valid;








            // EstimationHasSubcategory.itemcode = JSON.parse(cmdItemCode.value).itemcode;
            //         console.log( EstimationHasSubcategory.itemcode);
            //         cmdItemCode.style.border = valid;
            //
            //          itemunitname = JSON.parse(cmdItemCode.value).itemunit_id.name;
            //         subUnit.value = itemunitname;
            //         EstimationHasSubcategory.unit =subUnit.value
            //         subUnit.style.border = valid;

                    //get the value of bsr sub category description
                    // subDescription.value = JSON.parse(cmdItemCode.value).description;
                    // EstimationHasSubcategory.description  =subDescription.value;
                    // subDescription.style.border = valid;
                    // //get the value of bsrrate
                    // subRate.value = parseFloat(JSON.parse(cmdItemCode.value).bsrrate).toFixed(2);
                    // EstimationHasSubcategory.rate  =subRate.value;
                    // subRate.style.border = valid;

        }

        function getLineAmount(){
            txtLineAmount.value = (parseFloat(txtPlQty.value)*parseFloat(totalArea.value)*parseFloat(subRate.value)).toFixed(2);
            reservationprogressHasEstimationHasSubcategory.linetotalamount =  txtLineAmount.value;
            txtLineAmount.style.border = valid;

        }

        //bsr id pass the subtcategory list
        // function getbsrid(){
        //
        //     cmdSubtask.disabled = false;
        //      var Bsrid=JSON.parse(cmdcode.value).id
        //
        //     //return Bsrid;
        //     cmdSubtask.addEventListener("change",function (){
        //
        //
        //         throwbsrid(Bsrid);
        //
        //     })
        //     console.log("This is BSR ID ",JSON.parse(cmdcode.value).id);
        // }
        //

        // function throwbsrid(bsrid){
        //
        //     console.log(JSON.parse(cmdSubtask.value).name);
        //
        //
        //     console.log(bsrid);
        //   if(bsrid != ""){
        //       cmdItemCode.disabled = false;
        //       cmdSubtask.disabled =false;
        //       cmdSubtask.style.border = valid;
        //   }else{
        //       cmdItemCode.disabled = true;
        //       cmdSubtask.disabled =true;
        //       cmdSubtask.style.border = invalid;
        //   }
        //
        //
        //     getbsrItem = httpRequest("bsrhassubcategory/listbybsrhassubcategory?bsrid="+bsrid+"&subcategoryid="+JSON.parse(cmdSubtask.value).id,"GET")
        //     //console.log(getbsrItem);
        //
        //     fillCombo(cmdItemCode,"Select the Item Code",getbsrItem,"itemcode","");
        //
        //     // var itemsr = JSON.parse(cmdItemCode.value);
        //    // console.log(cmdItemCode.value);
        //     //
        //
        //
        //     cmdItemCode.addEventListener("change",function (){
        //         console.log(JSON.parse(cmdItemCode.value));
        //
        //          console.log(JSON.parse(cmdItemCode.value).itemunit_id.name);
        //
        //         console.log(JSON.parse(cmdItemCode.value).itemcode);
        //         EstimationHasSubcategory.itemcode = JSON.parse(cmdItemCode.value).itemcode;
        //         console.log( EstimationHasSubcategory.itemcode);
        //         cmdItemCode.style.border = valid;
        //
        //          itemunitname = JSON.parse(cmdItemCode.value).itemunit_id.name;
        //         subUnit.value = itemunitname;
        //         EstimationHasSubcategory.unit =subUnit.value
        //         subUnit.style.border = valid;
        //
        //         //get the value of bsr sub category description
        //         subDescription.value = JSON.parse(cmdItemCode.value).description;
        //         EstimationHasSubcategory.description  =subDescription.value;
        //         subDescription.style.border = valid;
        //         //get the value of bsrrate
        //         subRate.value = parseFloat(JSON.parse(cmdItemCode.value).bsrrate).toFixed(2);
        //         EstimationHasSubcategory.rate  =subRate.value;
        //         subRate.style.border = valid;
        //     })
        //
        //
        //
        // }

        function getLastprice(){

            if(subQty.value !=0){



                if(JSON.parse(cmdCategory.value).name == "EXTERNAL FITTING" || JSON.parse(cmdCategory.value).name == "PLUMBLER" || JSON.parse(cmdCategory.value).name == "WIRING-F"){
                    var LastPrice =   parseFloat(subQty.value).toFixed(2) * parseFloat(subRate.value).toFixed(2);

                }else if(totalArea.value !=0){
                    LastPrice =   parseFloat(subQty.value).toFixed(2) * parseFloat(subRate.value).toFixed(2)*parseFloat(totalArea.value).toFixed(2);

                }


                // if(totalArea.value !=0){
                //      LastPrice =   parseFloat(subQty.value).toFixed(2) * parseFloat(subRate.value).toFixed(2)*parseFloat(totalArea.value).toFixed(2);
                //
                // }
               // var LastPrice =   parseFloat(subQty.value).toFixed(2) * parseFloat(subRate.value).toFixed(2);

                console.log(LastPrice);


                subLastprice.value = parseFloat(LastPrice).toFixed(2);
                EstimationHasSubcategory.lastprice =   subLastprice.value;

                if(subLastprice.value ==""){
                    subLastprice.style.border = invalid;
                }else{
                    subLastprice.style.border = valid;
                }

            }else{

                swal({
                    title: "You Can't Type the Zero for the Quantity...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1200

                });
                subQty.style.border = invalid;

            }


        }




        //get the value of list through the property
        function getValueproperty(list,attribute){
            for( index in list ){
               var getVal =  getDatafromObjectList(list[index],attribute);
            }
            return getVal;
        }

        // function getBSRcode(){
        //     // if( bsrCode.value == null){
        //     //     bsrCode.value = "BSR Code Not Still Enter";
        //     // }
        //     bsrCode.value = bsr.province_id.code+"-"+bsr.year;
        //     bsr.bsrcode =  bsrCode.value;
        //
        //     if( bsr.bsrcode != null){
        //         bsrCode.style.border = valid;
        //     }
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
            rprogresses = new Array();
          var data = httpRequest("/reservationprogress/findAll?page="+page+"&size="+size+query,"GET");
            if(data.content!= undefined) rprogresses = data.content;
            createPagination('pagination',data.totalPages, data.number+1,paginate);
            fillTable('tblRprogress',rprogresses,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblRprogress);

            if(activerowno!="")selectRow(tblRprogress,activerowno,active);

        }

        function paginate(page) {



            checkerr = getErrors();

            if(oldestimation == null && addvalue == ""){
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

        function viewitem(rp,rowno) {

            viewrprogress = JSON.parse(JSON.stringify(rp));



            tdrprogresscode.innerHTML = viewrprogress.rpcode;



            tdreservation.innerHTML = viewrprogress.reservation_id.reservationcode;
            tdtotalamount.innerHTML = parseFloat(viewrprogress.reservationtotalamount).toFixed(2);
            tdpiadamount.innerHTML = parseFloat(viewrprogress.reservationpaidamount).toFixed(2);
            tdstartdate.innerHTML = viewrprogress.stratdate;
            tdenddate.innerHTML = viewrprogress.enddate;
            tdprogressamount.innerHTML = parseFloat(viewrprogress.progressreportamount).toFixed(2);
            tdaddeddate.innerHTML = viewrprogress.addeddate;

            if(viewrprogress.description != null){
                tddescription.innerHTML = viewrprogress.description;

            }else{
                tddescription.innerHTML = "<p style='color: red;font-size: 15px;'>No Description Added</p>";

            }
            tdstatus.innerHTML = viewrprogress.rprstatus_id.name;
            tdaddedby.innerHTML = viewrprogress.employee_id.callingname;


            // if(employee.photo==null)
            //     tdphoto.src= 'resourse/image/noimage.png';
            //  else
            // tdphoto.src = atob(employee.photo);



            fillInnerTable("tblInnerrowprint",viewrprogress.reservationprogressHasEstimationHasSubcategoryList,innerModify,innerDelete,innerView);

            // if(bsr.bsrHasBSRsubcategoryList.length !=0){
            //     for(index in bsr.bsrHasBSRsubcategoryList){
            //         tblInnerrowprint.children[1].children[index].lastChild.children[0].style.display = "none";
            //     }
            // }



            $('#dataviewModal').modal('show');


         }

         function btnPrintRowMC(){

             var format = printformtable.outerHTML;
             //
             // var newwindow=window.open();
             // newwindow.document.write("<html>" +
             //     "<head><style type='text/css'>.google-visualization-table-th {text-align: left;}</style>" +
             //     "" +
             //     "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/>" +
             //     "<link rel='stylesheet' href='../resources/bootstrap/css/font-awesome.min.css'/>"+
             //     "</head>" +
             //     "<body><div style='margin-top: 150px'><h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Reservation Progress Details :</span> </h1></div>" +
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
                 "</address></div></div></di><hr> <h1>Reservation Progress Details :</h1></div>" +
                 "<div>"+format+"</div>" +
                 "<script>printformtable.removeAttribute('style')</script>" +
                 "</body></html>");
             setTimeout(function () {newwindow.print(); newwindow.close();},100);
         }

        function loadForm() {
            rprogress = new Object();
            oldrprogress = null;

            rprogress.reservationprogressHasEstimationHasSubcategoryList = new Array();

            var nextnumber = httpRequest("/reservationprogress/nextnumber","GET");
            txtPresprogress.value = nextnumber.rpcode;
            rprogress.rpcode = txtPresprogress.value;
            txtPresprogress.disabled = true;
            txtPresprogress.style.border = valid;

            //start date
            cmbStratdate.max = getCurrentDateTime('date');
            var today = new Date();
            var previousweek = new Date();
            previousweek.setDate(today.getDate()-7);

            let month = previousweek.getMonth()+1;
            if(month<10){
                month ="0"+ month;
            }

            let day = previousweek.getDate();
            if(day<10){
                day ="0"+ day;
            }
            cmbStratdate.min = previousweek.getFullYear()+"-"+month+"-"+day;

            //enddate
            cmbEndDate.min = getCurrentDateTime('date');
            var endtoday = new Date();
            var nextweek = new Date();

            nextweek.setDate(endtoday.getDate()+30);

            let getEndMonth = nextweek.getMonth()+1;
            if(getEndMonth<10){
                getEndMonth = "0"+getEndMonth;
            }

            let getEnddate = nextweek.getDate();
            if(getEnddate<10){
                getEnddate = "0"+getEnddate;
            }



            cmbEndDate.max = nextweek.getFullYear()+"-"+getEndMonth+"-"+getEnddate;

            txtTotalamount.value = "";
            txtPaidamount.value = "";
            txtDescription.value = "";


            fillCombo(cmbreservation,"Select Res_Code",reservations,"reservationcode","");
             fillCombo(cmdStatus,"Select the RPR Status",rprstatus,"name","In-Progress");
              rprogress.rprstatus_id=JSON.parse(cmdStatus.value);
              cmdStatus.disabled=true;


            fillCombo(cmdAdded,"Select Civil Status",employees,"callingname",session.getObject('activeuser').employeeId.callingname);
            rprogress.employee_id = JSON.parse(cmdAdded.value);
            cmdAdded.disabled = true;

            cmbStratdate.value = "";
            cmbStratdate.style.border = initial;

            cmbEndDate.value = "";
            cmbEndDate.style.border = initial;



            $('#collapseSubtask').collapse('hide');
            btnSubtask.disabled = true;


             //
             // var today = new Date();
             // var month = today.getMonth()+1;
             // if(month<10) month = "0"+month;
             // var date = today.getDate();
             // if(date<10) date = "0"+date;

              //addedDate.value=today.getFullYear()+"-"+month+"-"+date;
            addedDate.value = getCurrentDateTime('date');
            rprogress.addeddate=addedDate.value;
             addedDate.disabled = true;
            addedDate.style.border=valid;




            //  removeFile('flePhoto');
            //
              setStyle(initial);
            //  cmbEmployeestatus.style.border=valid;
            //  dteDOAssignment.style.border=valid;
            // txtNumber.style.border=valid;
            //
            disableButtons(false, true, true);
            refreshInnerForm();
        }

        function getrescode(){
            cmdresvation.style.border = valid;

            cmdfloorArea.disabled =false;
            cmdhousesubpart.disabled =false;

            console.log("RESERVATION Belongs Plan ",JSON.parse(cmdresvation.value).plan_id.id);

            listbyreservation = httpRequest("/province/listbtreservation?reservationid="+JSON.parse(cmdresvation.value).id,"GET");

            fillCombo(cmdprovince,"Select the Province",listbyreservation,"name","");


            reservationCodeget = JSON.parse(cmdresvation.value).reservationcode;
            rservationWithprojecttitleget = JSON.parse(cmdresvation.value).projecttitle;

            rescode.value = reservationCodeget+"-"+rservationWithprojecttitleget;

            estimation.rnowithprojecttitle = rescode.value;
            rescode.style.border = valid;
            rescode.disabled = true;

            //floor area fill

             listbyresfloorarea = httpRequest("/floorarea/listbyplan?planid="+JSON.parse(cmdresvation.value).plan_id.id,"GET");
            fillCombo(cmdfloorArea,"Select the Floor Area",listbyresfloorarea,"name","");




        }
        function getSubpartsbyfloorarea(){

            cmdfloorArea.style.border=valid;
            listbyfloorarea = httpRequest("/housesubparts/listbyplanandfloorarea?planid="+JSON.parse(cmdresvation.value).plan_id.id+"&floorareaid="+JSON.parse(cmdfloorArea.value).id,"GET");

            console.log("SUB PARTS",listbyfloorarea)

            fillCombo(cmdhousesubpart,"Select the Sub Parts",listbyfloorarea,"name","");


        }
        function getTotalArea(){

            cmdhousesubpart.style.border = valid;

            listbysubpartofarea = httpRequest("/planhasfloorareahashousesubparts/listbyhosuesubpart?housesubpartid="+JSON.parse(cmdhousesubpart.value).id+"&planid="+JSON.parse(cmdresvation.value).plan_id.id+"&floorareaid="+JSON.parse(cmdfloorArea.value).id,"GET");

            console.log("Total Area is",listbysubpartofarea);

            totalArea.value = parseFloat(listbysubpartofarea.area).toFixed(2);
            EstimationHasSubcategory.totalarea =  totalArea.value;

            if(totalArea.value !=null){
                totalArea.style.border = valid;
            }
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




        function refreshInnerForm(){
            reservationprogressHasEstimationHasSubcategory = new Object();
            oldreservationprogressHasEstimationHasSubcategory= null;

            if((cmbreservation.value)!=""){
                listbyfloorareaofreservation = httpRequest("/floorarea/listbyestimation?reservationcode="+JSON.parse(cmbreservation.value).reservationcode,"GET");
                fillCombo(cmdfloorArea,"Select the Floor Area",listbyfloorareaofreservation,"name","");

            }else{
                fillCombo(cmdfloorArea,"Select the Floor Area",floorareas,"name","");

            }

            fillCombo(cmdhousesubpart,"Select the Sub Parts",housesubparts,"name","");
            fillCombo(cmdItemCode,"Select the Item Code",listitem,"itemcode","");

            cmdItemCode.disabled = true;
            cmdCategory.disabled = true;
            //cmdfloorArea.disabled = true;
            cmdhousesubpart.disabled = true;

             var totalprogressamount = 0;
            // cmdfloorArea.disabled =false;
            // cmdhousesubpart.disabled = false;


            fillCombo(cmbPrstatus,"Select Subtask Status",prsubtaskstatus,"name","");
            // reservationprogressHasEstimationHasSubcategory.prsubtaskstatus_id = JSON.parse(cmbPrstatus.value);
            // console.log("SUB_STATUS",reservationprogressHasEstimationHasSubcategory.prsubtaskstatus_id)


            fillCombo(cmdCategory,"Select Category",bsrcategory,"name","");



            InnerAdd.disabled=false;
            InnerUpdate.disabled=true;

            InnerUpdate.style.cursor = "not-allowed";
            InnerAdd.style.cursor ="pointer ";

             subUnit.value ="";
             subDescription.value = "";
             subQty.value = "";
             subRate.value = "";
             totalArea.value = "";
            subLastprice.value = "";
            txtPlQty.value = "";
            txtComQty.value = "";
            txtLineAmount.value = "";

            cmdfloorArea.style.border = initial;
            cmdhousesubpart.style.border = initial;
            //cmdCategory.style.border = initial;
            $('.BSRcatcmbsearch .select2-selection').css('border',initial);
            cmdItemCode.style.border = initial;
            subUnit.style.border = initial;
            subDescription.style.border = initial;
            subQty.style.border = initial;
            subRate.style.border = initial;
            totalArea.style.border = initial;
            subLastprice.style.border = initial;
            cmbPrstatus.style.border = initial;
            txtPlQty.style.border = initial;
            txtComQty.style.border = initial;
            txtLineAmount.style.border = initial;





            fillInnerTable("tblInnerprogresssubtask",rprogress.reservationprogressHasEstimationHasSubcategoryList ,innerModify,innerDelete,true);

            // if(rprogress.reservationprogressHasEstimationHasSubcategoryList !=0){
            //     for(index in  estimation.estimationHasSubcategoryList){
            //         tblInnersubtask.children[1].children[index].lastChild.children[0].style.display = "none";
            //     }
            // }
            //
            if(rprogress.reservationprogressHasEstimationHasSubcategoryList.length!=0){
                for(index in rprogress.reservationprogressHasEstimationHasSubcategoryList){
                    totalprogressamount = parseFloat(totalprogressamount)+(parseFloat(rprogress.reservationprogressHasEstimationHasSubcategoryList[index].linetotalamount));
                }
            }
            rprogress.progressreportamount = parseFloat(totalprogressamount).toFixed(2);
            txtProgressamount.value =  rprogress.progressreportamount;

            if(totalprogressamount == 0){
                txtProgressamount.style.border = invalid;
            }else{
                txtProgressamount.style.border = valid;
                if(oldrprogress != null && rprogress.progressreportamount != oldrprogress.progressreportamount){
                    txtProgressamount.style.border = updated;
                }
            }


        }
        function innerModify(ob,innerrowno){
            innerrow = innerrowno;

            EstimationHasSubcategory = JSON.parse(JSON.stringify(ob));
            oldEstimationHasSubcategory = JSON.parse(JSON.stringify(ob));


            InnerAdd.disabled=true;
            InnerUpdate.disabled=false;

            InnerUpdate.style.cursor = "pointer";
            InnerAdd.style.cursor ="not-allowed";



            if((cmdresvation.value) != ""){
                listbyresfloorarea = httpRequest("/floorarea/listbyplan?planid="+JSON.parse(cmdresvation.value).plan_id.id,"GET");
                fillCombo(cmdfloorArea,"Select the Floor Area",listbyresfloorarea,"name",EstimationHasSubcategory.floorarea_id.name);
                cmdfloorArea.style.border = valid;


            }
            if((cmdfloorArea.value)!=""){
                listbyfloorarea = httpRequest("/housesubparts/listbyplanandfloorarea?planid="+JSON.parse(cmdresvation.value).plan_id.id+"&floorareaid="+JSON.parse(cmdfloorArea.value).id,"GET");
                fillCombo(cmdhousesubpart,"Select the Sub Parts",listbyfloorarea,"name",EstimationHasSubcategory.housesubparts_id.name);
                console.log("Fill HSP",EstimationHasSubcategory.housesubparts_id.name)
                cmdhousesubpart.style.border = valid;

            }

            console.log(EstimationHasSubcategory.bsr_has_bsrsubcategory_id.bsrsubcategory_id.bsrcategory_id.name);
            var getCatFill = EstimationHasSubcategory.bsr_has_bsrsubcategory_id.bsrsubcategory_id.bsrcategory_id.name


            fillCombo(cmdCategory,"Select the BSR Category",bsrcategory,"name",getCatFill);
            cmdCategory.disabled = false;

            fillCombo(cmdSubtask,"Select the BSR Sub Category",bsrsubcategory,"name",EstimationHasSubcategory.bsr_has_bsrsubcategory_id.bsrsubcategory_id.name);

            fillCombo(cmdItemCode,"Select the Item Code",listitem,"itemcode",EstimationHasSubcategory.itemcode);

            subUnit.value = EstimationHasSubcategory.unit;
            subUnit.disabled = true;
            subUnit.style.border = valid;

            subDescription.value = EstimationHasSubcategory.description;
            subDescription.style.border = valid;

            subQty.value = parseFloat(EstimationHasSubcategory.quantity).toFixed(2);
            subQty.style.border = valid;

            subRate.value = parseFloat(EstimationHasSubcategory.rate).toFixed(2);
            subRate.style.border = valid;

            totalArea.value = parseFloat(EstimationHasSubcategory.totalarea).toFixed(2);
            totalArea.style.border = valid;
            // if(){
            //
            // }
            //
            // listbysubpartofarea = httpRequest("/planhasfloorareahashousesubparts/listbyhosuesubpart?housesubpartid="+JSON.parse(cmdhousesubpart.value).id+"&planid="+JSON.parse(cmdresvation.value).plan_id.id+"&floorareaid="+JSON.parse(cmdfloorArea.value).id,"GET");
            // totalArea.value = parseFloat(listbysubpartofarea.area).toFixed(2);


            subLastprice.value = parseFloat(EstimationHasSubcategory.lastprice).toFixed(2);
            subLastprice.style.border = valid;


        }


        function getinnerupdate(){

            var innerupdate = "";



            if(EstimationHasSubcategory !=null && oldEstimationHasSubcategory !=null){

                if (EstimationHasSubcategory.floorarea_id.name != oldEstimationHasSubcategory.floorarea_id.name)
                    innerupdate = innerupdate + "\nFloor Area is Changed.." + oldEstimationHasSubcategory.floorarea_id.name + " into " + EstimationHasSubcategory.floorarea_id.name;

                if (EstimationHasSubcategory.housesubparts_id.name != oldEstimationHasSubcategory.housesubparts_id.name)
                    innerupdate = innerupdate + "\nHouse Sub Part is Changed.." + oldEstimationHasSubcategory.housesubparts_id.name + " into " + EstimationHasSubcategory.housesubparts_id.name;


                if (EstimationHasSubcategory.totalarea != oldEstimationHasSubcategory.totalarea)
                    innerupdate = innerupdate + "\nHouse Sub Part is Changed.." + oldEstimationHasSubcategory.totalarea + " into " + EstimationHasSubcategory.totalarea;


                //

                if (EstimationHasSubcategory.quantity != oldEstimationHasSubcategory.quantity)
                    innerupdate = innerupdate + "\nQuatity is Changed.." + oldEstimationHasSubcategory.quantity + " into " + EstimationHasSubcategory.quantity;

            }
            return innerupdate;


        }



        function btnUpdateInner(){
            var innerErrors = getInnerErrors();
            if(innerErrors == ""){
                var innerUpdate = getinnerupdate();
                if(innerUpdate ==""){
                    swal({
                        title: 'Nothing Updated..!', icon: "warning",
                        text: '\n',
                        button: false,
                        timer: 1200
                    });
                }else{
                    swal({
                        title: "Are you sure to inner form update following details...?",
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
                                estimation.estimationHasSubcategoryList[innerrow] = EstimationHasSubcategory;
                                //console.log(porder.purchaseorderHasItemList)
                                refreshInnerForm();
                               // getbsrid();
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





        function innerDelete( EstimationHasSubcategory,rowno){

            swal({
                title: "Are you sure...?",
                text: "Delete Following BSR Sub Task ... \n" +
                    "BSR Sub Category name : " +  EstimationHasSubcategory.bsr_has_bsrsubcategory_id.bsrsubcategory_id.name,
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

                    estimation.estimationHasSubcategoryList.splice(rowno, 1);
                    refreshInnerForm();


                }
            });


        }
        function innerView(){

        }

        function cmdgetsubcategory(){
            //cmdSubtask.disabled = false;
            $('.BSRcatcmbsearch .select2-selection').css('border',valid);
            //cmdCategory.style.border = valid;
            cmdItemCode.disabled = false;
            // listbycategory = httpRequest("/bsrhassubcategory/listbyestofres?"floorareaid="+JSON.parse(cmdfloorArea.value).id +"&housesubpartid="+JSON.parse(cmdhousesubpart.value).id + "&reservationcode="+JSON.parse(cmbreservation.value).reservationcode)
            listbycategory = httpRequest("/bsrhassubcategory/listbyestofres?bsrcategoryid="+JSON.parse(cmdCategory.value).id +"&floorareaid="+JSON.parse(cmdfloorArea.value).id+"&housesubpartid="+JSON.parse(cmdhousesubpart.value).id+"&reservationcode="+JSON.parse(cmbreservation.value).reservationcode,"GET")
            console.log("BSR HAS SUB CATEGORY",listbycategory);

            fillCombo(cmdItemCode,"Select the Item Code",listbycategory,"itemcode","");
            cmdItemCode.style.border = initial;
            // $("#cmdcode").on('change',function (event,wasTrigger){
            //     if(wasTrigger){
            //         console.log("The BSR Code Select")
            //     }else{
            //         console.log("BSR Not Select");
            //     }
            // })
            // if(getbsrid()==null){
            //     console.log("Select the BSR Code");
            // }

            // cmdCategory.style.border = valid;
            // bsrsubcategoriesbycategory = httpRequest("bsrsubcategory/listbycategory?categoryid="+JSON.parse(cmdCategory.value).id,"GET")
            //
            // fillCombo(cmdSubtask,"Select the BSR Sub Category",bsrsubcategoriesbycategory,"name","");
            //
            // fillCombo(cmdItemCode,"Select the Item Code",listitem,"itemcode","");
            //
            // subDescription.style.border = initial;
            // cmdItemCode.style.border = initial;
            // cmdSubtask.style.border = initial;
            // subUnit.style.border = initial;
            // subRate.style.border = initial;
            //
            // subDescription.value = "";
            // subUnit.value = "";
            // subRate.value = "";
            //
            // EstimationHasSubcategory.description = null;
            // EstimationHasSubcategory.quantity = null;
            // EstimationHasSubcategory.rate = null;
            // EstimationHasSubcategory.lastprice = null;
            // cmdSubCategory.style.border = valid;
           //
           //  if(bsrHasBSRsubcategory.bsrsubcategory_id== null){
           //      cmdSubCategory.disabled = true;
           //  }

            //item code bind
            //itemCode.value = JSON.parse(cmdCategory.value).code;

        }

        function setStyle(style) {

            $('.Rescmbsearch .select2-selection').css('border',style);
            txtTotalamount.style.border = style;
            txtPaidamount.style.border = style;
            cmbStratdate.style.border = style;
            cmbEndDate.style.border = style;
            txtDescription.style.border = style;
            CmbResprogress.style.border = style;
            //cusDescription.style.border = style;

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


            //edit desabled
            for(index in rprogresses){
                tblRprogress.children[1].children[index].lastChild.children[0].disabled = true;
                tblRprogress.children[1].children[index].lastChild.children[0].style.cursor = "not-allowed";

            }

            // select deleted data row
            for(index in rprogresses){
                if(rprogresses[index].rprstatus_id.name =="Deleted"){
                    tblRprogress.children[1].children[index].style.color = "#f00";
                    tblRprogress.children[1].children[index].style.border = "2px solid red";
                    tblRprogress.children[1].children[index].lastChild.children[1].disabled = true;
                    tblRprogress.children[1].children[index].lastChild.children[1].style.cursor = "not-allowed";

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


            if (rprogress.rpcode == null) {
                txtPresprogress.style.border = invalid;
                errors = errors + "\n" + "Progresss Code not Selected";

            }else  addvalue = 1;

            if(rprogress.reservation_id ==null){
                //cmbreservation.style.border = invalid;
                $('.Rescmbsearch .select2-selection').css('border',invalid);
                errors = errors + "\n" + "Reservation Code not Entered";
            }else{
                addvalue = 1;
            }

            if (rprogress.reservationtotalamount == null){
                txtTotalamount.style.border = invalid;
                errors = errors + "\n" + "Total amount not Entered";
            }
            else  addvalue = 1;


            if (rprogress.reservationpaidamount == null){
                txtPaidamount.style.border = invalid;
                errors = errors + "\n" + "Paid amount not Entered";
            }
            else  addvalue = 1;

            if (rprogress.stratdate == null){
                cmbStratdate.style.border = invalid;
                errors = errors + "\n" + "Start Date not Selected";
            }

            else  addvalue = 1;


            if (rprogress.enddate == null){
                cmbEndDate.style.border = invalid;
                errors = errors + "\n" + "End Date not Selected";
            }

            else  addvalue = 1;


            if (rprogress.progressreportamount == null){
                txtProgressamount.style.border = invalid;
                errors = errors + "\n" + "Progress amount not Entered";
            }

            else  addvalue = 1;

            if (rprogress.reservationprogressHasEstimationHasSubcategoryList  == 0){
                getInnerErrors();
                errors = errors + "\n" + "Progress Sub Tasks not Entered";
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

            swal({
                title: "Are you sure to add following customer...?" ,
                text :  "\nProgress Code : " + rprogress.rpcode +
                    "\nReservation Code : " + rprogress.reservation_id.reservationcode +
                    "\nTotal Amount : " + rprogress.reservationtotalamount +
                    // "\nGender : " + bsr.genderId.name +
                    //  "\nCivil Status : " + bsr.civilstatusId.name +
                    "\nPaid Amount : " + rprogress.reservationpaidamount +
                    "\nStart Date : " + rprogress.stratdate+
                    "\nEnd Date : " + rprogress.enddate +
                    "\nProgress Amount: " + rprogress.progressreportamount +
                    "\nStatus : " + rprogress.rprstatus_id.name +
                    "\nAdded Date : "+rprogress.addeddate+
                     "\nAdded By : " + rprogress.employee_id.callingname ,

                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    var response = httpRequest("/reservationprogress", "POST", rprogress);
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

            if(oldrprogress == null && addvalue == ""){
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

        function fillForm(estimation,rowno){
            activerowno = rowno;
            console.log("Active row",activerowno);

            if (oldestimation==null) {
                filldata(estimation);
            } else {
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        filldata(estimation);
                    }

                });
            }

        }


        function filldata(es) {
            clearSelection(tblRprogress);
            selectRow(tblRprogress,activerowno,active);

            rprogress = JSON.parse(JSON.stringify(es));
            oldrprogress = JSON.parse(JSON.stringify(es));

            console.log(oldestimation)
            // bsrYear.value = bsr.year;
            //
            EsCode.value = estimation.estimationcode;
             EsCode.disabled="disabled";
            EsCost.value = parseFloat(estimation.estimationcharge).toFixed(2);



             rescode.value = estimation.rnowithprojecttitle;
             TotalEs.value = estimation.totalestimationcost;
             TotalDays.value = estimation.totaldays;

            addedDate.value = estimation.addeddate

            if(estimation.description == null){
                EsDescription.value = "No Description Added";
                EsDescription.style.border = initial;
            }else {
                EsDescription.value = estimation.description;
                EsDescription.style.border = valid;
            }

            var saveprojecttitle = rescode.value;

            var subtitle =   saveprojecttitle.substring(11,500);
            console.log(subtitle);
            for(index in reservations){
              var projecttitleFill = reservations[index].projecttitle;
                console.log(projecttitleFill);
                var resCodeFill = reservations[index].reservationcode;


                if(subtitle == projecttitleFill){
                    console.log("TRT");
                     fillCombo(cmdresvation,"Select Reservation Code",reservations,"reservationcode",resCodeFill);
                    cmdresvation.style.border = valid;
                    cmdresvation.disabled = true;
                }




            }



            fillCombopro(cmdprovince,"Select the Province Code",provinces,"province_id.code",estimation.bsr_id.province_id.code);

            console.log(estimation.bsr_id.province_id.code);
            cmdprovince.disabled = true;

            fillCombo(cmdAdded,"Select Civil Status",employees,"callingname",estimation.employee_id.callingname);
            fillCombo(cmdStatus,"Select the Estimation Status",estimationstatus,"name",estimation.estimationstatus_id.name);
            fillCombo(cmdcode,"Select the BSR Code",provinces,"bsrcode",estimation.bsr_id.bsrcode);
            console.log(estimation.bsr_id.id);

            // var fillbsrid=JSON.parse(estimation.bsr_id.id);
            // throwbsrid(fillbsrid);
            console.log(estimation.estimationHasSubcategoryList);
            //console.log(JSON.parse(cmdcode.value).id);
            //getbsrid();

            //setDefaultFile('flePhoto', employee.photo);
            //bsr category disabled false
            cmdCategory.disabled = false;

            disableButtons(true, false, false);
            setStyle(valid);
            refreshInnerForm();
            changeTab('form');

        }

        function getInnerErrors(){
            var innerErrors = "";
            var inneraddvalue = "";

           //console.log(EstimationHasSubcategory.floorarea_id);
            if(cmdfloorArea.value == ""){
                innerErrors = innerErrors +"\n" +"Select the Floor Area";
                cmdfloorArea.style.border = invalid;
            }else

            if(cmdhousesubpart.value == ""){
                innerErrors = innerErrors +"\n" +"Select the House Sub Part";
                cmdhousesubpart.style.border = invalid;
            }else


            if(cmdCategory.value == ""){
                innerErrors = innerErrors+"\n" +"Select the BSR Category";
                //cmdCategory.style.border = invalid;
                $('.BSRcatcmbsearch .select2-selection').css('border',invalid);
            }else
                inneraddvalue = 1;

            if(cmdItemCode.value== ""){
                innerErrors = innerErrors+"\n" +"Select the Item Code";
                cmdItemCode.style.border = invalid;
            }else
                inneraddvalue = 1;
            //
             if(reservationprogressHasEstimationHasSubcategory.unit == null){
                innerErrors = innerErrors +"\n" +"Enter the Item Unit";
                 subUnit.style.border = invalid;
            }else
                inneraddvalue = 1;
            if(subDescription.value == ""){
                innerErrors = innerErrors +"\n"+"Enter the BSR Description";
                subDescription.style.border = invalid;
            }else
                inneraddvalue = 1;

            if( reservationprogressHasEstimationHasSubcategory.quantity == null){
                innerErrors = innerErrors+"\n" +"Enter the Quantity";
                subQty.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(reservationprogressHasEstimationHasSubcategory.rate == null){
                innerErrors = innerErrors+"\n" +"Enter the Quantity";
                subRate.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(totalArea.value == ""){
                innerErrors = innerErrors+"\n" +"Enter the Total Area";
                totalArea.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(reservationprogressHasEstimationHasSubcategory.lastprice == null){
                innerErrors = innerErrors+"\n" +"Enter the Last Price";
                subLastprice.style.border = invalid;
            }else
                inneraddvalue = 1;

            //

            if(reservationprogressHasEstimationHasSubcategory.prsubtaskstatus_id == null){
                innerErrors = innerErrors+"\n" +"Select the PR-Status";
                cmbPrstatus.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(reservationprogressHasEstimationHasSubcategory.planedqty == null){
                innerErrors = innerErrors+"\n" +"Enter the Plan Quantity";
                txtPlQty.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(reservationprogressHasEstimationHasSubcategory.completedquantity == null){
                innerErrors = innerErrors+"\n" +"Enter the Completed Quantity";
                txtComQty.style.border = invalid;
            }else
                inneraddvalue = 1;
            if(reservationprogressHasEstimationHasSubcategory.linetotalamount == null){
                innerErrors = innerErrors+"\n" +"Enter the Line Amount";
                txtLineAmount.style.border = invalid;
            }else
                inneraddvalue = 1;



            return innerErrors;
        }

    function btnAddInner(){
            var innerErrors = getInnerErrors();

            if(innerErrors == ""){
                saveInnerData();
                // if(subCatDescription.value ==""){
                //     swal({
                //         title: "Sub Category's Description feild empty...!",
                //         text: "",
                //         icon: "warning",
                //         buttons: true,
                //
                //     }).then((willDelete) => {
                //         if (willDelete) {
                //             saveInnerData();
                //
                //
                //
                //             // alert("Save Data");
                //         }
                //     });
                //
                // }else{
                //     saveInnerData();
                // }
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
            var subCategoryList = false;

            for(index in rprogress.reservationprogressHasEstimationHasSubcategoryList){
                if( rprogress.reservationprogressHasEstimationHasSubcategoryList[index].estimation_has_subcategory_id.itemcode == reservationprogressHasEstimationHasSubcategory.estimation_has_subcategory_id.itemcode){
                    subCategoryList = true;
                    break;
                }
            }

            if(subCategoryList){
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


                        "\n Floor Area : " + JSON.parse(cmdfloorArea.value).name +
                        "\n House Sub Part : " + JSON.parse(cmdhousesubpart.value).name +

                        "\n BSR Category : " + JSON.parse(cmdCategory.value).name +
                        "\n Item Code : " + reservationprogressHasEstimationHasSubcategory.estimation_has_subcategory_id.itemcode+

                        "\n Item Unit : " + reservationprogressHasEstimationHasSubcategory.unit +
                        "\n Quantity : " + reservationprogressHasEstimationHasSubcategory.quantity +
                        "\n BSR Rate : " + "Rs "+ reservationprogressHasEstimationHasSubcategory.rate +
                        "\n Total Area : " + "Rs "+ totalArea.value +
                        "\n Last Price : " +"Rs "+ reservationprogressHasEstimationHasSubcategory.lastprice+
                        "\n Line Amount : " +"Rs "+ reservationprogressHasEstimationHasSubcategory.linetotalamount+

                        "\n PR-Status: " +"Rs "+ reservationprogressHasEstimationHasSubcategory.prsubtaskstatus_id.name+
                        "\n Planned Quantity : " + parseFloat(reservationprogressHasEstimationHasSubcategory.planedqty).toFixed(2)+" "+reservationprogressHasEstimationHasSubcategory.unit+
                    "\n Completed Quantity : " + parseFloat(reservationprogressHasEstimationHasSubcategory.completedquantity).toFixed(2)+" "+reservationprogressHasEstimationHasSubcategory.unit,






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



                        rprogress.reservationprogressHasEstimationHasSubcategoryList.push(reservationprogressHasEstimationHasSubcategory);
                        console.log(rprogress.reservationprogressHasEstimationHasSubcategoryList);
                        refreshInnerForm();


                    }
                });
            }

    }
    function btnInnerClearMC(){
        swal({
            title: "Are you sure To Clear the Form...?",
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


        function getUpdates() {

            var updates = "";

            if(estimation!=null && oldestimation!=null) {


                // if (estimation.bsr_id.province_id.code != oldestimation.bsr_id.province_id.code)
                //     updates = updates + "\nEstimation Province Code is Change.." +oldestimation.bsr_id.province_id.code +" into " +estimation.bsr_id.province_id.code ;
                //
                // if (estimation.bsr_id.bsrcode != estimation.bsr_id.bsrcode)
                //     updates = updates + "\nBSR Code is Changed.." + oldestimation.bsr_id.bsrcode +" into "+estimation.bsr_id.bsrcode ;
                //
                // if (estimation.estimationcode != oldestimation.estimationcode)
                //     updates = updates + "\nEstimation Code is Changed.." + oldestimation.estimationcode + " into "+ estimation.estimationcode;

                if (estimation.rnowithprojecttitle != oldestimation.rnowithprojecttitle)
                    updates = updates + "\nReservaton Project is Changed.." +oldestimation.rnowithprojecttitle+ " into "+estimation.rnowithprojecttitle;


                if (estimation.estimationcharge != oldestimation.estimationcharge)
                    updates = updates + "\nEstimation Charge  is Changed.." +oldestimation.estimationcharge+ " into "+estimation.estimationcharge;


                // if (estimation.photo != oldestimation.photo)
                //     updates = updates + "\nPhoto is Changed";

                if (estimation.totalestimationcost != oldestimation.totalestimationcost)
                    updates = updates + "\nTotal Estimation is Changed.."+ "Rs "+ parseFloat(oldestimation.totalestimationcost).toFixed(2)+ " into "+" Rs " +parseFloat(estimation.totalestimationcost).toFixed(2);

                if (estimation.totaldays != oldestimation.totaldays)
                    updates = updates + "\nTotal Days is Changed.."+oldestimation.totaldays+ " into "+estimation.totaldays  ;

                if (estimation.description != oldestimation.description)
                    updates = updates + "\nEstimation Description is Changed.."+ oldestimation.description+ " into "+estimation.description;

                if (estimation.estimationstatus_id.name != oldestimation.estimationstatus_id.name)
                    updates = updates + "\nEstimation Status is Changed.."+ oldestimation.estimationstatus_id.name+ " into "+estimation.estimationstatus_id.name;

                if(isEqual(estimation.estimationHasSubcategoryList,oldestimation.estimationHasSubcategoryList,'bsr_has_bsrsubcategory_id'))
                    updates = updates + "\nEstimation Sub Category is Changed..";


                // if(estimation.estimationHasSubcategoryList.length !== oldestimation.estimationHasSubcategoryList.length)
                //     updates = updates + "\nEstimation Sub Category is Changed..";
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
                        title: "Are you sure to update following BSR details...?",
                        text: "\n"+ updates,
                        icon: "warning", buttons: true, dangerMode: true,
                    })
                        .then((willDelete) => {
                        if (willDelete) {
                            var response = httpRequest("/estimation", "PUT", estimation);
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

        function btnDeleteMC(rp) {
            rprogress = JSON.parse(JSON.stringify(rp));

            swal({
                title: "Are you sure to delete following customer...?",
                text: "\n Estimation Code : " + rprogress.rpcode  +
                "\n Reservation Name : " + rprogress.reservation_id.reservationcode,
                icon: "warning", buttons: true, dangerMode: true,
            }).then((willDelete)=> {
                if (willDelete) {
                    var responce = httpRequest("/reservationprogress","DELETE",rprogress);
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
            disableButtons(false, true, true);

        }

        function btnSearchMC(){
            activepage=1;
            loadSearchedTable();
        }

        function btnSearchClearMC(){
               loadView();
        }

       function btnPrintTableMC(estimation) {

            var newwindow=window.open();
            formattab = tblestimation.outerHTML;

           newwindow.document.write("" +
                "<html>" +
                "<head><style type='text/css'>.google-visualization-table-th {text-align: left;} .modifybutton{display: none} .isort{display: none}</style>" +
                "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/></head>" +
                "<body><div style='margin-top: 150px; '> <h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Estimation Details :</span></h1></div>" +
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