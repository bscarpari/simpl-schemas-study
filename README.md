<a name="readme-top"></a>

<img alt="Header" width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=7B61FF&height=180&section=header&text=simpl-schema%20Study&fontSize=38&fontColor=ffffff&fontAlignY=32&desc=Schema%20Validation%20%C2%B7%20Node.js%20%C2%B7%20MongoDB&descAlignY=52&descSize=16"/>

<h3 align="center">Introductory study on schema validation with simpl-schema and MongoDB</h3>

<p align="center">
  <a href="https://www.linkedin.com/in/bscarpari/">
    <img alt="Made by" src="https://img.shields.io/badge/-Bruno%20Scarpari-blue?style=flat-square&logo=Linkedin&logoColor=white">
  </a>

  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/bscarpari/simpl-schemas-study?style=flat-square">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/bscarpari/simpl-schemas-study?style=flat-square">

  <a href="https://github.com/bscarpari/simpl-schemas-study/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/bscarpari/simpl-schemas-study?style=flat-square">
  </a>
</p>

<p align="center">
  <a href="#-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-authors">Authors</a>
</p>

---

## 🌐 About

A study repository exploring **simpl-schema**, an npm package that validates data against a defined schema in Meteor and Node.js applications.

The exercises cover how a schema rejects malformed input, what error messages it produces, and how validation rules compose — the same reasoning behind contract validation when testing APIs.

> This is a learning repository, not a production project.

---

## 🚀 Technologies

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Meteor](https://img.shields.io/badge/Meteor-DE4F4F?style=for-the-badge&logo=meteor&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

- **simpl-schema** — npm package that validates data input against a schema
- **Meteor** — fullstack JavaScript framework where the package is commonly used
- **MongoDB** — document-oriented NoSQL database

---

## 💻 Getting started

**Requirements**

| Tool | Notes |
|------|-------|
| Node.js | >= 14.x |
| MongoDB | [installation guide](https://docs.mongodb.com/manual/tutorial/) |
| Code Runner | VS Code extension, used to run the snippets |

**1. Clone the repository**

```bash
git clone https://github.com/bscarpari/simpl-schemas-study.git
cd simpl-schemas-study
```

**2. Install dependencies**

```bash
npm install
```

**3. Import the package at the top of each file**

```js
const SimpleSchema = require("simpl-schema");
```

> Only applies to standalone simpl-schema exercises. Running them inside Meteor requires the remaining Meteor dependencies.

**4. Run a file**

With the **Code Runner** extension installed in VS Code:

| Action | Shortcut |
|--------|----------|
| Run | `Ctrl + Alt + N` |
| Stop | `Ctrl + Alt + M` |

---

## 👥 Authors

- [Bruno Scarpari](https://github.com/bscarpari/)
- [Kainã Mazim](https://github.com/KaMazim)

---

<p align="center">
  Made with 💜 by <a href="https://www.linkedin.com/in/bscarpari/">Bruno Scarpari</a> ·
  <a href="https://github.com/bscarpari">GitHub</a> ·
  <a href="mailto:bscarpari.dev@gmail.com">Email</a>
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<img alt="Footer" width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=7B61FF&height=100&section=footer"/>
