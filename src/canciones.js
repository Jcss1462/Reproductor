var isLodead= false;
var elementosMultimedia= [];


// Requests

var servidor = `http://localhost/reproductor/MusicPlayerServer/users.php?ejecute=`



function doSignUp(e) {

	// no haga lo que normalmente haria,espere a que yo haga algo
	e.preventDefault();

	console.log("asdlkasldjasjl");

	let fetch = postRequest("#signUpForm", `${servidor}subsong`);
	
	fetch.then(function (response) {
		return response.json();
	})
		.then(function (response) {
			if (response) {
				
				//alert('Añadido exitosamente');
				document.getElementById("signUpForm").submit();
				//location.href='http://localhost/reproductor/MusicPlayer/canciones.html';
				//clearField();

				//redirectPlayer("#signUpForm");
			} else {
				alert("El sistema de registro está petaqueado");
			}
		});
}



function listaTotal(e){
	
	
	e.preventDefault(); // local 


	var config={
		method: 'get',
		mode: 'cors'
	};

	fetch(`${servidor}selectSongs`, config)
	.then(function (response) {
		console.log(32);
		return response.json();
	})
	//el return me menda un arreglo de canciones que luego paso como parametro
	.then(function (canciones) {
		let select = document.querySelector("#listaCanciones");

		if(select.length!=canciones.length){
		//para cada elemto en el arreglo
		canciones.forEach(usuario => {
			let option = document.createElement("option");
			option.value = usuario.id;
			option.innerHTML = usuario.title;
			select.appendChild(option);
		});
		}
	});

	console.log(48);	// Test

	
}



function postRequest(formSelector, url) {

	let form = document.querySelector(formSelector);
	
	let inputs = form.querySelectorAll("input");
	
	let data = {};

	for (let i = 0; i < inputs.length; i++) {
		data[inputs[i].name] = inputs[i].value;
	}

	console.log(data);

	var params = new FormData();
	for (const key in data) {
		params.append(key, data[key]);
	}

	var config = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		body: params
	};
	
	return fetch(url, config);

}


let fileLoader = document.getElementById("fileLoader");
fileLoader.onchange = function(e){
	console.dir(this);
	for (let i = 0; i < this.files.length; i++) {
		let me = new MultimediaElement(this.files[i]);
		me.loadFileContent().then((r)=>{
			isLodead = true;
			document.getElementById("ELBOTON").disabled = false;
		});
		elementosMultimedia[i] = me;
	}
}


function subirContenido(e){

	e.preventDefault();

	let form = document.querySelector("#signUpForm");
	let inputs = form.querySelectorAll("input");
	let data = {
		id: null,
		title:inputs[0].value,
		duration: elementosMultimedia[0].DOMElement.duration,
		fotmat: elementosMultimedia[0].file.type,
		file: elementosMultimedia[0].data

	};

	var params = new FormData();
	for (const key in data) {
		params.append(key, data[key]);
	}

	var config = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		body: params
	};

	fetch(`${servidor}CreateSong`, config).then((r)=>{

		alert(r);

	});

}

