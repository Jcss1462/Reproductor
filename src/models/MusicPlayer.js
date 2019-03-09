class musicPlayer {
	constructor(songName,artistName,src,servidor) {
		this.player = new Audio(src);
		this.initDOMElement(songName,artistName);

		this.interruptor=this.DOMElement.querySelector("#opcion1");
		

		this.controlPanel = this.DOMElement.querySelector("#control-panel");
		this.infoBar = this.DOMElement.querySelector("#info");
		this.progressBar = this.infoBar.querySelector(".progress-bar");
		this.progressBar.onclick = (e) => {
			let pos = e.offsetX;
			let total = e.target.clientWidth;
			let p = (pos / total);
			this.player.currentTime = this.player.duration * p;
		}

		this.playBtn = this.DOMElement.querySelector("#play");
		this.playBtn.onclick = () => { this.play() };

		//////////////////////////////////////////////////

		this.misC = this.DOMElement.querySelector("#misCan");
		this.misC.onclick = (e) => {
			this.infoUsuario(servidor);
		}


		this.player.ontimeupdate = () => { this.updateData() };

	}
	

	infoUsuario(servidor){

		this.interruptor.classList.toggle('active');

		var user = {
			id: null,
			email: null,
			username: null,
			playlist: [],
			library: []
		}

		user.username = sessionStorage.getItem("username");	
		var config={
			method: 'get',
			mode: 'cors',	
		};
		fetch(`${servidor}getMyInfo&username=${user.username}`, config)
        .then(function (response) {
            response.json().then(function (u) {
				user = u;

				let borrar = document.getElementById("mio");
				console.log(borrar);
				while (borrar.firstChild) {
					borrar.removeChild(borrar.firstChild);
				}

				let barrainf = document.querySelector(".mio");
				for (let i = 0; i < user.library.length; i++) {
					let element = document.createElement("div");
					element.classList.add("disco");
					element.id="disco";
					element.innerHTML = user.library[i].title;
					element.dataset.id = user.library[i].title;
					barrainf.insertBefore(element, barrainf.firstChild);
				}
	
            })
        });
		
		// Test
	}

	
	
	set DOMElement(value){
		this._DOMElement = value;
	}

	get DOMElement(){
		return this._DOMElement;
	}

	initDOMElement(songName,artistName){

		let cuerpo=document.createElement("div");
		cuerpo.classList.add("cuerpo");
		///////////////////////////////////////// Barra izquierda

		let izquierda=document.createElement("div");
		izquierda.classList.add("izquierda");

		let izqinfo=this._barraIzquierda();
		izquierda.appendChild(izqinfo);

		//////////////////////////////////////////Barra central

		let centro = document.createElement("div");
		centro.classList.add("centro");




		let container = document.createElement("div");
		container.classList.add("musicPlayer");

		let prevSong = this._prevAndNextDomElement(true,"assets/covers/virtualscape.jpg");
		container.appendChild(prevSong);

		let player = this._playerDomElement(songName,artistName);
		container.appendChild(player);

		let nextSong = this._prevAndNextDomElement(false,"assets/covers/virtualscape.jpg");
		container.appendChild(nextSong);

		centro.appendChild(container);



		let mio = document.createElement("div");
		mio.id="mio";
		mio.classList.add("mio");
		centro.appendChild(mio);



		////////////////////////////////Barra derecha

		let derecha=document.createElement("div");
		derecha.classList.add("derecha");

		///////////////////////////////
		cuerpo.appendChild(izquierda);
		cuerpo.appendChild(centro);
		cuerpo.appendChild(derecha);

		this.DOMElement = cuerpo;
	}

	

	_barraIzquierda(){
		let barra=document.createElement("div");
		barra.classList.add("barra");
		/////////////////////////////////////

		let p1=document.createElement("div");
		p1.classList.add("p1")


		let username= document.createElement("div");
		username.id="username"
		
		p1.appendChild(username);

		///////////////////////////////

		let p2=document.createElement("div");
		p2.classList.add("p2")

		let misCan=document.createElement("div");
		misCan.innerHTML="Canciones"
		misCan.classList.add("item")
		misCan.id="misCan";

		//////////////////////////////////// barra de opcion 1
		let opcion1=document.createElement("div");
		opcion1.classList.add("menu");
		opcion1.id="opcion1";

		let mias=document.createElement("div");
		mias.innerHTML="Mis canciones"
		mias.classList.add("btn");
		mias.id="mias";

		let añadir=document.createElement("div");
		añadir.innerHTML="Añadir canciones"
		añadir.classList.add("btn");
		añadir.id="añadir";

		let eliminar=document.createElement("div");
		eliminar.innerHTML="Eliminar canciones"
		eliminar.classList.add("btn");
		eliminar.id="eliminar";

		opcion1.appendChild(mias);
		opcion1.appendChild(añadir);
		opcion1.appendChild(eliminar);

		
		///////////////////////////////////


		let misPlay=document.createElement("div");
		misPlay.innerHTML="Mis playlist"
		misPlay.classList.add("item")
		misPlay.id="misPlay";


		p2.appendChild(misCan);
		p2.appendChild(opcion1);
		p2.appendChild(misPlay);


		///////////////////////////////////
		barra.appendChild(p1);
		barra.appendChild(p2);

		return barra;

	}
	_prevAndNextDomElement(isPrev, src){
		let element = document.createElement("div");
		element.id = (isPrev) ? "prevSong" : "nextSong";

		var wall = document.createElement("div");
		wall.classList.add("wall");

		var img = document.createElement("img");
		img.src = src;

		element.appendChild(wall);
		element.appendChild(img);

		return element;
	}

	_playerDomElement(nameContent,artistContent){


		let player = document.createElement("div");
		player.classList.add("player");

		let info = document.createElement("div");
		info.classList.add("info");
		info.id = "info";

		let artist = document.createElement("span");
		artist.classList.add("artist");
		artist.innerHTML = artistContent;

		let name = document.createElement("span");
		name.classList.add("name");
		name.innerHTML = nameContent;

		let duracion = document.createElement("div");
		duracion.classList.add("duracion");
	
		let actual = document.createElement("div");
		actual.classList.add("actual");
		

		let progressBar = document.createElement("div");
		progressBar.classList.add("progress-bar");

		let bar = document.createElement("span");
		bar.classList.add("bar");

		progressBar.appendChild(bar);
		info.appendChild(artist);
		info.appendChild(name);
		info.appendChild(duracion);
		info.appendChild(actual);
		info.appendChild(progressBar);
		player.appendChild(info);

		let controlPanel = this._controlPanelDomElement();
		player.appendChild(controlPanel);

		return player;
	}

	_controlPanelDomElement(){
		let controlPanel = document.createElement("div");
		controlPanel.id = "control-panel";
		controlPanel.classList.add("control-panel");

		let albumArt = document.createElement("div");
		albumArt.classList.add("album-art");

		let controls = document.createElement("div");
		controls.classList.add("controls");

		let prev = document.createElement("div");
		prev.classList.add("prev");

		let play = document.createElement("div");
		play.classList.add("play");
		play.id = "play";

		let next = document.createElement("div");
		next.classList.add("next");

		controls.appendChild(prev);
		controls.appendChild(play);
		controls.appendChild(next);

		controlPanel.appendChild(albumArt);
		controlPanel.appendChild(controls);

		return controlPanel;
	}

	play() {
		this.controlPanel.classList.toggle('active');
		this.infoBar.classList.toggle('active');
		if(this.player.paused){
			this.player.play();
		}else{
			this.player.pause();
		}
	}

	updateData(){
		let p = (this.player.currentTime / this.player.duration) * 100;
		let bar = this.progressBar.querySelector(".bar");
		bar.style.width = `${p}%`

		let pru=this.infoBar.querySelector(".duracion");
		pru.innerHTML=(this.player.duration/60).toFixed(2);
		
		let act=this.infoBar.querySelector(".actual");
		act.innerHTML=(this.player.currentTime/60).toFixed(2);
	}
}
