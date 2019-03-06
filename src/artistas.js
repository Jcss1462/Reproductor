//UI interaction
const loginBtn = document.getElementById('artistas');

console.log(loginBtn);
//const signupBtn = document.getElementById('signup');

loginBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if (element !== "slide-up") {
			parent.classList.add('slide-up')
		} else {
			signupBtn.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});


//Session handling
//https://www.w3schools.com/html/html5_webstorage.asp


// Requests

var servidor = `http://localhost/reproductor/MusicPlayerServer/users.php?ejecute=`



function doSignUp(e) {

	// no haga lo que normalmente haria,espere a que yo haga algo
	e.preventDefault();

	console.log("asdlkasldjasjl");

	let fetch = postRequest("#signUpForm", `${servidor}subartist`);
	
	fetch.then(function (response) {
		return response.json();
	})
		.then(function (response) {
			if (response) {
				
				alert(`Añadido exitosamente`)	
				//redirectPlayer("#signUpForm");
			} else {
				alert("El sistema de registro está petaqueado");
			}
		});

		
}

function postRequest(formSelector, url) {

	let form = document.querySelector(formSelector);
	
	let inputs = form.querySelectorAll("input");
	console.log(form.querySelectorAll("input"));
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

function redirectPlayer(formSelector) {

	let form = document.querySelector(formSelector);
	let username = form.querySelector("input[name='username']");
	sessionStorage.setItem("username", username.value);
	window.location = "./index.html";
}

