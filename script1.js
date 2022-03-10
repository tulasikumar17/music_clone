let previous=document.querySelector("#pre");
let play=document.querySelector("#play");
let next=document.querySelector("#next");
let title=document.querySelector("#title");
let artist=document.querySelector("#artist");
let recent_volume=document.querySelector("#vol");
let volume_show=document.querySelector("#volume_show");
let slider=document.querySelector("#duraton_slider");
let track_image=document.querySelector("#track_img");
let present=document.querySelector("#present");
let play1=document.querySelector("#play1");



let timer;
let index_no=0;
let playing_song=false;
let p=100;
let track=document.createElement('audio');


let All_song=[
    {Name: "Arabic kuthu", Path: "songs/1.mp3" ,imgPath: "covers/1.jpg"},
    {Name: "Catch Me", Path: "songs/2.mp3",imgPath: "covers/2.jpg"},
    {Name: "Attasudake", Path: "songs/3.mp3",imgPath: "covers/3.jpg"},
    {Name: "Mr perfect", Path: "songs/4.mp3",imgPath: "covers/4.jpg"},
    {Name: "Adiye", Path: "songs/5.mp3",imgPath: "covers/5.jpg"},
    {Name: "Arabic kuthu", Path: "songs/6.mp3",imgPath: "covers/6.jpg"}
];

//load track
function load_track(index_no){
    track.src=All_song[index_no].Path;
    title.innerHTML=All_song[index_no].Name;
    track_image.src=All_song[index_no].imgPath;
    artist.innerHTML="singer";
    track.load;
}

load_track(0);

function justplay(){
    if(playing_song==false){
        playsong();
    }
    else{
        pausesong();
    }
}

function playsong(){
    track.play();
    playing_song=true;
    play1.src="pause_but.png";
}

function pausesong(){
    track.pause();
    playing_song=false;
    play1.src="play_but.png"
}

function previous_song(){
    if(index_no<=0){
        index_no=5;
        present.innerText=""+(index_no+1)+"";
        load_track(index_no);
        playsong();
    }
    else{
        index_no-=1;
        present.innerText=""+(index_no+1)+"";
        load_track(index_no);
        playsong();
    }
}

function next_song(){
    if(index_no>=5){
        index_no=0;
        present.innerText=""+(index_no+1)+"";
        load_track(index_no);
        playsong();
    }
    else{
        index_no+=1;
        present.innerText=""+(index_no+1)+"";
        load_track(index_no);
        playsong();
    }
}

function volume_change(){
    volume_show.innerText=recent_volume.value;
    track.volume=recent_volume.value/100;
}

function change_duration(){
    slider_position=(track.duration*slider.value)/100;
    track.currentTime=slider_position;
}

track.addEventListener("timeupdate",()=>{
    position=track.currentTime*100/track.duration;
    slider.value=position;
})

document.getElementById("volume_icon").addEventListener("click",()=>{
    if(recent_volume.value!=0){
        p=recent_volume.value;
        recent_volume.value=0;
        volume_show.innerText=recent_volume.value;
        track.volume=recent_volume.value/100;
        document.getElementById("volume_icon").src="mut.webp";
    }
    else{
        recent_volume.value=p;
        volume_show.innerText=recent_volume.value;
        track.volume=recent_volume.value/100;
        document.getElementById("volume_icon").src="vol_inc.webp";
    }
})
