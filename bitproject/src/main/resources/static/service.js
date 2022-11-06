window.addEventListener("load", initialize);

//Initializing Functions

function initialize() {

    $('[data-toggle="tooltip"]').tooltip()

    btnAdd.addEventListener("click", btnAddMC);
    btnClear.addEventListener("click", btnClearMC);
    btnUpdate.addEventListener("click", btnUpdateMC);

    // dteDOBirth.onchange = dteDOBirthCH;
    txtSearchName.addEventListener("keyup", btnSearchMC);

    privilages = httpRequest("../privilage?module=EMPLOYEE", "GET");

    servicetype = httpRequest("../servicetype/list", "GET");
    servicestatus = httpRequest("../servicestatus/list", "GET");
    // eqstatus  = httpRequest("../eqstatus/list","GET");

    employees = httpRequest("../employee/list", "GET");

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
    txtSearchName.value = "";
    txtSearchName.style.background = "";

    //Table Area
    activerowno = "";
    activepage = 1;
    var query = "&searchtext=";
    loadTable(1, cmbPageSize.value, query);
}

function loadTable(page, size, query) {
    page = page - 1;
    services = new Array();
    var data = httpRequest("/service/findAll?page=" + page + "&size=" + size + query, "GET");
    if (data.content != undefined) services = data.content;
    createPagination('pagination', data.totalPages, data.number + 1, paginate);
    fillTable('tblService', services, fillForm, btnDeleteMC, viewitem);
    clearSelection(tblService);

    if (activerowno != "") selectRow(tblService, activerowno, active);

}

function paginate(page) {


    checkerr = getErrors();

    if (oldservice == null && addvalue == "") {
        activepage = page;
        activerowno = ""
        loadSearchedTable();
        loadForm();

    } else {
        swal({
            title: "Form has some values, updates values... Are you sure to discard the form ?",
            text: "\n",
            icon: "warning", buttons: true, dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                activepage = page;
                activerowno = ""
                loadSearchedTable();
                loadForm();

            }

        });
    }


}

function viewitem(ser, rowno) {

    viewservice = JSON.parse(JSON.stringify(ser));

    tdserno.innerHTML = viewservice.serviceno;
    tdsertype.innerHTML = viewservice.servicetype_id.name;
    tdsername.innerHTML = viewservice.servicename;
    tdsercharge.innerHTML = parseFloat(viewservice.servicecharge).toFixed(2);



    if (viewservice.description == null) {
        tdserdescription.innerHTML = "<p style='color: red;font-size: 15px;'>No Description Added</p>"
    } else {
        tdserdescription.innerHTML = viewservice.description;
    }
    tdserstatus.innerHTML = viewservice.servicestatus_id.name;
    tdseraddeddate.innerHTML = viewservice.addeddate;
    tdseraddedby.innerHTML = viewservice.employee_id.callingname;


    // if(employee.photo==null)
    //     tdphoto.src= 'resourse/image/noimage.png';
    //  else
    // tdphoto.src = atob(employee.photo);


    $('#dataviewModal').modal('show');


}

function btnPrintRowMC() {

    var format = printformtable.outerHTML;

    // var newwindow = window.open();
    // newwindow.document.write("<html>" +
    //     "<head><style type='text/css'>.google-visualization-table-th {text-align: left;}</style>" +
    //     "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/>" +
    //     "</head>" +
    //     "<body><div style='margin-top: 150px'><h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Service Details :</span> </h1></div>" +
    //     "<div>" + format + "</div>" +
    //     "<script>printformtable.removeAttribute('style')</script>" +
    //     "</body></html>");
    // setTimeout(function () {
    //     newwindow.print();
    //     newwindow.close();
    // }, 100);
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
        "</address></div></div></di><hr> <h1>Main Service Details :</h1></div>" +
        "<div>"+format+"</div>" +
        "<script>printformtable.removeAttribute('style')</script>" +
        "</body></html>");
    setTimeout(function () {newwindow.print(); newwindow.close();},100);


}

