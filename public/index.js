
//
// /*function getCategoryIdFromURL(){
// 	var path = window.location.pathname;
// 	var pathParts = path.split('/');
// 	if (partParts[1] === "category"){
// 		return partParts[2];
// 	} else{
// 		return null;
// 	}
// }*/
//
// function handleModalAcceptClick(){
// 	var desc      = document.getElementById('listDescInput').value.trim();
// 	var title     = document.getElementById('listTitleInput').value.trim();
// 	var listArr   = document.getElementById('listArrInput').value.trim();
//
// 	if(!title||!desc){
// 		alert("You must write a title and description");
// 	}
// 	//else{
//
// 	//	var postRequest = new XMLHttpRequest();
// 	//	var requestURL = '/category' + getCategoryIdFromURL()+'/addCategory';
// 	//	postRequest.open('POST',requestURL);
//
// 	//      var requestBody = JSON.stringify({
// 	//		url:category,
// 	//		title: title
// 	//	});
//
//
// 	postRequest.addEventListener('load',function(event){
// 		if(event.target.status === 200){
// 			var listTemplate = Handlebars.templates.list;
// 			var newListHTML = listTemplate({
// 				title:title
// 				desc:desc
// 				listArr:listArr
// 			});
// 			var listContainer = document.querySelector('.listContainer');
// 			listContainer.insertAdjacentHTML('beforeend',newListHTML);
// 		}else{
// 			alert("Error storing list: " + event.target.response);
// 		}
//
// 	});
//
// 		postRequest.setRequestHeader('ContentType', 'application/json');
// 		postRequest.send(requestBody);
//
// 		hideModal();
//
// 	//}
//
// }
//
//
//
// function showModal(){
//
//
// 	var modal = document.getElementById('addListModal');
// 	var modalBackdrop = document.getElementById('modalBackdrop');
//
// 	modal.classList.remove('hidden');
// 	modalBackdrop.classList.remove('hidden');
//
// }
//
//
// function clearModalInputs(){
//
// 	var modalInputElements = document.querySelectorAll('#addListModal input')
// 	for(var i=0; i<modalInputElements.length; i++){
// 		modalInputElements[i].value = ' ';
// 	}
//
// }
//
// function hideModal(){
//
// 	var modal = document.getElementById('addListModal');
// 	var modalBackdrop = document.getElementById('modalBackdrop');
//
// 	modal.classList.add('hidden');
// 	modalBackdrop.classList.add('hidden');
//
// 	clearModalInputs();
// }
//
// window.addEventListener('DOMContentLoaded', function (){
//
// 	var addListButton = document.getElementById('addListbutton');
//
// 	if(addListButton){
// 		addListButton.addEventListener('click', showModal);
// 	}
//
// 	var modalAcceptButton = document.getElementById('modalAccept');
// 	if(modalAcceptButton){
// 		modalAcceptButton.addEventListener('click',handleModalAcceptClick);
// 	}
//
// 	var modalHideButton = document.getElementsByClassName('modalHideButton');
// 	for(var i=0;i <modalHideButtons.length; i++){
// 		modalHideButtons[i].addEventListener('click',hideModal);
// 	}
//
// });
//

// ****************************
// ****************************
// ****************************
// ****************************
// ARJUN WROTE THIS BOTTOM PART
// ****************************
// ****************************
// ****************************
// ****************************


function openModal() {
	var modal = document.getElementById('createListModal');
	var backdrop = document.getElementById('modalBackdrop');

	modal.classList.remove("hidden");
	backdrop.classList.remove("hidden");


}

// function openEditModal(list) {
// 	var modal = document.getElementById('createListModal');
// 	var backdrop = document.getElementById('modalBackdrop');
//
//
// 	modal.classList.remove("hidden");
// 	backdrop.classList.remove("hidden");
//
//
// }

function closeModal() {
	var modal = document.getElementById('createListModal');
	var backdrop = document.getElementById('modalBackdrop');

	clearModalInputs();

	modal.classList.add("hidden");
	backdrop.classList.add("hidden");

}

function clearModalInputs() {

	var modalInputElements = document.querySelectorAll('#createListModal input')
	for(var i = 0; i < modalInputElements.length; i++){
		modalInputElements[i].value = '';
	}

}

function checkValidPost() {
	var name = document.getElementById('listNameInput').value.trim();
	// var listItems = document.getElementById('listItemsInput');
	// var color =

	if (name.value == '') {
		alert("You must fill out every input field!");
	}
	else {
		let postRequest = new XMLHttpRequest();
		let postURL = "/addList";
		postRequest.open("POST", postURL);

		let newListObject = {
			listName: name.value,
			// listColor: color
			// listItems: listItems[]
		};

		let requestBody = JSON.stringify(newListObject);

		postRequest.addEventListener('load',function(event){
			if (event.target.status === 200) {
				var listTemplate = Handlebars.templates.list;
				var newListHTML = listTemplate(newListObject);
				var listContainer = document.getElementsByClassName(".elementContainer");
				listContainer.insertAdjacentHTML('beforeend', newListHTML);
			}
			else {
				alert("Error storing list: " + event.target.response);
			}
		});

		postRequest.setRequestHeader('ContentType', 'application/json');
		postRequest.send(requestBody);

		closeModal();
	}
}

window.addEventListener('DOMContentLoaded', function (){

	var newListButton = document.getElementById('createButton');
	if (newListButton) {
		newListButton.addEventListener('click', openModal);
	}

	var modalAcceptButton = document.getElementsByClassName("createList");
	for(var i = 0; i < modalAcceptButton.length; i++){
		modalAcceptButton[i].addEventListener('click',checkValidPost);
	}

	var modalCancelButton = document.querySelectorAll("cancelModal", "closeModal");
	for(var i = 0;i < modalCancelButton.length; i++){
		modalCancelButton[i].addEventListener('click', closeModal);
	}

});
