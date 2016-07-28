$(document).ready(function() {
	var rowsperpage = $("#rowsperpage").val();
    
	PREFERENCES = {
		init: function  (){
			var url = clientHTTPConfig.appContextRoot+"/dataaccess/getpreferences";
			
		    //console.log( "init url=", url );
		    $('#ajax_loader').show();
			queue().defer(d3.json, url).await(this.makeDefault);
		},
		
		makeDefault: function(error, apiData) {
			var dataSet = apiData;
			//console.log(dataSet, 'value', dataSet[0].VALUE, 'id', dataSet[0].id);
			if(dataSet[0].VALUE != undefined) {
				$("#rowsperpage").val(dataSet[0].VALUE);
				getElement("#settingid").val(dataSet[0].id);
			}
			$('#ajax_loader').hide();
		},
		
		filter: function  (rowsperpage){
			var url = clientHTTPConfig.appContextRoot+"/dataaccess/setpreferences";
			var condition = "?rowsperpage="+rowsperpage;
			var settingid = getElement("#settingid").val();
			if(settingid != undefined &&  settingid !=''){
				condition = condition + "&settingid="+settingid;
			}
			
			url = url + condition;
		    //console.log( "filter url=", url );
		    $('#ajax_loader').show();
			queue().defer(d3.json, url).await(this.makeGraphs);
		},
		
		makeGraphs: function(error, apiData) {
			var dataSet = apiData;
			if(dataSet.affectedRows > 0) {
				getElement("#alertmsg").text("Change Default Rows per Page successfully!");
				$('#ajax_loader').hide();	
			}
		}
	}
	
	getElement( "#save").on( "click", function() {
	    //console.log( "save button was clicked" );
	    rowsperpage = $("#rowsperpage").val();
	    //console.log("rowsperpage=", rowsperpage);
	    if(rowsperpage == undefined || rowsperpage == '' ) {
	    	getElement("#alertmsg").text('Default Rows per Pages can not be valid!');
	    	$('#ajax_loader').hide();
	    }else {
	    	PREFERENCES.filter(rowsperpage);
	    }
	    
	});
	
	PREFERENCES.init();
	
});