var username;

//Session handling
if (typeof(Storage) !== "undefined") {
    username =  sessionStorage.getItem("username");
} else {
    alert('Su navegador no soporta almacenamiento local. :(')
}

function setStorage(username){
    sessionStorage.setItem("username",username)
}

//UI interactions
window.onload = () => {
   
   
    let newMusicplayer = new musicPlayer("Sofia Carson","Love is the name","assets/songs/cancion.mp3",`http://localhost/reproductor/MusicPlayerServer/users.php?ejecute=`);
    document.body.appendChild(newMusicplayer.DOMElement);
    document.getElementById("username").innerHTML = username;


   // let myMultimediaElement= new MultimediaElement("assets/songs/cancion.mp3");
}