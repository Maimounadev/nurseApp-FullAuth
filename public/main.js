var trash = document.getElementsByClassName("fa fa-trash");
let thumbsUp = document.getElementsByClassName('fa fa-thumbsup')

// for(let t of trash) {
//   t.addEventListener('click', function() {
//     console.log(t)
//     fetch('messages', {
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         id: t.id
//       })
//     }).then(function (response) {
//       window.location.reload()
//     })
//   })
// }
Array.from(trash).forEach(function(element) {
  
  element.addEventListener('click', function(e){
    console.log('hi')
    const _id = e.target.dataset.id
    
    console.log(_id)
    fetch('patient', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
Array.from(trash).forEach(function(element) {
  
  element.addEventListener('click', function(e){
    console.log('hi')
    const _id = e.target.dataset.id
    
    console.log(_id)
    fetch('input', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});


Array.from(thumbsUp).forEach(function (element) {
  element.addEventListener('click', function (e) {
      const _id = e.target.dataset.id
      console.log(_id)
      fetch('thumbsUp', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              _id
          })
      })
          .then(response => {
              if (response.ok) return response.json()
          })
          .then(data => {
              console.log(data)
              window.location.reload(true)
          })

  });
});  
    
