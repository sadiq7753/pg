$(document).on('pageinit', '#pageone', function(){ 
	$(document).on('click', '#submit', function() {
		return login();
    });
	$(document).on('click', '#logout', function() {
		return clearSession();
    });
});

function login() {
    if($('#username').val != '' && $('#password').val != '') {
        $.ajax({
            url : config.endpointsURL.login,
            data : {
                username : $('#username').val,
                password : $('#password').val
            },
            type : 'post',
            async : 'true',
            dataType : 'json',
            beforeSend: function() {
        	   $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success : function(response) {
                sessionStorage.setItem("userId", response.userId);
                sessionStorage.setItem("user_full_name", response.userFullName);
                isLoggedIn();
            },
            error : function(request, error) {
                alert(request.statusText + "\n" + request.responseText);
            }
        });
    }
}

$(document).on('pagebeforeshow', '#pageone,#pagetwo,#pagethree,#pagefour,#pagefive,#pagesix,#pageseven,#pageeight', function(){
	isLoggedIn();
});

function isLoggedIn() {
	var sessionId = sessionStorage.getItem("userId");
    
    if(sessionId == null || sessionId === "") {
    	$.mobile.changePage("#pageone", { transition: 'slide', reverse: true });
    } else {
    	$.mobile.changePage("#pagetwo", { transition: 'slide'});
    }
}

function clearSession() {
	sessionStorage.clear();
	$.mobile.changePage("#pageone", { transition: 'slide', reverse: true });
}