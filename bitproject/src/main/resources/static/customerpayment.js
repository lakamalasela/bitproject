

 

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

           paymentcategory = httpRequest("../paymentcategory/list","GET");

           paymenttype = httpRequest("../paymentmethod/list","GET");

            pstatus  = httpRequest("../paymentstatus/list","GET");

            employees = httpRequest("../employee/list","GET");

            activecustomers = httpRequest("../customer/list","GET");


            reservations = httpRequest("../reservation/activelist","GET");

            reservationprogresses = httpRequest("reservationprogress/listall","GET");
            //progress amount
            CmbResprogress.addEventListener('change',getprogressamount);

            cmbpaymenttype.addEventListener("change",getpayemetType);

            CmbReservation.addEventListener("change",getPaymentDetails);

            txtPaidamount.addEventListener("keyup",getNewBalance);


            $('#collapseBankDeposit').collapse('hide');
            $('#collapseCheque').collapse('hide');
            $('#collapseOnlinetransfer').collapse('hide');


            valid = "2px solid green";
            invalid = "2px solid red";
            initial = "2px solid #d6d6c2";
            updated = "2px solid #ff9900";
            active = "#90EE90";




            //CmbTinFromRes.addEventListener('change',getavlabor);


            initialColor = "1px solid #ced4da";
            updatedColor = "2px Solid Blue";
            validColor = "2px Solid Green";
            invalidColor = "2px Solid Red";

            loadView();
            loadForm();


            changeTab('form');
        }

        function getResByCustomer(){

            $('.Cuscmbsearch .select2-selection').css('border',valid);
            //CmbCustomer.style.border = valid;

            bycustomer = httpRequest("/reservation/resbycustomer?customerid="+JSON.parse(CmbCustomer.value).id,"GET");
            fillCombo(CmbReservation,"Select the Res_Code",bycustomer,"reservationcode","");
            CmbReservation.style.border = initial;

        }
        function getprogressamount(){
            ProgressAmount = JSON.parse(CmbResprogress.value).progressreportamount;
            txtProamount.value = parseFloat(ProgressAmount).toFixed(2);
            cuspayment.progressamount =   txtProamount.value ;
            txtProamount.style.border = valid;
        }

        function getNewBalance(){

            if(parseFloat(txtLastbalance.value)>= parseFloat(txtPaidamount.value)){
                txtNewbalance.value = (parseFloat(txtLastbalance.value) - parseFloat(txtPaidamount.value)).toFixed(2);
                cuspayment.newbalance = txtNewbalance.value;
                txtNewbalance.style.border = valid;
            }else{
                swal({
                    title: "Paid Amount Should be less than Last Balance....!",
                    text: "\n\n",
                    icon: "warning", button: false,timer:1500
                });
                txtPaidamount.value = "";
                txtPaidamount.style.border = initial;
                cuspayment.paidamount = null;
            }


            // txtLastbalance.value = (parseFloat(txtTotalamount.value)-parseFloat(txtPaidamount.value)).toFixed(2);
            // cuspayment.lastbalance =  txtLastbalance.value;
            // txtLastbalance.style.border = valid;// txtPaidamount.value
        }

    function getpayemetType(){
            if((JSON.parse(cmbpaymenttype.value).name) == "Cheque"){
                //btnDeposit.style.cursor = 'not-allowed';
                $('#btnDeposit').css('cursor','not-allowed');

                //bank deposit
                txtBankname.value = "";
                cuspayment.bankname = null;
                txtBankname.style.border = initial;

                txtBankAccNo.value = "";
                cuspayment.bankaccountno = null;
                txtBankAccNo.style.border = initial;

                txtDepositdatetime.value = "";
                cuspayment.depositdatetime = null;
                txtDepositdatetime.style.border = initial;

                txtHolderName.value = "";
                cuspayment.holdername = null;
                txtHolderName.style.border = initial;


                //online
                txtBranchName.value = "";
                cuspayment.bankbranchname = null;
                txtBranchName.style.border = initial;

                txtOnlineHoldername.value = "";
                cuspayment.holdername = null;
                txtOnlineHoldername.style.border = initial;

                txtOnlineBaccNo.value = "";
                cuspayment.bankaccountno = null;
                txtOnlineBaccNo.style.border = initial;

                txttransferid.value = "";
                cuspayment.transferid = null;
                txttransferid.style.border = initial;

                txtOnlineDepositdatetime.value = "";
                cuspayment.depositdatetime = null;
                txtOnlineDepositdatetime.style.border = initial;

                //cheque date
                // cmbChequedate.value = getCurrentDateTime('date');
                // cuspayment.chequedate =  cmbChequedate.value;
                // cmbChequedate.style.border = valid;


                $('#collapseCheque').collapse('show');
                btnCheque.disabled = false;

                $('#collapseBankDeposit').collapse('hide');
                btnDeposit.disabled = true;

                $('#collapseOnlinetransfer').collapse('hide');
                btnOnline.disabled = true;

            }else if((JSON.parse(cmbpaymenttype.value).name) == "Deposit"){


                //online
                txtBranchName.value = "";
                cuspayment.bankbranchname = null;
                txtBranchName.style.border = initial;

                txtOnlineHoldername.value = "";
                cuspayment.holdername = null;
                txtOnlineHoldername.style.border = initial;

                txtOnlineBaccNo.value = "";
                cuspayment.bankaccountno = null;
                txtOnlineBaccNo.style.border = initial;

                txttransferid.value = "";
                cuspayment.transferid = null;
                txttransferid.style.border = initial;

                txtOnlineDepositdatetime.value = "";
                cuspayment.depositdatetime = null;
                txtOnlineDepositdatetime.style.border = initial;

                //cheque
                txtChequeNo.value = "";
                cuspayment.chequenumber = null;
                txtChequeNo.style.border = initial;

                cmbChequedate.value = "";
                cuspayment.chequedate = cmbChequedate.value;
                cmbChequedate.style.border = initial;

                // //deposit date time
                // txtDepositdatetime.value =  getCurrentDateTime('datetime');
                // cuspayment.depositdatetime = txtDepositdatetime.value;
                // txtDepositdatetime.style.border = valid;


                $('#collapseCheque').collapse('hide');
                btnCheque.disabled = true;

                $('#collapseBankDeposit').collapse('show');
                btnDeposit.disabled = false;

                $('#collapseOnlinetransfer').collapse('hide');
                btnOnline.disabled = true;

            }else if((JSON.parse(cmbpaymenttype.value).name) == "Online"){

                //cheque
                txtChequeNo.value = "";
                cuspayment.chequenumber = null;
                txtChequeNo.style.border = initial;

                cmbChequedate.value = "";
                cuspayment.chequedate = cmbChequedate.value;
                cmbChequedate.style.border = initial;



                //bank deposit
                txtBankname.value = "";
                cuspayment.bankname = null;
                txtBankname.style.border = initial;

                txtBankAccNo.value = "";
                cuspayment.bankaccountno = null;
                txtBankAccNo.style.border = initial;

                txtDepositdatetime.value = "";
                cuspayment.depositdatetime = null;
                txtDepositdatetime.style.border = initial;

                txtHolderName.value = "";
                cuspayment.holdername = null;
                txtHolderName.style.border = initial;


                //
                // //online deposit date time
                // txtOnlineDepositdatetime.value =  getCurrentDateTime('datetime');
                // cuspayment.depositdatetime = txtOnlineDepositdatetime.value;
                // txtOnlineDepositdatetime.style.border = valid;
                //



                $('#collapseCheque').collapse('hide');
                btnCheque.disabled = true;

                $('#collapseBankDeposit').collapse('hide');
                btnDeposit.disabled = true;

                $('#collapseOnlinetransfer').collapse('show');
                btnOnline.disabled = false;

            }else if((JSON.parse(cmbpaymenttype.value).name) == "Cash"){


                //cheque
                txtChequeNo.value = "";
                cuspayment.chequenumber = null;
                txtChequeNo.style.border = initial;

                cmbChequedate.value = "";
                cuspayment.chequedate = cmbChequedate.value;
                cmbChequedate.style.border = initial;



                //bank deposit
                txtBankname.value = "";
                cuspayment.bankname = null;
                txtBankname.style.border = initial;

                txtBankAccNo.value = "";
                cuspayment.bankaccountno = null;
                txtBankAccNo.style.border = initial;

                txtDepositdatetime.value = "";
                cuspayment.depositdatetime = null;
                txtDepositdatetime.style.border = initial;

                txtHolderName.value = "";
                cuspayment.holdername = null;
                txtHolderName.style.border = initial;


                //online
                txtBranchName.value = "";
                cuspayment.bankbranchname = null;
                txtBranchName.style.border = initial;

                txtOnlineHoldername.value = "";
                cuspayment.holdername = null;
                txtOnlineHoldername.style.border = initial;

                txtOnlineBaccNo.value = "";
                cuspayment.bankaccountno = null;
                txtOnlineBaccNo.style.border = initial;

                txttransferid.value = "";
                cuspayment.transferid = null;
                txttransferid.style.border = initial;

                txtOnlineDepositdatetime.value = "";
                cuspayment.depositdatetime = null;
                txtOnlineDepositdatetime.style.border = initial;


                $('#collapseCheque').collapse('hide');
                btnCheque.disabled = true;

                $('#collapseBankDeposit').collapse('hide');
                btnDeposit.disabled = true;

                $('#collapseOnlinetransfer').collapse('hide');
                btnOnline.disabled = true;
            }
    }

    function getPaymentDetails(){

            progressamountbyres = httpRequest("/reservationprogress/byreservation?reservationid="+JSON.parse(CmbReservation.value).id,"GET");
            if(progressamountbyres !=null){
                fillCombo(CmbResprogress,"Select the Pro_Code",progressamountbyres,"rpcode","");

            }
            else{
                fillCombo(CmbResprogress,"Select the Pro_Code",reservationprogresses,"rpcode","");

            }



        totalAmount = JSON.parse(CmbReservation.value).totalcharge;
              paidAmount  = JSON.parse(CmbReservation.value).paidamount;

            txtTotalamount.value = parseFloat(totalAmount).toFixed(2);
            txtTotalamount.style.border = valid;

            cuspayment.totalamount =  txtTotalamount.value;
            if(paidAmount != null){
                console.log("PaidAM",paidAmount)
                txtLastbalance.value = (parseFloat(txtTotalamount.value )- parseFloat(paidAmount)).toFixed(2);
                console.log("LAST",txtLastbalance.value)
                cuspayment.lastbalance = txtLastbalance.value;
                txtLastbalance.style.border = valid;
            }else{
                txtLastbalance.value = txtTotalamount.value;
                cuspayment.lastbalance = txtLastbalance.value;
                txtLastbalance.style.border = valid;

            }

            listbyReservation = httpRequest("customerpayment/listbyreservation?reservationid="+JSON.parse(CmbReservation.value).id,"GET");

            if(listbyReservation !=""){
                fillCombo(cmbpaymentcategory,"Select the Category",paymentcategory,"name","Balance-Payment");
                cmbpaymentcategory.disabled = true;
                cuspayment.paymentcategory_id = JSON.parse(cmbpaymentcategory.value);
                cmbpaymentcategory.style.border = valid;

                console.log("NEW BALANCE ",listbyReservation[0].newbalance);

            }else{
                listbyfulladvanve = httpRequest("/paymentcategory/listonlyfulladvance","GET");
                fillCombo(cmbpaymentcategory,"Select the Category",listbyfulladvanve,"name","");

            }


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
            cuspayments = new Array();
          var data = httpRequest("/customerpayment/findAll?page="+page+"&size="+size+query,"GET");
            if(data.content!= undefined) cuspayments = data.content;
            createPagination('pagination',data.totalPages, data.number+1,paginate);
            fillTable('tblCuspayment',cuspayments,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblCuspayment);

            if(activerowno!="")selectRow(tblCuspayment,activerowno,active);

        }

        function paginate(page) {


            checkerr = getErrors();

            if(oldcuspayment == null && addvalue == ""){
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

        function viewitem(cuspay,rowno) {

            viewcuspayment = JSON.parse(JSON.stringify(cuspay));

            tdcode.innerHTML = viewcuspayment.billcode;
            tdrescode.innerHTML = viewcuspayment.reservation_id.reservationcode;
            tdpcategory.innerHTML = viewcuspayment.paymentcategory_id.name;
            tdptype.innerHTML = viewcuspayment.paymentmethod_id.name;




            if(viewcuspayment.reservationprogress_id == null){
                tdpid.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
            }else{
                tdpid.innerHTML = viewcuspayment.reservationprogress_id.rpcode;
            }



            if( viewcuspayment.progressamount == null){
                tdpamount.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
            }else{
                tdpamount.innerHTML = parseFloat(viewcuspayment.progressamount).toFixed(2);
            }

            tdtotalamount.innerHTML = parseFloat(viewcuspayment.totalamount).toFixed(2);


            tdlastbalance.innerHTML = parseFloat(viewcuspayment.lastbalance).toFixed(2);

            tdpaidamount.innerHTML = parseFloat(viewcuspayment.paidamount).toFixed(2);

            tdnewbalance.innerHTML = parseFloat(viewcuspayment.newbalance).toFixed(2);

            tdpaymentdate.innerHTML = viewcuspayment.paymentdate;

            if(viewcuspayment.description == null){
                tddescription.innerHTML = "<p style='color: red;font-size: 15px;'>No Description Added</p>"
            }else{
                tddescription.innerHTML = viewcuspayment.description;
            }


            if(viewcuspayment.paymentmethod_id.name == "Cheque"){
                tdchequeno.innerHTML =  viewcuspayment.chequenumber;
                tdchequedate.innerHTML =  viewcuspayment.chequedate;

                //deposit
                tdbankname.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdbankaccno.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tddepositdt.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdholdername.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                //online
                tdOnlinebankname.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";

                tdbbranchname.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdOnlineholdername.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdOnlinebankaccno.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdtransferid.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdOnlinedepositdt.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                // tdbbranchname.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                // tdtransferid.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";




            }else if(viewcuspayment.paymentmethod_id.name == "Deposit"){
                tdbankname.innerHTML = viewcuspayment.bankname;
                tdbankaccno.innerHTML = viewcuspayment.bankaccountno;
                tddepositdt.innerHTML = viewcuspayment.depositdatetime;
                tdholdername.innerHTML = viewcuspayment.holdername;
                //cheque
                tdchequeno.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdchequedate.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";

                //online
                tdOnlinebankname.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";

                tdbbranchname.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdOnlineholdername.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdOnlinebankaccno.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdtransferid.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdOnlinedepositdt.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                // tdbbranchname.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                // tdtransferid.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";



            }else if(viewcuspayment.paymentmethod_id.name == "Online"){
                //tdbankname.innerHTML = viewcuspayment.bankname;
                tdOnlinebankname.innerHTML = viewcuspayment.bankname;

                tdbbranchname.innerHTML = viewcuspayment.bankbranchname;
                //tdholdername.innerHTML = viewcuspayment.holdername;
                tdOnlineholdername.innerHTML = viewcuspayment.holdername;
                //tdbankaccno.innerHTML = viewcuspayment.bankaccountno;
                tdOnlinebankaccno.innerHTML = viewcuspayment.bankaccountno;
                tdtransferid.innerHTML = viewcuspayment.transferid;
                //tddepositdt.innerHTML = viewcuspayment.depositdatetime;
                tdOnlinedepositdt.innerHTML = viewcuspayment.depositdatetime;
                //cheque
                tdchequeno.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdchequedate.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";

                //deposit
                tdbankname.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";
                tdbankaccno.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";
                tddepositdt.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";
                tdholdername.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";


            }else if(viewcuspayment.paymentmethod_id.name == "Cash"){
                //cheque
                tdchequeno.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdchequedate.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";
                //deposit
                tdbankname.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdbankaccno.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tddepositdt.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdholdername.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";

                //online
                tdOnlinebankname.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";

                tdbbranchname.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdOnlineholdername.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdOnlinebankaccno.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdtransferid.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                tdOnlinedepositdt.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                // tdbbranchname.innerHTML =  "<p style='color: red;font-size: 15px;'>None</p>";
                // tdtransferid.innerHTML = "<p style='color: red;font-size: 15px;'>None</p>";

            }












            tdaddedby.innerHTML = viewcuspayment.employee_id.callingname;
            tdstatus.innerHTML = viewcuspayment.paymentstatus_id.name;


            // if(employee.photo==null)
            //     tdphoto.src= 'resourse/image/noimage.png';
            //  else
            // tdphoto.src = atob(employee.photo);

            $('#dataviewModal').modal('show');


         }

         function btnPrintRowMC(){

             var format = printformtable.outerHTML;

             var newwindow=window.open();
             newwindow.document.write("<html>" +
                 "<head><style type='text/css'>.google-visualization-table-th {text-align: left;}</style>" +
                 "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/>"+
                 "</head>" +

                 "<body><div style='margin-top: 150px'><h1><img style='width: 80px;' class='cnew' src='../resources/image/cnew.jpg'><span>Customer Payment Details :</span> </h1></div>" +
                 "<div class='row'>"+
                 "<div class='col-md-12'>"+format+
             "</div>"+
             "</div>" +
                 "<script>printformtable.removeAttribute('style')</script>" +
                 "</body></html>");
             setTimeout(function () {newwindow.print(); newwindow.close();},100);

         }

        function loadForm() {
            cuspayment = new Object();
            oldcuspayment  = null;

            fillCombo(cmbpaymentcategory,"Select the Category",paymentcategory,"name","");
            fillCombo(cmbpaymenttype,"Select the Type",paymenttype,"name","");

            fillCombo(CmbReservation,"Select the Res_Code",reservations,"reservationcode","");


            fillCombo(CmbResprogress,"Select the Pro_Code",reservationprogresses,"rpcode","");

            cmbpaymentcategory.disabled = false;

            cmbpaymentDate.value = getCurrentDateTime('date');
            cuspayment.paymentdate =   cmbpaymentDate.value;
            cmbpaymentDate.disabled = true;
            cmbpaymentDate.style.border = valid;

            fillCombo(cmbaddedBy,"Select Added By",employees,"callingname",session.getObject('activeuser').employeeId.callingname);
            cuspayment.employee_id = JSON.parse(cmbaddedBy.value);
            cmbaddedBy.disabled = true;
            cmbaddedBy.style.border = valid;




            var nextnumber = httpRequest("../customerpayment/nextnumber","GET");
            txtbillCode.value = nextnumber.billcode;
            cuspayment.billcode =  txtbillCode.value;
            txtbillCode.disabled = true;
            txtbillCode.style.border = valid;



            fillCombo(CmbCustomer,"Select the Customer",activecustomers,"regno","");


            txtProamount.value = parseFloat(0).toFixed(2);
            cuspayment.progressamount = txtProamount.value;
            txtProamount.style.border = valid;

            fillCombo(cmbStatus,"Select the Status",pstatus,"name","Active");
            cuspayment.paymentstatus_id = JSON.parse(cmbStatus.value)
            cmbStatus.disabled = true;
            cmbStatus.style.border = valid;

            txtTotalamount.value = "";
            //txtProamount.value = "";
            txtLastbalance.value = "";
            txtPaidamount.value = "";
            txtNewbalance.value = "";

            //deposit
            txtBankname.value = "";
            txtBankAccNo.value = "";
            txtDepositdatetime.value = "";
            txtHolderName.value ="";

            //cheque
            txtChequeNo.value = "";
            cmbChequedate.value = "";

            //online
            txtBranchName.value = "";
            txtOnlineHoldername.value = "";
            txtOnlineBaccNo.value = "";
            txttransferid.value = "";
            txtOnlineDepositdatetime.value = "";



            // assignDate.style.border=valid;
            //  removeFile('flePhoto');
            //
            setStyle(initial);


            disableButtons(false, true, true);
        }


        function setStyle(style) {

            CmbCustomer.style.border = style;
            $('.Cuscmbsearch .select2-selection').css('border',style);
            cmbpaymentcategory.style.border = style;
            cmbpaymenttype.style.border = style;
            CmbReservation.style.border = style;

            txtTotalamount.style.border = style;
            //txtProamount.style.border = style;
            txtLastbalance.style.border = style;
            txtPaidamount.style.border = style;
            txtNewbalance.style.border = style;


            //deposit
            txtBankname.style.border = style;
            txtBankAccNo.style.border = style;
            txtDepositdatetime.style.border = style;
            txtHolderName.style.border = style;

            //cheque
            txtChequeNo.style.border = style;
            cmbChequedate.style.border = style;


            //online
            txtBranchName.style.border = style;
            txtOnlineHoldername.style.border = style;
            txtOnlineBaccNo.style.border = style;
            txttransferid.style.border = style;
            txtOnlineDepositdatetime.style.border = style;



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
            for(index in cuspayments){
                tblCuspayment.children[1].children[index].lastChild.children[0].disabled = true;
                tblCuspayment.children[1].children[index].lastChild.children[0].style.cursor = "not-allowed";
                }

            // select deleted data row
            for(index in cuspayments){
                if(cuspayments[index].paymentstatus_id.name =="Deleted"){
                    tblCuspayment.children[1].children[index].style.color = "#f00";
                    tblCuspayment.children[1].children[index].style.border = "2px solid red";
                    tblCuspayment.children[1].children[index].lastChild.children[0].disabled = true;
                    tblCuspayment.children[1].children[index].lastChild.children[0].style.cursor = "not-allowed";
                    tblCuspayment.children[1].children[index].lastChild.children[1].disabled = true;
                    tblCuspayment.children[1].children[index].lastChild.children[1].style.cursor = "not-allowed";

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

            if(cuspayment.billcode ==null){
                txtbillCode.style.border = invalid;
                errors = errors + "\n" + "Bill Code not Entered";
            }else addvalue = 1;


            if(CmbCustomer.value == ""){
                $('.Cuscmbsearch .select2-selection').css('border',invalid);
                errors = errors + "\n" + "Customer not Selected";
            }else addvalue = 1;



            if(cuspayment.paymentcategory_id ==null){
                cmbpaymentcategory.style.border = invalid;
                errors = errors + "\n" + "Payment Category not Selected";
            }else addvalue = 1;



            // if (empallocation.latype_id == null) {
            //     cmbaltype.style.border = invalid;
            //     errors = errors + "\n" + "Labor Allocation Type Not Selected";
            //
            // }else addvalue = 1;



            if (cuspayment.paymentmethod_id == null) {
                cmbpaymenttype.style.border = invalid;
                errors = errors + "\n" + "Payment Type Not Selected";

            }else {

                addvalue = 1;
                if (cuspayment.paymentmethod_id.name == "Cash") {
                    // if (cuspayment.reservationprogress_id == null) {
                    //     errors = errors + "\n" + "Reservation Progress Not Selected";
                    //     CmbResprogress.style.border = invalid;
                    // } else addvalue = 1;
                    // if (cuspayment.progressamount == null) {
                    //     errors = errors + "\n" + "Progress Amount Not Entered";
                    //     txtProamount.style.border = invalid;
                    // } else addvalue = 1;
                    if (cuspayment.totalamount == null) {
                        errors = errors + "\n" + "Total Amount Not Entered";
                        txtTotalamount.style.border = invalid;
                    } else addvalue = 1;

                    if (cuspayment.lastbalance == null) {
                        errors = errors + "\n" + "Last Balance Not Entered";
                        txtLastbalance.style.border = invalid;
                    } else addvalue = 1;

                    if (cuspayment.paidamount == null) {
                        errors = errors + "\n" + "Paid Amount Not Entered";
                        txtPaidamount.style.border = invalid;
                    } else addvalue = 1;

                    if (cuspayment.newbalance == null) {
                        errors = errors + "\n" + "New Balance Not Entered";
                        txtNewbalance.style.border = invalid;
                    } else addvalue = 1;



                } else if (cuspayment.paymentmethod_id.name == "Cheque") {
                    if (cuspayment.chequenumber == null) {
                        txtChequeNo.style.border = invalid;
                        errors = errors + "\n" + "Cheque Number Not Entered";
                    } else addvalue = 1;

                    if (cuspayment.chequedate == null) {
                        cmbChequedate.style.border = invalid;
                        errors = errors + "\n" + "Cheque Date Not Selected";
                    } else addvalue = 1;


                } else if (cuspayment.paymentmethod_id.name == "Deposit") {
                    if (cuspayment.bankname == null) {
                        txtBankname.style.border = invalid;
                        errors = errors + "\n" + "Bank Name Not Entered";
                    } else addvalue = 1;
                    if (cuspayment.bankaccountno == null) {
                        txtBankAccNo.style.border = invalid;
                        errors = errors + "\n" + "Bank Account Number Not Entered";
                    } else addvalue = 1;
                    if (cuspayment.depositdatetime == null) {
                        txtDepositdatetime.style.border = invalid;
                        errors = errors + "\n" + "Deposit Date & Time not Selected";
                    } else addvalue = 1;
                    if (cuspayment.holdername == null) {
                        txtHolderName.style.border = invalid;
                        errors = errors + "\n" + "Holder Name Not Entered";
                    } else addvalue = 1;


                    //final qty sender's reservation here


                } else if (cuspayment.paymentmethod_id.name == "Online") {
                    if (cuspayment.bankbranchname == null) {
                        txtBranchName.style.border = invalid;
                        errors = errors + "\n" + "Bank Branch Name Not Entered";
                    } else addvalue = 1;
                    if (cuspayment.holdername == null) {
                        txtOnlineHoldername.style.border = invalid;
                        errors = errors + "\n" + "Holder Name Not Entered";
                    } else addvalue = 1;
                    if (cuspayment.bankaccountno == null) {
                        txtOnlineBaccNo.style.border = invalid;
                        errors = errors + "\n" + "Bank Account Number not Entered";
                    } else addvalue = 1;
                    if (cuspayment.transferid == null) {
                        txttransferid.style.border = invalid;
                        errors = errors + "\n" + "Transfer Id Not Entered";
                    } else addvalue = 1;

                    if (cuspayment.depositdatetime == null) {
                        txtOnlineDepositdatetime.style.border = invalid;
                        errors = errors + "\n" + "Deposit Date & Time Not Entered";
                    } else addvalue = 1;


                }

            }

            if(cuspayment.reservation_id ==null){
                CmbReservation.style.border = invalid;
                errors = errors + "\n" + "Reservation Code not Selected";
            }else addvalue = 1;


            if (cuspayment.totalamount == null) {
                errors = errors + "\n" + "Total Amount Not Entered";
                txtTotalamount.style.border = invalid;
            } else addvalue = 1;

            if (cuspayment.lastbalance == null) {
                errors = errors + "\n" + "Last Balance Not Entered";
                txtLastbalance.style.border = invalid;
            } else addvalue = 1;

            if (cuspayment.paidamount == null) {
                errors = errors + "\n" + "Paid Amount Not Entered";
                txtPaidamount.style.border = invalid;
            } else addvalue = 1;

            if (cuspayment.newbalance == null) {
                errors = errors + "\n" + "New Balance Not Entered";
                txtNewbalance.style.border = invalid;
            } else addvalue = 1;




            if (cuspayment.paymentstatus_id == null){
                cmbStatus.style.border = invalid;
                errors = errors + "\n" + "Payment Status Not Selected";
            }
            else  addvalue = 1;


            if (cuspayment.paymentdate == null){
                cmbpaymentDate.style.border = invalid;
                errors = errors + "\n" + "Payment Date Not Selected";
            }
            else  addvalue = 1;



            return errors;

        }

        function btnAddMC(){
            if(getErrors()==""){
                if(txtpayDescription.value=="" || CmbResprogress.value == "" || txtProamount.value ==""){
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

            if(cuspayment.paymentmethod_id.name == "Cash"){


                swal({

                    title: "Are you sure to add following Cash Details...?" ,
                    text :"\nBill Code : " + cuspayment.billcode+
                        "\nPayment Category : " + cuspayment.paymentcategory_id.name +
                        "\nReservation Code : " + cuspayment.reservation_id.reservationcode +
                        "\nPayment Type : " + cuspayment.paymentmethod_id.name +
                        "\nTotal Amount : " + cuspayment.totalamount +
                        "\nLast Balance : " + cuspayment.lastbalance+
                        "\nPaid Amount : " + cuspayment.paidamount+
                        "\nNew Balance : " +cuspayment.newbalance +

                        "\nPayment Status : " + cuspayment.paymentstatus_id.name +
                        "\nPayment Date : " + cuspayment.paymentdate +
                        "\nAdded By : " + cuspayment.employee_id.callingname ,


                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        var response = httpRequest("/customerpayment", "POST", cuspayment);
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



            }else if(cuspayment.paymentmethod_id.name == "Deposit"){

                swal({

                    title: "Are you sure to add following Deposit Details...?" ,
                    text :"\nAllocation Code: " +   cuspayment.billcode+
                        "\nPayment Category : " + cuspayment.paymentcategory_id.name +
                        "\nReservation Code : " + cuspayment.reservation_id.reservationcode +
                        "\nPayment Type : " + cuspayment.paymentmethod_id.name +
                        "\nTotal Amount : " + cuspayment.totalamount +
                        "\nLast Balance : " + cuspayment.lastbalance+
                        "\nPaid Amount : " + cuspayment.paidamount+
                        "\nNew Balance : " +cuspayment.newbalance +
                        "\nBank Name : " +cuspayment.bankname +
                        "\nBank Acc-No : " + cuspayment.bankaccountno +
                        "\nDeposit Date & Time : " + cuspayment.depositdatetime +
                        "\nHolder Name : " +  cuspayment.holdername+


                    "\nPayment Status : " + cuspayment.paymentstatus_id.name +
                        "\nPayment Date : " + cuspayment.paymentdate +
                        "\nAdded By : " + cuspayment.employee_id.callingname ,

                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        var response = httpRequest("/customerpayment", "POST", cuspayment);
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

            }else if(cuspayment.paymentmethod_id.name == "Cheque"){

                swal({

                    title: "Are you sure to add following ES Transfer In...?" ,
                    text :"\nAllocation Code: " +   cuspayment.billcode+
                        "\nPayment Category : " + cuspayment.paymentcategory_id.name +
                        "\nReservation Code : " + cuspayment.reservation_id.reservationcode +
                        "\nPayment Type : " + cuspayment.paymentmethod_id.name +
                        "\nTotal Amount : " + cuspayment.totalamount +
                        "\nLast Balance : " + cuspayment.lastbalance+
                        "\nPaid Amount : " + cuspayment.paidamount+
                        "\nNew Balance : " +cuspayment.newbalance +
                        "\nCheque No : " + cuspayment.chequenumber +
                        "\nCheque Date : " +    cuspayment.chequedate +



                        "\nPayment Status : " + cuspayment.paymentstatus_id.name +
                        "\nPayment Date : " + cuspayment.paymentdate +
                        "\nAdded By : " + cuspayment.employee_id.callingname ,


                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        var response = httpRequest("/customerpayment", "POST", cuspayment);
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
            else if(cuspayment.paymentmethod_id.name == "Online"){


                swal({

                    title: "Are you sure to add following Online Details...?" ,
                    text :"\nBill Code: " +   cuspayment.billcode+

                        "\nPayment Category : " + cuspayment.paymentcategory_id.name +
                        "\nReservation Code : " + cuspayment.reservation_id.reservationcode +
                        "\nPayment Type : " + cuspayment.paymentmethod_id.name +
                        "\nTotal Amount : " + cuspayment.totalamount +
                        "\nLast Balance : " + cuspayment.lastbalance+
                        "\nPaid Amount : " + cuspayment.paidamount+
                        "\nNew Balance : " +cuspayment.newbalance +
                        "\nBank Branch Name : " +  cuspayment.bankbranchname+
                        "\nHolder Name : " +   cuspayment.holdername+
                        "\nBank Acc-No : " +    cuspayment.bankaccountno+
                        "\nTransfer Id : " +    cuspayment.transferid+
                        "\nDeposit Date & Time: " +      cuspayment.depositdatetime+

                        "\nPayment Status : " + cuspayment.paymentstatus_id.name +
                        "\nPayment Date : " + cuspayment.paymentdate +
                        "\nAdded By : " + cuspayment.employee_id.callingname ,




                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        var response = httpRequest("/customerpayment", "POST", cuspayment);
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

            if(oldcuspayment == null && addvalue == ""){
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

        function btnDeleteMC(cusp) {
            cuspayment = JSON.parse(JSON.stringify(cusp));

            swal({
                title: "Are you sure to delete following customer...?",
                text: "\n Bill Code : " + cuspayment.billcode  +
                "\nRes-Code : " + cuspayment.reservation_id.reservationcode,
                icon: "warning", buttons: true, dangerMode: true,
            }).then((willDelete)=> {
                if (willDelete) {
                    var responce = httpRequest("/customerpayment","DELETE",cuspayment);
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

       function btnPrintTableMC(cuspayment) {

            var newwindow=window.open();
            formattab = tblCuspayment.outerHTML;

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