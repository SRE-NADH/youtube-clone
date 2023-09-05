const apiKey = "AIzaSyCJreY0c2m3Ti2AxqU-n1M4tx4Bn7NLMTM";
const url = "https://www.googleapis.com/youtube/v3/commentThreads";
let container = document.getElementsByClassName("commentsSection")[0];

/* <div class="COM_RE">
<div class="comment">
    <img src="./imag/User-Avatar.png" alt="">
    <div class="details">
        <p>name time</p>
        <p>comment</p>
        <div class="icons">
            <i class="fa-regular fa-thumbs-up"></i>
            <i class="fa-regular fa-thumbs-down"></i>
            <p>REPLAY</p>
        </div>
    </div>
 </div>

    <div class="replay">
        <img src="./imag/User-Avatar.png" alt="">
        <div class="details">
        <p>name <span>time</span></p>
        <p>comment</p>
        <p id="date">date of replay</p>
    </div>
</div> */

window.addEventListener("load",()=>{
    let videoid = document.cookie.split("=")[1];
    if(YT){
        new YT.Player("video",{
            height: "350",
            width: "100%",
            videoId:videoid,
        });
    }
    loadComments(videoid);
});

async function loadComments(videoid){
     let endpoint = `${url}?key=${apiKey}&videoId=${videoid}&maxResults=10&part=snippet`;

     let response = await fetch(endpoint);
     let result = await response.json();

     result.items.forEach(element => {
        const {
            authorDisplayName,
            textDisplay,
            likeCount,
            authorProfileImageUrl: profileUrl,
            publishedAt,
          } = element.snippet.topLevelComment.snippet;
     
          let comment = document.createElement("div");
          comment.className = "COM_RE"
          comment.innerHTML = `<div class="comment">
          <img src=${profileUrl} alt="">
          <div class="details">
              <p>${authorDisplayName} ${convertTime(publishedAt)}</p>
              <p>${textDisplay}</p>
              <div class="icons">
                 <div>
                 <i class="fa-regular fa-thumbs-up"></i>
                  <p>${likeCount}<p>
                  </div>
                  <i id="i" class="fa-regular fa-thumbs-down"></i>
                  <p>REPLAY</p>
                  <p class="rep"> <i class="fa-solid fa-caret-down"></i><p>
              </div>
          </div>
       </div>`
       container.appendChild(comment);

        let replay = comment.getElementsByClassName("rep")[0];

         replay.addEventListener("click",()=>{
           fetchRplay(element.id,comment);
         });
     });
}
function converttodate(date){
    return "";
}

async function fetchRplay(commentId,comment){
    console.log(commentId);
    let endpoint = `https://www.googleapis.com/youtube/v3/comments?key=${apiKey}&maxResults=10&part=snippet&parentId=${commentId}`;
   try{
    let response = await fetch(endpoint);
    console.log(response)
    let result = await response.json();
    console.log(result)
    
  if(result.items.length!==0){
    result.items.forEach(element=>{
        let replay = document.createElement("div");
        replay.className = "replay";
        replay.innerHTML = `<img src=${element.snippet.authorProfileImageUrl} alt="">
        <div class="details">
        <p>${element.snippet.authorDisplayName} <span>${ convertTime(element.publishedAt)}</span></p>
        <p>${element.snippet.textDisplay}</p>
        <p id="date">${converttodate(element.publishedAt)}</p>
        </div>`
    comment.appendChild(replay);
});
  }
   }
   catch(error){
    alert("failed to fetch replies");
   }
}
 
function convertTime(time){
    return 2;
}