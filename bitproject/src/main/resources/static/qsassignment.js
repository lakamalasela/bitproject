

 

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

            privilages = httpRequest("../privilage?module=QSASSIGNMENT","GET");
            actualDate.addEventListener("change",getval);




            //reservations = httpRequest("../reservation/list","GET");
            reservations = httpRequest("../reservation/activelist","GET");
            qsassignmentstatus = httpRequest("../qsstatus/list","GET");

            qsemployees = httpRequest("../employee/qsemp","GET");
            employees = httpRequest("../employee/list","GET");

            valid = "2px solid green";
            invalid = "2px solid red";
            initial = "2px solid #d6d6c2";
            updated = "2px solid #ff9900";
            active = "#90EE90";

            loadView();
            loadForm();


            // changeTab('form');
        }

        function getval(){
            console.log(actualDate.value);
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
            qsassignments = new Array();
          var data = httpRequest("/qsassignment/findAll?page="+page+"&size="+size+query,"GET");
            if(data.content!= undefined) qsassignments = data.content;
            createPagination('pagination',data.totalPages, data.number+1,paginate);
            fillTable('tblQSassign',qsassignments,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblQSassign);

            if(activerowno!="")selectRow(tblQSassign,activerowno,active);

        }

        function paginate(page) {


            checkerr = getErrors();

            if(oldcustomer == null && addvalue == ""){
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

        function viewitem(qs,rowno) {

            viewqs = JSON.parse(JSON.stringify(qs));

            tdrescode.innerHTML = viewqs.reservation_id.reservationcode;
            tdassigndate.innerHTML = viewqs.assigndate;
            tdqs.innerHTML = viewqs.qsemployee_id.number;
            tdcomdate.innerHTML = viewqs.completeddate;
            tdacdate.innerHTML = viewqs.actualcompleteddate;
            tdstatus.innerHTML = viewqs.qsstatus_id.name;
            tdaddedby.innerHTML = viewqs.employee_id.callingname;




            if(viewqs.description == null){
                tddescription.innerHTML = "<p style='color: red;font-size: 15px;'>No Description Added</p>"
            }else{
                tddescription.innerHTML = viewqs.description;
            }




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
             //     "<body><div style='margin-top: 150px'><h1><img class='cnew' src='../resources/image/cnew.jpg'><span>QS Assignment Details :</span> </h1></div>" +
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
                 "</address></div></div></di><hr> <h1>QS Assignment Details :</h1></div>" +
                 "<div>"+format+"</div>" +
                 "<script>printformtable.removeAttribute('style')</script>" +
                 "</body></html>");
             setTimeout(function () {newwindow.print(); newwindow.close();},100);

         }

        function loadForm() {
            qsassign = new Object();
            oldqsassign = null;
            //
            fillCombo(cmbReservation,"Select the Res-Code",reservations,"reservationcode","");
            cmbReservation.disabled = false;
            // fillCombo(cmbDesigner,"Select the Plan Designer",employees,"callingname","");
            fillCombo(cmbQS,"Select the QS",qsemployees,"number","");
            fillCombo(cmbAdded,"Select the Added By Designer",employees,"callingname",session.getObject('activeuser').employeeId.callingname);
             fillCombo(cmbStatus,"Select the Plan Designer status",qsassignmentstatus,"name","Active");
            //
            // //  fillCombo(cmbEmployeestatus,"",employeestatuses,"name","Working");
            // qsassign.qsemployee_id = JSON.parse(cmbQS.value);
            // console.log( qsassign.qsemployee_id.callingname)
            // cmbQS.disabled = true;

            qsassign.qsstatus_id=JSON.parse(cmbStatus.value);
            cmbStatus.disabled = true;


            qsassign.employee_id=JSON.parse(cmbAdded.value);
            cmbAdded.disabled = true;

            cmbReservation.value = "";
            actualDate.value = "";
            // Assigndate

            // completedDate
            // actualDate
            QSDescription.value = ""
            // cmbStatus
            // cmbAdded
            Assigndate.value = getCurrentDateTime('date');
            Assigndate.disabled = true;
            qsassign.assigndate = Assigndate.value;
            Assigndate.style.border = valid;

            var getToday = getCurrentDateTime('date');
            console.log("Today Is",getToday);
            var endtoday = new Date();
            var nextweek = new Date();

            nextweek.setDate(endtoday.getDate()+6);


            // endtoday.getDate()+7;
            // console.log(endtoday.getDate()+7)
            // endtoday.getDate()+7
            var getActMonth= nextweek.getMonth()+1;
            if(getActMonth<10){
                getActMonth = "0"+getActMonth;
            }

            var getActDate = nextweek.getDate();
            if(getActDate<10){
                getActDate = "0"+getActDate;
            }
            completedDate.value = nextweek.getFullYear()+"-"+getActMonth +"-"+getActDate;
            qsassign.completeddate = completedDate.value;
            completedDate.disabled = true;
            completedDate.style.border = valid;


            QSDescription.style.border = initial;


             // var today = new Date();
             // var month = today.getMonth()+1;
             // if(month<10) month = "0"+month;
             // var date = today.getDate();
             // if(date<10) date = "0"+date;
             //
             // assignDate.value=today.getFullYear()+"-"+month+"-"+date;
             // customer.addedate=assignDate.value;
             // assignDate.disabled = true;

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
           //
           //  cusEmail.value = "";

            //
             setStyle(initial);

            disableButtons(false, true, true);
        }

        function setStyle(style) {

           // cusReg.style.border = style;

            //cmbReservation.style.border = style;
            $('.Rescmbsearch .select2-selection').css('border',style);
            actualDate.style.border = style;

            cmbQS.style.border = style;


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
            for(index in qsassignments){
                if(qsassignments[index].qsstatus_id.name =="Deleted"){
                    tblQSassign.children[1].children[index].style.color = "#f00";
                    tblQSassign.children[1].children[index].style.border = "2px solid red";
                    tblQSassign.children[1].children[index].lastChild.children[1].disabled = true;
                    tblQSassign.children[1].children[index].lastChild.children[1].style.cursor = "not-allowed";

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


            if (qsassign.reservation_id == null) {
               // cmbReservation.style.border = invalid;
                $('.Rescmbsearch .select2-selection').css('border',invalid);
                errors = errors + "\n" + "Reservation Code not Selected";

            }
            else  addvalue = 1;

            if(qsassign.qsemployee_id ==null){
                cmbQS.style.border = invalid;
                errors = errors + "\n" + "Plan Designer not Selected";
            }
            else addvalue = 1;

            // if(qsassign.actualcompleteddate ==null){
            //     actualDate.style.border = invalid;
            //     errors = errors + "\n" + "Actual Completed Date not Selected";
            // }
            // else addvalue = 1;


            if (qsassign.assigndate == null){
                actualDate.style.border = invalid;
                errors = errors + "\n" + "Assign Date not Entered";
            }
            else  addvalue = 1;


            return errors;

        }

        function btnAddMC(){
            if(getErrors()==""){
                if(completedDate.value=="" || actualDate.value =="" || QSDescription.value == ""){
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
                title: "Are you sure to add following QS Details...?" ,
                text :  "\nReservation Code : " + qsassign.reservation_id.reservationcode +
                    "\nAssign Date : " + qsassign.assigndate +
                    "\nQS Name : " + qsassign.qsemployee_id.callingname,
                    // "\nGender : " + designerassign.genderId.name +
                    //  "\nCivil Status : " + designerassign.civilstatusId.name +



                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    var response = httpRequest("/qsassignment", "POST", qsassign);
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
                        $('#DesignerAdd').modal('hide');
                        //changeTab('table');
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

            if(oldqsassign == null && addvalue == ""){
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

        function fillForm(qs,rowno){
            activerowno = rowno;

            if (oldqsassign==null) {
                filldata(qs);
            } else {
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        filldata(design);
                    }

                });
            }

        }


        function filldata(qs) {
            clearSelection(tblQSassign);
            selectRow(tblQSassign,activerowno,active);

            qsassign = JSON.parse(JSON.stringify(qs));
            oldqsassign = JSON.parse(JSON.stringify(qs));


            Assigndate.value = qsassign.assigndate;
            completedDate.value = qsassign.completeddate;

            actualDate.value = qsassign.actualcompleteddate;


            if(qsassign.description == null){
                QSDescription.value = "No Description Added";
                QSDescription.style.border = initial;
            }else {
                QSDescription.value = qsassign.description;
                QSDescription.style.border = valid;
            }




            fillCombo(cmbReservation,"Select the Reservation Code",reservations,"reservationcode",qsassign.reservation_id.reservationcode);
            cmbReservation.disabled = true;
            // fillCombo(cmbDesigner,"Select the Plan Designer",employees,"callingname","");
            fillCombo(cmbQS,"Select the QS",employees,"callingname",qsassign.qsemployee_id .callingname);
            fillCombo(cmbAdded,"Select the Added By Designer",employees,"callingname",qsassign.employee_id.callingname);
            fillCombo(cmbStatus,"Select the QS status",qsassignmentstatus,"name",qsassign.qsstatus_id.name);



            //setDefaultFile('flePhoto', employee.photo);

            disableButtons(true, false, false);
            setStyle(valid);
            $('#DesignerAdd').modal('show');
        }

        function getUpdates() {

            var updates = "";

            if(qsassign!=null && oldqsassign!=null) {


                if (qsassign.actualcompleteddate != oldqsassign.actualcompleteddate)
                    updates = updates + "\nActual Completed Date is Changed.." +oldqsassign.actualcompleteddate +" into " + qsassign.actualcompleteddate  ;

                if (qsassign.description != oldqsassign.description)
                    updates = updates + "\nDescription  is Changed.." + oldqsassign.description +" into "+qsassign.description;

                if (qsassign.qsemployee_id.callingname != oldqsassign.qsemployee_id.callingname)
                    updates = updates + "\nQS  is Changed.." + oldqsassign.qsemployee_id.callingname +" into "+qsassign.qsemployee_id.callingname ;


                // if (customer.photo != oldcustomer.photo)
                //     updates = updates + "\nPhoto is Changed";



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
                        title: "Are you sure to update following QS Details...?",
                        text: "\n"+ updates,
                        icon: "warning", buttons: true, dangerMode: true,
                    })
                        .then((willDelete) => {
                        if (willDelete) {
                            var response = httpRequest("/qsassignment", "PUT", qsassign);
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
                                $('#DesignerAdd').modal('hide');

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

        function btnDeleteMC(qs) {
            qsassign = JSON.parse(JSON.stringify(qs));

            swal({
                title: "Are you sure to delete following QS...?",
                text: "\n Reservation Code : " + qsassign.reservation_id.reservationcode  +
                "\n Qs Name : " +  qsassign.qsemployee_id.callingname,
                icon: "warning", buttons: true, dangerMode: true,
            }).then((willDelete)=> {
                if (willDelete) {
                    var responce = httpRequest("/qsassignment","DELETE",qsassign);
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

       function btnPrintTableMC(qsassign) {

            var newwindow=window.open();
            formattab = tblQSassign.outerHTML;

           newwindow.document.write("" +
                "<html>" +
                "<head><style type='text/css'>.google-visualization-table-th {text-align: left;} .modifybutton{display: none} .isort{display: none}</style>" +
                "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/></head>" +
                "<body><div style='margin-top: 150px; '> <h1><img class='cnew' src='../resources/image/cnew.jpg'><span>QS Added Details :</span></h1></div>" +
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

        function btnCloseModalMc(){

            checkerr = getErrors();

            if(oldqsassign == null && addvalue == ""){
                $('#DesignerAdd').modal('hide');

                loadForm();
            }else{
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        $('#DesignerAdd').modal('hide');

                        loadForm();
                    }

                });
            }

        }