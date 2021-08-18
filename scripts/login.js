function login(event){
    event.preventDefault()
    const form = event.target
    const email = form.querySelector("input#email").value
    const senha = form.querySelector("input#password").value

    const formData = {
        email: email,
        senha: senha
    }
    
    fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
            "Content-Type": "application-json"
        },
        body: JSON.stringify(formData)
    })
    .then(async (response) => {
        const data = await response;
        console.log(data)
    })
}
