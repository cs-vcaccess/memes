// my page just loaded so I'm gonna show what's currently in the db
updateDisplay()

$('#submit-button').on('click', async () => {
  const title = $('#title-input').val()
  const body = $('#body-input').val()
  $.post(
    'http://localhost:3000/create',
    {
      title: title,
      body: body
    },
    () => updateDisplay()
  )
  $('#title-input').val('')
  $('#body-input').val('')
})
async function updateDisplay() {
  $('#allTheTodoItems').html('')
  const request = await fetch('http://localhost:3000/read')
  const response = await request.json()
  response.forEach(entry => {
    const {id, title, body} = entry
    const newItem = $(`
        <div class="todoItem">
          <h3>${title}</h3>
          <div>
            <p>${body}</p>
            <img src="pencil.svg" id="${id}">
          </div>
        </div>
      `)
    $('#allTheTodoItems').append(newItem)
    $('#allTheTodoItems > .todoItem:last-child > div > img').on('click', async e => {
      $('#allTheTodoItems').html('')
      const _request = await fetch(`http://localhost:3000/read/${e.target.id}`)
      const {id, title, body} = JSON.parse(await _request.text())
      $('#allTheTodoItems').append(`
        <div class="todoItem">
          <input type="text" name="title" id="title-update" value="${title}"/>
          <input type="text" name="body" id="body-update" value="${body}"/>
          <button type="submit" value="idk" id="update-submit-button">Submit</button>
          <button type="submit" value="" id="delete">Delete</button>
        </div>
      `)
      // made an update forum, now to actually perform the update
      $('#update-submit-button').on('click', async () => {
        const title = $('#title-update').val()
        const body = $('#body-update').val()
        $.ajax({
          type: 'PATCH',
          url: `http://localhost:3000/update/${id}`,
          data: {
            id: id,
            title: title,
            body: body
          }
        })
        updateDisplay()
      })
      $('#delete').on('click', async () => {
        $.ajax({
          type: 'DELETE',
          url: `http://localhost:3000/delete/${id}`
        })
        updateDisplay()
      })
    })
  })
}