function loadForm() {
    service = new Object();
    oldservice = null;
    //
    fillCombo(cmbType, "Select the Service Type", servicetype, "name", "");
    fillCombo(cmbserStatus, "Select the Service Status", servicestatus, "name", "Active");
    fillCombo(cmbAssign, "Select the Added By", employees, "callingname", session.getObject('activeuser').employeeId.callingname);

    //
    // //  fillCombo(cmbEmployeestatus,"",employeestatuses,"name","Working");
    service.employee_id = JSON.parse(cmbAssign.value);
    cmbAssign.disabled = true;
    //
    service.servicestatus_id = JSON.parse(cmbserStatus.value);
    cmbserStatus.style.border = valid;
    cmbserStatus.disabled = true;


    addedDate.value = getCurrentDateTime('date');
    service.addeddate = addedDate.value;
    addedDate.disabled = true;
    addedDate.style.border = valid;
    //  var today = new Date();
    //  var month = today.getMonth()+1;
    //  if(month<10) month = "0"+month;
    //  var date = today.getDate();
    //  if(date<10) date = "0"+date;
    //
    // addedDate.value=today.getFullYear()+"-"+month+"-"+date;
    // equipment.addeddate=addedDate.value;
    // addedDate.disabled = true;
    //
    serDescription.style.border = initial;

     // Get Next Number Form Data Base
     var nextNumber = httpRequest("/service/nextnumber", "GET");
     serNo.value = nextNumber.serviceno;
     service.serviceno = serNo.value;
     serNo.disabled="disabled";
     serNo.style.border = valid;

    // var nextnumber = httpRequest("../equipment/nextnumber","GET");
    // equipmentcode.value = nextnumber.equipmentcode;
    // equipment.equipmentcode =  equipmentcode.value
    // equipmentcode.disabled = true;
    // equipmentcode.style.border = valid;

    //set empty value
    //serNo.value = "";
    serName.value = "";
    serCharge.value = "";
    serDescription.value = "";
    //
    // eqdescription.value = "";


    //
    //
    setStyle(initial);
    // addedDate.style.border=valid;
    //  removeFile('flePhoto');
    //
    //  setStyle(initial);
    // cmdeqStatus.style.border=valid;
    //  cmdAdded.style.border=valid;
    //  dteDOAssignment.style.border=valid;
    // txtNumber.style.border=valid;
    //
    disableButtons(false, true, true);
}

function setStyle(style) {

    //equipmentcode.style.border = style;
    cmbType.style.border = style;
    serName.style.border = style;
    serCharge.style.border = style;
    // eqdescription.style.border = style;
    //serDescription.style.border = style;
    //cmbserStatus.style.border = style;



}

function disableButtons(add, upd, del) {

    if (add || !privilages.add) {
        btnAdd.setAttribute("disabled", "disabled");
        $('#btnAdd').css('cursor', 'not-allowed');
    } else {
        btnAdd.removeAttribute("disabled");
        $('#btnAdd').css('cursor', 'pointer')
    }

    if (upd || !privilages.update) {
        btnUpdate.setAttribute("disabled", "disabled");
        $('#btnUpdate').css('cursor', 'not-allowed');
    } else {
        btnUpdate.removeAttribute("disabled");
        $('#btnUpdate').css('cursor', 'pointer');
    }

    if (!privilages.update) {
        $(".buttonup").prop('disabled', true);
        $(".buttonup").css('cursor', 'not-allowed');
    } else {
        $(".buttonup").removeAttr("disabled");
        $(".buttonup").css('cursor', 'pointer');
    }

    if (!privilages.delete) {
        $(".buttondel").prop('disabled', true);
        $(".buttondel").css('cursor', 'not-allowed');
    } else {
        $(".buttondel").removeAttr("disabled");
        $(".buttondel").css('cursor', 'pointer');
    }

    // select deleted data row
    for (index in services) {
        if (services[index].servicestatus_id.name == "Deleted") {
            tblService.children[1].children[index].style.color = "#f00";
            tblService.children[1].children[index].style.border = "2px solid red";
            tblService.children[1].children[index].lastChild.children[1].disabled = true;
            tblService.children[1].children[index].lastChild.children[1].style.cursor = "not-allowed";

        }
    }

}

