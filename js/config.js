var online = "202.61.50.11";
var local = "";
var URL = "http://" + online + "/parentsguide/service.svc/";
var config = {
	endpointsURL : {
		login : URL + "checkLogin",
        InsertChild : URL + "InsertChild",
        InsertService : URL + "InsertService",
        InsertOrganisation : URL + "InsertOrganisation",
        InsertInvitation : URL + "InsertInvitation"
        
	}
};
