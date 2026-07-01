
const vault = document.querySelector(".memory-vault");

async function loadVault(folder = "vault") {

    const response = await fetch(
        `https://api.shadowstream.space/memories?folder=${folder}`
    );

    const files = await response.json();

    vault.innerHTML = "";

    files.forEach(file => {

        const card = document.createElement("div");
        card.className = "card";

        const extension = file.name.split(".").pop().toLowerCase();

        if(["jpg","jpeg","png","gif","webp","bmp"].includes(extension)){

            const img = document.createElement("img");
            img.src = file.download_url;
            img.className = "card-image";

            card.appendChild(img);

        }
        else if(["mp4","webm","ogg","mov"].includes(extension)){

            const video = document.createElement("video");

            video.src = file.download_url;
            video.className = "card-image";

            video.controls = true;
            video.preload = "metadata";

            card.appendChild(video);

        }

        vault.appendChild(card);

    });

}

window.addEventListener("DOMContentLoaded", () => {
    loadVault();
});

const input = document.getElementById("memoryInput");

input.addEventListener("change", upload);

async function upload(){

    const file = input.files[0];

    if(!file){
        alert("Choose a file.");
        return;
    }

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
        "https://api.shadowstream.space/upload",
        {
            method:"POST",
            body:formData
        }
    );

    const data = await response.json();

    console.log(data);

    alert("Upload Complete!");

}