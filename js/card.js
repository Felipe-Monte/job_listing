export class Github {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint)
      .then(data => data.json())
      .then(data => {
        console.log(data)
      })
  }
}

export class Card {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = [
      {
        name: "Felipe-Monte",
        text_h1: "Carlos Felipe"
      },
      {
        name: "Jonas",
        text_h1: "Jonas X"
      },
      {
        name: "Maria",
        text_h1: "Maria Edu"
      }
    ]
  }

  add(username) {
    Github.search(username)
  }
}

export class CardView extends Card {
  constructor(root) {
    super(root)
    this.render()
    this.onSearch()
  }

  onSearch() {
    const btn = this.root.querySelector('header button')
    btn.onclick = () => {
      const { value } = this.root.querySelector('.input_wrapper input')

      this.add(value)
    }
  }

  render() {
    this.deleteAllTr()
    this.createRow()

    this.entries.forEach(user => {
      const tbody = this.root.querySelector('table tbody')
      const tr = this.createRow()

      tr.querySelector('.logo img').src = `https://github.com/${user.name}.png`
      tr.querySelector('.texts h2').textContent = `${user.text_h1}`

      tr.querySelector('.btn_apply button').onclick = () => {
        // alert('clicked on button')
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
      <p>Google - 1600 amphitheatre parkway</p>
      <p>Posted 5 days ago</p>
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