function nicTestFieldBinder(field, pattern, ob, prop, oldob) {
    var regpattern = new RegExp(pattern);

    var val = field.value.trim();
    if (regpattern.test(val)) {
        var dobyear, gendername, noOfDays = "";
        if (val.length === 10) {
            dobyear = "19" + val.substring(0, 2);
            noOfDays = val.substring(2, 5);
        } else {
            dobyear = val.substring(0, 4);
            noOfDays = val.substring(4, 7);
        }
        birthdate = new Date(dobyear + "-" + "01-01");
        if (noOfDays >= 1 && noOfDays <= 366) {
            gendername = "Male";
        } else if (noOfDays >= 501 && noOfDays <= 866) {
            noOfDays = noOfDays - 500;
            gendername = "Female";
        }
        if (gendername === "Female" || gendername === "Male") {
            fillCombo(cmbGender, "Select Gender", genders, "name", gendername);
            birthdate.setDate(birthdate.getDate() + parseInt(noOfDays) - 1)
            dteDOBirth.value = birthdate.getFullYear() + "-" + getmonthdate(birthdate);

            employee.genderId = JSON.parse(cmbGender.value);
            employee.dobirth = dteDOBirth.value;
            employee.nic = field.value;
            if (oldemployee != null && oldemployee.nic != employee.nic) {
                field.style.border = updated;
            } else {
                field.style.border = valid;
            }
            if (oldemployee != null && oldemployee.dobirth != employee.dobirth) {
                dteDOBirth.style.border = updated;
            } else {
                dteDOBirth.style.border = valid;
            }
            if (oldemployee != null && oldemployee.genderId.name != employee.genderId.name) {
                cmbGender.style.border = updated;
            } else {
                cmbGender.style.border = valid;
            }
            dteDOBirthCH();
        } else {
            field.style.border = invalid;
            cmbGender.style.border = initial;
            dteDOBirth.style.border = initial;
            fillCombo(cmbGender, "Select Gender", genders, "name", "");
            dteDOBirth.value = "";
            employee.nic = null;
        }
    } else {
        field.style.border = invalid;
        employee.nic = null;
    }

}

function nicFieldBinder(field, pattern, ob, prop, oldob) {
    var regpattern = new RegExp(pattern);

    var val = field.value.trim();
    if (regpattern.test(val)) {
        employee.nic = val;
        if (oldemployee != null && oldemployee.nic != employee.nic) {
            field.style.border = updated;
            gender = generate(val, field, cmbGender, dteDOBirth);
            fillCombo(cmbGender, "Select Gender", genders, "name", gender);
            cmbGender.style.border = updated;
            dteDOBirth.style.border = updated;
            employee.genderId = JSON.parse(cmbGender.value);
            employee.dobirth = dteDOBirth.value;
        } else {
            field.style.border = valid;
            gender = generate(val, field, cmbGender, dteDOBirth);
            fillCombo(cmbGender, "Select Gender", genders, "name", gender);
            cmbGender.style.border = valid;
            dteDOBirth.style.border = valid;
            employee.genderId = JSON.parse(cmbGender.value);
            employee.dobirth = dteDOBirth.value;
        }
    } else {
        field.style.border = invalid;
        employee.nic = null;
    }
}

function dteDOBirthCH() {
    var today = new Date();
    var birthday = new Date(dteDOBirth.value);
    if ((today.getTime() - birthday.getTime()) > (18 * 365 * 24 * 3600 * 1000)) {
        employee.dobirth = dteDOBirth.value;
        dteDOBirth.style.border = valid;
    } else {
        employee.dobirth = null;
        dteDOBirth.style.border = invalid;
    }
}

