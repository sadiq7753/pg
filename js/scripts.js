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
	$(document).on('click', '#addservice', function() {
		return addService();
    });
});


$(document).on('pageinit', '#pagefive', function(){ 
	$(document).on('click', '#addorg', function() {
		return addOrg();
    });
});

$(document).on('pageinit', '#pagesix', function(){ 
	$(document).on('click', '#addinvite', function() {
		return addInvite();
    });
});


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
                    $.mobile.changePage("#pagethree", { transition: 'slide'});
                }
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
    }
}


function addChild() {  
  //  if($('#name').val().length != '' && $('#age').val().length != 0) {
        alert(config.endpointsURL.InsertChild);
        $.ajax({
            url : config.endpointsURL.InsertChild,
            data : {
                name : $('#name').val(),
                dob : $('#dob').val(),
                gender : $('#gender').val(),
                remarks : $('#remarks').val(),
                status: "Active",
                insertby: "user"
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
                    alert("child added"+ response);
                  //  $.mobile.changePage("#page", { transition: 'slide'});
                }
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
  //  }
}



function addService() {  
        alert(config.endpointsURL.InsertService);
        $.ajax({
            url : config.endpointsURL.InsertService,
            data : {
                servicename : $('#servicename').val(),
                serviceforage : $('#serviceforage').val(),
                description : $('#description').val(),
                categoryid: "null",
                status: "Active",
                insertby: "user"
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
                    alert("Service added"+ response);
                  //  $.mobile.changePage("#page", { transition: 'slide'});
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
                insertby: "user"
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
                    alert("error adding org");
                } else {
                    alert("added Org"+ response);
                  //  $.mobile.changePage("#page", { transition: 'slide'});
                }
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });

}



function addInvite() {  
        alert(config.endpointsURL.InsertInvitation);
        $.ajax({
            url : config.endpointsURL.InsertInvitation,
            data : {
                email : $('#email2').val(),
                relationshipwithchild : $('#relationshipwithchild').val(),
                status: "Active",
                insertby: "user1"
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
                    alert("error adding org");
                } else {
                    alert("added Org"+ response);
                  //  $.mobile.changePage("#page", { transition: 'slide'});
                }
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });

}





$(document).on('pagebeforeshow', '#pagetwo,#pagethree,#pagefour,#pagefive,#pagesix,#pageseven,#pageeight', function(){
	isLoggedIn();
});

function isLoggedIn() {
	var sessionId = sessionStorage.getItem("userId");
    
    if(sessionId == null || sessionId === "") {
 //   	$.mobile.changePage("#pageone", { transition: 'slide'});
    } else {
    	$.mobile.changePage("#pagethree", { transition: 'slide'});
    }
}

function clearSession() {
	sessionStorage.clear();
	$.mobile.changePage("#pageone", { transition: 'slide', reverse: true });
}