const content = document.querySelector("#content")
let posts

const App = {
    inicializar(){  

        fetch("https://senac-backend.herokuapp.com/posts")
        .then(response => response.json())
        .then(response => {
            posts = response

            for(let i = 0; i < posts.length; i++) {
                const newContent = `<div class="card mb-3" id="post">
                                    <div class="card-body">
                                    <h5 class="card-title">@${posts[i].autor}</h5>
                                    <p class="card-text">${posts[i].post}</p>
                                    <p class="card-text"><small class="text-muted">${posts[i].data}</small></p>
                                    </div>
                                </div>`
    
                content.innerHTML += newContent
            }
        })
    },

    recarregar(){
        content.innerHTML = '';
        this.inicializar();
    }
}

function newPosts (event) {
    event.preventDefault();
    const post = document.querySelector("textarea#post").value.trim()
    
    if(post.length < 1) {
        return alert("Você não pode criar um post vazio")
    }

    const date = new Date();

    const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getUTCDate()} ${date.getHours()}:${date.getMinutes()}`

    const newPost = {
        autor: "usuario",
        post: post,
        data: formatDate
    }

    fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    })
    .then(async (response) => {
        const data = await response.json()
        if(data.mensagem){
            let textarea = document.querySelector("textarea#post");
            textarea.value = '';
            App.recarregar();
        }
    })   
    
}

function theme(theme){
    const body = document.querySelector("body")
    const button = document.querySelector("button#change-color")
    const buttonPost = document.querySelector("button#post")
    const navbar = document.querySelector("nav#navbar")
    
    if(theme !== 'dark'){
        body.classList.remove('bg-dark')
        body.classList.remove('text-light')
    }


    if(theme === 'dark'){
        body.classList.add('bg-dark')
        body.classList.add('text-light')
    }
    
    navbar.classList.add(theme === 'dark' ? 'navbar-dark' : 'navbar-light')
    navbar.classList.add(theme === 'dark' ? 'bg-dark' : 'bg-light')
    navbar.classList.remove(theme === 'dark' ? 'navbar-light' : 'navbar-dark')
    navbar.classList.remove(theme === 'dark' ? 'bg-light' : 'bg-dark')
    button.innerHTML = theme === 'dark' ? 'Light' : 'Dark'
    button.classList.add(theme === 'dark' ? 'bg-light' : 'bg-dark')
    button.classList.add(theme === 'dark' ? 'text-dark' : 'text-light')
    button.classList.remove(theme === 'dark' ? 'text-dark' : 'text-light')
    buttonPost.classList.add(theme === 'dark' ? 'btn-secondary' : 'btn-primary')
    buttonPost.classList.remove(theme === 'dark' ? 'btn-primary' : 'btn-secondary')
    content.innerHTML = ''
    for(let i = 0; i < posts.length; i++) {
        const newContent = `<div class="card mb-3 ${theme === 'dark' ? 'bg-secondary' : ''}" id="post">
                            <div class="card-body">
                            <h5 class="card-title ${theme === 'dark' ? 'text-light' : ''}">@${posts[i].autor}</h5>
                            <p class="card-text ${theme === 'dark' ? 'text-light' : ''}">${posts[i].post}</p>
                            <p class="card-text"><small class="text-${theme === 'dark' ? 'light' : 'muted'}">${posts[i].data}</small></p>
                            </div>
                        </div>`

        content.innerHTML += newContent
    }
}

function changeColor () {
    const body = document.querySelector("body")

    if(body.classList.length === 1){
        theme('dark')
        return
    }

    theme('light')  
}

App.inicializar();