function getErrors() {

    var errors = "";
    addvalue = "";


    if (service.serviceno == null) {
        serNo.style.border = invalid;
        errors = errors + "\n" + "Service Number not Entered";

    } else addvalue = 1;

    if (service.servicetype_id == null) {
        cmbType.style.border = invalid;
        errors = errors + "\n" + "Service Tylpe not Selected";
    } else {
        addvalue = 1;
    }

    if (service.servicename == null) {
        serName.style.border = invalid;
        errors = errors + "\n" + "Service Name not Entered";
    } else addvalue = 1;


    if (service.servicecharge == null) {
        serCharge.style.border = invalid;
        errors = errors + "\n" + "Service Charge not Selected";
    } else addvalue = 1;

    if (service.addeddate == null) {
        addedDate.style.border = invalid;
        errors = errors + "\n" + "Service Date not Selected";
    } else addvalue = 1;


    if (service.servicestatus_id == null) {
        cmbserStatus.style.border = invalid;
        errors = errors + "\n" + "Service Status not Selected";
    } else addvalue = 1;

    if (service.employee_id == null) {
        cmbAssign.style.border = invalid;
        errors = errors + "\n" + "Service Added By not Selected";
    } else addvalue = 1;


    return errors;

}

function btnAddMC() {
    if (getErrors() == "") {
        if (serDescription.value == "") {
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

        } else {
            savedata();
        }
    } else {
        swal({
            title: "You have following errors",
            text: "\n" + getErrors(),
            icon: "error",
            button: true,
        });

    }
}

function savedata() {

    swal({
        title: "Are you sure to add following Service...?",
        text: "\nservice Code : " + service.serviceno +
            "\nservice Category : " + service.servicetype_id.name +
            "\nservice Name : " + service.servicename +

            "\nservice Own By : " + service.servicecharge +
            "\nservice Status : " + service.servicestatus_id.name +
            "\nservice Added Date : " + service.addeddate +
            "\nservice Added By : " + service.employee_id.callingname,


        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            var response = httpRequest("/service", "POST", service);
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
            } else swal({
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

    if (oldservice == null && addvalue == "") {
        loadForm();
    } else {
        swal({
            title: "Form has some values, updates values... Are you sure to discard the form ?",
            text: "\n",
            icon: "warning", buttons: true, dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                loadForm();
            }

        });
    }

}

function fillForm(ser, rowno) {
    activerowno = rowno;

    if (oldservice == null) {
        filldata(ser);
    } else {
        swal({
            title: "Form has some values, updates values... Are you sure to discard the form ?",
            text: "\n",
            icon: "warning", buttons: true, dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                filldata(ser);
            }

        });
    }

}


function filldata(ser) {
    clearSelection(tblService);
    selectRow(tblService, activerowno, active);

    service = JSON.parse(JSON.stringify(ser));
    oldservice = JSON.parse(JSON.stringify(ser));

    serNo.value = service.serviceno;
    serNo.disabled = "disabled";

    serName.value = service.servicename;
    serCharge.value =parseFloat( service.servicecharge).toFixed(2);


    if (service.description == null) {
        serDescription.value = "No Description Added";
        serDescription.style.border = initial;
    } else {
        serDescription.value = service.description;
        serDescription.style.border = valid;
    }


    // cmbContact.value = customer.contact_media_id;

    addedDate.value = service.addeddate;

    fillCombo(cmbType, "Select the Service Type", servicetype, "name", service.servicetype_id.name);
    fillCombo(cmbserStatus, "Select the Service Status", servicestatus, "name", service.servicestatus_id.name);
    fillCombo(cmbAssign, "Select the Added By", employees, "callingname", service.employee_id.callingname);


    //setDefaultFile('flePhoto', employee.photo);

    disableButtons(true, false, false);
    setStyle(valid);
    //changeTab('form');
}

function getUpdates() {

    var updates = "";

    if (service != null && oldservice != null) {


        if (service.serviceno != oldservice.serviceno)
            updates = updates + "\nservice Number is Changed.." + oldservice.serviceno + " into " + service.serviceno;

        if (service.servicetype_id.name != oldservice.servicetype_id.name)
            updates = updates + "\nservice Type is Changed.." + oldservice.servicetype_id.name + " into " + service.servicetype_id.name;

        if (service.servicename != oldservice.servicename)
            updates = updates + "\nservice Name is Changed.." + oldservice.servicename + " into " + service.servicename;

        if (service.servicecharge != oldservice.servicecharge)
            updates = updates + "\nservice Charge is Changed.." + oldservice.servicecharge + " into " + service.servicecharge;


        // if (service.photo != oldservice.photo)
        //     updates = updates + "\nPhoto is Changed";

        if (service.description != oldservice.description)
            updates = updates + "\nservice Description is Changed.." + oldservice.description + " into " + service.description;

        if (service.servicestatus_id.name != oldservice.servicestatus_id.name)
            updates = updates + "\nservice Status is Changed.." + oldservice.servicestatus_id.name + " into " + service.servicestatus_id.name;

        if (service.addeddate != oldservice.addeddate)
            updates = updates + "\nservice Date is Changed.." + oldservice.addeddate + " into " + service.addeddate;

        if (service.employee_id.callingname != oldservice.employee_id.callingname)
            updates = updates + "\nservice Added By is Changed.." + oldservice.employee_id.callingname + " into " + equipment.employee_id.callingname;


    }

    return updates;

}

function btnUpdateMC() {
    var errors = getErrors();
    if (errors == "") {
        var updates = getUpdates();
        if (updates == "")
            swal({
                title: 'Nothing Updated..!', icon: "warning",
                text: '\n',
                button: false,
                timer: 1200
            });
        else {
            swal({
                title: "Are you sure to update following Service details...?",
                text: "\n" + updates,
                icon: "warning", buttons: true, dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        var response = httpRequest("/service", "PUT", service);
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

                        } else
                            swal({
                                title: "Failed to add...!", icon: "error",
                                text: 'You have following errors\n' + response,
                                buttons: true
                            });
                    }
                });
        }
    } else
        swal({
            title: 'You have following errors in your form', icon: "error",
            text: '\n ' + getErrors(),
            button: true
        });

}

