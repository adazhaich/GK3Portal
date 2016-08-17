$(document).ready(function(){
	//console.log('header.js');
	
	var userId = $("#login_user").val();
	
	//console.log('userId:', userId);

	function makeHeader (userId){
		var url = "/tunisiana/dataaccess/menu";
		
		url += "?userId="+userId;
		
	    //console.log( "Get Header url=", url );
	
	//	url += "?day="+day + "&hour="+hour + "&start="+start + "&end="+end + "&illegalOdds="+illegalOdds;
	    //console.log("Inside makeHeader function and URL =", url );
		queue().defer(d3.json, url).await(addMenu);
	}
	
	makeHeader(userId);
	
	function menuitem(id,parentId,text,hrefTarget,leaf,children,des){ //use constructor 
		this.id=id; 
		this.parentId=parentId; 
		this.text=text; 
		this.hrefTarget=hrefTarget; 
		this.leaf=leaf; 
		this.children=children; 
		this.des=des; 
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
		return result;
	}
	
	function getChildren(srcItem, list) {
		var children = new Array();
		var srcId = srcItem.id;
		list.forEach (function (m) {
			if (m.parent_id == srcId) {
				m.url=clientHTTPConfig.appContextRoot+m.url;
				////console.log("Inside getChildren Function-ForEach loop"+'id:' + m.id + ',leaf:' + m.is_leaf+',parent:' + m.parent + ',name:' + m.name + ',url:' + m.url);
				children.push(m);
			}
		});
		
		////console.log('id:' + children.id + ',leaf:' + children.is_leaf+',parent:' + children.parent + ',name:' + children.name + ',url:' + children.url);
		return children;
	}

function createUlLi(dv, chi) {
	if(!chi.is_leaf) {
		var ach = chi.children;
		var b_ul=document.createElement("ul");//create ul
		b_ul.className="dropdown-menu";//set ul css
		
		ach.forEach(function(a){
			if(a.is_leaf) {
				var b_li=document.createElement("li");//create li
				////console.log("In createULLi Function and URL is"+a.url);
				b_li.innerHTML="<a onclick='registerComposeButtonEvent(this)' data-addtab='leaf"+a.id+"' url='"+a.url+"'>"+a.name+"</a>";
				//b_ul.appendChild(b_li);
			} else {
				var b_li=document.createElement("li");//create li
				b_li.className="dropdown-submenu";
				b_li.innerHTML="<a href='#'>"+a.name+"</a>";
				createUlLi(b_li, a);
				//b_ul.appendChild(b_li);
			}
			b_ul.appendChild(b_li);
		});
		dv.appendChild(b_ul);		
	}

}
// first argument is error reason, second is result
function addMenu(error, apiData) {
	var dataSet = getRoot(apiData);
	
	//alert(dataSet.id+',parent:'+dataSet.parent_id+',leaf:'+dataSet.is_leaf+',children:'+dataSet.children);
	
	var dy_div=document.getElementById("fraud_menu");
	if(dy_div.getElementsByTagName("ul").length!=0){
		dy_div.innerHTML="";
	}
	var a_ul=document.createElement("ul");//create ul
	a_ul.className="nav navbar-nav";//set ul css
	var a_li=document.createElement("li");//create li
	a_li.className="dropdown";
	a_li.innerHTML="<a class='dropdown-toggle' data-toggle='dropdown' href='#' data-submenu>Reports<span class='caret'></span></a>";
	//a_li.innerHTML="Menus";

	createUlLi(a_li, dataSet);

	a_ul.appendChild(a_li);
	
	dy_div.appendChild(a_ul);
}



});