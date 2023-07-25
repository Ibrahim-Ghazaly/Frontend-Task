
let tbody = document.getElementById("tbody");


let url = "https://my-json-server.typicode.com/Ibrahim-Ghazaly/json-server/country"
// let url = "http://localhost:3000/country"




// selectCountry function 

function selectCountry(){

  let country = document.getElementById("country");
  // document.getElementById("demo").innerHTML = "You selected: " + x;
  
        fetch(url,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              name:country.value,
             
            })
           }).then(res => res.json()).then(data => console.log(data))
    

   tbody.innerHTML ="";
    getCountries()
}



// get all countries functions 

function getCountries(){


   

    fetch(url).then(res => res.json()).then(data => {

       console.log(data)
  
       for(let i = 0 ; i < data.length ; i++){
        tbody.innerHTML  +=  `
         <tr >
         <td>${data[i].id}</td>
         <td>${data[i].name}</td>
        
         <td>
         <button class="btn btn-success btn-sm m-2" onclick= Edit(${data[i].id}) data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
         </td>
         <td>
         <button class="btn btn-danger btn-sm m-2" onclick = Delete(${data[i].id})>Delete</button>
         </td>
       </tr>
         
         `
       }
    })
     
}


getCountries()



// edit function 

let ediId = 0

function Edit(id){

  ediId = id;

let editInput = document.getElementById("editInput")

    fetch(`${url}/${id}`).then(res => res.json()).then(country => {

            editInput.value = country.name

    })

  }
  

  

  document.getElementById("editbtn").onclick = function(){

    fetch(`${url}/${ediId}`,{
              method:'PATCH',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                name:editInput.value
              })
             }).then(res => res.json()).then(data =>{
             console.log(data)
             tbody.innerHTML ="";
               getCountries()
      
             })
             
             editInput.value = '';
             document.getElementById("closeBtn").click()
               
      
        }


// delete function 

function Delete(id){

    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res =>
        res.json()).then(res =>{
          console.log(res)
    
       tbody.innerHTML ="";
       getCountries()
       });
}
