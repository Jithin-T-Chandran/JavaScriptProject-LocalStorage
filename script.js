function saveData(event) {
    event.preventDefault();
    const message = document.getElementById("displayError");
    message.innerHTML = "";
    try {
      const expense = event.target.ExpenseDetails.value;
      const description = event.target.DescriptionDetails.value;
      const category = event.target.CategoryDetails.value;
      if (expense == "" || description == "" || category == "")
        throw "Input field must not be empty";
      if (isNaN(expense)) throw "Expense field must be a number";
      const obj = {
        expense,
        description,
        category,
      };
      localStorage.setItem(obj.description, JSON.stringify(obj));
      displayListOnScreen(obj);
    } catch (err) {
      message.innerHTML = "Error: " + err + ".";
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localstoragekeys = Object.keys(localStorageObj);

    for (var i = 0; i < localstoragekeys.length; i++) {
      const key = localstoragekeys[i];
      const userDetailsString = localStorageObj[key];
      const userDetailsObj = JSON.parse(userDetailsString);
      displayListOnScreen(userDetailsObj);
    }
  });

  function displayListOnScreen(user) {
    const message = document.getElementById("displayError");
    message.innerHTML = "";
    try {
      document.getElementById("ExpenseDetails").value = "";
      document.getElementById("DescriptionDetails").value = "";
      document.getElementById("CategoryDetails").value = "";
      // console.log(localStorage.getItem(user.emailId))
      if (localStorage.getItem(user.description) !== null) {
        removeListFromScreen(user.description);
      }

      const parentNode = document.getElementById("users");
      const childHTML = `<li id=${user.description} class="list-group-item"> <span class="font-style">${user.expense}</span> - <span class="crimson-text">${user.description}</span>
                                <button id="btn1" class="btn btn-danger btn-xs" onclick=deleteList('${user.description}')> Delete </button>
                                <button id="btn2" class="btn btn-primary btn-xs" onclick=editList('${user.description}','${user.expense}','${user.category}')>Edit</button>
                             </li>`;

      parentNode.innerHTML = parentNode.innerHTML + childHTML;
    } catch (err) {
      message.innerHTML = "Error: " + err + ".";
    }
  }

  //Edit

  function editList(description, expense, category) {
    document.getElementById("ExpenseDetails").value = expense;
    document.getElementById("DescriptionDetails").value = description;
    document.getElementById("CategoryDetails").value = category;

      //deleting
      localStorage.removeItem(description);
      removeListFromScreen(description);
  }

  // Delete

  function deleteList(description) {
    if (confirm("Are you sure to delete this record ?")) {
      console.log(description);
      localStorage.removeItem(description);
      removeListFromScreen(description);
    }
  }

  function removeListFromScreen(description) {
    const parentNode = document.getElementById("users");
    const childNodeToBeDeleted = document.getElementById(description);
    console.log(childNodeToBeDeleted);
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  }