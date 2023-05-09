
export class Card {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = [
      {
        name: "Felipe-Monte",
        text: "Felipe text"
      },
      {
        name: "Jonas",
        text: "Jonas text"
      },
      {
        name: "Maria",
        text: "Maria text"
      }
    ]
  }
}

export class CardView extends Card {
  constructor(root) {
    super(root)
    this.render()
  }

  render() {
    this.deleteAllTr()
    this.createRow()

    this.entries.forEach(user => {
      const tbody = this.root.querySelector('table tbody')
      const tr = this.createRow()

      tr.querySelector('.logo img').src = `https://github.com/${user.name}.png`

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