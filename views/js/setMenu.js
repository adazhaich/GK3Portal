$(document).ready(function(){
	//console.log('setMenu.js');
	
	$( "#savemenu").on( "click", function() {
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
	    
	    alert('Save Menu for Role successfully');
	});
	
	function makeRole(){
		var url = clientHTTPConfig.appContextRoot+"/dataaccess/listallrole";
		
	    //console.log( "Get Role url=", url );
		queue().defer(d3.json, url).await(listRole);
	}
	
	function saveMenu(roleId, menuids) {
		var url = clientHTTPConfig.appContextRoot+"/dataaccess/saverolemenu";
		url = url + "?roleId=" + roleId + "&menuIds=" + menuids;
	    //console.log( "Save Menus for Role url=", url );
		queue().defer(d3.json, url).await(saveResult);
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
	

});

function setMenu(roleId){
	//console.log('setMenu function');
	$("#clickRoleId").val(roleId);
	var url = clientHTTPConfig.appContextRoot+"/dataaccess/listrolemenu";
	url = url + "?roleId="+roleId;
    //console.log( "Get menu for Role url=", url );
	queue().defer(d3.json, url).await(addMenu);
}

/*
function addMenu(error, apiData) {
	var dataSet = apiData;
	
	if (!dataSet || dataSet.length == 0){
		//console.log("No data retrieved. Do nothing");
	} else {
		dataSet.forEach(function(d) {
			create(d.role_id, d.id, d.menu, d.name,d.checked);
		});
	}
	
}
*/

function saveResult(error, apiData) {
	var dataSet = apiData;
	//alert(dataSet);
}


function createli(id, value, des) {
	var board = document.getElementById("role");  
    var e = createElement_x("li","roleid"); 
    var li_css = document.createAttribute("class");
    li_css.nodeValue = "list-group-item";
    e.setAttributeNode(li_css);
    e.innerHTML = "<a  href='javascript:setMenu("+id+")'>"+value+"</a> " ;
    board.appendChild(e);
}

function create(roleid, id, value, des, ischecked){   
    var board = document.getElementById('menu');  
    var label_var = createElement_x("label","");
    var label_css = document.createAttribute("class"); 
    label_css.nodeValue = "checkbox-inline"; 
    label_var.setAttributeNode(label_css); 
    
    var e = createElement_x("input","menuid"+roleid);   
    e.type = "checkbox"; 
    e.value = id; 
    if(ischecked != '0') e.checked = ischecked;
    
    label_var.appendChild(e);
    
    label_var.appendChild(document.createTextNode(des));   
    board.appendChild(label_var);   
    
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

function menuitem(id,parentId,text,hrefTarget,leaf,children,des,checked){ //use constructor 
	this.id=id; 
	this.parentId=parentId; 
	this.text=text; 
	this.hrefTarget=hrefTarget; 
	this.leaf=leaf; 
	this.children=children; 
	this.des=des; 
	this.checked = checked;
	return this; 
} 

function getRoot( list) {
	var result;
	list.forEach (function(m) {
		//alert('id:' + m.id + ',leaf:' + m.is_leaf+',parent:' + m.parent + ',name:' + m.name + ',url:' + m.url);
		if (!m.is_leaf) {
			//alert('id:' + m.id + ',leaf:' + m.is_leaf+',parent:' + m.parent + ',name:' + m.name + ',url:' + m.url);
			var children = getChildren(m, list);
			m.children = children;
		}
	});

	list.forEach (function(m) {
		//alert('id:' + m.id);
		if (m.id == 0) {
			result =  m;
		}
	});
	//alert(result);
	return result;
}

function getChildren(srcItem, list) {
	var children = new Array();
	var srcId = srcItem.id;
	list.forEach (function (m) {
		if (m.parent_id == srcId) {
			//alert('id:' + m.id + ',leaf:' + m.is_leaf+',parent:' + m.parent + ',name:' + m.name + ',url:' + m.url);
			children.push(m);
		}
	});
	
	//alert('id:' + children.id + ',leaf:' + children.is_leaf+',parent:' + children.parent + ',name:' + children.name + ',url:' + children.url);
	return children;
}

function createUlLi(dv, chi) {
	if(!chi.is_leaf) {
		var ach = chi.children;
		var b_ul=document.createElement("ul");//create ul
		//b_ul.className="dropdown-menu";//set ul css
		
		ach.forEach(function(a){
				var b_li=document.createElement("li");//create li
				//b_li.className="dropdown-submenu";
				b_li.innerHTML="<label><input type='checkbox' "+a.checked+" name='clickmenu' value='"+a.id+"'/>"+a.name+"</label>";
				createUlLi(b_li, a);
				b_ul.appendChild(b_li);
		});
		dv.appendChild(b_ul);		
	} else {
		var d_li=document.createElement("li");//create li
		d_li.innerHTML="<label><input type='checkbox' "+chi.checked+" name='clickmenu'  value='"+chi.id+"'/>"+chi.name+"</label>";//add li content
		//dv.appendChild(d_li);							
	}

}

function addMenu(error, apiData) {
	var dataSet = getRoot(apiData);
	
	//alert(dataSet.id+',parent:'+dataSet.parent_id+',leaf:'+dataSet.is_leaf+',children:'+dataSet.children);
	
	var dy_div=document.getElementById("menulist");
	if(dy_div.getElementsByTagName("ul").length!=0){
		dy_div.innerHTML="";
	}
	var a_ul=document.createElement("ul");//create ul
	//a_ul.className="nav navbar-nav";//set ul css
	var a_li=document.createElement("li");//create li
	//a_li.className="dropdown";
	//a_li.innerHTML="<a class='dropdown-toggle' data-toggle='dropdown' href='#' data-submenu>Reports 2<span class='caret'></span></a>";
	a_li.innerHTML="";

	createUlLi(a_li, dataSet);

	a_ul.appendChild(a_li);
	
	dy_div.appendChild(a_ul);
}

/*
function addMenu(error, apiData) {
	var dataSet = getRoot(apiData);
	
	//alert(dataSet.id+',parent:'+dataSet.parent_id+',leaf:'+dataSet.is_leaf+',children:'+dataSet.children);
	
	var dy_div=document.getElementById("setmenu");
	if(dy_div.getElementsByTagName("ul").length!=0){
		dy_div.innerHTML="";
	}
	var a_ul=document.createElement("ul");//create ul
	//a_ul.className="nav navbar-nav";//set ul css
	var a_li=document.createElement("li");//create li
	//a_li.className="dropdown";
	//a_li.innerHTML="<a class='dropdown-toggle' data-toggle='dropdown' href='#' data-submenu>Reports 2<span class='caret'></span></a>";
	a_li.innerHTML="Menus";
	
	if(!dataSet.is_leaf) {
		var ach = dataSet.children;
		var b_ul=document.createElement("ul");//create ul
		//b_ul.className="dropdown-menu";//set ul css
		
		ach.forEach(function(a){
				var b_li=document.createElement("li");//create li
				//b_li.className="dropdown-submenu";
				b_li.innerHTML="<label><input type='checkbox' "+a.checked+" name='clickmenu' value='"+a.id+"'/>"+a.name+"</label>";
				
				if(!a.is_leaf) {
					var bch = a.children;
					var f_ul=document.createElement("ul");//create li
					//f_ul.className="dropdown-menu";
					bch.forEach(function(b){
						
						if(!b.is_leaf) {
							var cch = b.children;
							if(cch) {
								var c_li=document.createElement("li");//create li
								//c_li.className="dropdown-submenu";
								c_li.innerHTML="<label><input type='checkbox' "+b.checked+" name='clickmenu' value='"+b.id+"'/>"+b.name+"</label>";
								
								var c_ul=document.createElement("ul");//create li
								//c_ul.className="dropdown-menu";
								
								cch.forEach(function(d){
									if(d.is_leaf) {
										var d_li=document.createElement("li");//create li
										d_li.innerHTML="<label><input type='checkbox' "+d.checked+" name='clickmenu'  value='"+d.id+"'/>"+d.name+"</label>";//add li content
									} 
									c_ul.appendChild(d_li);
								});
								c_li.appendChild(c_ul);
							} 
						} else {
							var c_li=document.createElement("li");//create li
							c_li.innerHTML="<label><input type='checkbox' "+b.checked+" name='clickmenu'  value='"+b.id+"'/>"+b.name+"</label>";
						}
						f_ul.appendChild(c_li);
					});
					
					b_li.appendChild(f_ul);
				}
			
			b_ul.appendChild(b_li);
			a_li.appendChild(b_ul);
		});
	}
	a_ul.appendChild(a_li);
	
	dy_div.appendChild(a_ul);
}
*/