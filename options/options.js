/*
Store the currently selected settings using browser.storage.local.
*/
function storeSettings() {

  function getTypes() {
    let dataTypes = "";
    const radioButtons = document.querySelectorAll(".data-types [type=radio]");
    for (let item of radioButtons) {
      if (item.checked) {
        dataTypes = item.getAttribute("data-type");
      }
    }
    return dataTypes;
  }

  const dataTypes = getTypes();
  browser.storage.local.set(dataTypes);
}

/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/
function updateUI(restoredSettings) {

  const radioButtons = document.querySelectorAll(".data-types [type=radio]");
  for (let item of radioButtons) {
    if (restoredSettings.dataTypes == item.getAttribute("data-type")) {
      item.checked = true;
    } else {
      item.checked = false;
    }
  }
}

function onError(e) {
  console.error(e);
}

/*
On opening the options page, fetch stored settings and update the UI with them.
*/
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);

/*
On clicking the save button, save the currently selected settings.
*/
const saveButton = document.querySelector("#save-button");
saveButton.addEventListener("click", storeSettings);
