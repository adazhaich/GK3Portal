$(document).ready(function() {
	var oldpassword = getElement("#oldpassword").val();
    newpassword = getElement("#newpassword").val();
    confirmpassword = getElement("#confirmpassword").val();
    
	PASSWORD = {
		filter: function  (oldpassword, newpassword){
			var url = clientHTTPConfig.appContextRoot+"/dataaccess/setpassword";
			var condition = "?oldpassword="+oldpassword+"&newpassword="+newpassword;
			
			url = url + condition;
		    //console.log( "filter url=", url );
		    $('#ajax_loader').show();
			queue().defer(d3.json, url).await(this.makeGraphs);
		},
		
		makeGraphs: function(error, apiData) {
			var dataSet = apiData;
			if(dataSet == 0) {
				getElement("#alertmsg").text("Please input correct Old Password.");
				$('#ajax_loader').hide();	
			} else if(dataSet.affectedRows > 0) {
				getElement("#alertmsg").text("Password changed successfully!");
				$('#ajax_loader').hide();	
			}
		}
	}
	
	getElement( "#save").on( "click", function() {
	    //console.log( "save button was clicked" );
	    oldpassword = getElement("#oldpassword").val();
	    newpassword = getElement("#newpassword").val();
	    confirmpassword = getElement("#confirmpassword").val();
	    //console.log("oldpassword=", oldpassword,  "newpassword=", newpassword, "confirmpassword=", confirmpassword);
	    if(newpassword == '' || oldpassword == '' || confirmpassword == '') {
	    	getElement("#alertmsg").text('Old Password, New Password, Confirm Password can not be valid!');
	    	$('#ajax_loader').hide();	
	    } else if(newpassword != confirmpassword) {
	    	getElement("#alertmsg").text('Confirm Password must be same with New Password!');
	    	$('#ajax_loader').hide();	
	    }else {
	    	PASSWORD.filter(oldpassword, newpassword);
	    }
	    
	});
	
});