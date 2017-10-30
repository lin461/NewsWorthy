// Page Elements

const engadget = document.getElementById('engadget');
const recode = document.getElementById('recode');
const nextWeb = document.getElementById('nextWeb');
const main = document.getElementsByTagName('main')[0];

// News API Data

const apiKey = '993fee55f6ef4bd381228a62c45008d1';
const engadgetUrl = 'https://newsapi.org/v1/articles?source=engadget&sortBy=top&apiKey=';
const recodeUrl = 'https://newsapi.org/v1/articles?source=recode&sortBy=top&apiKey=';
const nextWebUrl = 'https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=';

// Request News Function

async function getNews(url) {
  let response = await fetch(url + apiKey);
  let jsonResponse = await response.json();
  let articlesArray = jsonResponse.articles.slice(0, 5);
  return articlesArray;
}

// Render Function

function renderNews(articles) {
  articles.map((article, index) => {
    let articleRow =
      '<div class="articlerow">' +
      ' <div class="article">' +
      '   <h2 class="title">' + article.title + '</h2>' +
      '   <h3>By ' + article.author + '</h3>' +
      '   <p> ' + article.description + '</p>' +
      '   <a href="' + article.url + '" target="_blank" class="readmore"><p>Read More</p></a>' +
      ' </div>' +
      ' <div class="share">' +
      '   <img class="storyimage" src="' + article.urlToImage + '" />' +
      '   <a href="https://twitter.com/lex_script" target="_blank"><button type="button" class="tweet" id="tweet ' + index + '">' +
      '   <i class="fa fa-twitter" aria-hidden="true"></i>Tweet This</button></a>' +
      ' </div>' +
      '</div>';

    main.innerHTML += articleRow;
  });
  return articles;
}

// Post Tweet Function

function sendTweets(newsObjects) {
  let tweetButtons = document.getElementsByClassName('tweet');
  for (let i = 0; i < tweetButtons.length; i++) {
    tweetButtons[i].addEventListener('click', function() {
      Twitter.postStatus(newsObjects[i].url);
      tweetButtons[i].innerHTML = "Tweeted";
    }, false);
  }
}

// Button Event Listeners

engadget.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(engadgetUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
}, false);

recode.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(recodeUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
}, false);

nextWeb.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(nextWebUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
}, false);
