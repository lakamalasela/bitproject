

 

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
           cmdcode.addEventListener("change",categorytrue);
            subQty.addEventListener("keyup",getLastprice);


            cmdfloorArea.addEventListener("change",getSubpartsbyfloorarea);
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
             estimationstatus =httpRequest("../estimationstatus/list","GET");

            provinces = httpRequest("../bsr/list","GET");

           // reservations = httpRequest("../reservation/list","GET");
           // reservations = httpRequest("../reservation/activelist","GET"); new reservation list


            // bsrYear.addEventListener("keyup",getBSRcode);
            floorareas = httpRequest("../floorarea/list","GET");
            housesubparts = httpRequest("../housesubparts/list","GET");

            cmdItemCode.addEventListener("change",getOtherDetails);


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
        function getbsrcode(){
            cmdcode.disabled = false;
            // cmdprovince.style.border = valid;
            // console.log(JSON.parse(cmdprovince.value))

             // bsrcodebyprovince = httpRequest("bsr/listbybsrcode?provinceid="+JSON.parse(cmdprovince.value).id,"GET")
             bsrcodebyprovince = httpRequest("bsr/listbybsrcode?provinceid="+listbyreservation.id,"GET")

            //fill the bsrcode
             fillCombo(cmdcode,"Select the BSR Code",bsrcodebyprovince,"bsrcode","");
            cmdcode.style.border = initial;
            //fillCombopro(cmdprovince,"Select the Province Code",provinces,"province_id.id","");
            //
            // console.log(JSON.parse(cmdprovince.value).province_id.id);
            // console.log(bsrcodebyprovince);


        }

        function categorytrue(){
            cmdCategory.disabled = false;
            $('#collapseEsubtask').collapse('show');
            btnSubtasklist.disabled = false;
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

            EstimationHasSubcategory.itemcode = JSON.parse(cmdItemCode.value).itemcode;
                    console.log( EstimationHasSubcategory.itemcode);
                    cmdItemCode.style.border = valid;

                     itemunitname = JSON.parse(cmdItemCode.value).itemunit_id.name;
                    subUnit.value = itemunitname;
                    EstimationHasSubcategory.unit =subUnit.value
                    subUnit.style.border = valid;

                    //get the value of bsr sub category description
                    subDescription.value = JSON.parse(cmdItemCode.value).description;
                    EstimationHasSubcategory.description  =subDescription.value;
                    subDescription.style.border = valid;
                    //get the value of bsrrate
                    subRate.value = parseFloat(JSON.parse(cmdItemCode.value).bsrrate).toFixed(2);
                    EstimationHasSubcategory.rate  =subRate.value;
                    subRate.style.border = valid;

                    if(JSON.parse(cmdItemCode.value).itemcode == "E001" || JSON.parse(cmdItemCode.value).itemcode == "E002"){
                        subQty.disabled = true;
                        subQty.value  =  parseInt((totalArea.value)* 4);
                        console.log("FFFFFFFFFFFFF",subQty.value)
                        EstimationHasSubcategory.quantity =  subQty.value;
                        subQty.style.border = valid;

                       var LastPriceofwall =  parseFloat(subQty.value).toFixed(2) * parseFloat(subRate.value).toFixed(2);
                       subLastprice.value = LastPriceofwall;
                        EstimationHasSubcategory.lastprice =   subLastprice.value;
                        subLastprice.style.border = valid;
                    }

                    //housesub part columns or beams
                    // if(listbysubpartofarea.housesubparts_id.name == "Columns"){
                    // totalArea.value = ( parseFloat(listbysubpartofarea.area)/parseInt(listbysubpartofarea.count)).toFixed(2);
                    // EstimationHasSubcategory.totalarea =  totalArea.value;
                    // totalArea.style.border = valid;
                    // subQty.value = listbysubpartofarea.count;
                    // EstimationHasSubcategory.quantity = subQty.value;
                    // subQty.style.border = valid;
                    //
                    //
                    // subLastprice.value = (parseFloat(totalArea.value)*parseFloat(subQty.value)*parseFloat( subRate.value)).toFixed(2);
                    // EstimationHasSubcategory.lastprice = subLastprice.value;
                    // subLastprice.style.border = valid;
                    //
                    //
                    // }else if(listbysubpartofarea.housesubparts_id.name == "Concrete Beams"){
                    //     totalArea.value = ( parseFloat(listbysubpartofarea.area)/parseInt(listbysubpartofarea.count)).toFixed(2);
                    //     EstimationHasSubcategory.totalarea =  totalArea.value;
                    //     totalArea.style.border = valid;
                    //     subQty.value = listbysubpartofarea.count;
                    //     EstimationHasSubcategory.quantity = subQty.value;
                    //     subQty.style.border = valid;
                    //
                    //
                    //     subLastprice.value = (parseFloat(totalArea.value)*parseFloat(subQty.value)*parseFloat( subRate.value)).toFixed(2);
                    //     EstimationHasSubcategory.lastprice = subLastprice.value;
                    //     subLastprice.style.border = valid;
                    //
                    // }

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

                // if(JSON.parse(cmdCategory.value).name == "WALLING"){
                //     LastPrice =  parseFloat(subQty.value).toFixed(2) * parseFloat(subRate.value).toFixed(2);
                // }


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
            estimations = new Array();
          var data = httpRequest("/estimation/findAll?page="+page+"&size="+size+query,"GET");
            if(data.content!= undefined) estimations = data.content;
            createPagination('pagination',data.totalPages, data.number+1,paginate);
            fillTable('tblestimation',estimations,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblestimation);

            if(activerowno!="")selectRow(tblestimation,activerowno,active);

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

        function viewitem(est,rowno) {

            viewestimation = JSON.parse(JSON.stringify(est));



            var saveprojecttitle = viewestimation.rnowithprojecttitle;

            var subtitle =   saveprojecttitle.substring(11,500);
            console.log(subtitle);
            for(index in reservations){
                var projecttitleFill = reservations[index].projecttitle;
                console.log(projecttitleFill);
                var resCodeFill = reservations[index].reservationcode;


            }
            tdrservationcode.innerHTML = resCodeFill;



            tdprocode.innerHTML = viewestimation.bsr_id.province_id.code;
            tdcode.innerHTML = viewestimation.bsr_id.bsrcode;
            tdecode.innerHTML = viewestimation.estimationcode;
            tdres.innerHTML = viewestimation.rnowithprojecttitle;
            tdestimationcost.innerHTML = parseFloat(viewestimation.estimationcharge).toFixed(2);
            tdestimation.innerHTML = parseFloat(viewestimation.totalestimationcost).toFixed(2);
            tdday.innerHTML = viewestimation.totaldays;




            if(viewestimation.description == null){
                tddescription.innerHTML = "<p style='color: red;font-size: 15px;'>No Description Added</p>"
            }else{
                tddescription.innerHTML = viewestimation.description;
            }


            tdaddeddate.innerHTML = viewestimation.addeddate;


            // if(employee.photo==null)
            //     tdphoto.src= 'resourse/image/noimage.png';
            //  else
            // tdphoto.src = atob(employee.photo);
            tdstatus.innerHTML = viewestimation.estimationstatus_id.name;
            tdaddedby.innerHTML = viewestimation.employee_id.callingname;


            fillInnerTable("tblInnerrowprint",viewestimation.estimationHasSubcategoryList,innerModify,innerDelete,innerView);

            // if(bsr.bsrHasBSRsubcategoryList.length !=0){
            //     for(index in bsr.bsrHasBSRsubcategoryList){
            //         tblInnerrowprint.children[1].children[index].lastChild.children[0].style.display = "none";
            //     }
            // }



            $('#dataviewModal').modal('show');


         }

         function btnPrintRowMC(){

             var format = printformtable.outerHTML;

             // var newwindow=window.open();
             // newwindow.document.write("<html>" +
             //     "<head><style type='text/css'>.google-visualization-table-th {text-align: left;}</style>" +
             //     "" +
             //     "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/>" +
             //     "<link rel='stylesheet' href='../resources/bootstrap/css/font-awesome.min.css'/>"+
             //     "</head>" +
             //     "<body><div style='margin-top: 150px'><h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Estimation Details :</span> </h1></div>" +
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
                 "</address></div></div></di><hr> <h1>Estimation Details :</h1></div>" +
                 "<div>"+format+"</div>" +
                 "<script>printformtable.removeAttribute('style')</script>" +
                 "</body></html>");
             setTimeout(function () {newwindow.print(); newwindow.close();},100);

         }

        function loadForm() {
            estimation = new Object();
            oldestimation = null;

            estimation.estimationHasSubcategoryList = new Array();

            //disabled feilds
            cmdcode.disabled = true;

            cmdfloorArea.disabled =true;
            cmdhousesubpart.disabled =true;

            // //bsr category field disabled
            cmdCategory.disabled = true;


            fillCombo(cmdfloorArea,"Select Floor Area",floorareas,"name","");
            fillCombo(cmdhousesubpart,"Select House Sub Parts",housesubparts,"name","");



            $('#collapseEsubtask').collapse('hide');
            btnSubtasklist.disabled = true;

            fillCombo(cmdAdded,"Select Civil Status",employees,"callingname",session.getObject('activeuser').employeeId.callingname);

            estimation.employee_id = JSON.parse(cmdAdded.value);
            cmdAdded.disabled = true;

            reservations = httpRequest("/reservation/resbyqs?qsid="+JSON.parse(cmdAdded.value).id,"GET");
            console.log(reservations);
             fillCombo(cmdresvation,"Select Res_Code",reservations,"reservationcode","");

             //fillDataList(cmdresvation,reservationList,reservations,"reservationcode","");


            //fillCombopro(cmdprovince,"Select Province Code",provinces,"province_id.code","");

             fillCombo(cmdStatus,"Select the Estimation Status",estimationstatus,"name","Active");
             fillCombo(cmdcode,"Select the BSR Code",provinces,"bsrcode","");
           // fillCombo3(cmdprovince,"Select the Province Code",provinces,"name","unittype_id.name","");

            //fillCombo(cmdcode,"Select the BSR Code",provinces,"bsrcode","");


            //  fillCombo(cmbEmployeestatus,"",employeestatuses,"name","Working");

            //
              estimation.estimationstatus_id=JSON.parse(cmdStatus.value);
              cmdStatus.disabled=true;
            //  cmdbsrStatus.disabled = true;

            cmdprovince.disabled = false;

             //
             // var today = new Date();
             // var month = today.getMonth()+1;
             // if(month<10) month = "0"+month;
             // var date = today.getDate();
             // if(date<10) date = "0"+date;

              //addedDate.value=today.getFullYear()+"-"+month+"-"+date;
             addedDate.value = getCurrentDateTime('date');
            //
            estimation.addeddate=addedDate.value;
             addedDate.disabled = true;
            addedDate.style.border=valid;

            //
            // Get Next Number Form Data Base
             var nextNumber = httpRequest("/estimation/nextnumber", "GET");
             EsCode.value = nextNumber.estimationcode;
             estimation.estimationcode =  EsCode.value;
             EsCode.disabled=true;
            EsCode.style.border = valid;

            //set empty value
            //     EsCode.value = "";
                rescode.value = "";
                //EsCost.value = "";
            EsCost.value = parseFloat(1000).toFixed(2);
            estimation.estimationcharge =  EsCost.value;
            EsCost.style.border = valid;
            console.log("ESSSS",estimation.estimationcharge);

            cmdprovince.value = "";
                TotalEs.value = "";
                TotalDays.value = "";
                EsDescription.value = "";
            //    bsrDescription.value = "";
           //  cusTel.value = "";
           //  cusworkdetail.value = "";
           //  cusDescription.value = "";
           // // cmbContact.value = "";
           //  cusEmail.value = "";
            EsDescription.style.border = initial;

             setStyle(initial);

            //  removeFile('flePhoto');
            //
            //  setStyle(initial);
            //  cmbEmployeestatus.style.border=valid;
            //  dteDOAssignment.style.border=valid;
            // txtNumber.style.border=valid;
            //
            disableButtons(false, true, true);
            refreshInnerForm();
        }

        function getrescode(){
            //cmdresvation.style.border = valid;
            // select2-cmdresvation-container
            $('.ResCmdsearch .select2-selection').css('border',valid);

            cmdfloorArea.disabled =false;
            //cmdhousesubpart.disabled =false;

            console.log(cmdresvation.value);
            //console.log("RESERVATION Belongs Plan ",JSON.parse(cmdresvation.value).plan_id.id);

            listbyreservation = httpRequest("/province/listbtreservation?reservationid="+JSON.parse(cmdresvation.value).id,"GET");
            console.log("LISTBY",listbyreservation)
            cmdprovince.value = listbyreservation.name;
            cmdprovince.style.border = valid;


            // fillCombo(cmdprovince,"Select the Province",listbyreservation,"name",name);
            // cmdprovince.style.border = initial;


            reservationCodeget = JSON.parse(cmdresvation.value).reservationcode;
            rservationWithprojecttitleget = JSON.parse(cmdresvation.value).projecttitle;

            rescode.value = reservationCodeget+"-"+rservationWithprojecttitleget;

            estimation.rnowithprojecttitle = rescode.value;
            rescode.style.border = valid;
            rescode.disabled = true;

            //floor area fill

            if((JSON.parse(cmdresvation.value).plan_id) == null){
                swal({
                    title: "The Plan Not Added yet...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer:1200

                });

                reservations = httpRequest("/reservation/resbyqs?qsid="+JSON.parse(cmdAdded.value).id,"GET");
                //console.log(reservations);
                fillCombo(cmdresvation,"Select Res_Code",reservations,"reservationcode","");
                $('.ResCmdsearch .select2-selection').css('border',initial);
                rescode.value = "";
                estimation.rnowithprojecttitle = null;
                rescode.style.border = initial;



            }else{
                listbyresfloorarea = httpRequest("/floorarea/listbyplan?planid="+JSON.parse(cmdresvation.value).plan_id.id,"GET");
                fillCombo(cmdfloorArea,"Select the Floor Area",listbyresfloorarea,"name","");


            }

            //  listbyresfloorarea = httpRequest("/floorarea/listbyplan?planid="+JSON.parse(cmdresvation.value).plan_id.id,"GET");
            // fillCombo(cmdfloorArea,"Select the Floor Area",listbyresfloorarea,"name","");
            //

            getbsrcode();

        }


        //
        // function getrescodeKup(){
        //
        //     let regptn = /^[R][0-9]{9}$/;
        //     if(regptn.test(cmdresvation.value)){
        //
        //         cmdresvation.style.border = valid;
        //
        //         cmdfloorArea.disabled =false;
        //         cmdhousesubpart.disabled =false;
        //
        //         console.log("RESERVATION Belongs Plan ",JSON.parse(cmdresvation.value).plan_id.id);
        //
        //         listbyreservation = httpRequest("/province/listbtreservation?reservationid="+JSON.parse(cmdresvation.value).id,"GET");
        //
        //         fillCombo(cmdprovince,"Select the Province",listbyreservation,"name","");
        //
        //
        //         reservationCodeget = JSON.parse(cmdresvation.value).reservationcode;
        //         rservationWithprojecttitleget = JSON.parse(cmdresvation.value).projecttitle;
        //
        //         rescode.value = reservationCodeget+"-"+rservationWithprojecttitleget;
        //
        //         estimation.rnowithprojecttitle = rescode.value;
        //         rescode.style.border = valid;
        //         rescode.disabled = true;
        //
        //         //floor area fill
        //
        //         listbyresfloorarea = httpRequest("/floorarea/listbyplan?planid="+JSON.parse(cmdresvation.value).plan_id.id,"GET");
        //         fillCombo(cmdfloorArea,"Select the Floor Area",listbyresfloorarea,"name","");
        //
        //
        //     }else{
        //         cmdresvation.style.border = invalid;
        //     }
        //
        //
        //
        // }
        function getSubpartsbyfloorarea(){

            cmdhousesubpart.disabled = false;
            cmdfloorArea.style.border=valid;
            listbyfloorarea = httpRequest("/housesubparts/listbyplanandfloorarea?planid="+JSON.parse(cmdresvation.value).plan_id.id+"&floorareaid="+JSON.parse(cmdfloorArea.value).id,"GET");

            console.log("SUB PARTS",listbyfloorarea)

            fillCombo(cmdhousesubpart,"Select Sub Parts",listbyfloorarea,"name","");


        }
        function getTotalArea(){

            cmdhousesubpart.style.border = valid;

            listbysubpartofarea = httpRequest("/planhasfloorareahashousesubparts/listbyhosuesubpart?housesubpartid="+JSON.parse(cmdhousesubpart.value).id+"&planid="+JSON.parse(cmdresvation.value).plan_id.id+"&floorareaid="+JSON.parse(cmdfloorArea.value).id,"GET");

            console.log("Total Area is",listbysubpartofarea.area);

            //console.log("HOUSE SUB",listbysubpartofarea.housesubparts_id.name);



            totalArea.value = parseFloat(listbysubpartofarea.area).toFixed(2);
           // totalArea.value = parseFloat(listbysubpartofarea.area).toFixed(2);
            EstimationHasSubcategory.totalarea =  totalArea.value;

            subCount.value = listbysubpartofarea.count;
            EstimationHasSubcategory.subcount = subCount.value;

            console.log("COUNT IS ",EstimationHasSubcategory.subcount)
            if(subCount.value !=""){
                subCount.style.border = valid;
            }

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
            EstimationHasSubcategory = new Object();
            oldEstimationHasSubcategory= null;

            var totalestimation = 0;
            cmdfloorArea.disabled =false;
            subQty.disabled = false;
           // cmdhousesubpart.disabled = false;


            if((cmdresvation.value) != ""){
                 listbyresfloorarea = httpRequest("/floorarea/listbyplan?planid="+JSON.parse(cmdresvation.value).plan_id.id,"GET");
                 fillCombo(cmdfloorArea,"Select Floor Area",listbyresfloorarea,"name","");

                 if((cmdfloorArea.value)!=""){
                     listbyfloorarea = httpRequest("/housesubparts/listbyplanandfloorarea?planid="+JSON.parse(cmdresvation.value).plan_id.id+"&floorareaid="+JSON.parse(cmdfloorArea.value).id,"GET");
                     fillCombo(cmdhousesubpart,"Select Sub Parts",listbyfloorarea,"name","");

                 }else{
                     fillCombo(cmdhousesubpart,"Select Sub Parts",housesubparts,"name","");

                 }
            }


            // listbyresfloorarea = httpRequest("/floorarea/listbyplan?planid="+JSON.parse(cmdresvation.value).plan_id.id,"GET");
            // fillCombo(cmdfloorArea,"Select the Floor Area",listbyresfloorarea,"name","");
            //
            // listbyfloorarea = httpRequest("/housesubparts/listbyplanandfloorarea?planid="+JSON.parse(cmdresvation.value).plan_id.id+"&floorareaid="+JSON.parse(cmdfloorArea.value).id,"GET");
            // fillCombo(cmdhousesubpart,"Select the Sub Parts",listbyfloorarea,"name","");



            fillCombo(cmdCategory,"Select BSR Category",bsrcategory,"name","");

            fillCombo(cmdSubtask,"Select Sub Category",bsrsubcategory,"name","");

            fillCombo(cmdItemCode,"Select Item Code",listitem,"itemcode","");
           // fillCombo(subUnit,"Select the Item Unit",itemunits,"name","");


            //disabled feilds
            cmdSubtask.disabled = true;

            cmdhousesubpart.disabled = true;

            InnerAdd.disabled=false;
            InnerUpdate.disabled=true;

            InnerUpdate.style.cursor = "not-allowed";
            InnerAdd.style.cursor ="pointer ";

            // if(bsrid != ""){
            //     cmdItemCode.disabled = false;
            //     cmdSubtask.disabled =false;
            // }else{
            //     cmdItemCode.disabled = true;
            //     cmdSubtask.disabled =true;
            // }

            cmdItemCode.disabled = true;
           // cmdCategory.disabled = false;

            // fillCombo(cmditemUnit,"Select the Item Unit",itemunits,"name","");
            // cmditemUnit.style.border = initial;
            subUnit.value ="";
            subDescription.value = "";
            subQty.value = "";
            subRate.value = "";
            totalArea.value = "";
            subLastprice.value = "";
            subCount.value = "";

           // cmdresvation.style.border = initial;
            cmdfloorArea.style.border = initial;
            $('.Subpartcmbseacrch .select2-selection').css('border',initial);
            //cmdhousesubpart.style.border = initial;
            //cmdCategory.style.border = initial;
            $('.Categorycmdsearch .select2-selection').css('border',initial);
            cmdSubtask.style.border = initial;
            cmdItemCode.style.border = initial;
            subUnit.style.border = initial;
            subDescription.style.border = initial;
            subQty.style.border = initial;
            subRate.style.border = initial;
            subLastprice.style.border = initial;
            totalArea.style.border = initial;
            subCount.style.border = initial;


            //
            // itemCode.value ="";
            // itemCode.style.border = initial;
            //
            // subCatDescription.value = "";
            // subCatDescription.style.border = initial;
            //
            // bsrRate.value = "";
            // bsrRate.style.border = initial;

            fillInnerTable("tblInnersubtask",  estimation.estimationHasSubcategoryList,innerModify,innerDelete,false);

            // if( estimation.estimationHasSubcategoryList.length !=0){
            //     for(index in  estimation.estimationHasSubcategoryList){
            //         tblInnersubtask.children[1].children[index].lastChild.children[0].style.display = "none";
            //     }
            // }

            if(estimation.estimationHasSubcategoryList.length!=0){
                for(index in estimation.estimationHasSubcategoryList){
                    totalestimation = parseFloat(totalestimation)+parseFloat(estimation.estimationHasSubcategoryList[index].lastprice);
                }
            }
            estimation.totalestimationcost = parseFloat(totalestimation).toFixed(2);
            TotalEs.value=estimation.totalestimationcost;

            if(totalestimation == 0){
                TotalEs.style.border = invalid;
            }else{
                TotalEs.style.border = valid;
                if(oldestimation != null && estimation.totalestimationcost != oldestimation.totalestimationcost){
                    TotalEs.style.border = updated;
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
                fillCombo(cmdhousesubpart,"Select Sub Parts",listbyfloorarea,"name",EstimationHasSubcategory.housesubparts_id.name);
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
            listbysubpartofarea = httpRequest("/planhasfloorareahashousesubparts/listbyhosuesubpart?housesubpartid="+JSON.parse(cmdhousesubpart.value).id+"&planid="+JSON.parse(cmdresvation.value).plan_id.id+"&floorareaid="+JSON.parse(cmdfloorArea.value).id,"GET");
            subCount.value = listbysubpartofarea.count;
            EstimationHasSubcategory.subcount = subCount.value ;
            subCount.style.border = valid;

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


            cmdSubtask.disabled = false;
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

            //cmdCategory.style.border = valid;
            $('.Categorycmdsearch .select2-selection').css('border',valid);


            bsrsubcategoriesbycategory = httpRequest("bsrsubcategory/listbycategory?categoryid="+JSON.parse(cmdCategory.value).id,"GET")

            fillCombo(cmdSubtask,"Select BSR Sub Category",bsrsubcategoriesbycategory,"name","");

            fillCombo(cmdItemCode,"Select Item Code",listitem,"itemcode","");

            subDescription.style.border = initial;
            cmdItemCode.style.border = initial;
            cmdSubtask.style.border = initial;
            subUnit.style.border = initial;
            subRate.style.border = initial;

            subDescription.value = "";
            subUnit.value = "";
            subRate.value = "";

            EstimationHasSubcategory.description = null;
            EstimationHasSubcategory.quantity = null;
            EstimationHasSubcategory.rate = null;
            EstimationHasSubcategory.lastprice = null;
            // cmdSubCategory.style.border = valid;
           //
           //  if(bsrHasBSRsubcategory.bsrsubcategory_id== null){
           //      cmdSubCategory.disabled = true;
           //  }

            //item code bind
            //itemCode.value = JSON.parse(cmdCategory.value).code;

        }

        function setStyle(style) {

            cmdresvation.style.border = style;
            cmdprovince.style.border = style;
            cmdcode.style.border = style;
            //EsCode.style.border = style;
            rescode.style.border = style;
           // EsCost.style.border = style;
            TotalEs.style.border = style;
            TotalDays.style.border = style;
            //EsDescription.style.border = style;
            $('.ResCmdsearch .select2-selection').css('border',style);



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

            // select deleted data row
            for(index in estimations){
                if(estimations[index].estimationstatus_id.name =="Deleted"){
                    tblestimation.children[1].children[index].style.color = "#f00";
                    tblestimation.children[1].children[index].style.border = "2px solid red";
                    tblestimation.children[1].children[index].lastChild.children[1].disabled = true;
                    tblestimation.children[1].children[index].lastChild.children[1].style.cursor = "not-allowed";

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



            if (cmdresvation.value == "") {
                //cmdprovince.style.border = invalid;
                $('.select2-selection').css('border',invalid);
                errors = errors + "\n" + "Reservation Code not Selected";

            }else  addvalue = 1;


            if (cmdprovince.value == "") {
                cmdprovince.style.border = invalid;
                errors = errors + "\n" + "Province Code not Entered";

            }else  addvalue = 1;

            if(estimation.bsr_id ==null){
                cmdcode.style.border = invalid;
                errors = errors + "\n" + "BSR Code not Entered";
            }else{
                addvalue = 1;
            }

            if (estimation.estimationcode == null){
                EsCode.style.border = invalid;
                errors = errors + "\n" + "Estimation Code not Entered";
            }
            else  addvalue = 1;


            if (estimation.rnowithprojecttitle == null){
                rescode.style.border = invalid;
                errors = errors + "\n" + "Reservation Code not Entered";
            }
            else  addvalue = 1;

            if (estimation.estimationcharge == null){
                EsCost.style.border = invalid;
                errors = errors + "\n" + "Estimation Charge not Entered";
            }

            else  addvalue = 1;


            if (estimation.totalestimationcost == null){
                TotalEs.style.border = invalid;
                errors = errors + "\n" + "Total Estimation not Entered";
            }

            else  addvalue = 1;


            if (estimation.totaldays == null){
                TotalDays.style.border = invalid;
                errors = errors + "\n" + "Total Date not Entered";
            }

            else  addvalue = 1;

            if (estimation.estimationHasSubcategoryList.length  == 0){
                getInnerErrors();
                errors = errors + "\n" + "BSR Sub Tasks not Entered";
            }

            else  addvalue = 1;



            return errors;

        }

        function btnAddMC(){
            if(getErrors()==""){
                if(EsDescription.value==""){
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
                text :
                    // "\nProvince Code : " + JSON.parse(cmdprovince.value).name +
                    "\nProvince Code : " + cmdprovince.value +
                    "\nBSR Code : " + estimation.bsr_id.bsrcode +
                    "\nEstimation Code : " + estimation.estimationcode +
                    // "\nGender : " + bsr.genderId.name +
                    //  "\nCivil Status : " + bsr.civilstatusId.name +
                    "\nReservation Code : " + estimation.rnowithprojecttitle +
                    "Estimation Charge : " + estimation.estimationcharge+
                    "\nTotal Estimation : " + estimation.totalestimationcost +
                    "\nTotal Days : " + estimation.totaldays +
                    "\nStatus : " + estimation.estimationstatus_id.name +
                    "\nAdded Date : "+estimation.addeddate+
                     "\nAdded By : " + estimation.employee_id.callingname ,

                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    var response = httpRequest("/estimation", "POST", estimation);
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

            if(oldestimation == null && addvalue == ""){
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
            clearSelection(tblestimation);
            selectRow(tblestimation,activerowno,active);

            estimation = JSON.parse(JSON.stringify(es));
            oldestimation = JSON.parse(JSON.stringify(es));

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
            fillCombo(cmdAdded,"Select Civil Status",employees,"callingname",estimation.employee_id.callingname);


            reservations = httpRequest("/reservation/resbyqs?qsid="+JSON.parse(cmdAdded.value).id,"GET");


            var subtitle =   saveprojecttitle.substring(11,500);
            console.log(subtitle);
            for(index in reservations){
              var projecttitleFill = reservations[index].projecttitle;
                console.log(projecttitleFill);
                var resCodeFill = reservations[index].reservationcode;


                if(subtitle == projecttitleFill){
                    console.log("TRT");
                     fillCombo(cmdresvation,"Select Reservation Code",reservations,"reservationcode",resCodeFill);
                    $('.select2-selection').css('border',valid);
                    //cmdresvation.style.border = valid;
                    cmdresvation.disabled = true;
                }




            }



           // fillCombopro(cmdprovince,"Select the Province Code",provinces,"province_id.code",estimation.bsr_id.province_id.code);
            listbyreservation = httpRequest("/province/listbtreservation?reservationid="+JSON.parse(cmdresvation.value).id,"GET");
            console.log("LISTBY",listbyreservation)
            cmdprovince.value = listbyreservation.name;
            cmdprovince.style.border = valid;

            //console.log(estimation.bsr_id.province_id.code);
            //cmdprovince.disabled = true;


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

            //open colaspe
            $('#collapseEsubtask').collapse('show');
            btnSubtasklist.disabled = false;



            disableButtons(true, false, false);
            setStyle(valid);
            refreshInnerForm();
            changeTab('form');

        }

        function getInnerErrors(){
            var innerErrors = "";
            var inneraddvalue = "";

            console.log(EstimationHasSubcategory.floorarea_id);
            if(EstimationHasSubcategory.floorarea_id == null){
                innerErrors = innerErrors +"\n" +"Select the Floor Area";
                cmdfloorArea.style.border = invalid;
            }else

                console.log(EstimationHasSubcategory.housesubparts_id)
            if(EstimationHasSubcategory.housesubparts_id == null){
                innerErrors = innerErrors +"\n" +"Select the House Sub Part";
                $('.Subpartcmbseacrch .select2-selection').css('border',invalid);
                //cmdhousesubpart.style.border = invalid;
            }else
                inneraddvalue = 1;


            if(cmdCategory.value == ""){
                innerErrors = innerErrors+"\n" +"Select the BSR Category";
                //$('.Categorycmdsearch .select2-selection').css('border',invalid);
                $('.Categorycmdsearch .select2-selection').css('border',invalid);
                //cmdCategory.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(cmdSubtask.value== ""){
                innerErrors = innerErrors+"\n" +"Select the BSR Sub Category";
                cmdSubtask.style.border = invalid;
            }else
                inneraddvalue = 1;
            //
             if(EstimationHasSubcategory.itemcode == null){
                innerErrors = innerErrors +"\n" +"Enter the Item Code";
                 cmdItemCode.style.border = invalid;
            }else
                inneraddvalue = 1;
            if(EstimationHasSubcategory.unit == null){
                innerErrors = innerErrors +"\n"+"Enter the BSR Item Unit";
                subUnit.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(EstimationHasSubcategory.description == null){
                innerErrors = innerErrors+"\n" +"Enter the BSR Description";
                subDescription.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(EstimationHasSubcategory.quantity == null){
                innerErrors = innerErrors+"\n" +"Enter the Quantity";
                subQty.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(EstimationHasSubcategory.rate == null){
                innerErrors = innerErrors+"\n" +"Enter the BSR Rate";
                subRate.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(EstimationHasSubcategory.totalarea == null){
                innerErrors = innerErrors+"\n" +"Enter the Total Area";
                totalArea.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(EstimationHasSubcategory.subcount == null){
                innerErrors = innerErrors+"\n" +"Enter the Sub Count";
                subCount.style.border = invalid;
            }else
                inneraddvalue = 1;

            //

            if(EstimationHasSubcategory.lastprice == null){
                innerErrors = innerErrors+"\n" +"Enter the Last Price";
                subLastprice.style.border = invalid;
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

            for(index in estimation.estimationHasSubcategoryList){
                if(( estimation.estimationHasSubcategoryList[index].itemcode == EstimationHasSubcategory.itemcode) && (estimation.estimationHasSubcategoryList[index].housesubparts_id.name == EstimationHasSubcategory.housesubparts_id.name)){
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


                        "\n Floor Area : " + EstimationHasSubcategory.floorarea_id.name +
                        "\n House Sub Part : " + EstimationHasSubcategory.housesubparts_id.name +

                        "\n Sub Category : " + JSON.parse(cmdSubtask.value).name +
                        "\n Item Code : " + EstimationHasSubcategory.itemcode+

                        "\n Item Unit : " + EstimationHasSubcategory.unit +
                        "\n BSR Rate : " + "Rs "+ EstimationHasSubcategory.rate +
                        "\n Last Price : " +"Rs "+ EstimationHasSubcategory.lastprice ,




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



                        estimation.estimationHasSubcategoryList.push(EstimationHasSubcategory);
                        console.log(estimation.estimationHasSubcategoryList);
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

        function btnDeleteMC(est) {
            estimation = JSON.parse(JSON.stringify(est));

            swal({
                title: "Are you sure to delete following customer...?",
                text: "\n Estimation Code : " + estimation.estimationcode  +
                "\n Reservation Name : " + estimation.rnowithprojecttitle,
                icon: "warning", buttons: true, dangerMode: true,
            }).then((willDelete)=> {
                if (willDelete) {
                    var responce = httpRequest("/estimation","DELETE",estimation);
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