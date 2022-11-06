const modalEl = document.querySelector('#modal');
const nextTimeInstallBtnEl = document.querySelector('#next-time-install-btn');
const submitBtnEl = document.querySelector('#submit-btn');
const submitLoadingEl = document.querySelector('#submit-loading');

let submitting = false;

function handleSubmit() {
  submitting = true
  submitLoadingEl.style.display = "block"

  setTimeout(function () {
    fetch('/data/mock-success.json')
      .then(res => res.json())
      .then((data) => {
        submitting = false
        submitLoadingEl.style.display = "none"

        if (data.message == 'ok') {
          // window.location = 'https://google.com'
        }
      })
  }, 3000)
}
submitBtnEl.addEventListener('click', handleSubmit)

function closeModal() {
  modalEl.style.display = 'none'
  // modalEl.style.opacity = 0
  // modalEl.style['pointer-events'] = 'none'
}

nextTimeInstallBtnEl.addEventListener('click', () => {
  closeModal()
})

function loadLocalStorageUser() {
  const userListEl = document.querySelector('#user-list')

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return
  }

  userListEl.innerHTML = `
    <input id="jack" type="checkbox" class="peer w-6 h-6 border">

    <label for="jack" class="inline-block ml-2">
      <span class="block transform -translate-y-1.5">${user.name}（註冊人）</span>
    </label>

    <div class="hidden peer-checked:block mt-4">
      <table class="border w-full">
        <thead>
          <tr>
            <th class="bg-[#F5F5F5] py-4 border text-left font-normal px-4">姓名:${user.name}（註冊人）</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="bg-white flex px-2 py-3">
              <div class="w-1/2 font-semibold">症狀：</div>
              <div class="w-1/2">無</div>
            </td>
          </tr>
          <tr class="border-b">
            <td class="bg-white flex px-2 py-3">
              <div class="w-1/2 font-semibold">曾密切接觸病人：（有/無 ）</div>
              <div class="w-1/2">無</div>
            </td>
          </tr>
          <tr class="border-b">
            <td class="bg-white flex px-2 py-3">
              <div class="w-1/2 font-semibold">旅居史：（有/無）</div>
              <div class="w-1/2">無外遊史</div>
            </td>
          </tr>
          <tr class="border-b">
            <td class="bg-white flex px-2 py-3">
              <div class="w-1/2 font-semibold">在澳地址：</div>
              <div class="w-1/2">從身份證明局提取</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
}

function init() {
  // closeModal()
  loadLocalStorageUser()
}

init()
