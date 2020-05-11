function getCovData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET','/request/covdata');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send();
    xhr.addEventListener('load', function() {
        var responseText = JSON.parse(xhr.responseText);
        document.getElementById('accrue').innerHTML = responseText.accrue;
        document.getElementById('accrue1').innerHTML = responseText.accrue1;
        document.getElementById('care').innerHTML = responseText.care;
        document.getElementById('care1').innerHTML = responseText.care1;
        document.getElementById('complete').innerHTML = responseText.complete;
        document.getElementById('complete1').innerHTML = responseText.complete1; 
        document.getElementById('die').innerHTML = responseText.die;
        document.getElementById('die1').innerHTML = responseText.die1;
        document.getElementById('nj').innerHTML = responseText.gg;
    });
}

function getNews() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET','/request/covnews');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send();
    xhr.addEventListener('load', function() {
        var responseText = JSON.parse(xhr.responseText);
        var sendInnerHtml = '';
        for(var i = 0; i < responseText.length ; i++) {
            sendInnerHtml = sendInnerHtml + '<a href="javascript:void(0);" onclick="window.open(\' ' +responseText[i].link+ ' \' );"><div class="newscard"><div class="wrp"><span class="title">'+responseText[i].title+'</span><br><span class="des">'+responseText[i].press +'/'+ responseText[i].time+'</span></div></div></a><br>';
        }
        document.getElementById('news-dt').innerHTML = sendInnerHtml;
    });
}