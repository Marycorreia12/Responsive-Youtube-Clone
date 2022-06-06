const videoCardContainer = document.querySelector('.cards-video-section');

let api_key = "AIzaSyClKwC6Bs5DXGaExBaByZ8sShdQS89nBSk";
let video =  "https://www.googleapis.com/youtube/v3/videos?";
let channels =  "https://www.googleapis.com/youtube/v3/channels?";

fetch(video + new URLSearchParams({
    key: api_key,
    part: 'snippet, statistics, contentDetails',
    chart: 'mostPopular',
    maxResults:50,
    regionCode: 'PT'
}))
.then(res => res.json())
.then(data => {
    console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channels + new URLSearchParams({
        key: api_key,
        part: 'snippet, statistics',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <article class="video-container" onClick="location.href = 'https://youtube.com/watch?v=${data.id}'">
    <a href="#" class="image">
        <img src="${data.snippet.thumbnails.high.url}" alt="">
    </a>
    <div class="video-bottom-section">
        <a href="#" class="icon">
            <img src="${data.channelThumbnail}" alt="">
        </a>
        <div class="video-details">
            <a href="#" class="video-title">${data.snippet.title}</a>
            <a href="#" class="video-channel-name">${data.snippet.channelTitle}</a>
            <div class="video-metadata">
            <span>${data.statistics.viewCount} views</span>
            .
            <span>${data.snippet.publishedAt}</span>
        </div>
        </div>
    </div>
</article>
    `
} 