var trash = document.querySelectorAll(".fa-trash");

for(let t of trash) {
  t.addEventListener('click', function() {
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: parseInt(t.id)
      })
    }).then(function (response) {
      window.location.reload()
    })
  })
}


//  var trash = document.querySelectorAll("fa fa-trash");


//  for(let t of trash) {
//      t.addEventListener('click', function() {
//         fetch('messages', {
//             method: 'delete',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//              body: JSON.stringify({
//               id : t.id,
//             })
//            }).then(function (response) {
//             window.location.reload()
//            })
//     })
//  }
       
    
