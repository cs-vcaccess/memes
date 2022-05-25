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
    $('#allTheTodoItems').append(`
      <div class="todoItem">
        <h3>${title}</h3>
        <p>${body}</p>
        <id hidden>${id}</id>
      </div>
    `)
  })
}
