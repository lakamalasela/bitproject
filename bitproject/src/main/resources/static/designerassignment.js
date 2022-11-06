

 

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

            privilages = httpRequest("../privilage?module=DESIGNERASSIGNMENT","GET");




            reservations = httpRequest("../reservation/activelist","GET");
            desinerassignmentstatus = httpRequest("../designerassignmentstatus/list","GET");

            designeremployees = httpRequest("../employee/designeremp","GET");

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
            designassignments = new Array();
          var data = httpRequest("/designerassignment/findAll?page="+page+"&size="+size+query,"GET");
            if(data.content!= undefined) designassignments = data.content;
            createPagination('pagination',data.totalPages, data.number+1,paginate);
            fillTable('tblDesignerassign',designassignments,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblDesignerassign);

            if(activerowno!="")selectRow(tblDesignerassign,activerowno,active);

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

        function viewitem(des,rowno) {

            viewdesigner = JSON.parse(JSON.stringify(des));

            tdres.innerHTML = viewdesigner.reservation_id.reservationcode;
            tdassigndate.innerHTML = viewdesigner.assigndate;
            tddesigner.innerHTML = viewdesigner.designeremployee_id.number;
            tdcodate.innerHTML = viewdesigner.completeddate;
            tdacdate.innerHTML = viewdesigner.actualcompleteddate;
            tdstatus.innerHTML = viewdesigner.desingerstatus_id.name;
            tdaddedby.innerHTML = viewdesigner.employee_id.callingname;





            if(viewdesigner.description == null){
                tddescription.innerHTML = "<p style='color: red;font-size: 15px;'>No Description Added</p>"
            }else{
                tddescription.innerHTML = viewcustomer.description;
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
             //     "<body><div style='margin-top: 150px'><h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Customer Details :</span> </h1></div>" +
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
                 "</address></div></div></di><hr> <h1>Designer Assignment Details :</h1></div>" +
                 "<div>"+format+"</div>" +
                 "<script>printformtable.removeAttribute('style')</script>" +
                 "</body></html>");
             setTimeout(function () {newwindow.print(); newwindow.close();},100);

         }

        function loadForm() {
            designerassign = new Object();
            olddesignerassign = null;
            //
            fillCombo(cmbReservation,"Select Res-Code",reservations,"reservationcode","");
            cmbReservation.disabled = false;
            // fillCombo(cmbDesigner,"Select the Plan Designer",employees,"callingname","");
            fillCombo(cmbDesigner,"Select the Plan Designer",designeremployees,"number","");
            fillCombo(cmbAdded,"Select the Added By Designer",employees,"callingname",session.getObject('activeuser').employeeId.callingname);
             fillCombo(cmbStatus,"Select the Plan Designer status",desinerassignmentstatus,"name","Active");
            //
            // //  fillCombo(cmbEmployeestatus,"",employeestatuses,"name","Working");


            designerassign.desingerstatus_id=JSON.parse(cmbStatus.value);
            cmbStatus.disabled = true;


            designerassign.employee_id=JSON.parse(cmbAdded.value);
            cmbAdded.disabled = true;

            cmbReservation.value = "";
            actualDate.value = "";
            // Assigndate

            // completedDate
            // actualDate
            designDescription.value = ""
            // cmbStatus
            // cmbAdded
            Assigndate.value = getCurrentDateTime('date');
            Assigndate.disabled = true;
            designerassign.assigndate = Assigndate.value;
            Assigndate.style.border = valid;

            var getToday = getCurrentDateTime('date');
            console.log("Today Is",getToday);
            var endtoday = new Date();
            var nextweek = new Date();

            nextweek.setDate(endtoday.getDate()+4);


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
            designerassign.completeddate = completedDate.value;
            completedDate.disabled = true;
            completedDate.style.border = valid;


            designDescription.style.border = initial;


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
            cmbDesigner.style.border = style;



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
            for(index in designassignments){
                if(designassignments[index].desingerstatus_id.name =="Deleted"){
                    tblDesignerassign.children[1].children[index].style.color = "#f00";
                    tblDesignerassign.children[1].children[index].style.border = "2px solid red";
                    tblDesignerassign.children[1].children[index].lastChild.children[1].disabled = true;
                    tblDesignerassign.children[1].children[index].lastChild.children[1].style.cursor = "not-allowed";

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


            if (designerassign.reservation_id == null) {
                $('.Rescmbsearch .select2-selection').css('border',invalid);
                //cmbReservation.style.border = invalid;
                errors = errors + "\n" + "Reservation Code not Selected";

            }
            else  addvalue = 1;

            if(designerassign.designeremployee_id ==null){
                cmbDesigner.style.border = invalid;
                errors = errors + "\n" + "Plan Designer not Selected";
            }
            else addvalue = 1;


            if (designerassign.assigndate == null){
                actualDate.style.border = invalid;
                errors = errors + "\n" + "Assign Date not Entered";
            }
            else  addvalue = 1;


            return errors;

        }

        function btnAddMC(){
            if(getErrors()==""){
                if(completedDate.value=="" || actualDate.value =="" || designDescription.value == ""){
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
                text :  "\nReservation Code : " + designerassign.reservation_id.reservationcode +
                    "\nAssign Date : " + designerassign.assigndate +
                    "\nPlan Designer : " + designerassign.designeremployee_id.callingname,
                    // "\nGender : " + designerassign.genderId.name +
                    //  "\nCivil Status : " + designerassign.civilstatusId.name +



                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    var response = httpRequest("/designerassignment", "POST", designerassign);
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

            if(olddesignerassign == null && addvalue == ""){
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

        function fillForm(design,rowno){
            activerowno = rowno;

            if (olddesignerassign==null) {
                filldata(design);
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


        function filldata(design) {
            clearSelection(tblDesignerassign);
            selectRow(tblDesignerassign,activerowno,active);

            designerassign = JSON.parse(JSON.stringify(design));
            olddesignerassign = JSON.parse(JSON.stringify(design));


            Assigndate.value = designerassign.assigndate;
            completedDate.value = designerassign.completeddate;

            actualDate.value = designerassign.actualcompleteddate;


            if(designerassign.description == null){
                designDescription.value = "No Description Added";
                designDescription.style.border = initial;
            }else {
                designDescription.value = designerassign.description;
                designDescription.style.border = valid;
            }




            fillCombo(cmbReservation,"Select the Reservation Code",reservations,"reservationcode",designerassign.reservation_id.reservationcode);
            cmbReservation.disabled = true;
            // fillCombo(cmbDesigner,"Select the Plan Designer",employees,"callingname","");
            fillCombo(cmbDesigner,"Select the Plan Designer",employees,"callingname",designerassign.designeremployee_id .callingname);
            fillCombo(cmbAdded,"Select the Added By Designer",employees,"callingname",designerassign.employee_id.callingname);
            fillCombo(cmbStatus,"Select the Plan Designer status",desinerassignmentstatus,"name",designerassign.desingerstatus_id.name);



            //setDefaultFile('flePhoto', employee.photo);

            disableButtons(true, false, false);
            setStyle(valid);
            $('#DesignerAdd').modal('show');
        }

        function getUpdates() {

            var updates = "";

            if(designerassign!=null && olddesignerassign!=null) {


                if (designerassign.actualcompleteddate != olddesignerassign.actualcompleteddate)
                    updates = updates + "\nActual Completed Date is Changed.." +olddesignerassign.actualcompleteddate +" into " + designerassign.actualcompleteddate  ;

                if (designerassign.description != olddesignerassign.description)
                    updates = updates + "\nDescription  is Changed.." + olddesignerassign.description +" into "+designerassign.description;


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
                        title: "Are you sure to update following Customer details...?",
                        text: "\n"+ updates,
                        icon: "warning", buttons: true, dangerMode: true,
                    })
                        .then((willDelete) => {
                        if (willDelete) {
                            var response = httpRequest("/designerassignment", "PUT", designerassign);
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

        function btnDeleteMC(design) {
            designerassign = JSON.parse(JSON.stringify(design));

            swal({
                title: "Are you sure to delete following Designer...?",
                text: "\n Reservation Code : " + designerassign.reservation_id.reservationcode  +
                "\n Plan Designer : " +  designerassign.designeremployee_id.callingname,
                icon: "warning", buttons: true, dangerMode: true,
            }).then((willDelete)=> {
                if (willDelete) {
                    var responce = httpRequest("/designerassignment","DELETE",designerassign);
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

       function btnPrintTableMC(designerassign) {

            var newwindow=window.open();
            formattab = tblDesignerassign.outerHTML;

           newwindow.document.write("" +
                "<html>" +
                "<head><style type='text/css'>.google-visualization-table-th {text-align: left;} .modifybutton{display: none} .isort{display: none}</style>" +
                "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/></head>" +
                "<body><div style='margin-top: 150px; '> <h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Designer Added Details :</span></h1></div>" +
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

            if(olddesignerassign == null && addvalue == ""){
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