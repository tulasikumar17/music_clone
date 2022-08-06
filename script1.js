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
let rep_val="repeat";

let All_song=[
    {Name: "Arabic kuthu", Path: "songs/1.mp3" ,imgPath: "covers/1.jpg"},
    {Name: "Catch Me", Path: "songs/2.mp3",imgPath: "covers/2.jpg"},
    {Name: "Attasudake", Path: "songs/3.mp3",imgPath: "covers/3.jpg"},
    {Name: "Mr perfect", Path: "songs/4.mp3",imgPath: "covers/4.jpg"},
    {Name: "Adiye", Path: "songs/5.mp3",imgPath: "covers/5.jpg"},
    {Name: "panchadhara", Path: "songs/6.mp3",imgPath: "covers/5.jpg"},
    {Name: "jorsey", Path: "songs/7.mp3",imgPath: "covers/5.jpg"},
    {Name: "Bangaaru kodi", Path: "songs/8.mp3",imgPath: "covers/5.jpg"},
    {Name: "Nakosam nuvvu", Path: "songs/9.mp3",imgPath: "covers/5.jpg"},
    {Name: "Rolling title", Path: "songs/10.mp3",imgPath: "covers/5.jpg"},
    {Name: "lala", Path: "songs/11.mp3" ,imgPath: "covers/1.jpg"},
    {Name: "Ga ga megha", Path: "songs/12.mp3",imgPath: "covers/2.jpg"},
    {Name: "Seheri", Path: "songs/13.mp3",imgPath: "covers/3.jpg"},
    {Name: "Idhi chaala bagundi", Path: "songs/14.mp3",imgPath: "covers/4.jpg"},
    {Name: "Vaaram", Path: "songs/15.mp3",imgPath: "covers/5.jpg"},
    {Name: "Beast mode", Path: "songs/16.mp3",imgPath: "covers/5.jpg"},
    {Name: "Bonalu", Path: "songs/17.mp3",imgPath: "covers/5.jpg"},
    {Name: "Darshana", Path: "songs/18.mp3",imgPath: "covers/5.jpg"},
    {Name: "Hara hara", Path: "songs/19.mp3",imgPath: "covers/5.jpg"},
    {Name: "Tujh Mein Rab Diktha", Path: "songs/20.mp3",imgPath: "covers/5.jpg"},
    {Name: "Vikram title", Path: "songs/21.mp3",imgPath: "covers/3.jpg"},
    {Name: "suthana", Path: "songs/22.mp3",imgPath: "covers/5.jpg"},
    {Name: "Toofan", Path: "songs/23.mp3",imgPath: "covers/5.jpg"},
    {Name: "Yadagara", Path: "songs/24.mp3",imgPath: "covers/2.jpg"},
    {Name: "Mehebooba", Path: "songs/25.mp3",imgPath: "covers/5.jpg"},
    {Name: "The monster", Path: "songs/26.mp3",imgPath: "covers/5.jpg"},
    {Name: "Brindavanam", Path: "songs/27.mp3",imgPath: "covers/1.jpg"},
    {Name: "Yaad piya ki aane lagi", Path: "songs/28.mp3",imgPath: "covers/1.jpg"},
    {Name: "manike mage hithe", Path: "songs/29.mp3",imgPath: "covers/4.jpg"}
];
let naa_song=[
    {Name: "la la", Path: "songs/11.mp3" ,imgPath: "covers/1.jpg"}
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

function random_song(){
    index_no=Math.floor(Math.random()*(All_song.length))
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
        if(rep_val=="shuffle"){
            random_song()
        }else{
        index_no=All_song.length-1;
        }
        present.innerText=""+(index_no+1)+"";
        load_track(index_no);
        playsong();
    }
    else{
        if(rep_val=="shuffle"){
            random_song()
        }else{
        index_no-=1;
        }
        present.innerText=""+(index_no+1)+"";
        load_track(index_no);
        playsong();
    }
}

function next_song(){
    if(index_no>=(All_song.length-1)){
        if(rep_val=="shuffle"){
            random_song()
        }else{
        index_no=0;
        }
        present.innerText=""+(index_no+1)+"";
        load_track(index_no);
        playsong();
    }
    else{
        if(rep_val=="shuffle"){
            random_song()
        }else{
        index_no+=1;
        }
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
//volume derease on key value
function volume_dec(){
    recent_volume.value-=5
    volume_show.innerText=recent_volume.value;
    track.volume=recent_volume.value/100;
}
//volume increase on key value
function volume_inc(){
    recent_volume.value+=5;
    volume_show.innerText=recent_volume.value;
    track.volume=(recent_volume.value)/100;
    console.log(recent_volume.value,track.volume)
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
    if(q%60<=9){132
        document.querySelector("#show_duration").innerText="0"+Math.floor(q/60)+":0"+Math.floor(q%60);
    }else{
        document.querySelector("#show_duration").innerText="0"+Math.floor(q/60)+":"+Math.floor(q%60);
    }
    if(track.currentTime==track.duration){
        next_song()
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
function mute(){
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
}

document.addEventListener('keyup',function(e){
    if(e.code=='ArrowRight'){
        next_song();
        console.log("tul")
    }
    if(e.code=='ArrowLeft'){
        previous_song();
        
    }
    if(e.code=='Space'){
        justplay();
    }
    if(e.code=='KeyS'){
        shuffle();
    }
    if(e.code=='ArrowDown'){
        volume_dec();
    }
    if(e.code=='ArrowUp'){
        volume_inc();
    }
    if(e.code=='KeyJ'){
        backward();
    }
    if(e.code=='KeyL'){
        forward();
    }
    if(e.code=='KeyM'){
        mute();
    }
});

function forward(){
    if(t==0){
        track.currentTime+=10;
    }

}

function backward(){
    track.currentTime-=10;
}

function shuffle(){
    if(rep_val=="repeat"){
        rep_val="shuffle";
        rep.src="shuffle_but.png";
    }else{
        rep_val="repeat";
        rep.src="repeat_but.png"
    }
    
}
