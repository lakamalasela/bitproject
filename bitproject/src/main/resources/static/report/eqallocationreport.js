

 

        window.addEventListener("load", initialize);

        //Initializing Functions

        function initialize() {

            $('[data-toggle="tooltip"]').tooltip()


            //select2
            $('.js-example-basic-single').select2();

            // btnAdd.addEventListener("click",btnAddMC);
            // btnClear.addEventListener("click",btnClearMC);
            // btnUpdate.addEventListener("click",btnUpdateMC);

            // dteDOBirth.onchange = dteDOBirthCH;
           // txtSearchName.addEventListener("keyup",btnSearchMC);
            equipments =  httpRequest("../equipment/list","GET");

            privilages = httpRequest("../privilage?module=CUSTOMER","GET");


            employees = httpRequest("../employee/list","GET");

            valid = "2px solid green";
            invalid = "2px solid red";
            initial = "2px solid #d6d6c2";
            updated = "2px solid #ff9900";
            active = "#90EE90";

           // loadView();
            loadForm();


            changeTab('form');
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
            customers = new Array();
          var data = httpRequest("/customer/findAll?page="+page+"&size="+size+query,"GET");
            if(data.content!= undefined) customers = data.content;
            createPagination('pagination',data.totalPages, data.number+1,paginate);
            fillTable('tblCustomer',customers,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblCustomer);

            if(activerowno!="")selectRow(tblCustomer,activerowno,active);

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

        function viewitem(cus,rowno) {

            viewcustomer = JSON.parse(JSON.stringify(cus));

            tdreg.innerHTML = viewcustomer.regno;
            tdcname.innerHTML = viewcustomer.callingname;
            tdfname.innerHTML = viewcustomer.fullname;
            tdnic.innerHTML = viewcustomer.nic;
            tdmobile.innerHTML = viewcustomer.mobile;
            tdaddress.innerHTML = viewcustomer.address;
            tdtel.innerHTML = viewcustomer.telephone;





            if(customer.workplacedetails == null){
                tdwork.innerHTML = "<p style='color: red;font-size: 15px;'>No Work Details Added</p>"
            }else{
                tdwork.innerHTML = viewcustomer.workplacedetails;
            }



            if(viewcustomer.description == null){
                tddescription.innerHTML = "<p style='color: red;font-size: 15px;'>No Description Added</p>"
            }else{
                tddescription.innerHTML = viewcustomer.description;
            }


            tdcontact.innerHTML = viewcustomer.contactmedia_id.name;

            tdarrears.innerHTML = parseFloat(viewcustomer.arrearsamount).toFixed(2);


            // if(employee.photo==null)
            //     tdphoto.src= 'resourse/image/noimage.png';
            //  else
            // tdphoto.src = atob(employee.photo);
            tdemail.innerHTML = viewcustomer.email;
            tddate.innerHTML = viewcustomer.addedate;
            tdaddedby.innerHTML = viewcustomer.employee_id.callingname;
            tdstatus.innerHTML = viewcustomer.customerstatus_id.name;

            $('#dataviewModal').modal('show');


         }

         function btnPrintRowMC(){

             var format = printformtable.outerHTML;

             var newwindow=window.open();
             newwindow.document.write("<html>" +
                 "<head><style type='text/css'>.google-visualization-table-th {text-align: left;}</style>" +
                 "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/>"+
                 "</head>" +

                 "<body><div style='margin-top: 150px'><h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Customer Details :</span> </h1></div>" +
                 "<div>"+format+"</div>" +
                 "<script>printformtable.removeAttribute('style')</script>" +
                 "</body></html>");
             setTimeout(function () {newwindow.print(); newwindow.close();},100);

         }

        function loadForm() {
            customer = new Object();
            oldcustomer = null;

            fillCombo(cmbEqname,"Select the Equipment",equipments,"equipmentname","");



            //disableButtons(false, true, true);
        }

        function setStyle(style) {

           // cusReg.style.border = style;
            cusName.style.border = style;
            cusFullname.style.border = style;
            cusNIC.style.border = style;
            cusMobile.style.border = style;
            cusAddress.style.border = style;
            cusTel.style.border = style;
            cusworkdetail.style.border = style;
            //cusDescription.style.border = style;
            cmbContact.style.border = style;
            cusEmail.style.border = style;

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
            for(index in customers){
                if(customers[index].customerstatus_id.name =="Deleted"){
                    tblCustomer.children[1].children[index].style.color = "#f00";
                    tblCustomer.children[1].children[index].style.border = "2px solid red";
                    tblCustomer.children[1].children[index].lastChild.children[1].disabled = true;
                    tblCustomer.children[1].children[index].lastChild.children[1].style.cursor = "not-allowed";

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


            if (customer.regno == null) {
                cusReg.style.border = invalid;
                errors = errors + "\n" + "Customer Register Number not Entered";

            }else  addvalue = 1;

            if(customer.callingname ==null){
                cusName.style.border = invalid;
                errors = errors + "\n" + "Customer Calling Name not Entered";
            }else addvalue = 1;


            if (customer.fullname == null){
                cusFullname.style.border = invalid;
                errors = errors + "\n" + "Customer Full Name not Entered";
            }
            else  addvalue = 1;


            if (customer.nic == null){
                cusNIC.style.border = invalid;
                errors = errors + "\n" + "Customer NIC not Entered";
            }
            else  addvalue = 1;

            if (customer.mobile == null){
                cusMobile.style.border = invalid;
                errors = errors + "\n" + "Customer Mobile not Entered";
            }

            else  addvalue = 1;


            if (customer.address == null){
                cusAddress.style.border = invalid;
                errors = errors + "\n" + "Customer Address not Entered";
            }

            else  addvalue = 1;

            if (customer.telephone == null){
                cusTel.style.border = invalid;
                errors = errors + "\n" + "Customer Telephone not Entered";
            }

            else  addvalue = 1;

            if (customer.contactmedia_id == null){
                cmbContact.style.border = invalid;
                errors = errors + "\n" + "Customer Contact Media Not Entered";
            }

            else  addvalue = 1;

            if (customer.email == null){
                cusEmail.style.border = invalid;
                errors = errors + "\n" + "Customer Email Not Entered";
            }

            else  addvalue = 1;

            if (customer.customerstatus_id == null){
                cmbStatus.style.border = invalid;
                errors = errors + "\n" + "Customer Status Not Entered";
            }
            else  addvalue = 1;

            return errors;

        }

        function btnAddMC(){
            if(getErrors()==""){
                if(cmbContact.value=="" || cusDescription.value =="" || cusworkdetail.value == ""){
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
                text :  "\nRegister No : " + customer.regno +
                    "\nCalling Name : " + customer.callingname +
                    "\nFull Name : " + customer.fullname +
                    // "\nGender : " + customer.genderId.name +
                    //  "\nCivil Status : " + customer.civilstatusId.name +
                    "\nNIC : " + customer.nic +
                    "\nMobile : " + customer.mobile +
                    "\nAddress : " + customer.address +
                    "\nTelephone : " + customer.telephone +
                    "\nContact Media : " + customer.contactmedia_id.name +
                    "\nEmail : " + customer.email +
                    "\nAdded Date : " + customer.addedate +
                    "\nStatus : " + customer.customerstatus_id.name,

                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    var response = httpRequest("/customer", "POST", customer);
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

            if(oldcustomer == null && addvalue == ""){
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

        function fillForm(cus,rowno){
            activerowno = rowno;

            if (oldcustomer==null) {
                filldata(cus);
            } else {
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        filldata(cus);
                    }

                });
            }

        }


        function filldata(cus) {
            clearSelection(tblCustomer);
            selectRow(tblCustomer,activerowno,active);

            customer = JSON.parse(JSON.stringify(cus));
            oldcustomer = JSON.parse(JSON.stringify(cus));

            cusReg.value = customer.regno;
            cusReg.disabled="disabled";
            cusName.value = customer.fullname;
            cusFullname.value = customer.callingname;
            cusNIC.value = customer.nic;
            cusworkdetail.value = customer.workplacedetails;
            cusAddress.value = customer.address;


            if(customer.description == null){
                cusDescription.value = "No Description Added";
                cusDescription.style.border = initial;
            }else {
                cusDescription.value = customer.description;
                cusDescription.style.border = valid;
            }

            cusMobile.value = customer.mobile;
            cusTel.value = customer.telephone;
            // cmbContact.value = customer.contact_media_id;
            cusEmail.value = customer.email;
            assignDate.value = customer.addedate;


            fillCombo(cmbContact,"Select the contact media",contactmedias,"name",customer.contactmedia_id.name);


            fillCombo(cmbAssign,"Select Civil Status",employees,"callingname",customer.employee_id.callingname);
            fillCombo(cmbStatus,"Select the customer status",customerstatus,"name",customer.customerstatus_id.name);



            //setDefaultFile('flePhoto', employee.photo);

            disableButtons(true, false, false);
            setStyle(valid);
            changeTab('form');
        }

        function getUpdates() {

            var updates = "";

            if(customer!=null && oldcustomer!=null) {


                if (customer.regno != oldcustomer.regno)
                    updates = updates + "\nRegister Number is Changed.." +oldcustomer.regno +" into " +customer.regno  ;

                if (customer.fullname != oldcustomer.fullname)
                    updates = updates + "\nFullname is Changed.." + oldcustomer.fullname +" into "+customer.fullname ;

                if (customer.nic != oldcustomer.nic)
                    updates = updates + "\nNIC is Changed.." + oldcustomer.nic + " into "+ customer.nic;

                if (customer.callingname != oldcustomer.callingname)
                    updates = updates + "\nCallingname is Changed.." +oldcustomer.callingname+ " into "+customer.callingname;


                // if (customer.photo != oldcustomer.photo)
                //     updates = updates + "\nPhoto is Changed";

                if (customer.address != oldcustomer.address)
                    updates = updates + "\nAddress is Changed.."+ oldcustomer.address+ " into " +customer.address;

                if (customer.mobile != oldcustomer.mobile)
                    updates = updates + "\nMobile Number is Changed.."+oldcustomer.mobile+ " into "+customer.mobile  ;

                if (customer.telephone != oldcustomer.telephone)
                    updates = updates + "\nLand Number is Changed.."+ oldcustomer.telephone+ " into "+customer.telephone;

                if (customer.workplacedetails != oldcustomer.workplacedetails)
                    updates = updates + "\nWorkplace Details is Changed.."+oldcustomer.workplacedetails+ " into "+customer.workplacedetails ;

                if (customer.email != oldcustomer.email)
                    updates = updates + "\nEmail is Changed.."+oldcustomer.email+ " into "+customer.email;


                if (customer.description != oldcustomer.description)
                    updates = updates + "\nDescription is Changed.."+oldcustomer.description +" into "+customer.description;


                if (customer.contactmedia_id.name != oldcustomer.contactmedia_id.name)
                    updates = updates + "\nDescription is Changed.."+oldcustomer.contactmedia_id.name+" into "+customer.contactmedia_id.name;

                if (customer.customerstatus_id.name != oldcustomer.customerstatus_id.name)
                    updates = updates + "\ncustomerstatus is Changed.."+ oldcustomer.customerstatus_id.name+" into "+customer.customerstatus_id.name;

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
                            var response = httpRequest("/customer", "PUT", customer);
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

        function btnDeleteMC(cus) {
            customer = JSON.parse(JSON.stringify(cus));

            swal({
                title: "Are you sure to delete following customer...?",
                text: "\n Employee Number : " + customer.regno  +
                "\n Employee Fullname : " + customer.fullname,
                icon: "warning", buttons: true, dangerMode: true,
            }).then((willDelete)=> {
                if (willDelete) {
                    var responce = httpRequest("/customer","DELETE",customer);
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