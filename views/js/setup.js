$(document).ready(function(){
	//console.log('setup.js');
	
	$( "#save").on( "click", function() {
	    //console.log( "save button was clicked" );
	    
	    var role_id = $("#clickRoleId").val()  === undefined ? "" : $("#clickRoleId").val() ;
	    //console.log('role_id:'+role_id);
    	var menuid = $("input[name='clickmenu']:checked") === undefined ? "" : $("input[name='clickmenu']:checked") ;
    	////console.log('role str:'+roleid.join('-'));
    	var menuids = '';
    	menuid.each(function(j, v){
    		var mid = $(v).val();
    		//console.log('menu_id:'+mid);
    		if(j == 0) {
    			menuids = mid;
    		} else {
    			menuids += ","+mid;
    		}
    	});
    	//console.log('menu_ids:'+menuids);
    	saveMenu(role_id, menuids);
	    
	    alert('Save Role successfully');
	});
	
	function makeRole(){
		var url = clientHTTPConfig.appContextRoot+"/dataaccess/listallrole";
		
	    //console.log( "Get Role url=", url );
		queue().defer(d3.json, url).await(listRole);
	}
	
	makeRole();
	
	
	function listRole(error, apiData) {
		var dataSet = apiData;
		
		if (!dataSet || dataSet.length == 0){
			//console.log("No data retrieved. Do nothing");
		} else {
			dataSet.forEach(function(d) {
				createli(d.role_id, d.role, d.role_name);
			});
		}
	}

	function createli(id, value, des) {
		var board = document.getElementById("role");   
	    var e = createElement_x("li",""); 
	    e.innerHTML = "<input type='checkbox' name='roleid' value='"+id+"'>"+value ;
	    board.appendChild(e);
	}

	function createElement_x(type, name) {      
	   var element = null;      
	   try {      
	      // First try the IE way; if this fails then use the standard way      
	      element = document.createElement('<'+type+' name="'+name+'">');      
	   } catch (e) {      
	      // Probably failed because we’re not running on IE      
	   }      
	   if (!element) {      
	      element = document.createElement(type);      
	      element.name = name;      
	   }      
	   return element;      
	} 
	

});
