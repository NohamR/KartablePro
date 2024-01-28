// function fetchContent(url) {
//   fetch(url)
//     .then(response => {
//       if (response.ok) {
//         return response.text();
//       }
//       throw new Error(`Failed to fetch: ${response.statusText}`);
//     })
//     .then(html => {
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(html, 'text/html');

//       // Get the content of the script tag with id "kartable-state"
//       const scriptElement = doc.getElementById('kartable-state');
//       if (scriptElement) {
//         const scriptContent = JSON.parse(scriptElement.textContent);

//         // List every key in scriptContent
//         const keys = Object.keys(scriptContent);

//         // Check if there is a key at index 8
//         if (keys.length > 8) {
//           const keyAtIndex8 = keys[8];
//           const contentAtIndex8 = scriptContent[keyAtIndex8];
//           console.log(contentAtIndex8);
//           return contentAtIndex8
//         } else {
//           console.error('Key at index 8 not found in scriptContent');
//         }
//       } else {
//         console.error('Script with id "kartable-state" not found');
//       }
//     })
//     .catch(error => console.error(error));
// }

// fetchContent(window.location.href);


// window.onload = function() {
//   replaceArticles();
//   console.log('done')
// };


window.onload = function() {
  setTimeout(function() {
    replaceArticles();
  }, 3000);
};


function opener(url) {
  console.log(url);

  const match = url.match(/(\d+)$/);

  if (match) {
    const number = match[0];
    console.log('Nombre à la fin de l\'URL :', number);

    fetch(`https://www.kartable.fr/ressources/a/a/a/${number}`)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error(`Failed to fetch: ${response.statusText}`);
      })
      .then(html => {
        const newWindow = window.open();
        newWindow.location.href = "about:blank";
        newWindow.document.write(html);
        newWindow.document.close();
      })
      .catch(error => console.error(error));
  } else {
    console.log('Aucun nombre trouvé à la fin de l\'URL.');
  }
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

        if (link) {
          opener(link);
        }
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

      if (link) {
        opener(link.href);
      }
    });

    article.parentNode.replaceChild(button, article);
    console.log('done');
  });
}
