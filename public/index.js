function checkValidPost(){
	var name = document.getElementById('listNameInput').value.trim();

	if(name.value==' '){
		alert("You must write a title");
	}
	else{

		var postRequest = new XMLHttpRequest();
		var postURL = "/addList";
		postRequest.open('POST',postURL);

		let newListObject = {
			listName:name.value,
			listItems: []
		};


		var requestBody = JSON.stringify(newListObject);

		postRequest.addEventListener('load',function(event){
			if(event.target.status === 200){
				var listTemplate = Handlebars.templates.list; // ERROR???
				var newListHTML = listTemplate(newListObject);
				var listContainer = document.getElementsByClassName('.elementContainer');
				listContainer.insertAdjacentHTML('beforeend',newListHTML);
			}
			else{
				alert("Error storing list: " + event.target.response);
			}

	});

		postRequest.setRequestHeader('ContentType', 'application/json');
		postRequest.send(requestBody);

		hideModal();

	}

}
//
// function checkValidItem(){
// 	var name = document.getElementById('listTitleInput').value.trim();
//
// 	if(name.value==' '){
// 		alert("You must write a title");
// 	}
// 	else{
//
// 		let postRequest = new XMLHttpRequest();
// 		let postURL = "/addListItem";
// 		postRequest.open('POST',postURL);
//
// 	let newListObject = {
// 		listName:name.value
// 	};
//
//
// 	let requestBody = JSON.stringify(newListObject);
//
// 	postRequest.addEventListener('load',function(event){
// 		if(event.target.status === 200){
// 			var listTemplate = Handlebars.templates.list;
// 			var newListHTML = listTemplate(newListObject);
// 			var listContainer = document.getElementsByClassName('.elementContainer');
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
// 	}
//
// }

function showModal(){

	var modal = document.getElementById('createListModal');
	var backdrop = document.getElementById('modalBackdrop');

	modal.classList.remove('hidden');
	backdrop.classList.remove('hidden');

}

function hideModal(){

        var modal = document.getElementById('createListModal');
        var backdrop = document.getElementById('modalBackdrop');

	clearModalInputs();

        modal.classList.add('hidden');
        modalBackdrop.classList.add('hidden');

}

function clearModalInputs(){

	var modalInputElements = document.querySelectorAll('#createListModal input')
	for(var i=0; i<modalInputElements.length; i++){
		modalInputElements[i].value = ' ';
	}
}

window.addEventListener('DOMContentLoaded', function (){

	var newListButton = document.getElementById('createButton');
	if(newListButton){
		newListButton.addEventListener('click', showModal);
	}

	var modalAcceptButton = document.getElementsByClassName('createList');
	for(var i=0;i<modalAcceptButton.length;i++){
		modalAcceptButton[i].addEventListener('click', checkValidPost);
	}

	var modalHideButton = document.getElementsByClassName('cancelModal');
	for(var i=0;i<modalHideButton.length;i++){
		modalHideButton[i].addEventListener('click', hideModal);
	}

	var modalCancelButton = document.getElementsByClassName('closeModal');
	for(var i=0;i<modalCancelButton.length;i++){
		modalCancelButton[i].addEventListener('click', hideModal);
	}

	// var newListItemButton = document.getElementsByClassName('addTask');
	// for(var i=0;i<newListItemButton.length;i++){
	// 	newListItemButton[i].addEventListener('click', checkValidItem);
	// }
});
