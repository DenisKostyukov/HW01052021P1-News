'use script';

const newsContainer = document.getElementById('newsContainer');
const newPost = document.querySelector('.newPost');
const search = document.getElementById('search');
const news = newsData.map((post) => createPost(post));
newsContainer.append(...news);

function createPost(post) {
  return createElement(
    "article", {
      classNames: ["postWrapper", "background"],
    },
    createHeader(post),
    createDescription(post),
  )
}

search.addEventListener('keyup', searchFunc);

function searchFunc({target}){
  newsContainer.textContent= "";
  const searched = newsData.filter((post) =>post.title.toLowerCase().includes(target.value.toLowerCase())).map((post) => createPost(post));
  newsContainer.append(...searched);
}
function createHeader({
  title,
  date
}) {
  const postTitle = createElement(
    "h3", {
      classNames: ["postTitle"],
    },
    document.createTextNode(title),
  );
  const postDate = createElement(
    "p", {
      classNames: ["date"],
    },
    document.createTextNode(date),
  );
  return createElement("div", {
      classNames: ["postHeader"],
    },
    postTitle,
    postDate
  )
}

newPost.addEventListener("submit", (event) => {
  event.preventDefault();
  const {
    target,
    target: {
      elements: {
        title,
        description
      }
    }
  } = event;
  if (title.value === "" || description.value === "") {
    alert("Заполните форму")
  }
  else{
    const fullDate = formatDate(new Date());
    const post = {
      title: title.value,
      content: description.value,
      date: fullDate
    };
    newsData.push(post);
    news.push(createPost(post));
    newsContainer.append(createPost(post));
    target.reset();
   
  }
})

function formatDate(date) {

  let day = date.getDate();
  if (day < 10) day = '0' + day;

  let month = date.getMonth() + 1;
  if (month < 10) month = '0' + month;

  let year = date.getFullYear();

  return day + '.' + month + '.' + year;
}

function createDescription({
  content
}) {
  return createElement(
    "div", {
      classNames: ["description"],
    },
    document.createTextNode(content),
  )
}

function createElement(
  tagName, {
    classNames = [],
    handlers = {},
    attributes = {},
  } = {},
  ...children
) {
  const elem = document.createElement(tagName);
  elem.classList.add(...classNames);

  for (const [attrName, attrValue] of Object.entries(attributes)) {
    elem.setAttribute(attrName, attrValue);
  }

  for (const [eventType, eventHandler] of Object.entries(handlers)) {
    elem.addEventListener(eventType, eventHandler);
  }

  elem.append(...children);
  return elem;
}
