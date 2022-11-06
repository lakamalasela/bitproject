
window.onload = function () {
    valid = "2px solid #28a745";
    invalid = "2px solid #dc3545";
    initial = "1px solid #6c757d";

    $('#sidebar').toggleClass('active');
    $('.viewPara').toggleClass('viewParaNone');

    // console.log(session.getObject("loginuser"));
	if(session.getObject("loginuser") != null){
        loggedUserName = session.getObject("loginuser").loginusername;
        loggedUser = httpRequest("/user/getuser/"+loggedUserName , "GET" );
        session.setObject('activeuser', loggedUser);

        if(loggedUser.employeeId != undefined){
            if(loggedUser.employeeId.photo != null) {
                profileImage.src = atob(loggedUser.employeeId.photo);
            }
            else{
                profileImage.src = 'resources/image/user_1.jpg';
            }
            lblLogUser.innerHTML = loggedUser.userName;
            loadchangepassword();
            spnDesignation.innerHTML = loggedUser.employeeId.designationId.name;
        }else {
            window.location.href = "http://localhost:8080/login";
        }
    }else
		 window.location.href = "http://localhost:8080/login";



	// Module desabled
    if(session.getObject("activeuser").employeeId.id !=1) {//admin nowana kenek da kiyla balanwa

        //userta permission thiyana modules list eka gnnwa
        usermodulelist = httpRequest("../module/listbyuser?userid=" + session.getObject("activeuser").id, "GET");

        //all modules tika genna gnnwa
        allmodule = httpRequest("../module/list", "GET");

        //listcompare function ekta pass krnwa userta privileges thiyena modules tikai all modules tikai,ee tikee id ekai name ekai list ekak wedihata genna gnnwa privileges nathi modules wla
        dislist = listCompera(allmodule,usermodulelist,"id","name");
        // console.log(dislist);
        for (x in dislist) {
            mname = dislist[x].name;//module name
           var lielement =  document.getElementById(mname);//ee modules name yatathee thiyena ids tika balnwa
           if(lielement != null)//ee wage elements thiyenawa nm
            document.getElementById(mname).remove();//ee elements remove krnwa

            var divelement =  document.getElementsByClassName(mname);//ee moudles name yatathee class names tika blnwa
            if(divelement.length != 0)
                for(var i =0;i<divelement.length;i++){
                    divelement[i].style.display = "none";//one by one chack kra kra eeka display none krnwa
                }


        }
    }


    // $('#dismiss, .overlay').on('click', function () {
    //     $('#sidebar').removeClass('active');
    //     $('.overlay').removeClass('active');
    // });

    $('#sidebarCollapse').on('click', function () {

        $('#sidebar').toggleClass('active');


        $('.viewPara').toggleClass('viewParaNone');





        // $('#sidebar').addClass('active');
        // $('.overlay').addClass('active');
        // $('.collapse.in').toggleClass('in');
        // $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    // $('#sidebarCollapse').off('click', function () {
    //
    //
    //     $('.viewPara').css('display', 'none');
    //     // $('.viewPara').addClass('active');
    //
    //
    // });


}

function btnSignoutMC() {
    swal({
        title: "Do you want to sign out?",
        text: " ",
        icon: "warning",
        buttons: true,
        closeOnClickOutside: false
    }).then((willDelete) => {
        if (willDelete) {
            swal({
                title: "Sign Out Successful",
                text: " ",
                icon: "success",
                timer: 1500,
                buttons: false,
                closeOnClickOutside: false
            }).then(() => {
                window.location.assign('/logout');
            });

        }
    });
}



function loadchangepassword() {
    changePassword = new Object();
    oldChangePassword = null;

    changePassword.username = session.getObject('activeuser').userName;

    txtUsernameView.innerHTML = changePassword.username;
    txtCurrentPassword.value = "";
    txtNewPassword.value = "";
    txtConfirmPassword.value = "";
}

function getErrors() {
    var errors = "";

    if (txtCurrentPassword.value == "") {
        errors = errors + "\n" + "Current password is not entered";
        txtCurrentPassword.style.border = invalid;
    }

    if (txtNewPassword.value == "") {
        errors = errors + "\n" + "New password is not entered";
        txtNewPassword.style.border = invalid;
    }

    if (txtConfirmPassword.value == 0) {
        errors = errors + "\n" + "Confirm password is not entered";
        txtConfirmPassword.style.border = invalid;
    }

    return errors;
}

function btnSaveChangePasswordMC() {
    var errors = getErrors();
    if (errors == "") {
        swal({
            title: "Are you sure to change password of following user?",
            text: "Username : " + changePassword.username,
            icon: "warning",
            buttons: true,
            closeOnClickOutside: false
        }).then((willDelete) => {
            if (willDelete) {
               // var response = httpRequest("/changepassword", "POST", changePassword);
                var response = "0";
                if (response == "0") {
                    swal({
                        title: "Saved Successfully",
                        text: " System Going to Logout",
                        icon: "success",
                        timer: 1500,
                        buttons: false,
                        closeOnClickOutside: false
                    }).then(() => {

                        window.location.assign('/logout');
                    });
                } else {
                    swal({
                        title: "Failed to change password",
                        text: "Response - " + response,
                        icon: "error",
                        closeOnClickOutside: false
                    });
                }
            }
        });
    } else {
        // Error Message - Invalid Data or Empty Fields
        swal({
            title: "Failed to add",
            text: "Please fill in all required fields with valid data",
            icon: "error",
            closeOnClickOutside: false
        });
    }
}