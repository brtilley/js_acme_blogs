function createElemWithText(HTMLelement = "p", textContent = "", className = "")
  {
    var opt = document.createElement(HTMLelement);
    opt.innerText = textContent;
    opt.className = className;
    return opt;
  }

function createSelectOptions(users) 
  {
    if(users === undefined || users === null) 
    {
    return undefined
    }
    var user;
    var optionArray = []
    for(user of users) {
    console.log(user)
    var opt = document.createElement('option');
    opt.value = user.id
    opt.innerHTML = user.name;
    optionArray.push(opt);
    }
  return optionArray
  }

function toggleCommentSection(postId) 
  {
    if (!postId) 
    {
    return undefined;
    } 
    else 
    {
      let section = document.querySelector(`section[data-post-id="${postId}"]`);
      if (section) 
        {
          section.classList.toggle('hide');
        }
      return section;
    }
  }

  
function toggleCommentButton(postId) 
  {
    if (!postId) 
      {
        return undefined;
      }
      else 
      {
        let selectedButton = document.querySelector(`button[data-post-id="${postId}"]`);
        if(selectedButton != null) 
          {
            selectedButton.textContent === 'Show Comments' ? (selectedButton.textContent = "Hide Comments") : (selectedButton.textContent = "Show Comments");
          }
        return selectedButton;
      };
  }


function deleteChildElements(element) 
  {
    if(!element || !(element instanceof HTMLElement)) 
      {
        return undefined;
      }
    while (element.firstChild) 
      {
        element.removeChild(element.firstChild);
      }
    return element;
  }

const addButtonListeners = () => 
  {
    let myMainElem = document.querySelector('main')
    let buttonsList = myMainElem.querySelectorAll('button')
    if(buttonsList)
      {
        for(let i = 0; i < buttonsList.length; i++)
          {
            let myButton = buttonsList[i]
            let postId = myButton.dataset.postId
            myButton.addEventListener('click', function(event)
              {
                toggleComments(event, postId), false
              })
          }
        return buttonsList
      }
    function toggleComments()  
      {};
    }

const removeButtonListeners = () => 
  {
    let myMainElem = document.querySelector('main')
    let buttonsList = myMainElem.querySelectorAll('button')
    console.log(buttonsList)
    if(buttonsList)
      {
        for(let i = 0; i < buttonsList.length; i++)
          {
            let myButton = buttonsList[i]
            let postId = myButton.dataset.postId
            postId = myButton.dataset.postId
            myButton.removeEventListener('click', function(event)
              { 
                toggleComments(event, postId), false
              })
          }
        return buttonsList
      }
    function toggleComments()  {};
  }

function createdElemWithText(tagName, textContent) 
  {
    let element = document.createElement(tagName);
    element.textContent = textContent;
    return element;
  }

function createComments(comments) 
  {
    if (!comments) 
      {
        return undefined;
      }
    let frag = document.createDocumentFragment();
    for (let i = 0; i < comments.length; i++) 
      {
        const comment = comments[i];
        let article = document.createElement("article");
        let h3 = createdElemWithText("h3", comment.name);
        let p1 = createdElemWithText("p", comment.body);
        let p2 = createdElemWithText("p", `From: ${comment.email}`);
        article.appendChild(h3);
        article.appendChild(p1);
        article.appendChild(p2);
        frag.appendChild(article);
      }
    return frag;
  }

function populateSelectMenu(users) 
  {
    if (!users) return;
    let menu = document.querySelector("#selectMenu");
    let options = createSelectOptions(users);
    for (let i = 0; i < options.length; i++) 
      {
        let option = options[i];
        menu.append(option);
      }
    return menu;
  }

let getUsers = async() => 
  {
    let retrieve;
    try 
      {
        retrieve = await fetch("https://jsonplaceholder.typicode.com/users");
      }
    catch (error) 
      {
        console.log(error);
      }
    return await retrieve.json();
  }

