"use strict";
 $(document).ready(	function() { 
	var spaceJSON;
	$.get('https://api.spaceXdata.com/v3/launches?limit=100', function(res,rej) {
		if(res){
			spaceJSON = res;
			
			let lunchYearArray = res.map( a => a.launch_year);
			
			displayData(res);
			let uniqueYearArray = lunchYearArray.filter(function(item, pos) {
				return lunchYearArray.indexOf(item) == pos;
			});
			//$('#value_one').text(uniqueYearArray);
			
			for(let i in uniqueYearArray){					
				$("#lunchYearDiv").append('<button class="lunchBtn">'+uniqueYearArray[i]+'</button>');
			}	
		}
		else if(rej) console.log(err);
	});
	$( '.filterDiv' ).on( 'click', '.lunchBtn', function () {
	
		let searchValue = $(this).text();
		let parentID = $(this).parent().attr('id');
		var filterJSON;
		if(parentID === "lunchYearDiv"){			
			filterJSON = spaceJSON.filter(function(item){				
				return item.launch_year == searchValue; 
			});			
		}
		else if(parentID === "successLunch"){
			filterJSON = spaceJSON.filter(function(item){	
				
				return JSON.stringify(item.launch_success) == searchValue; 
			});
		}
		else if(parentID === "successLand"){
			filterJSON = spaceJSON.filter(function(item){	
				
				return JSON.stringify(item.launch_success) == searchValue; 
			});
		}
		$("#contentDiv").empty();
		displayData(filterJSON);
	});	
});
function displayData(res){
	for(let i in res){
		let mission_name = res[i].mission_name + res[i].flight_number;
		$("#contentDiv").append('<div class="col-md-3 col-sm-6 col-xs-12 missionDiv"><img src="'
		+res[i].links.mission_patch_small+'" alt="Mission Image" class="missionImage"><div class="blueText">'
		+ mission_name +'</div><div class=""><span class="boldText">Mission Ids:</span><ul><li class="blueText">'
		+ res[i].mission_id +'</li></ul></div><div class=""><span class="boldText">Lunch Year:</span><span class="blueText">'
		+ res[i].launch_year +'<span></div><div class=""><span class="boldText">Successful Lunch:</span><span class="blueText">'
		+ res[i].launch_success +'</span></div><div class=""><span class="boldText">Successful Landing:</span><span class="blueText">'
		+ res[i].launch_success +'</span></div></div>');
	}
}
