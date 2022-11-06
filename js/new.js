const resetBtnEl = document.querySelector('#reset')
const nextBtnEl = document.querySelector('#next')
const submitBtnEl = document.querySelector('#submit-btn')

const newUserFormEl = document.querySelector('#new-user-form')
const saveInfoForm = document.querySelector('#save-info-form')

let saveInfoValue = null;

const saveInfoButtons = document.querySelectorAll('input[name=save-info]')

resetBtnEl.addEventListener('click', function () {
  newUserFormEl.querySelectorAll('input')
    .forEach(function (inputEl) {
      inputEl.value = ''
    });

  newUserFormEl.querySelectorAll('select')
    .forEach(function (selectEl) {
      selectEl.value = ''
    });

  newUserFormEl.querySelector('#name').focus()
})

nextBtnEl.addEventListener('click', function (e) {
  if (! newUserFormEl.checkValidity()) {
    return
  }

  e.preventDefault();

  let invalid = false

  if (!newUserFormEl.querySelector('#name').value) {
    newUserFormEl.querySelector('#name').closest('div').style['border-color'] = 'red'
    newUserFormEl.querySelector('#name').closest('div').nextElementSibling.style.display = 'inline-block'
    invalid = true
  } else {
    newUserFormEl.querySelector('#name').closest('div').style['border-color'] = 'transparent'
    newUserFormEl.querySelector('#name').closest('div').nextElementSibling.style.display = 'none'
  }

  if (invalid) {
    return
  }

  if (newUserFormEl.querySelector('#id-card-number').value.length < 8) {
    alert('Invalid id card number');
    return
  }

  newUserFormEl.style.display = 'none'
  saveInfoForm.style.display = 'block'
})

// 同意，不同意儲存個人資料在本地設備
saveInfoButtons.forEach(btnEl => {
  btnEl.addEventListener('click', function() {
    if (this.checked) {
      saveInfoValue = this.value
    } else {
      saveInfoValue = null
    }

    saveInfoButtons.forEach(btnEl => {
      if (btnEl.value !== saveInfoValue) {
        btnEl.checked = false
      }
    })
  })
})

submitBtnEl.addEventListener('click', function () {
  if (saveInfoValue == null) {
    alert('請選擇是否儲存資料')

    return
  }

  if (saveInfoValue == '1') {
    localStorage.setItem('user', JSON.stringify({
      name: newUserFormEl.querySelector('#name').value,
      gender: newUserFormEl.querySelector('#gender').value,
      year: newUserFormEl.querySelector('#year').value,
      month: newUserFormEl.querySelector('#month').value,
      day: newUserFormEl.querySelector('#day').value,
    }))
  } else {
    localStorage.clear()
  }

  window.location = '/'
})