let getUserPosts = async(userId) => 
  {
    if (!userId) return;
    let retrieve;
    try 
      {
        retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
      }
    catch (error) 
      {
        console.log(error);
      }
    return retrieve.json();
  }

let getUser = async(userId) => 
  {
    if (!userId) return;
    let retrieve;
    try 
      {
        retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      }
    catch (error) 
      {
        console.log(error);
      }
    return retrieve.json();
  }

async function getPostComments(postId) 
  {
    if (!postId) 
      {
        return undefined;
      } 
    else
    try 
      {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        if (!response.ok) 
          {
            throw new Error('Failed to fetch post comments');
          }
        const commentsData = await response.json();
        return commentsData;
      } 
    catch (error) 
      {
        console.error('Error fetching post comments:', error);
        throw error;
      }
  }

async function displayComments(postId) 
  {
    if (!postId) 
      {
        return undefined;
      }
    let section = document.createElement("section");
    section.dataset.postId = postId;
    section.classList.add("comments", "hide");
    let comments = await getPostComments(postId);
    let fragment = createComments(comments);
    section.append(fragment)
    return section;
  }

const createPosts = async (jsonPosts) => 
  {
    if(!jsonPosts) return;
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < jsonPosts.length; i++) 
      {
        let post = jsonPosts[i];
        let article = document.createElement("article");
        let section = await displayComments(post.id);
        let author = await getUser(post.userId);
        let h2 = createElemWithText("h2", post.title);
        let p = createElemWithText("p", post.body);
        let p2 = createElemWithText("p", `Post ID: ${post.id}`);
        let p3 = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
        let p4 = createElemWithText("p", `${author.company.catchPhrase}`);
        let button = createElemWithText("button", "Show Comments");
        button.dataset.postId = post.Id;
        article.append(h2, p, p2, p3, p4, button, section); 
        fragment.append(article);
      }
    console.log(fragment);
    return fragment;
  };

const displayPosts = async (posts) => 
  {
    let myMain = document.querySelector("main");
    let element = (posts) ? await createPosts(posts) : document.querySelector("main p");
    myMain.append(element);
    return element;
    function createPosts() {};
  }

function toggleComments(event, postId)
  {
    if (!event || !postId)
      {
        return undefined;
      }
    event.target.listener = true;
    let section  = toggleCommentSection(postId);
    let button = toggleCommentButton(postId);
    return [section, button];
  }

const refreshPosts = async (posts) => 
  {
    if (!posts)
      {
        return undefined;
      }
    let buttons = removeButtonListeners();
    let myMain = deleteChildElements(document.querySelector("main"));
    let fragment = await displayPosts(posts);
    let button = addButtonListeners();
    return [buttons, myMain, fragment, button];
  }

const selectMenuChangeEventHandler = async (e) => 
  { 
    if (!e) 
      {
        return undefined; 
      }
    try 
      { 
        const userId = e?.target?.value || 1; 
        const posts = await getUserPosts(userId); 
        const refreshPostsArray = await refreshPosts(posts); 
        return [userId, posts, refreshPostsArray]; 
      }
    catch (error) 
      { 
        console.error("An error occurred in selectMenuChangeEventHandler: ", error); 
        return null; 
      } 
  }

const initPage = async () => 
  {
    try 
      {
        let users = await getUsers();
        let select = populateSelectMenu(users);
        return [users, select];
      } 
    catch (error) 
      {
        console.error("An error occurred in initPage: ", error);
        return null;
      }
  }

function initApp() 
  {
    initPage().then(([users, select]) => 
      {
        let selectMenu = document.getElementById("selectMenu");
        if (selectMenu) 
          {
            selectMenu.appendChild(select);
            selectMenu.addEventListener("change", selectMenuChangeEventHandler, false);
          }
      });
    console.log("The function initApp has just been called.");
  }

document.addEventListener("DOMContentLoaded", initApp);
