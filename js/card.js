export class Github {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint)
      .then(data => data.json())
      .then(({ login, name, public_repos, followers, bio, location }) => ({
        login,
        name,
        public_repos,
        followers,
        bio,
        location
      }))
  }
}

export class Card {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username) {
    try {
      const userExist = this.entries.find(entry => entry.login === username)

      if (userExist) {
        throw new Error("Usuário ja cadastrado!")
      }

      const user = await Github.search(username)

      if (user.login === undefined) {
        throw new Error("Usuário não encontrado!")
      }

      this.entries = [user, ...this.entries]
      this.render()
      this.save()
      this.clearInput()

    } catch (error) {
      alert(error.message)
    }
  }
}

export class CardView extends Card {
  constructor(root) {
    super(root)
    this.render()
    this.onSearch()
  }

  clearInput() {
    const input = this.root.querySelector('.input_wrapper input')
    input.value = ''
    input.focus()
  }

  onSearch() {
    const btn = this.root.querySelector('header button')
    btn.onclick = () => {
      let { value } = this.root.querySelector('.input_wrapper input')

      this.add(value)
    }
  }

  removeAllUserList() {
    this.root.querySelector('#clear').onclick = () => {

      const removeIt = confirm("Remove all favorites ?")

      if (removeIt) {
        this.deleteAllTr()
        this.entries = []
        this.save()
      } else {
        return
      }
    }
  }

  render() {
    this.deleteAllTr()
    this.createRow()
    this.removeAllUserList()

    this.entries.forEach(user => {
      const tbody = this.root.querySelector('table tbody')
      const tr = this.createRow()

      tr.querySelector('.logo img').src = `https://github.com/${user.login}.png`
      tr.querySelector('.texts h2').textContent = `${user.name}`
      tr.querySelector('.texts .description').textContent = `${user.bio}`
      tr.querySelector('.texts .location').textContent = `${user.location}`

      tr.querySelector('.btn_apply button').onclick = () => {
        alert("working on this feature")
      }

      tbody.append(tr)
    })
  }

  createRow() {
    const tr = document.createElement('tr')
    tr.innerHTML = `
    <td class="logo"><img src="https://github.com/Felipe-Monte.png" alt="img_logo"></td>
    <td class="texts">
      <h2>User interaction</h2>
      <p class='description'>Google - 1600 amphitheatre parkway</p>
      <p class='location'>Posted 5 days ago</p>
    </td>
    <td class="btn_apply"><button>Apply</button></td>
    `
    return tr
  }

  deleteAllTr() {
    const tr = this.root.querySelectorAll('tr')
    tr.forEach(item => {
      item.remove()
    })
  }
}