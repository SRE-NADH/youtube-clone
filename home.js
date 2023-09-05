/* <div class="video">
          <img src="https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_1280.jpg" alt="thumbnail">
          <div class="content">
           <img src="./imag/User-Avatar.png" alt="" id="logo">
           <div class="about">
               <p id="writeup"> Iure repellendus sed corporis quidem at et ex pariatur commodi perferendis natus. Vitae pa</p>
               <p id="details">Sreenadh</p>
               <p id="details">15k views , 1 week ago</p>
           </div>
          </div>
        </div> */


const apiKey = "AIzaSyCJreY0c2m3Ti2AxqU-n1M4tx4Bn7NLMTM";
const baseUrl = `https://www.googleapis.com/youtube/v3`;

let searchbox = document.getElementById("srch");
let searchbutton = document.getElementById("searchicon");
let main = document.getElementsByClassName("main")[0];


searchbutton.addEventListener("click",()=>{
    main.innerHTML="";
    let serchvalue = searchbox.value.trim();
    Displayvideos(serchvalue);
});

async function Displayvideos(serchvalue){
 let url = `${baseUrl}/search?key=${apiKey}&q=${serchvalue}&part=snippet&maxResults=20`;
 try{
 const response = await fetch(url);
 let result = await response.json();
//  console.log(typeof result.items); 
result.items.forEach(async (element)=>{
    let videoid = element.id.videoId;
    let channeid = element.snippet.channelId;
    
    let videoStatitics = await getVideoStatics(videoid);
    let channellogo = await getChannelLogo(channeid);

    element.snippet.statistics = videoStatitics;
    element.snippet.channellogo=channellogo;
    
    addDataToUi(element);
})
 }
 catch(error){
    alert("fetching search api failed");
 }
}

async function getVideoStatics(videoid){
    const endpoint = `${baseUrl}/videos?key=${apiKey}&part=statistics&id=${videoid}`;
    try{
        let response = await fetch(endpoint);
        console.log(response);
        let result = await response.json();
        console.log(result);
        return result.items[0].statistics;
    }
    catch(error){
        console.log("failed to fetch video statistics");
    }
}

async function getChannelLogo(channelid){
    const endpoint = `${baseUrl}/channels?key=${apiKey}&id=${channelid}&part=snippet`;
  try {
    const response = await fetch(endpoint);
    const result = await response.json();
    return result.items[0].snippet.thumbnails.high.url;
  } catch (error) {
    alert("Failed to load channel logo for ", channelId);
  }
}


function addDataToUi(element){
    let video = document.createElement("div");
    video.className="video";
    video.innerHTML = `<img src=${element.snippet.thumbnails.high.url} alt="thumbnail">
    <div class="content">
     <img src=${element.snippet.channellogo} alt="" id="logo">
     <div class="about">
         <p id="writeup">${element.snippet.title}</p>
         <p id="details">${element.snippet.channelTitle}</p>
         <p id="details">${element.snippet.statistics.likeCount} , ${FindTimeGap(element.snippet.publishTime)}</p>
     </div>
    </div>`
    main.appendChild(video);
    video.addEventListener("click",()=>{
      navigateToVideoDetails(element.id.videoId);
    })
}
function navigateToVideoDetails(videoid){
  document.cookie = `id=${videoid}; path=/`
  window.location.href = "videoDetails.html"
}

function FindTimeGap(publishtime){
    let publishdate = new Date(publishtime);
    let currdate = new Date();

    let secgap = (currdate.getTime()-publishdate.getTime())/1000;

    const secPerDay = 24*60*60;
    const secPerWeek  = secPerDay*7;
    const secPerMonth = 30*secPerDay;
    const secperYear = 365*secPerDay;

    if (secgap < secPerDay) {
        return `${Math.ceil(secgap / (60 * 60))}hrs ago`;
      }
      if (secgap < secPerWeek) {
        return `${Math.ceil(secgap / secPerDay)} weeks ago`;
      }
      if (secgap < secPerMonth) {
        return `${Math.ceil(secgap / secPerWeek)} months ago`;
      }
    
      return `${Math.ceil(secgap / secperYear)} years ago`;
}





// for search api

//  {
//     "kind": "youtube#searchResult",
//     "etag": "Dn_HjQZj7iXCRkRlNQXL3xxXTxE",
//     "id": {
//         "kind": "youtube#video",
//         "videoId": "_O_9HUZvJK4"
//     },
//     "snippet": {
//         "publishedAt": "2023-07-31T13:18:46Z",
//         "channelId": "UCJsApDpIBPpRRg0n9ZVmKAQ",
//         "title": "Weather obsession of Bangalore people📈🤣 #shorts #ahmedmasood #bangalore #ytshorts",
//         "description": "",
//         "thumbnails": {
//             "default": {
//                 "url": "https://i.ytimg.com/vi/_O_9HUZvJK4/default.jpg",
//                 "width": 120,
//                 "height": 90
//             },
//             "medium": {
//                 "url": "https://i.ytimg.com/vi/_O_9HUZvJK4/mqdefault.jpg",
//                 "width": 320,
//                 "height": 180
//             },
//             "high": {
//                 "url": "https://i.ytimg.com/vi/_O_9HUZvJK4/hqdefault.jpg",
//                 "width": 480,
//                 "height": 360
//             }
//         },
//         "channelTitle": "Ahmed Masood",
//         "liveBroadcastContent": "none",
//         "publishTime": "2023-07-31T13:18:46Z"
//     },
//     "statistics" :
// }

// for get videostatistics

// "kind": "youtube#videoListResponse",
// "etag": "CPfrkIH636buUZN2EZSvTMeCSeo",
// "items": [
//     {
//         "kind": "youtube#video",
//         "etag": "o6zgHqwerVpDrgSwOkuTG9eC2Dc",
//         "id": "qekqlIS-qaE",
//         "statistics": {
//             "viewCount": "37761",
//             "likeCount": "3485",
//             "favoriteCount": "0",
//             "commentCount": "177"
//         }
//     }
// ],
// "pageInfo": {
//     "totalResults": 1,
//     "resultsPerPage": 1
// }
// }