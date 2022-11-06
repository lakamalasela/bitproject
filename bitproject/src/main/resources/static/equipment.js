

 

        window.addEventListener("load", initialize);

        //Initializing Functions

        function initialize() {

            $('[data-toggle="tooltip"]').tooltip()

            btnAdd.addEventListener("click",btnAddMC);
            btnClear.addEventListener("click",btnClearMC);
            btnUpdate.addEventListener("click",btnUpdateMC);

            // dteDOBirth.onchange = dteDOBirthCH;
            txtSearchName.addEventListener("keyup",btnSearchMC);

            privilages = httpRequest("../privilage?module=EMPLOYEE","GET");

            eqcategories = httpRequest("../eqcategory/list","GET");
            eqownby  = httpRequest("../eqownby/list","GET");
            eqstatus  = httpRequest("../eqstatus/list","GET");

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
            equipments = new Array();
          var data = httpRequest("/equipment/findAll?page="+page+"&size="+size+query,"GET");
            if(data.content!= undefined) equipments = data.content;
            createPagination('pagination',data.totalPages, data.number+1,paginate);
            fillTable('tblEquipment',equipments,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblEquipment);

            if(activerowno!="")selectRow(tblEquipment,activerowno,active);

        }

        function paginate(page) {

            checkerr = getErrors();

            if(oldequipment == null && addvalue == ""){

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

        function viewitem(eq,rowno) {

            viewequipment = JSON.parse(JSON.stringify(eq));

            tdeqcode.innerHTML = viewequipment.equipmentcode;
            tdeqcat.innerHTML = viewequipment.equipmentcategory_id.name;
            tdeqname.innerHTML = viewequipment.equipmentname;
            tdeqownby.innerHTML = viewequipment.equipmentownby_id.name;


            if(viewequipment.description == null){
                tdeqdescription.innerHTML = "<p style='color: red;font-size: 15px;'>No Description Added</p>"
            }else{
                tdeqdescription.innerHTML = viewequipment.description;
            }
            tdeqstatus.innerHTML = viewequipment.equipmentstatus_id.name;
            tdeqaddeddate.innerHTML = viewequipment.addeddate;
            tdeqaddedby.innerHTML = viewequipment.employee_id.callingname;



            // if(employee.photo==null)
            //     tdphoto.src= 'resourse/image/noimage.png';
            //  else
            // tdphoto.src = atob(employee.photo);


            $('#dataviewModal').modal('show');


         }

         function btnPrintRowMC(){

             var format = printformtable.outerHTML;
             //
             // var newwindow=window.open();
             // newwindow.document.write("<html>" +
             //     "<head><style type='text/css'>.google-visualization-table-th {text-align: left;}</style>" +
             //     "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/>" +
             //     "</head>" +
             //
             //     "<body><div style='margin-top: 150px'><h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Equipment Details :</span> </h1></div>" +
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
                 "</address></div></div></di><hr> <h1>Equipment Details :</h1></div>" +
                 "<div>"+format+"</div>" +
                 "<script>printformtable.removeAttribute('style')</script>" +
                 "</body></html>");
             setTimeout(function () {newwindow.print(); newwindow.close();},100);

         }

        function loadForm() {
            equipment = new Object();
            oldequipment= null;
            //
             fillCombo(cmdeqcategory,"Select the Eq_Category",eqcategories,"name","");
             fillCombo(cmdeqownby,"Select Eq_Own By",eqownby,"name","");
             fillCombo(cmdAdded,"Select the Added By",employees,"callingname",session.getObject('activeuser').employeeId.callingname);
             fillCombo(cmdeqStatus,"Select the Equipment Status",eqstatus,"name","Active");
            //
            // //  fillCombo(cmbEmployeestatus,"",employeestatuses,"name","Working");
             equipment.employee_id = JSON.parse(cmdAdded.value);
             cmdAdded.disabled = true;
            //
            equipment.equipmentstatus_id=JSON.parse(cmdeqStatus.value);
             cmdeqStatus.disabled = true;


             var today = new Date();
             var month = today.getMonth()+1;
             if(month<10) month = "0"+month;
             var date = today.getDate();
             if(date<10) date = "0"+date;

            addedDate.value=today.getFullYear()+"-"+month+"-"+date;
            equipment.addeddate=addedDate.value;
            addedDate.disabled = true;
            //
            // // Get Next Number Form Data Base
            // var nextNumber = httpRequest("/employee/nextNumber", "GET");
            // txtNumber.value = nextNumber.number;
            // employee.number = txtNumber.value;
            //  txtNumber.disabled="disabled";

            var nextnumber = httpRequest("../equipment/nextnumber","GET");
            equipmentcode.value = nextnumber.equipmentcode;
            equipment.equipmentcode =  equipmentcode.value
            equipmentcode.disabled = true;
            equipmentcode.style.border = valid;

            //set empty value
           // equipmentcode.value = "";
            //cmdeqcategory.value = "";
            equipmentname.value = "";
            txtQuantity.value = "";

            eqdescription.value = "";


            //
            //
             setStyle(initial);
             addedDate.style.border=valid;
            //  removeFile('flePhoto');
            //
            //  setStyle(initial);
            cmdeqStatus.style.border=valid;
             cmdAdded.style.border=valid;
            //  dteDOAssignment.style.border=valid;
            // txtNumber.style.border=valid;
            //
            disableButtons(false, true, true);
        }

        function setStyle(style) {

            //equipmentcode.style.border = style;
            cmdeqcategory.style.border = style;
            equipmentname.style.border = style;
            txtQuantity.style.border = style;
            cmdeqownby.style.border = style;
            // eqdescription.style.border = style;
            cmdeqStatus.style.border = style;
            cmdAdded.style.border = style;


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
            for(index in equipments){
                if(equipments[index].equipmentstatus_id.name =="Deleted"){
                    tblEquipment.children[1].children[index].style.color = "#f00";
                    tblEquipment.children[1].children[index].style.border = "2px solid red";
                    tblEquipment.children[1].children[index].lastChild.children[1].disabled = true;
                    tblEquipment.children[1].children[index].lastChild.children[1].style.cursor = "not-allowed";

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


            if (equipment.equipmentcode == null) {
                equipmentcode.style.border = invalid;
                errors = errors + "\n" + "Equipment Code not Entered";

            }else  addvalue = 1;

            if(equipment.equipmentcategory_id ==null){
                cmdeqcategory.style.border = invalid;
                errors = errors + "\n" + "Equipment Category not Entered";
            }else{
                addvalue = 1;
            }

            if (equipment.equipmentname == null){
                equipmentname.style.border = invalid;
                errors = errors + "\n" + "Equipment Name not Entered";
            }
            else  addvalue = 1;

            if (equipment.quantity == null){
                txtQuantity.style.border = invalid;
                errors = errors + "\n" + "Equipment Quantity";
            }
            else  addvalue = 1;


            if (equipment.equipmentownby_id == null){
                cmdeqownby.style.border = invalid;
                errors = errors + "\n" + "Equipment Own By not Selected";
            }
            else  addvalue = 1;

            if (equipment.equipmentstatus_id == null){
                cmdeqStatus.style.border = invalid;
                errors = errors + "\n" + "Equipment Status not Selected";
            }

            else  addvalue = 1;


            if (equipment.addeddate == null){
                addedDate.style.border = invalid;
                errors = errors + "\n" + "Equipment Added Date not Entered";
            }

            else  addvalue = 1;

            if (equipment.employee_id == null){
                cmdAdded.style.border = invalid;
                errors = errors + "\n" + "Equipment Added By not Selected";
            }

            else  addvalue = 1;



            return errors;

        }

        function btnAddMC(){
            if(getErrors()==""){
                if(eqdescription.value==""){
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
                title: "Are you sure to add following Equipment...?" ,
                text :  "\nEquipment Code : " + equipment.equipmentcode +
                    "\nEquipment Category : " + equipment.equipmentcategory_id.name +
                    "\nEquipment Name : " + equipment.equipmentname +

                "\nEquipment Name : " +  equipment.quantity+

                    "\nEquipment Own By : " + equipment.equipmentownby_id.name +
                    "\nEquipment Status : " + equipment.equipmentstatus_id.name +
                    "\nEquipment Added Date : " + equipment.addeddate +
                    "\nEquipment Added By : " + equipment.employee_id.callingname,


                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    var response = httpRequest("/equipment", "POST", equipment);
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

            if(oldequipment == null && addvalue == ""){
                loadForm();
            }else{
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        loadForm();
                        eqdescription.style.border = initial;
                    }

                });
            }

        }

        function fillForm(eq,rowno){
            activerowno = rowno;

            if (oldequipment==null) {
                filldata(eq);
            } else {
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        filldata(eq);
                    }

                });
            }

        }


        function filldata(eq) {
            clearSelection(tblEquipment);
            selectRow(tblEquipment,activerowno,active);

            equipment = JSON.parse(JSON.stringify(eq));
            oldequipment = JSON.parse(JSON.stringify(eq));

            equipmentcode.value = equipment.equipmentcode;
            equipmentcode.disabled="disabled";

            equipmentname.value = equipment.equipmentname;

            txtQuantity.value = equipment.quantity;
            txtQuantity.style.border = valid;


            if(equipment.description == null){
                eqdescription.value = "No Description Added";
                eqdescription.style.border = initial;
            }else {
                eqdescription.value = equipment.description;
                eqdescription.style.border = valid;
            }


            // cmbContact.value = customer.contact_media_id;

            addedDate.value = equipment.addeddate;

            fillCombo(cmdeqcategory,"Select the Equipment Category",eqcategories,"name",equipment.equipmentcategory_id.name);
            fillCombo(cmdeqownby,"Select Equipment Own By",eqownby,"name",equipment.equipmentownby_id.name);
            fillCombo(cmdAdded,"Select the Added By",employees,"callingname",equipment.employee_id.callingname);
            fillCombo(cmdeqStatus,"Select the Equipment Status",eqstatus,"name",equipment.equipmentstatus_id.name);


            //setDefaultFile('flePhoto', employee.photo);

            disableButtons(true, false, false);
            setStyle(valid);
            //changeTab('form');
        }

        function getUpdates() {

            var updates = "";

            if(equipment!=null && oldequipment!=null) {


                if (equipment.equipmentcode != oldequipment.equipmentcode)
                    updates = updates + "\nEquipment Code is Changed.." +oldequipment.equipmentcode+" into " +equipment.equipmentcode  ;

                if (equipment.equipmentcategory_id.name != oldequipment.equipmentcategory_id.name)
                    updates = updates + "\nEquipment Category is Changed.." + oldequipment.equipmentcategory_id.name +" into "+equipment.equipmentcategory_id.name ;

                if (equipment.equipmentname != oldequipment.equipmentname)
                    updates = updates + "\nEquipment Name is Changed.." + oldequipment.equipmentname + " into "+ equipment.equipmentname;

                if (equipment.equipmentownby_id.name != oldequipment.equipmentownby_id.name)
                    updates = updates + "\nEquipment Own By is Changed.." +oldequipment.equipmentownby_id.name+ " into "+equipment.equipmentownby_id.name;


                // if (equipment.photo != oldequipment.photo)
                //     updates = updates + "\nPhoto is Changed";

                if (equipment.description != oldequipment.description)
                    updates = updates + "\nEquipment Description is Changed.."+ oldequipment.description+ " into " +equipment.description;

                if (equipment.equipmentstatus_id.name != oldequipment.equipmentstatus_id.name)
                    updates = updates + "\nEquipment Status is Changed.."+oldequipment.equipmentstatus_id.name+ " into "+equipment.equipmentstatus_id.name  ;

                if (equipment.addeddate != oldequipment.addeddate)
                    updates = updates + "\nEquipment Date is Changed.."+ oldequipment.addeddate+ " into "+equipment.addeddate;

                if (equipment.employee_id.callingname!= oldequipment.employee_id.callingname)
                    updates = updates + "\nEquipment Added By is Changed.."+oldequipment.employee_id.callingname+ " into "+equipment.employee_id.callingname ;



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
                        title: "Are you sure to update following Equipment details...?",
                        text: "\n"+ updates,
                        icon: "warning", buttons: true, dangerMode: true,
                    })
                        .then((willDelete) => {
                        if (willDelete) {
                            var response = httpRequest("/equipment", "PUT", equipment);
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
                                //changeTab('table');

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

        function btnDeleteMC(eq) {
            equipment = JSON.parse(JSON.stringify(eq));

            swal({
                title: "Are you sure to delete following Equipment...?",
                text: "\n Employee Number : " + equipment.equipmentcode  +
                "\n Employee Fullname : " + equipment.equipmentcategory_id.name ,
                icon: "warning", buttons: true, dangerMode: true,
            }).then((willDelete)=> {
                if (willDelete) {
                    var responce = httpRequest("/equipment","DELETE",equipment);
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

       function btnPrintTableMC(equipment) {

            var newwindow=window.open();
            formattab = tblEquipment.outerHTML;

           newwindow.document.write("" +
                "<html>" +
                "<head><style type='text/css'>.google-visualization-table-th {text-align: left;} .modifybutton{display: none} .isort{display: none}</style>" +
                "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/></head>" +
                "<body><div style='margin-top: 150px; '> <h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Equipment Details :</span></h1></div>" +
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
        function EqNameBinder(){
            var val = equipmentname.value.trim();


            if(val !=""){

                var regpattern = new RegExp('^.*$');
                if(regpattern.test(val)){

                    var response = httpRequest("equipment/byeqname?eqname="+val,"GET")
                    console.log(response);
                    if(response == ""){
                        equipment.equipmentname = val;
                        if(oldequipment !=null && equipment.equipmentname != oldequipment.equipmentname){
                            equipmentname.style.border = updated;
                        }else{
                            equipmentname.style.border = valid;
                        }


                    }else{
                        swal({
                            title: "Equipment Name All Ready Exist....!",
                            text: "\n\n",
                            icon: "warning", button: false,timer:1500
                        });
                        equipmentname.value = "";
                        equipment.equipmentname = null;
                        equipmentname.style.border = initial;


                    }

                }else{
                    equipmentname.style.border = invalid;
                    equipment.equipmentname = null;
                }
            }else{
                if(equipmentname.required){
                    equipmentname.style.border = invalid;
                }else{
                    equipmentname.style.border = initial;
                }
                equipment.equipmentname = null;
            }
        }