import { users } from "./baseURL.js";
import { getDatas, deleteData, postDatas } from "./requests.js";

const tbody = document.querySelector("tbody");
const getdata = document.querySelector(".getdata");
const inputName = document.querySelector(".inputName");
const inputSurname = document.querySelector(".inputSurname");
const inputAge = document.querySelector(".inutpAge");
const saveBtn = document.querySelector(".saveBtn");
const deletebtn = document.querySelector(".deletebtn");

async function createTable() {
  let data = await getDatas(users);
  tbody.innerHTML = "";

  data.forEach((element) => {
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdName = document.createElement("td");
    const tdLastname = document.createElement("td");
    const tdAge = document.createElement("td");
    const tdButton = document.createElement("td");
    const tdDelete= document.createElement("button");
    tdId.textContent = element.id;
    tdName.textContent = element.name;
    tdLastname.textContent = element.surname;
    tdAge.textContent = element.age;
    tdDelete.textContent = "X";

    tdDelete.setAttribute("data", element.id);
    tdDelete.addEventListener("click", (e) => {
      deleteData(users, e.target.getAttribute("data"));
      e.target.parentElement.parentElement.remove();
    });

    deletebtn.addEventListener("click", async (e) => {
      await deleteAll();
      tbody.innerHTML = "";
    });
    
    async function deleteAll() {
      const data = await getDatas(users);
      data.forEach(async (user) => {
        await deleteData(users, user.id);
      });
    }
    

    tdButton.append(tdDelete);
    tr.append(tdId, tdName, tdLastname, tdAge, tdButton);
    tbody.append(tr);
  });
}






getdata.addEventListener("click", async (e) => {
  createTable();
});

saveBtn.addEventListener("click", async (e) => {
  e.preventDefault;

  let obj = {};
  obj.name = inputName.value;
  obj.surname = inputSurname.value;
  obj.age = inputAge.value;
  postDatas(users, obj);
});
