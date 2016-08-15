//this will hold currently focused tab
var currentTab;
var composeCount=0;
//initilize tabs
$(function () {
	
	//when ever any tab is clicked this method will be called
	$("#myTab").on("click", "a", function(e){
		e.preventDefault();
		$(this).tab('show');
		$currentTab=$(this);
	});
	initTab();
	registerCloseEvent();
});

function initTab(){
	//var url = "/test/reports/dailykpi2/onnet";
	var url=clientHTTPConfig.appContextRoot+"/reports/dailykpi/onnet";
	var tabId = "leaf1102";
	$('.tab-content').append('<div class="tab-pane active" id="'+tabId+'"></div>');
	craeteNewTabAndLoadUrl("",url,"#"+tabId);
	//console.log("Created New TAB"+tabId+"For URL"+url);
	registerCloseEvent(); 
}
//this method will demonstrate how to add tab dynamically
function registerComposeButtonEvent(obj){
	/* just for this demo */
//	$("a[class='reports']").on("click","a",function (e) {
//		e.preventDefault();
		var url =$(obj).attr('url');
		var tabId  = $(obj).attr('data-addtab');//this is id on tab content div where the 
		composeCount = composeCount + 1;//increment compose count
		var flag = true;
		$('#myTab').find("li").each(function(index, element){
			var _tab  = $(element).find("a").attr("href");
			var tab = "#"+tabId;
			if( tab === _tab){
				flag = false;
				return;
			}
		})
		if(flag){
			$('.nav-tabs').append('<li><a href="#'+tabId+'"><button class="close closeTab" type="button" >×</button>'+$(obj).html()+'</a></li>');
			$('.tab-content').append('<div class="tab-pane" id="'+tabId+'"></div>');
			craeteNewTabAndLoadUrl("",url,"#"+tabId);
			$(this).tab('show');
			showTab(tabId);
			registerCloseEvent(); 
		}
}

//this method will register event on close icon on the tab..
function registerCloseEvent(){

	$(".closeTab").click(function () {
		
		//there are multiple elements which has .closeTab icon so close the tab whose close icon is clicked
		var tabContentId = $(this).parent().attr("href");
		$(this).parent().parent().remove();//remove li of tab
		$('#myTab a:last').tab('show'); // Select first tab
		$(tabContentId).remove();//remove respective tab content

	});
}

//shows the tab with passed content div id..paramter tabid indicates the div where the content resides
function showTab(tabId){
	$('#myTab a[href="#'+tabId+'"]').tab('show');
}
//return current active tab
function getCurrentTab(){
	return currentTab;
}

//This function will create a new tab here and it will load the url content in tab content div.
function craeteNewTabAndLoadUrl(parms,url,loadDivSelector){

	$(""+loadDivSelector).load(url, function(response, status, xhr) {
		if (status == "error") {
			var msg = "Sorry but there was an error getting details ! ";
			$(""+loadDivSelector).html(msg + xhr.status + " " + xhr.statusText);
			$(""+loadDivSelector).html("Load Ajax Content Here...");
		} else if(xhr.responseText.indexOf('<a href="/login" class="btn btn-default"><span class="fa fa-user"></span> Login</a>') > 0) {
			location.replace('/');
		}
	});

}

//this will return element from current tab
//example : if there are two tabs having  textarea with same id or same class name then when $("#someId") whill return both the text area from both tabs
//to take care this situation we need get the element from current tab.
function getElement(selector){
	var tabContentId  = $(".nav-tabs li.active").find("a").attr("href");
//		var tabContentId = $currentTab.attr("href");
		return $(""+tabContentId ).find(""+selector);
	
	
}


function removeCurrentTab(){
	var tabContentId = $currentTab.attr("href");
	$currentTab.parent().remove();//remove li of tab
	$('#myTab a:last').tab('show'); // Select first tab
	$(tabContentId).remove();//remove respective tab content
}

function removeCanceledTab() {
	var tabContentId  = $(".nav-tabs li.active").find("a").attr("href");
	$(".nav-tabs li.active").find("a").parent().remove();
	$('#myTab a:last').tab('show');
	$(tabContentId).remove();//remove respective tab content
}

function getCurrentTabId() {
	var tabContentId  = $(".nav-tabs li.active").find("a").attr("href");
	return tabContentId;
}
