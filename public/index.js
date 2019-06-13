/*
 * Write your client-side JS code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name:Anjali Vasisht
 * Email:vasishta@oregonstate.edu
 */


function getCategoryIdFromURL(){
	var path = window.location.pathname;
	var pathParts = path.split('/');
	if (partParts[1] === "category"){
		return partParts[2];		
	} else{
		return null; 
	}
}

function handleModalAcceptClick(){
	var categoryURL = document.getElementById('photoURLInput').value.trim();
	var title     = document.getElementById('photoTitleInput').value.trim();
	
	if(!categoryURL || !title){
		alert("You must write the category");
	}else{
		
		var postRequest = new XMLHttpRequest();
		var requestURL = '/category' + getCategoryIdFromURL()+'/addCategory'; 
		postRequest.open('POST',requestURL);

		var requestBody = JSON.stringify({
			url:category,
			title: title
		});
	postRequest.addEventListener('load',function(event){
		if(event.target.status === 200){	
			var categoryTemplate = Handlebars.templates.category;
			var newCategoryHTML = categoryTemplate({
				url: category,
				title:title	
	
			});
			var categoryContainer = document.querySelector('.categoryContainer');
			categoryContainer.insertAdjacentHTML('beforeend',newCategoryHTML);	
		}else{
			alert("Error storing category: " + event.target.response);
		}
	
	});

		postRequest.setRequestHeader('Content-Type', 'application/json');
		postRequest.send(requestBody);
		
		hideModal();

	}
	
}



function showModal(){


	var modal = document.getElementById('addCategoryModal');
	var modalBackdrop = document.getElementById('modalBackdrop'); 

	modal.classList.remove('hidden');
	modalBackdrop.classList.remove('hidden');

}


function clearModalInputs(){

	var modalInputElements = document.querySelectorAll('#addCategoryModal input')
	for(var i=0; i<modalInputElements.length; i++){
		modalInputElements[i].value = ' ';
	}
}

function hideModal(){
	
	var modal = document.getElementById('addCategoryModal');
	var modalBackdrop = document.getElementById('modalBackdrop');

	modal.classList.add('hidden');
	modalBackdrop.classList.add('hidden');

	clearModalInputs();
}

window.addEventListener('DOMContentLoaded', function (){

	var addCategoryButton = document.getElementById('addCategorybutton');

	if(addCategoryButton){
		addCategoryButton.addEventListener('click', showModal);
	}
	
	var modalAcceptButton = document.getElementById('modalAccept');
	if(modalAcceptButton){
		modalAcceptButton.addEventListener('click',handleModalAcceptClick);
	}

	var modalHideButton = document.getElementsByClassName('modalHideButton');
	for(var i=0;i <modalHideButtons.length; i++){
		modalHideButtons[i].addEventListener('click',hideModal);
	}

});


