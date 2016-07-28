$(document).ready(function(){
	//console.log('setRole.js');
	
	$( "#saverole").on( "click", function() {
	    //console.log( "save button was clicked" );
	    
	    var user_id = $("#userid")  === undefined ? "" : $("#userid").val() ;
	    //console.log('user_id:'+user_id);
	    
    	var uid = user_id;
    	//console.log(uid);
    	var roleid = $("input[name='roleid']:checked") === undefined ? "" : $("input[name='roleid']:checked") ;
    	////console.log('role str:'+roleid.join('-'));
    	var roleids = '';
    	roleid.each(function(j, v){
    		var rid = "'"+$(v).val()+"'";
    		//console.log('role_id:'+rid);
    		if(j == 0) {
    			roleids = rid;
    		} else {
    			roleids += ","+rid;
    		}
    	});
    	//console.log('role_ids:'+roleids);
    	//roleids = roleids.split(',');
    	var url = clientHTTPConfig.appContextRoot+"/dataaccess/saverole";
		url = url + "?userId="+uid+"&roleIds="+roleids;
		//console.log('save url:' + url);
		queue().defer(d3.json, url).await(saveResult);
	    
	    alert('Save Role successfully');
	    ////console.log( "day=", day, "hour=",  "start=", start, "end=", end, "source=", source);
	    //filter(day, start, end, source,filterSql);
	});
	
	function makeUser(){
		var url = clientHTTPConfig.appContextRoot+"/dataaccess/listuser";
		
	    //console.log( "Get Role url=", url );
		queue().defer(d3.json, url).await(listUser);
	}
	
	
	function saveRole(userId, roleids) {
		var url = clientHTTPConfig.appContextRoot+"/dataaccess/saverole";
		url = url + "?userId=" + userId + "&roleIds=" + roleids;
	    //console.log( "Get Role url=", url );
		queue().defer(d3.json, url).await(saveResult);
	}
	
	makeUser();
	
	
	function listUser(error, apiData) {
		var dataSet = apiData;
		
		if (!dataSet || dataSet.length == 0){
			//console.log("No data retrieved. Do nothing");
		} else {
			dataSet.forEach(function(d) {
				createli(d.id, d.username, d.username);

				//setRole(d.id);
			});
		}
	}
	

});

function setRole(userId){
	//console.log('setRole function');
	$("#userid").val(userId);
	var url = clientHTTPConfig.appContextRoot+"/dataaccess/listrole";
	url = url + "?userId="+userId;
    //console.log( "Get Role url=", url );
	queue().defer(d3.json, url).await(addRole);
}


function saveResult(error, apiData) {
	var dataSet = apiData;
}

function addRole(error, apiData) {
	var dataSet = apiData;
	var dy_div=document.getElementById("rolelist");
	dy_div.innerHTML="";
	
	if (!dataSet || dataSet.length == 0){
		//console.log("No data retrieved. Do nothing");
	} else {
		dataSet.forEach(function(d) {
			create(d.user_id, d.role_id, d.role, d.role_description,d.checked);
		});
	}
	
}

function createli(id, value, des) {
	var board = document.getElementById("user");   
    var e = createElement_x("li",""); 
    var li_css = document.createAttribute("class");
    li_css.nodeValue = "list-group-item";
    e.setAttributeNode(li_css);
    //e.id = id;
    e.innerHTML = "<a href='javascript:setRole("+id+")'>"+value+"</a>" ;
    board.appendChild(e);
}

function create(userid, id, value, des, ischecked){   
    var board = document.getElementById('rolelist'); 
	
    var div_var = createElement_x("div","");
	var div_css = document.createAttribute("class"); 
	div_css.nodeValue = "checkbox";
	div_var.setAttributeNode(div_css);
    
	var label_var = createElement_x("label","");
    var label_css = document.createAttribute("class"); 
    label_css.nodeValue = "checkbox-inline"; 
    label_var.setAttributeNode(label_css); 
    
    var e = createElement_x("input","roleid");   
    e.type = "checkbox"; 
    e.value = id; 
    if(ischecked != '0') e.checked = ischecked;
    
    label_var.appendChild(e);
    label_var.appendChild(document.createTextNode(des));  
    div_var.appendChild(label_var);
    board.appendChild(div_var);   
    
    //board.appendChild(document.createTextNode(des));   
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