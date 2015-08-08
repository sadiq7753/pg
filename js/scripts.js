


$(document).on('pageinit', '#pageone', function(){ 
	$(document).on('click', '#submit', function() {
		return login();
    });
	$(document).on('click', '#logout', function() {
		return clearSession();
    });
});


$(document).on('pageinit', '#pagethree', function(){ 
	$(document).on('click', '#addchild', function() {
		return addChild();
    });
});


$(document).on('pageinit', '#pagefour', function(){
    loadOrg("#organisationid");
    loadCategory("#categoryid");
	$(document).on('click', '#addservice', function() {
		return addService();
    });
});


$(document).on('pageinit', '#pagefive', function(){ 
	$(document).on('click', '#addorg', function() {
		return addOrg();
    });
});

$(document).on('pageinit', '#pagesix', function(event){ 
    
	$(document).on('click', '#addinvite', function() {
    

     if(document.getElementById("email2").value == ""){
       event.preventDefault();
       alert("please enter email"); 
       }
    else {    
		return addInvite();
    }
    });
});


$(document).on('pageinit', '#pageeight', function(){ 
      getCountry("#countryid");
    
     $( "#countryid" ).change(function() {
      getCity("#cityid");
     });
    
 /*    $( "#cityid" ).change(function() {
      getLocation("#loclist");
     });    
*/  
	$(document).on('click', '#addlocation', function() {
		return addLocation();
    });   
});


$(document).on('pageinit', '#pagenine', function(){ 
    return getOrg("#allorg");
});


$(document).on('pageinit', '#pageten', function(){ 
    return getInvitation("#allinvite");
});

$(document).on('pageinit', '#pageeleven', function(){ 
    getLocationid("#locationid");
    getServiceid("#serviceid");

	$(document).on('click', '#addservicelocation', function() {
        
   // var myOptions = [] ;
        var selected = $("#locationid option:selected");
       selected.each(function () {
         addServiceLocation($(this).val());
        });       
 
        return 1;
    });     
    
});


$(document).on('pageinit', '#pagetwelve', function(){ 
      getCountry("#countryname");

      $( "#countryname" ).change(function() {
      getCityName("#cityname");
     });
    
      $( "#cityname" ).change(function() {
      getServiceName("#services");
     }); 
    
     $( "#services" ).change(function() {
      return GetServicesLocation("#allloc");
     });          
});



$(document).on('pageinit', '#pagethirteen', function(){ 
      getServices("#allserve");
         
});


$(document).on('pageinit', '#pagetwo', function(){  
	$(document).on('click', '#register', function() {
		return addUser();
    });   
});

$(document).on('pageinit', '#pagefifteen', function(){ 
    getLocationid('#profilelocation'); 
    getGuardian('#profilefullname','#profileemail','#profilemobile','#profilelocation');
    $(document).on('click', '#updateprofile', function() {
		return updateGuardian(); //addUser();
    });   
});



  $(document).on('pageinit', '#pagesixteen', function () {
      return getChilds("#viewchilds");
  });


/*-------------------METHODS DEFINITIONS-----------*/


