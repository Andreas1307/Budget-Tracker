const guestName = document.querySelector(".name");
const body = document.querySelector("body")
const historyOpt = document.querySelector("#history-options");
const removeHistory = document.querySelector(".remove-history");
const historyDiv = document.querySelector(".history");
const boxes = document.querySelectorAll(".box");
const bell = document.querySelector("#bell");
const activityBox = document.querySelector(".activity-box");
const nameInput = document.querySelector(".name-input");
const passwordInput = document.querySelector(".password-input");
const emailInput = document.querySelector(".email-input");
const monthlyInput = document.querySelector(".monthly-input");
const utilitiesInput = document.querySelector(".utilities-input");
const rentInput = document.querySelector(".rent-input");
const proceedBtn = document.querySelector(".proceed")
const formContainer = document.querySelector(".form-container");
const incomeInput = document.querySelector(".income");
const rentBoxInput = document.querySelector(".rent-inpt");
const utilitiesBoxInput = document.querySelector(".utilities-inpt");
const passwordBoxInput = document.querySelector(".password");
const emailBoxInput = document.querySelector(".email");
const walletAmount = document.querySelector(".wallet-amount");
const walletOutcome = document.querySelector(".wallet-outcome2");
const budgetRemaining = document.querySelector(".budget-remaining");
const addNew = document.querySelector(".add-new");
const addNewContainer = document.querySelector(".add-new-container");
const addNewName = document.querySelector(".addNew-name");
const addNewName2 = document.querySelector(".addNew-name2");
const addNewAmount = document.querySelector(".addNew-amount");
const addNewAmount2 = document.querySelector(".addNew-amount2");
const addNewBtn = document.querySelector(".addNew-btn");
const closeNewDiv = document.querySelector("#closeNewDiv");
const historyBoxes = document.querySelector(".history-boxes");
const transactionBoxes = document.querySelector(".transaction-boxes");
const transactionBoxesLatest = document.querySelector(".transaction-boxes-latest")
const countryInput = document.querySelector(".country-input");
const occupationInput = document.querySelector(".occupation-input")
const occupationText = document.querySelector(".occupation");
const countryText = document.querySelector(".country-text");
const transferPersons = document.querySelectorAll(".transfer-person")
const inputTransfer = document.querySelector(".input-transfer");
const passwordDisplay = document.querySelector(".password")
const passwordIcon = document.querySelector(".password-icon");
const collapSideButton = document.querySelector(".collap-side-button")
const sideBar = document.querySelector(".side-bar");
const closeSideBar = document.querySelector("#close-side-bar");
const bigDivMenu = document.querySelectorAll(".big-div-menu")
let isTrue = false;
let dataArr = [];


let name;
let email;
let monthlyIncome;
let utilities;
let rent;
let password;
let spending;
let occupation;
let country;
let moneyTransfered = 0;

// code for collapsible side Bar
bigDivMenu.forEach((menu) => {
    menu.addEventListener("click", () => {
    sideBar.classList.toggle("active")
})
})


collapSideButton.addEventListener("click", () => {
    sideBar.classList.toggle("active")
})
closeSideBar.addEventListener("click", () => {
    sideBar.classList.remove("active")
})

passwordIcon.addEventListener("click", () => {
    isTrue = !isTrue;
    passwordIcon.innerHTML = isTrue ? `<i class="fa-solid fa-unlock"></i>` : `<i class="fa-solid fa-lock"></i>`
    passwordDisplay.type = isTrue ? "text" : "password"
})


addNew.addEventListener("click", (e) => {
    e.preventDefault();
    addNewContainer.classList.add("active")
    addNewName2.value = "";
    addNewAmount2.value = "";
})
closeNewDiv.addEventListener("click", (e) => {
    e.preventDefault();
    const confirmed = confirm("Are you sure you want to delete?");
    if(confirmed)  addNewContainer.classList.remove("active")
})
addNewBtn.addEventListener("click", (e) => {
    e.preventDefault()
    
        dataArr.push({
            time: getTime(),
            date: getDate(),
            name: addNewName2.value,
            amount: addNewAmount2.value,
            transactionID: generateRandomString(),
            type: "Buy"
        })
        addNewContainer.classList.remove("active")
        showTransactionHis()
        showAllTransactions()
        showLatestTransactions()
        recentActivities();
        calculateAllSpending();
        calculateMoneyLeft()
        createChart()
})

