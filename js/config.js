var online = "202.61.50.11";
var local = "";
var URL = "http://" + online + "/parentsguide/service.svc/";
var config = {
	endpointsURL : {
		login : URL + "checkLogin",
        InsertChild : URL + "InsertChild",
        InsertService : URL + "InsertService",
        InsertOrganisation : URL + "InsertOrganisation",
        InsertInvitation : URL + "InsertInvitation",
        InsertLocation : URL + "InsertLocation",
        InsertServiceLocation : URL + "InsertServiceLocation",
        InsertUser : URL + "InsertUser",
        UpdateGuardian : URL + "UpdateGuardian",
        
        GetCategory : URL + "GetCategory",
        GetOrganisation : URL + "GetOrganisation",    //insertBy
        GetCountry : URL + "GetCountry",
        GetCity : URL + "GetCity",                    //countryname
        GetLocation: URL + "GetLocation",             //(string cityname); 
        GetInviation : URL + "GetInviation",          //insertedby and email
        GetServices : URL + "GetServices",
        GetServicesLocation : URL + "GetServicesLocation",
        GetChild: URL + "GetChild",
        GetGuardian: URL + "GetGuardian"

	}
};
