// my page just loaded so I'm gonna show what's currently there in the db
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
})
async function updateDisplay() {
  $('#allTheTodoItems').html('')
  const request = await fetch('http://localhost:3000/read')
  const response = await request.json()
  const {id, title, body} = response[0]
  $('#allTheTodoItems').append(`
    <div class="todoItem">
      <h3>${title}</h3>
      <p>${body}</p>
      <id hidden>${id}</id>
    </div>
  `)
}