// acum trebuie sa fac o functie sa arate itemele din dataArr in transaction history
const showTransactionHis = () => {
    historyBoxes.innerHTML = "";
    showTransHis = dataArr.slice(-7)
    showTransHis.forEach((item, index) => {
       const { time, name, amount, type } = item;
       const nameValue = cutText(name, 10)
       const historyBox = document.createElement("div");
       historyBox.classList.add("history-box");
       historyBoxes.appendChild(historyBox);

       const buy = document.createElement("p");
       buy.textContent = type;
       historyBox.appendChild(buy)

       const price = document.createElement("p");
       price.textContent = `$${amount}`;
       historyBox.appendChild(price);

       const nameHistory = document.createElement("p");
       nameHistory.textContent = `${nameValue}`;
       historyBox.appendChild(nameHistory);

       const timeHistory = document.createElement("p");
       timeHistory.textContent = `${time}`;
       historyBox.appendChild(timeHistory);

       const completed = document.createElement("p");
       completed.textContent = `Completed`;
       historyBox.appendChild(completed)

       const close = document.createElement("span");
       close.classList.add("close");
       close.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
       historyBox.appendChild(close);

       close.addEventListener("click", () => {
        dataArr.splice(dataArr.indexOf(item), 1);
            showTransactionHis();
            showLatestTransactions();
            showAllTransactions()
            calculateAllSpending()
            calculateMoneyLeft()
       })
    })
}

// trebuie sa schimb sa fac pentru trans history 
const showAllTransactions = () => {
    transactionBoxes.innerHTML = "";
    dataArr.forEach((item) => {
        const { date, time, name, amount, transactionID } = item;
        const nameValue = cutText(name, 10)
        
        const transactionBox = document.createElement("div");
        transactionBox.classList.add("transaction-box");
        transactionBoxes.appendChild(transactionBox);

        const span = document.createElement("span");
        span.innerHTML = `<i class="fa-solid fa-coins"></i>`;
        transactionBox.appendChild(span)

        const dateTran = document.createElement("p");
        dateTran.textContent = date;
        transactionBox.appendChild(dateTran);

        const timeTran = document.createElement("p");
        timeTran.textContent = time;
        transactionBox.appendChild(timeTran);

        const transId = document.createElement("p");
        transId.textContent = transactionID;
        transactionBox.appendChild(transId);

        const nameTran = document.createElement("p");
        nameTran.textContent = nameValue;
        transactionBox.appendChild(nameTran);

        const amountTran = document.createElement("p");
        amountTran.textContent = `$${amount}`;
        transactionBox.appendChild(amountTran);

        const completed = document.createElement("p")
        completed.textContent = "Completed";
        completed.style.color = "#45a049"
        transactionBox.appendChild(completed)
        
        const close = document.createElement("div");
        close.classList.add("close");
        close.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        transactionBox.appendChild(close);
 
        close.addEventListener("click", () => {
         dataArr.splice(dataArr.indexOf(item), 1);
         showTransactionHis();
         showAllTransactions()
         showLatestTransactions()
         calculateAllSpending()
         calculateMoneyLeft()
        })
     })
}

const showLatestTransactions = () => {
    transactionBoxesLatest.innerHTML = "";
    let latestTransactions = dataArr.slice(-3)
    latestTransactions.forEach((item) => {
        const { name, amount} = item;
        const nameValue = cutText(name, 7      )
        const transactionBox = document.createElement("div")
        transactionBox.classList.add("transaction-box");
        transactionBoxesLatest.appendChild(transactionBox);
        transactionBox.innerHTML += `
        <span class="tran-icon">
                            <i class="fa-solid fa-money-bills"></i>
                        </span>
                        <div>
                            <h3>Outcome: <span>${nameValue}</span></h3>
                            <p>Succesfully</p>
                        </div>
                        <p>$${amount}</p>
        `
    })
}

const getTime = () => {
    let date = new Date();
    let minutes = date.getMinutes();
    let hour = date.getHours();
    let seconds = date.getSeconds();
    let ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; 

    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    let currentDate = `${hour} : ${minutes} : ${seconds} ${ampm}`;
    return currentDate
}

