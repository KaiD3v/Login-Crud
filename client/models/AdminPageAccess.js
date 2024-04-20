document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
    try {
        const isUserAdmin = localStorage.getItem('isAdmin')

        if(!isUserAdmin){
            
            window.location.href = "/client/src/login.html";
        }
    } catch (error) {
        console.error(error)
    }
})