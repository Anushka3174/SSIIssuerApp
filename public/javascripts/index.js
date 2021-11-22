async function submit() {
    const bizCard = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        uniqueIdentifier: document.getElementById("uniqueIdentifier").value,
        dob: document.getElementById("dob").value,
        role: document.getElementById("role").value
    }
    console.log(bizCard)
    openModal();
    hideQRCode();
    showSpinner();
    axios.post('/api/issue', bizCard).then(async(response) => {
        console.log("This is the respose in javascript", response);
        setQRCodeImage(response.data.offerUrl);
        hideSpinner();
        showQRCode();
    });
}

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function hideQRCode() {
    let qrImage = document.getElementsByClassName("qr-image")[0];
    if (qrImage) {
        qrImage.remove();
    }
    qr.style.display = "none";
}

function showQRCode() {
    qr.style.display = "block";
}

function setQRCodeImage(url) {
    let svgElement = document.createElement("div");
    let s = QRCode.generateSVG(url, {
        ecclevel: "M",
        fillcolor: "#FFFFFF",
        textcolor: "#373737",
        margin: 4,
        modulesize: 8,
    });
    s.classList.add("qr-image");
    svgElement.appendChild(s);
    qr.appendChild(s);
}

function hideSpinner() {
    spinner.style.display = "none";
}

function showSpinner() {
    spinner.style.display = "block";
}
function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
