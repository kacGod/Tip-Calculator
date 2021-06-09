let serviceType = document.getElementById("service-value");
let billAmount = document.getElementById("bill-value");
let billShare = document.getElementById("people-value");

let tipResultDisplay = document.getElementById("tip-result");

function tipCalculation() {

    window.setTimeout(() => {
        tipAmount.remove();
        totalBillAmount.remove();
        billShareAmount.remove();
        tipResultDisplay.style.display = "none";
        billAmount.value = "";
        billShare.value = "";
        serviceType.value = 0;
    }, 5000);

    tipResultDisplay.innerHTML = "";


    let tipAmount = document.createElement("p");
    let totalBillAmount = document.createElement("p");
    let billShareAmount = document.createElement("p");

    let serviceSelected = parseInt(serviceType.options[serviceType.value].innerText.split("-")[1], 10);
    let calculatedTip = (serviceSelected / 100) * parseInt(billAmount.value, 10);

    tipAmount.appendChild(document.createTextNode(`Tip Amount $${calculatedTip.toFixed(2)}`));
    tipResultDisplay.appendChild(tipAmount);

    let totalBill = parseInt(billAmount.value, 10) + calculatedTip;
    totalBillAmount.appendChild(document.createTextNode(`Bill Amount $${(totalBill).toFixed(2)}`))
    tipResultDisplay.appendChild(totalBillAmount)

    let shareNumber = parseInt(billShare.value, 10);
    billShareAmount.appendChild(document.createTextNode(`Each Person Owes $${(totalBill / shareNumber).toFixed(2)}`))
    tipResultDisplay.appendChild(billShareAmount)

}


// Bill Amount Error
let billAmountError = document.createElement("p");
billAmountError.appendChild(document.createTextNode("Bill Amount Cannot Be Empty"));

// Bill Share Error
let billShareError = document.createElement("p");
billShareError.appendChild(document.createTextNode("Number of Users Must be More Than 0"));

// Service Option Error
let serviceTypeError = document.createElement("p");
serviceTypeError.appendChild(document.createTextNode("Select a Service"));



let gifEl = document.createElement("img");
gifEl.setAttribute("src", "loading-gif.gif");

const ERROR_MESSAGE_CONTAINER = document.getElementById("warning-msg");
function errorCheck() {
    let billInput = parseFloat(billAmount.value, 10);
    let serviceInput = parseInt(serviceType.options[serviceType.value].innerText.split("-")[1], 10);
    let billSplitInput = parseInt(billShare.value, 10);
    let isFeedback = false;
    if ((isNaN(billInput) || billInput <= 0) || (isNaN(serviceInput)) || (isNaN(billSplitInput) || billSplitInput <= 0)) {

        ERROR_MESSAGE_CONTAINER.style.display = "block";
        ERROR_MESSAGE_CONTAINER.innerHTML = "";
        tipResultDisplay.innerHTML = "";
        // Check Bill Input
        if ((isNaN(billInput) || billInput <= 0)) {
            ERROR_MESSAGE_CONTAINER.appendChild(billAmountError);
            isFeedback = true;
        }
        // Check Bill Share
        if (isNaN(parseFloat(billShare.value, 10))) {
            ERROR_MESSAGE_CONTAINER.appendChild(billShareError);
            isFeedback = true;
        }
        // Check Service Type
        if (isNaN(parseInt(serviceType.options[serviceType.value].innerText.split("-")[1], 10))) {
            ERROR_MESSAGE_CONTAINER.appendChild(serviceTypeError)
            isFeedback = true;
        }
    }

    if (!isFeedback) {
        document.getElementsByClassName("result-container")[0].appendChild(gifEl);
        // Remove GIF, run tipCalculation function and show tip-result after 5 seconds
        window.setTimeout(() => { gifEl.remove(); tipCalculation(); tipResultDisplay.style.display = "block" }, 5000);
        ERROR_MESSAGE_CONTAINER.innerHTML = "";
        // Hide Error Message
        ERROR_MESSAGE_CONTAINER.style.display = "none";
    }

    // Hide Error Message after 5 seconds everytime this function gets called
    window.setTimeout(function () { ERROR_MESSAGE_CONTAINER.style.display = "none" }, 5000);

}

let calculationButton = document.getElementById("calc");
calculationButton.addEventListener("click", errorCheck);
