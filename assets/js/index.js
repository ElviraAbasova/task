import { User } from "./baseURL.js";
import { getDatas, deleteData, postDatas, getDataId } from "./requests.js";

const tbody = document.querySelector("tbody");
const getdata = document.querySelector(".getdata");
const inputName = document.querySelector(".inputName");
const inputSurname = document.querySelector(".inputSurname");
const inputAge = document.querySelector(".inputAge");
const saveBtn = document.querySelector(".saveBtn");
const deletebtn = document.querySelector(".deletebtn");
const modal = document.querySelector(".modal-body");
                  
async function createTable() {
  let data = await getDatas(User);
  tbody.innerHTML = "";

  data.forEach((element) => {
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdName = document.createElement("td");
    const tdLastname = document.createElement("td");
    const tdAge = document.createElement("td");
    const tdButton = document.createElement("td");
    const tdDelete= document.createElement("button");
    const tdEdit= document.createElement("button");


    tdId.textContent = element.id;
    tdName.textContent = element.name;
    tdLastname.textContent = element.surname;
    tdAge.textContent = element.age;
    tdDelete.textContent = "X";
    tdEdit.textContent="Edit"
    tdEdit.setAttribute("data-bs-toggle","modal")
    tdEdit.setAttribute("data-bs-target","#exampleModal")
    tdEdit.setAttribute("data",element.id)

    tdEdit.addEventListener("click", async (e)=>{
      let edit = await getDataId(User,e.target.getAttribute("data"));
         modal.innerHTML = `
        <div class="modal-body">
          <label for=""  >Name</label>
          <br>
          <input class="editName" value =${edit.name} type="text">
          <br>
          <label for="">Lastanme</label>
          <br>
          <input class="editSurname" value =${edit.surname} type="text">
          <br>
          <label for="">Age</label>
          <br>
          <input class="editAge" type="number" value =${edit.age}>
        </div>
    `
    //  saveBtn.addEventListener("click",()=>{
    //   element.name = edit.name
    //  })
    })
    tdButton.append(tdDelete,tdEdit);
    tr.append(tdId, tdName, tdLastname, tdAge, tdButton);
    tbody.append(tr);

    tdDelete.setAttribute("data", element.id);
    tdDelete.addEventListener("click", (e) => {
      deleteData(User, e.target.getAttribute("data"));
      e.target.parentElement.parentElement.remove();
    });

    deletebtn.addEventListener("click", async (e) => {
      await deleteAll();
      tbody.innerHTML = "";
    });
    
    async function deleteAll() {
      const data = await getDatas(User);
      data.forEach(async (user) => {
        await deleteData(User, user.id);
      });
    }
    

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
  postDatas(User, obj);
});