const getDate = () => {
    let date = new Date();
    let days = date.getDate();
    let months = date.getMonth() + 1;
    let years = date.getFullYear();
    let month;
    if(months === 1) {
        month = "Jan"
    } else if(months === 2) {
        month = "Feb"
    } else if(months === 3) {
        month = "Mar"
    } else if(months === 4) {
        month = "Apr"
    } else if(months === 5) {
        month = "May"
    } else if(months === 6) {
        month = "Jun"
    } else if(months === 7) {
        month = "Jul"
    } else if(months === 8) {
        month = "Aug"
    } else if(months === 9) {
        month = "Sep"
    } else if(months === 10) {
        month = "Oct"
    } else if(months === 11) {
        month = "Now"
    } else if(months === 12) {
        month = "Dec"
    }
    
    const year = years.toString().slice(-2)
    let currentDate = `${days} ${month} ${year}`;
    return currentDate
}
// Function to change the slides
const allContent = document.querySelectorAll(".big-div");
const tabs = document.querySelectorAll(".side-opt");

tabs.forEach((tab, index) => {
    tab.addEventListener("click", (e) => {
        e.preventDefault();
        tabs.forEach(tab => tab.classList.remove("active"));
        tab.classList.add("active");
        sideBar.classList.remove("active")

        allContent.forEach(content => content.classList.remove("active"));
        allContent[index].classList.add("active");
    });
});

// function to generate an random transaction id 
const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    const length = 10;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
    }

    return randomString;
};


// Function to cut the exeeding lenght
const cutText = (value, maxLength) => {
    const valLength = value.length;
    if (valLength > maxLength) {
        if (!isNaN(value)) { 
            return value.slice(0, maxLength) + "..."; 
        } else {
            return value.slice(0, maxLength) + "..."; 
        }
    } else { 
        return value;
    }
};

boxes.forEach((box) => {
    const icon = box.querySelector("#opt");
    const change = box.querySelector(".change");
    const input = box.querySelector("input")
    icon.addEventListener("click", () => {
        change.classList.toggle("active")
    })
    change.addEventListener("click", () => {
        change.classList.remove("active")
        input.removeAttribute("readonly");
        input.value = "";
        input.placeholder = "Hit Enter after entering new value"
    })
    input.addEventListener("keydown", (e) => {
        if(e.key === "Enter") {
            input.setAttribute("readonly", true);
            input.value = cutText(input.value, 7);
            input.placeholder = ""
            sallary = input.value
        }
    })
})
// Code to remove the history div and the notification
historyOpt.addEventListener("click", () => {
    removeHistory.classList.toggle("active")
})
removeHistory.addEventListener("click", () => {
    historyDiv.remove()
})
bell.addEventListener("click", () => {
    isTrue = !isTrue;
    bell.innerHTML = isTrue ? `<i class="fa-solid fa-bell-slash"></i>` : `<i class="fa-regular fa-bell"></i>`;
    if(isTrue) {
        historyDiv.remove()
    } 
})

transferPersons.forEach((person) => {
    const name = person.querySelector(".person-name").textContent
    person.addEventListener("click", () => {

        const div = document.createElement("div");
        div.classList.add("send-money");
        body.appendChild(div);
       
        const transferDiv = document.createElement("div");
        transferDiv.classList.add("transfer-div");
        div.appendChild(transferDiv);

        const personName = document.createElement("h2");
        personName.classList.add("personName");
        transferDiv.appendChild(personName);
        personName.textContent = `Transfering money to  ${name}`

        const inputDesc = document.createElement("p");
        inputDesc.textContent = "Enter amount to send";
        transferDiv.appendChild(inputDesc);

        const inputAmount = document.createElement("input");
        inputAmount.type = "number";
        inputAmount.min = 0;
        inputAmount.classList.add("input-transfer")
        transferDiv.appendChild(inputAmount);
        
        const closeIcon = document.createElement("span");
        closeIcon.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        div.appendChild(closeIcon);

        closeIcon.addEventListener("click", () => {
            div.remove()
        })

        const button = document.createElement("button");
        button.textContent = "Send Money";
        transferDiv.appendChild(button);
        button.addEventListener("click", () => {
            div.remove()
            moneyTransfered += inputAmount.value
            calculateAllSpending()
            calculateMoneyLeft()
            dataArr.push({
                time: getTime(),
                date: getDate(),
                name: name,
                amount: inputAmount.value,
                transactionID: generateRandomString(),
                type: "Transfer"
            })
            showTransactionHis();
            showAllTransactions();
            showLatestTransactions();
            calculateAllSpending();
            calculateMoneyLeft();
    })           
    });
});

