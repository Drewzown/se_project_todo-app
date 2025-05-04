class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._completed = data.completed;
    this._todoTemplate = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    const todoDeleteButton =
      this._todoElement.querySelector(".todo__delete-btn");

    todoDeleteButton.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._todoElement.remove();
    });

    this._todoCheckboxElement.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed);
    });
  }

  _generateCheckboxElement() {
    this._todoCheckboxElement =
      this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxElement.checked = this._completed;
    this._todoCheckboxElement.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  _toggleCompletion() {
    this._completed = !this._completed;
  }

  _getDate() {
    const todoDate = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._date);

    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._todoTemplate.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameElement = this._todoElement.querySelector(".todo__name");

    todoNameElement.textContent = this._name;

    this._getDate();
    this._generateCheckboxElement();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;