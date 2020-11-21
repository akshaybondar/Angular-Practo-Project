function AjaxCall() {

    let name = document.querySelector("#name").value;
    let id = document.querySelector("#id").value;
    let url = "http://localhost:4000/akshay";
    let input = { id, name };
    fetch(url, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
            "Content-Type": "application/json",
        }
    });
} 
