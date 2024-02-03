function fetchAndModifyContent(url, V) {
  let link;
  if (V === 'V1'){
    link = url;
  }
  else {
    link = 'https://www.kartable.fr' + url;
  }
  console.log(link, V);
  fetch(link)
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      throw new Error(`Failed to fetch: ${response.statusText}`);
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const innerContent = doc.querySelector('.document--wrapper');

      // const innerContentMain = innerContent.querySelector('document--wrapper');

      if (innerContent) {
        let innerContentText = Array.from(innerContent.childNodes)
          .map(node => node.outerHTML || node.nodeValue)
          .join('');

        assignContent(innerContentText);
      } else {
        console.log('Inner content not found');
      }
    })
    .catch(error => console.error(error));
}

function assignContent(content) {
  const html = `
  <!doctypehtml><html dir=ltr lang=fr-FR><base href=/ ><meta charset=UTF-8><meta name=description><meta name=viewport content="width=device-width,initial-scale=1"><meta name=apple-itunes-app content="app-id=825500330"><link href=https://assets.kartable.fr/front/assets/css/main.min.1705586312.css rel=stylesheet><meta name=msapplication-TileColor content=#ffffff><meta name=msapplication-TileImage content=/web/ms-icon-144x144.png><meta name=theme-color content=#ffffff><link href=https://fonts.gstatic.com/ rel=preconnect crossorigin=""><link href=https://www.googletagmanager.com/ rel=preconnect><link href=https://www.google-analytics.com/ rel=preconnect><link href=https://connect.facebook.net/ rel=preconnect><link href=https://cdn.scarabresearch.com/ rel=preconnect><link href=https://static.scarabresearch.com/ rel=preconnect><link href=https://nohamr.github.io/big.css rel=stylesheet><body><kartable-app ng-server-context=ssr ng-version=16.1.6><router-outlet webpsupport=""></router-outlet><ng-component _nghost-kartable-c1819110449=""class=ng-star-inserted data-is-themable=""><div _ngcontent-kartable-c1819110449=""class=navigation-wrapper><div _ngcontent-kartable-c1819110449=""class=navigation__main><main _ngcontent-kartable-c1819110449=""class="gu-unselectable page page--document--no-user page--document-single page--documents"><div _ngcontent-kartable-c1819110449=""class=document--wrapper>${content}</div></main></div></div></kartable-app><script>!function(){var e=window.navigator.userAgent,r=e.indexOf("MSIE "),a=e.indexOf("IEMobile");(0<r||0<a)&&alert("Vous utilisez un navigateur qui n'est pas compatible avec la dernière version de Kartable. Nous vous recommandons de télécharger un autre navigateur (Chrome, Firefox) ou de mettre à jour la version de votre navigateur courant.")}()</script>
  `;
  console.log('page opened');

  const newWindow = window.open();
  newWindow.location.href = "about:blank";
  newWindow.document.write(html);
  newWindow.document.close();
  
}

function replaceArticles() {
  var articles = document.querySelectorAll('.document-list__item');

  articles.forEach(function (article) {
    var titleElement = article.querySelector('.document-list__title');

    if (titleElement) {
      var articleText = titleElement.textContent;
      var button = document.createElement('button');
      button.textContent = articleText;

      button.addEventListener('click', function () {
        var link = titleElement.getAttribute('href');
        fetchAndModifyContent(link, 'V2');
      });

      article.parentNode.replaceChild(button, article);
      console.log('done');
    }
  });


  var articles = document.querySelectorAll('.document-readable');

  articles.forEach(function (article) {
    var articleText = article.querySelector('h3').textContent;
    var button = document.createElement('button');
    button.textContent = articleText;

    button.addEventListener('click', function () {
      var link = article.querySelector('h3 a');
      var url = link.href;
          fetchAndModifyContent(url, 'V1');
    });

    article.parentNode.replaceChild(button, article);
    console.log('done');
  });


  var articles = document.querySelectorAll('.category');

  articles.forEach(function (article) {
    var categoryTitle = article.querySelector('.category__title').textContent.trim();
    var button = document.createElement('button');
    button.textContent = categoryTitle;
  
    button.addEventListener('click', function () {
      var link = article.querySelector('.category__link');
      var url = link.getAttribute('href');
      fetchAndModifyContent(url, 'V1');
    });
  
    article.parentNode.replaceChild(button, article);
    console.log('done done')
  });
}

replaceArticles();