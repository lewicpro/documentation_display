

var given_data='http://localhost:3000/data'

fetch('http://localhost:3000/data')
.then(response => response.json())
.then(data => {
  document.getElementById('namespace').innerHTML = data.namespace;
  document.getElementById('function').innerHTML = data.function;
  document.getElementById('function_params').innerHTML = data.function_params;
  document.getElementById('description').innerHTML = data.description;
  document.getElementById('params').innerHTML = data.params;
  document.getElementById('returns').innerHTML = data.returns;
  document.getElementById('method').innerHTML = data.method;
})
.catch(error => {
  console.error('Error:', error);
});


fetch('http://localhost:3000/data')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('namespaced');

    data.forEach(item => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.innerHTML = item.namespace;
      link.setAttribute("data-namespace", item.namespace);
      link.setAttribute("data-function", item.function);
      link.setAttribute("data-function_params", item.function_params);
      link.setAttribute("data-description", item.description);
      link.setAttribute("data-params", item.params);
      link.setAttribute("data-returns", item.returns);
      link.setAttribute("data-method", item.method);
      link.setAttribute("data-rest", item.rest);
      listItem.classList.add('side-list');
      link.addEventListener('click', function(event) {
        listItem.classList.add('active');
        getData(event)
      });
      listItem.appendChild(link);
      list.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

  
  document.getElementById("getData").addEventListener("click", getData);
  function getData(event) {
    var namespace = event.target.getAttribute("data-namespace");
    var functiongiven = event.target.getAttribute("data-function");
    var params = event.target.getAttribute("data-function_params");
    var description = event.target.getAttribute("data-description");
    var params = event.target.getAttribute("data-params");
    var returns = event.target.getAttribute("data-returns");
    var method = event.target.getAttribute("data-method");
    var rest = event.target.getAttribute("data-rest");

    console.log("namespace:", namespace);
    console.log("functiongiven:", functiongiven);
    console.log("params:", params);
    console.log("returns:", returns);
    console.log("method:", method);
    console.log("rest:", rest);
    console.log("description:", description);
   

   // Get the content element
   const content = document.getElementById("fetch-content");
   // Fetch the external HTML file
   fetch("details.html")
   .then(response => response.text())
   .then(data => {
       // Update the innerHTML of the content element
       content.innerHTML = data;
       const h4 = document.getElementById("details-name");
       const functiond = document.getElementById("details-function");
       const returned = document.getElementById("details-returns");
       const methodd = document.getElementById("details-method");
       const restd = document.getElementById("details-rest");
       const descriptiond = document.getElementById("details-description");
     
       // Update the innerHTML of the h3 element
       h4.innerHTML = namespace;
       functiond.innerHTML = functiongiven;
       returned.innerHTML = returns;
       methodd.innerHTML = method;
       restd.innerHTML = rest;
       descriptiond.innerHTML = description;

   });
}