function login() {
   
    if($('#username').val().length > 0 && $('#password').val().length != '') {
      //  alert(config.endpointsURL.login);
        $.ajax({
            url : config.endpointsURL.login,
            data : {
                username : $('#username').val(),
                password : $('#password').val()
            },
            type : 'get',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {
                if(response.d == "0") {
                    alert("Invalid usernmae or password");
                } else {
                    sessionStorage.setItem("insertBy", response.d);
                    $.mobile.changePage("#menu", { transition: 'slide'});
                }
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
    }
}


function addUser() {  
      //  alert(config.endpointsURL.InsertChild);
        $.ajax({
            url : config.endpointsURL.InsertUser,
            data : {
                username : $('#registeremail').val(), //email
                password : $('#confirmpassword').val(),
                email : $('#registeremail').val(),
                guardianname : $('#fullname').val(),
                insertby: $('#registeremail').val()
            },
            type : 'get',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {
                if(response.text == "0") {
                    alert("error adding baby");
                } else {
                    alert(response.d);
                  //  $.mobile.changePage("#page", { transition: 'slide'});
                }
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
}



function addChild() {  
        alert(config.endpointsURL.InsertChild);
        $.ajax({
            url : config.endpointsURL.InsertChild,
            data : {
                childname : $('#name').val(),
                dateofbirth : $('#dob').val(),
                gender : $('#gender').val(),
                remarks : $('#remarks').val(),
                status: "Active",
                insertby: sessionStorage.getItem("insertBy"),
                relationshipwithchild: $("#relationshipwithbaby").val()
            },
            type : 'get',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {
                if(response.text == "0") {
                    alert("error adding baby");
                } else {
                    alert(response.d);
                  //  $.mobile.changePage("#page", { transition: 'slide'});
                }
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
}

function getChilds(id) {
    $.ajax({
        url: config.endpointsURL.GetChild,
        data: {
            username: sessionStorage.getItem("insertBy")
        },
        type: 'get',
        async: 'true',
        dataType: 'json',
        success: function (response) {
            // $(id).empty();
            $.each(response.d, function (i, ob) {

                $(id).append("<tr><td>" + ob.ChildName + "</td>" + "<td>" + ob.DateofBirth + "</td>" + "<td>" + ob.RelationshipWithChild + "</td>" + "<td>" + ob.InsertBy + "</td></tr>");
            });
            // $(id).listview('refresh'); 
        },
        error: function (request, error) {
            alert(request.statusText + "\n" + request.responseText);
        }
    });
}





function addService() {  
        alert(config.endpointsURL.InsertService);
        $.ajax({
            url : config.endpointsURL.InsertService,
            data : {
                servicename : $('#servicename').val(),
                serviceformonth : $('#serviceformonth').val(),
                serviceforyear : $('#serviceforyear').val(),
                description : $('#description').val(),
                organisationid : $('#organisationid').val(),
                categoryid: $('#categoryid').val(),
                status: "Active",
                insertby: sessionStorage.getItem("insertBy")
            },
            type : 'get',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {
                if(response.text == "0") {
                    alert("error adding service");
                } else {
                    alert(response.d);
                    $.mobile.changePage("#pageeleven", { transition: 'slide'});
                }
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
}



function addOrg() {  
        alert(config.endpointsURL.InsertOrganisation);
        $.ajax({
            url : config.endpointsURL.InsertOrganisation,
            data : {
                organisationname : $('#organisationname').val(),
                address : $('#address').val(),
                contactno : $('#contactno').val(),
                email : $('#email').val(),
                status: "Active",
                insertby: sessionStorage.getItem("insertBy")
            },
            type : 'get',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {
                if(response.d == "0") {
                    alert("error adding org");
                } else {
                    alert("added Org: "+ response.d);
                  //  $.mobile.changePage("#page", { transition: 'slide'});
                }
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
}


function addInvite() {  
        //alert(config.endpointsURL.InsertInvitation);
        $.ajax({
            url : config.endpointsURL.InsertInvitation,
            data : {
                email : $('#email2').val(),
                relationshipwithchild : $('#relationshipwithchild').val(),
                status: "Active",
                insertby: sessionStorage.getItem("insertBy")
            },
            type : 'get',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {
                if(response.text == "0") {
                    alert("error adding invite");
                } else {
                    alert("Invitation sent "+ response);
                    $.mobile.changePage("#pageten", { transition: 'slide'});
                }
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
}



function addLocation() {  
        //alert(config.endpointsURL.InsertInvitation);
        $.ajax({
            url : config.endpointsURL.InsertLocation,
            data : {
                location : $('#location').val(),
                cityid : $('#cityid').val(),
                status: "Active",
                insertby: sessionStorage.getItem("insertBy")
            },
            type : 'get',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {
                if(response.text == "0") {
                    alert("error adding invite");
                } else {
                  //  alert(d.response);
                  //  $.mobile.changePage("#page", { transition: 'slide'});
                }
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
}


function addServiceLocation(option) {  
        //alert(config.endpointsURL.InsertInvitation);
        $.ajax({
            url : config.endpointsURL.InsertServiceLocation,
            data : {
                
                locationid : option,
                serviceid : $('#serviceid').val(),
                status: "Active",
                insertby: sessionStorage.getItem("insertBy")
            },
            type : 'get',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {
                if(response.text == "0") {
                    alert("error adding invite");
                } else {
                  //  alert(d.response);
                  //  $.mobile.changePage("#page", { transition: 'slide'});
                }
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
}

function getLocationid(id) {  
        alert(config.endpointsURL.GetLocation);
        $.ajax({
            url : config.endpointsURL.GetLocation,
            data : {
                cityname : "%"
            },
            type : 'get',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {
            $(id).empty();
            $(id).append("<option > Select Location </option>"); 
 
            $.each(response.d, function(i, ob){
                $(id).append("<option value='" +ob.LocationID + "'>" + ob.Location + "</option>");
            });
            $(id).selectmenu('refresh');
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
}


function getServices(id) {  
        //alert(1323);
        $.ajax({
            url : config.endpointsURL.GetServices,
            data : {
                insertby : "%"
            },
            type : 'get',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {
       //     $(id).empty();
            $.each(response.d, function(i, ob){
                $(id).append("<tr><td>" + ob.OrganisationName + "</td>"+"<td>" + ob.ServiceName + "</td>"+ "</td>"+"<td>" + ob.ServiceforYear + "</td>"+"<td>" + ob.ServiceforMonth + "</td>"+"<td>" + ob.CategoryName + "</td></tr>");      
            });
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
}


function getServiceid(id) {  
        //alert(32);
        $.ajax({
            url : config.endpointsURL.GetServices,
            data : {
                insertby : "%"
            },
            type : 'get',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {
            $(id).empty();
            $(id).append("<option value='0'>Select Service</option>");
            $.each(response.d, function(i, ob){
                $(id).append("<option value='" +ob.ServiceID + "'>" + ob.ServiceName + "</option>");
            });
            $(id).selectmenu('refresh');
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
}


function getServiceName(id) {  
       // alert(123);
        $.ajax({
            url : config.endpointsURL.GetServices,
            data : {
                insertby : "%"
            },
            type : 'get',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {
            $(id).empty();
            $(id).append("<option value='0'>Select Service</option>");            
            $.each(response.d, function(i, ob){
                
                $(id).append("<option value='" +ob.ServiceName+ "'>" + ob.ServiceName + "</option>");
            });
            $(id).selectmenu();     
            $(id).selectmenu('refresh'); 
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
}


function getLocation(id) {  
        //alert(config.endpointsURL.InsertInvitation);
        $.ajax({
            url : config.endpointsURL.GetLocation,
            data : {
                cityname : $('#cityname').val()
            },
            type : 'get',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {
           // $(id).empty();
            $.each(response.d, function(i, ob){
                $(id).append("<tr><td>" + ob.Location+ "</td></tr>");
            });
           // $(id).listview('refresh'); 
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
}


function GetServicesLocation(id) {  
        //alert(config.endpointsURL.InsertInvitation);
        $.ajax({
            url : config.endpointsURL.GetServicesLocation,
            data : {
                location: "%",
                cityname : $('#cityname').val(),
                servicename : $('#services').val()
            },
            type : 'get',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {    //ServicesLocationDetails
            $(id).empty();
            $(id).append("<tr><th>Locations</th><th>Details</th></tr>");    
            $.each(response.d, function(i, ob){
                $(id).append("<tr><td>" + ob.Location+ "</td><td>" + ob.ServicesLocationDetails+ "</td></tr>");
            });
           // $(id).listview('refresh'); 
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
}



//get all organizations
function getOrg(id) {
    $.ajax({
        url : config.endpointsURL.GetOrganisation,
        data : {
            insertby: "%"            
        },
        type : 'get',
        async : 'true',
        dataType : 'json',
        success : function(response) {
           // $(id).empty();
            $.each(response.d, function(i, ob){
                $(id).append("<tr><td>" + ob.OrganisationName + "</td>"+"<td>" + ob.ContactNo + "</td>"+ "</td>"+"<td>" + ob.Email + "</td></tr>");
            });
           // $(id).listview('refresh'); 
        },
        error : function(request, error) {
            alert(request.statusText + "\n" + request.responseText);
        }
    });
}


//get all countries
function getCountry(id) {
    $.ajax({
        url : config.endpointsURL.GetCountry,
        data : {
        },
        type : 'get',
        async : 'true',
        dataType : 'json',
        success : function(response) {
            $.each(response.d, function(i, ob){
               console.log(ob.CountryName);
                $(id).append("<option value='" +ob.CountryName + "'>" + ob.CountryName + "</option>");
            });
            $(id).selectmenu('refresh');
        },
        error : function(request, error) {
            alert(request.statusText + "\n" + request.responseText);
        }
    });
}


//get all cities
function getCity(id) {
    $.ajax({
        url : config.endpointsURL.GetCity,
        data : {
             countryname : $('#countryid').val()
           //  cityname : "%"
        },
        type : 'get',
        async : 'true',
        dataType : 'json',
        success : function(response) {
            $.each(response.d, function(i, ob){
               $(id).append("<option value='" +ob.CityID + "'>" + ob.CityName + "</option>");                
            });
            $(id).selectmenu('refresh');            
        },
        error : function(request, error) {
            alert(request.statusText + "\n" + request.responseText);
        }
    });
}


//get all cities
function getCityName(id) {
    $.ajax({
        url : config.endpointsURL.GetCity,
        data : {
             countryname : $('#countryname').val()
           //  cityname : "%"
        },
        type : 'get',
        async : 'true',
        dataType : 'json',
        success : function(response) {
            $.each(response.d, function(i, ob){
               $(id).append("<option value='" +ob.CityName + "'>" + ob.CityName + "</option>");                
            });
            $(id).selectmenu('refresh');            
        },
        error : function(request, error) {
            alert(request.statusText + "\n" + request.responseText);
        }
    });
}


function getInvitation(id) {
    $.ajax({
        url : config.endpointsURL.GetInviation,
        data : {
            insertby: sessionStorage.getItem("insertBy"), 
            email : "%"
        },
        type : 'get',
        async : 'true',
        dataType : 'json',
        success : function(response) {
         //   $(id).empty();            
            $.each(response.d, function(i, ob){
               $(id).append("<tr><td>" + ob.Email + "</td>"+"<td>" + ob.RelationshipwithChild + "</td>"+ "</td>"+"<td>" + ob.PresentDate + "</td></tr>");                
            });
           // $(id).table('refresh');            
        },
        error : function(request, error) {
            alert(request.statusText + "\n" + request.responseText);
        }
    });
}


function getGuardian(profilefullname,email,mobile,location) {
    $.ajax({
        url : config.endpointsURL.GetGuardian,
        data : {
            insertby: sessionStorage.getItem("insertBy"), 
            email : "%",
            username : "%"            
        },
        type : 'get',
        async : 'true',
        dataType : 'json',
        success : function(response) {            
           
        $.each(response.d, function(i, ob){
           $(profilefullname).val(ob.GuardianName);  
            $(email).val(ob.Email);
            $(mobile).val(ob.MobileNo);
            
            if(ob.LocationID != "")
            {
               //alert(32);
                //$('#profilelocation option[value="1"]').attr("selected",true);                
                $('#profilelocation').val(ob.LocationID);
                $('#profilelocation').selectmenu('refresh');
            }
        });
  
            
        },
        error : function(request, error) {
            alert(request.statusText + "\n" + request.responseText);
        }
    });
}


function updateGuardian(profilefullname,email,mobile,location) {
    $.ajax({
        url : config.endpointsURL.UpdateGuardian,
        data : {
            guardianname : $('#profilefullname').val(),
            locationid : $('#profilelocation').val(),
            mobileno: $('#profilemobile').val(),
            insertby : sessionStorage.getItem("insertBy")           
        },
        type : 'get',
        async : 'true',
        dataType : 'json',
        success : function(response) {            
           alert("profile updated");  
          //  	$.mobile.changePage("#pageone", { transition: 'slide', reverse: true });
        },
        error : function(request, error) {
            alert(request.statusText + "\n" + request.responseText);
        }
    });
}



//to load org ID
function loadOrg(id) {
    $.ajax({
        url : config.endpointsURL.GetOrganisation,
        data : {
            insertby: "%"
        },
        type : 'get',
        async : 'true',
        dataType : 'json',
        success : function(response) {
            $(id).empty();
            // $(id).append("<option>Select Organisation</option>");
            $.each(response.d, function(i, ob){
                $(id).append("<option value='" +ob.OrganisationID + "'>" + ob.OrganisationName + "</option>");
            });
            $(id).selectmenu('refresh');
        },
        error : function(request, error) {
            alert(request.statusText + "\n" + request.responseText);
        }
    });
}



function loadCategory(id) {
    $.ajax({
        url : config.endpointsURL.GetCategory,
        data : {
        },
        type : 'get',
        async : 'true',
        dataType : 'json',
        success : function(response) {
            $(id).empty();            
            $(id).append("<option>Select Category</option>");
            $.each(response.d, function(i, ob){
                $(id).append("<option value='" +ob.CategoryID + "'>" + ob.CategoryName + "</option>");
            });
            $(id).selectmenu('refresh');
        },
        error : function(request, error) {
            alert(request.statusText + "\n" + request.responseText);
        }
    });
}


$(document).on('pagebeforeshow', '#pagetwo,#pagethree,#pagefour,#pagefive,#pagesix,#pageseven,#pageeight,#pagenine', function(){
    var activeid = $.mobile.pageContainer.pagecontainer( 'getActivePage' ).attr( 'id' );
	isLoggedIn(activeid);
});

function isLoggedIn(activeid) {
	var sessionId = sessionStorage.getItem("insertBy");  
    if(sessionId == null || sessionId === "") {
  //  	$.mobile.changePage("#pageone", { transition: 'slide'});
    } else {
    	$.mobile.changePage("#"+activeid, { transition: 'slide'});
    }
}

function clearSession() {
	sessionStorage.clear();
	$.mobile.changePage("#pageone", { transition: 'slide', reverse: true });
}