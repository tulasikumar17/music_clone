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
let rep=document.querySelector("#repeat");


let timer;
let index_no=0;
let playing_song=false;
let p=50;
let track=document.createElement('audio');
let t=0;
let isRandom=false;

let naa_song=[
    {Name: "Arabic kuthu", Path: "songs/1.mp3" ,imgPath: "covers/1.jpg"},
    {Name: "Catch Me", Path: "songs/2.mp3",imgPath: "covers/2.jpg"},
    {Name: "Attasudake", Path: "songs/3.mp3",imgPath: "covers/3.jpg"},
    {Name: "Mr perfect", Path: "songs/4.mp3",imgPath: "covers/4.jpg"},
    {Name: "Adiye", Path: "songs/5.mp3",imgPath: "covers/5.jpg"},
    {Name: "panchadhara", Path: "songs/6.mp3",imgPath: "covers/5.jpg"},
    {Name: "jorsey", Path: "songs/7.mp3",imgPath: "covers/5.jpg"},
    {Name: "Bangaaru kodi", Path: "songs/8.mp3",imgPath: "covers/5.jpg"},
    {Name: "Nakosam nuvvu", Path: "songs/9.mp3",imgPath: "covers/5.jpg"},
    {Name: "Rolling title", Path: "songs/10.mp3",imgPath: "covers/5.jpg"}
];
let All_song=[
    {Name: "la la", Path: "songs/11.mp3" ,imgPath: "covers/11.jpg"}
]
//load track
function load_track(index_no){
    track.src=All_song[index_no].Path;
    title.innerHTML=All_song[index_no].Name;
    track_image.src=All_song[index_no].imgPath;
    artist.innerHTML="singer";
    track.load;
}

load_track(index_no);

//pause or play
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
//song navigations
function previous_song(){
    if(index_no<=0){
        index_no=All_song.length-1;
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
    if(index_no>=(All_song.length-1)){
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
//volume chage
function volume_change(){
    volume_show.innerText=recent_volume.value;
    track.volume=recent_volume.value/100;
}

//duration slider update on change
function change_duration(){
    slider_position=(track.duration*slider.value)/100;
    track.currentTime=slider_position;
}
//duration update on slider bar
track.addEventListener("timeupdate",()=>{
    position=track.currentTime*100/track.duration;
    q=track.currentTime;
    slider.value=position;
    tp=track.duration;
    if(tp%60<=9){
        document.querySelector("#total_duration").innerText="0"+Math.floor(tp/60)+":0"+Math.floor(tp%60);
    }
    else{
        document.querySelector("#total_duration").innerText="0"+Math.floor(tp/60)+":"+Math.floor(tp%60);
    }
    if(q%60<=9){
        document.querySelector("#show_duration").innerText="0"+Math.floor(q/60)+":0"+Math.floor(q%60);
    }else{
        document.querySelector("#show_duration").innerText="0"+Math.floor(q/60)+":"+Math.floor(q%60);
    }
    if(track.currentTime==track.duration){
        if(rep.innerText=="repeat"){
            track.currentTime=0;
            track.play();
        }
        else{
            next_song();
        }
    }
})
//mute or unmute
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

document.onkeydown=function(e){
    if(e.keycode==32 || e.keycode==107){
        justplay();
    }
    else if(e.keycode==108) {
        next_song();
    }
    else if(e.keycode==106){
        previous_song();
    }
}

function forward(){
    if(t==0){
        track.currentTime+=10;
    }

}

function backward(){
    if(rep.innerText=="repeat"){
        rep.innerText="rep";
    }else{
        rep.innerText="repeat"
    }
    track.currentTime-=10;
}