// function that creates everything
const createBudget = () => { 
    formContainer.style.display = "none";
    monthlyIncome = monthlyInput.value;
    name = nameInput.value;
    password = passwordInput.value;
    email = emailInput.value;
    utilities = utilitiesInput.value;
    rent = rentInput.value;
    country = countryInput.value;
    occupation = occupationInput.value;
    
    dataArr.push({
        time: getTime(),
        date: getDate(),
        name: addNewName.value,
        amount: addNewAmount.value,
        transactionID: generateRandomString(),
        type: "Buy"
    })
    updateBudgetText();
    calculateAllSpending();
    calculateMoneyLeft()
    showTransactionHis()
    showAllTransactions()
    showLatestTransactions()
    recentActivities();
    if (addNewName.value === "" || addNewAmount.value === "") {
        activityBox.innerHTML = "";
        transactionBoxes.innerHTML = "";
        historyBoxes.innerHTML = "";
        transactionBoxesLatest.innerHTML = "";  
    } 
}


const updateBudgetText = () => {
    guestName.textContent = name;
    incomeInput.value = monthlyIncome;
    rentBoxInput.value = rent;
    utilitiesBoxInput.value = utilities;
    passwordBoxInput.value = password;
    emailBoxInput.textContent = email;   
    walletAmount.textContent = `+$${monthlyIncome}`;
    walletOutcome.textContent = calculateAllSpending()
    occupationText.textContent = occupation;
    countryText.textContent = country
}
const calculateAllSpending = () => {
    const calculatedShopping = dataArr.reduce((total, item) => {
        return total + parseFloat(item.amount);
    }, 0);
    const calculatedValue =  Number(calculatedShopping) + Number(utilities) + Number(rent) + Number(moneyTransfered);
    const modifyedValue = `-$${calculatedValue}`
    walletOutcome.innerHTML = modifyedValue
    spending = calculatedShopping
    createChart()
    return calculatedValue
}

// function to always calculate the money left
const calculateMoneyLeft = () => {
    let outcome = calculateAllSpending();
    let budgetLeft = Number(monthlyIncome) - outcome
    budgetRemaining.textContent = `$${budgetLeft}`
}


// Code to display the recent activities, takes out the last two values of dataArr
const recentActivities = () => {
    activityBox.innerHTML = "";
    const lastTwoItems = dataArr.slice(-2);
    lastTwoItems.forEach((item) => {
        const { name, amount, date } = item;
        const activity = document.createElement("div");
        activity.classList.add("activity");
        activityBox.appendChild(activity);
        
        const span = document.createElement("span");
        span.classList.add("icon");
        activity.appendChild(span);
        span.innerHTML = `<i class="fa-solid fa-wallet"></i>`

        const nameText = document.createElement("p");
        nameText.classList.add("name");
        activity.appendChild(nameText)
        nameText.textContent = name;

        const dateAct = document.createElement("p");
        dateAct.classList.add("date");
        activity.appendChild(dateAct);
        dateAct.textContent = date


        const price = document.createElement("p");
        price.classList.add("price");
        activity.appendChild(price);
        price.textContent = `$${amount}`

        const completed = document.createElement("p");
        completed.classList.add("completed");
        activity.appendChild(completed);
        completed.textContent = "Completed"
    })
}
// Code for the Chart
let myChart;
const createChart = () => {

    

    const ctx = document.getElementById('myChart');    
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Income', 'Mortgauge/Rent', 'Utilities', 'Spending', 'Money Transfered',],
            datasets: [{
              label: 'Hide columns',
              data: [monthlyIncome, rent, utilities, spending, moneyTransfered],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
}       