function btnDeleteMC(ser) {
    service = JSON.parse(JSON.stringify(ser));

    swal({
        title: "Are you sure to delete following Service...?",
        text: "\n Service Number : " + service.serviceno +
            "\n Service Type : " + service.servicetype_id.name,
        icon: "warning", buttons: true, dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            var responce = httpRequest("/service", "DELETE", service);
            if (responce == 0) {
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

    var query = "&searchtext=";

    if (searchtext != "")
        query = "&searchtext=" + searchtext;
    //window.alert(query);
    loadTable(activepage, cmbPageSize.value, query);

}

function btnSearchMC() {
    activepage = 1;
    loadSearchedTable();
}

function btnSearchClearMC() {
    loadView();
}

function btnPrintTableMC(service) {

    var newwindow = window.open();
    formattab = tblService.outerHTML;

    newwindow.document.write("" +
        "<html>" +
        "<head><style type='text/css'>.google-visualization-table-th {text-align: left;} .modifybutton{display: none} .isort{display: none}</style>" +
        "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/></head>" +
        "<body><div style='margin-top: 150px; '> <h1><img class='cnew' src='../resources/image/cnew.jpg'><span>Service Details :</span></h1></div>" +
        "<div>" + formattab + "</div>" +
        "</body>" +
        "</html>");
    setTimeout(function () {
        newwindow.print();
        newwindow.close();
    }, 100);
}

function sortTable(cind) {
    cindex = cind;

    var cprop = tblEmployee.firstChild.firstChild.children[cindex].getAttribute('property');

    if (cprop.indexOf('.') == -1) {
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
    } else {
        employees.sort(
            function (a, b) {
                if (a[cprop.substring(0, cprop.indexOf('.'))][cprop.substr(cprop.indexOf('.') + 1)] < b[cprop.substring(0, cprop.indexOf('.'))][cprop.substr(cprop.indexOf('.') + 1)]) {
                    return -1;
                } else if (a[cprop.substring(0, cprop.indexOf('.'))][cprop.substr(cprop.indexOf('.') + 1)] > b[cprop.substring(0, cprop.indexOf('.'))][cprop.substr(cprop.indexOf('.') + 1)]) {
                    return 1;
                } else {
                    return 0;
                }
            }
        );
    }
    fillTable('tblEmployee', employees, fillForm, btnDeleteMC, viewitem);
    clearSelection(tblEmployee);
    loadForm();

    if (activerowno != "") selectRow(tblEmployee, activerowno, active);


}