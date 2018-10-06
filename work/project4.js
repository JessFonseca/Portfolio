function Form(props) {
  return (
    <React.Fragment>
      <div className="card-container">
        <div className="react-card-expanded">
          <form onSubmit={props.addCard}>
            <h2>{props.formTitle}</h2>
            <br />
            <input
              autoFocus
              className="edit-card-title"
              type="text"
              value={props.newName}
              onChange={props.handleTextNameInput}
              placeholder="Enter Name Here"
            />
            <hr className="card-line" />
            <textarea
              className="edit-card-info"
              type="text"
              value={props.body}
              onChange={props.handleTextBodyInput}
              placeholder="Enter Info Here"
            />
            <br />
            <input className="btn" type="submit" value={props.formBtn} />
            <button className="btn" onClick={props.cancelForm}>
              Cancel
            </button>
          </form>
        </div>
      </div>
      {/* <Card
        makeBig="react-card-expanded"
        key="1"
        id="1"
        name={props.newName}
        body={props.body}
        deleteCard=""
        date=""
        expand=""
        cardInfo=""
      /> */}
    </React.Fragment>
  );
}

function Card(props) {
  return (
    <React.Fragment>
      <div className="card-container">
        <div className={props.makeBig} onClick={props.expand}>
          <h2 className="card-title">Name:</h2>
          <br />
          <h2 className="card-name">{props.name}</h2>
          {/* <h2>ID: {props.id}</h2> */}
          <hr className="card-line" />
          <p className={props.cardInfo}>{props.body}</p>
          <p className="card-date">
            <i>Date Created: {props.date}</i>
          </p>
        </div>
        <button className="btn-del" onClick={props.deleteCard}>
          X
        </button>
        <button className="btn-edit" onClick={props.editCard}>
          Edit
        </button>
      </div>
    </React.Fragment>
  );
}

class App extends React.Component {
  state = {
    card: [],
    newName: "",
    body: "",
    edittingCardId: -1,
    counter: 0,
    isValid: true,
    showForm: false,
    showShowAddNewCardBtn: true,
    highlighted: false,
    showCardEditor: false,
    editting: false
  };

  isValid = () => {
    if (this.state.newName === "" || this.state.body === "") {
      return false;
    } else {
      return true;
    }
  };

  addCard = event => {
    event.preventDefault();
    if (this.isValid()) {
      var newCard = this.state.card.slice();
      newCard.reverse();

      newCard.push({
        id: this.state.counter + 1,
        name: this.state.newName,
        info: this.state.body,
        date: Date(),
        expand: "react-card",
        cardInfo: "card-info",
        highlight: false
      });
      newCard.reverse();
      newCard[this.state.edittingCardId + 1].expand = "react-card";
      newCard[this.state.edittingCardId + 1].cardInfo = "card-info";
      newCard[this.state.edittingCardId + 1].highlight = false;
      this.setState({
        card: newCard,
        newName: "",
        body: "",
        counter: this.state.counter + 1,
        isValid: true,
        showForm: false,
        showShowAddNewCardBtn: true,
        editting: false
      });
      this.showAllCards();
    } else {
      this.setState({
        isValid: false
      });
    }
  };

  addChanges = () => {
    var edittedCard = this.state.card.slice();
    edittedCard[this.state.edittingCardId].name = this.state.newName;
    edittedCard[this.state.edittingCardId].info = this.state.body;
    this.setState({
      card: edittedCard,
      newName: "",
      body: "",
      showCardEditor: false,
      showShowAddNewCardBtn: true,
      editting: false
    });
    edittedCard[this.state.edittingCardId].expand = "react-card";
    edittedCard[this.state.edittingCardId].cardInfo = "card-info";
    edittedCard[this.state.edittingCardId].highlight = false;
    this.showAllCards();
  };

  handleTextNameInput = name => {
    this.setState({
      newName: name.target.value
    });
  };

  handleTextBodyInput = body => {
    this.setState({
      body: body.target.value
    });
  };

  deleteCard = id => {
    var newCard = this.state.card.slice();
    newCard.splice(id, 1);
    this.setState({
      card: newCard,
      edittingCardId: 0
    });
    this.showAllCards();
  };

  editCard = id => {
    this.setState({
      newName: this.state.card[id].name,
      body: this.state.card[id].info,
      showCardEditor: true,
      showShowAddNewCardBtn: false,
      edittingCardId: id,
      showForm: false,
      editting: true
    });
  };

  handleFormButton = () => {
    // e.preventDefault();
    this.setState({
      showForm: true,
      showShowAddNewCardBtn: false,
      editting: true
    });
  };

  toggleExpand = id => {
    var updatedCard = this.state.card.slice();
    if (updatedCard[id].expand === "react-card") {
      updatedCard[id].expand = "react-card-expanded";
      updatedCard[id].cardInfo = "card-info-expanded";
      updatedCard[id].highlight = true;
      this.setState({
        card: updatedCard,
        highlighted: true,
        edittingCardId: id
      });
    } else {
      updatedCard[id].expand = "react-card";
      updatedCard[id].cardInfo = "card-info";
      updatedCard[id].highlight = false;
      this.setState({
        card: updatedCard,
        highlighted: false
      });
    }
  };

  showAllCards = () => {
    this.setState({
      highlighted: false
    });
  };

  cancelForm = () => {
    this.setState({
      newName: "",
      body: "",
      showCardEditor: false,
      showShowAddNewCardBtn: true,
      editting: false,
      showForm: false
    });
  };
  render() {
    // set card expand class

    //Validate input to require fields are used
    let validateMessage;
    if (this.state.isValid) {
      validateMessage = "";
    } else {
      validateMessage = (
        <p class="error-message">Please enter both a name and body message</p>
      );
    }

    //hide/show button to add new cards
    let ShowAddNewCardBtn;
    if (this.state.showShowAddNewCardBtn) {
      ShowAddNewCardBtn = (
        <div className="btn-center">
          <button className="btn" onClick={this.handleFormButton}>
            Add New Card
          </button>
        </div>
      );
    } else {
      ShowAddNewCardBtn = "";
    }

    // Hide/Show Form when "add new card" button is clicked

    let form;
    if (!this.state.showForm) {
      form = "";
    } else {
      form = (
        <Form
          addCard={this.addCard}
          newName={this.state.newName}
          body={this.state.body}
          handleTextNameInput={this.handleTextNameInput}
          handleTextBodyInput={this.handleTextBodyInput}
          formBtn="Add Card"
          cancelForm={this.cancelForm}
          formTitle="ADDING NEW CARD"
        />
      );
    }

    //Edit exisiting card
    let editCard;
    if (!this.state.showCardEditor) {
      editCard = "";
    } else {
      editCard = (
        <Form
          addCard={this.addChanges}
          newName={this.state.newName}
          body={this.state.body}
          handleTextNameInput={this.handleTextNameInput}
          handleTextBodyInput={this.handleTextBodyInput}
          formBtn="Add Changes"
          cancelForm={this.cancelForm}
          formTitle="EDITTING CARD"
        />
      );
    }

    return (
      <div className="App">
        <header>
          <h1>Lets make some notecards!</h1>
          {ShowAddNewCardBtn}
          {form}
          {validateMessage}
          {editCard}
        </header>
        <div
          className={
            this.state.editting
              ? "hide"
              : this.state.highlighted
                ? "highlighted-card-area"
                : "card-area"
          }
        >
          {this.state.card.map(card => (
            <Card
              makeBig={
                this.state.card[
                  this.state.card.findIndex(i => i.id === card.id)
                ].expand +
                (this.state.highlighted
                  ? this.state.card[
                      this.state.card.findIndex(i => i.id === card.id)
                    ].highlight
                    ? ""
                    : " hide"
                  : "")
              }
              key={card.id}
              id={card.id}
              name={card.name}
              body={card.info}
              deleteCard={() =>
                this.deleteCard(
                  this.state.card.findIndex(i => i.id === card.id)
                )
              }
              editCard={() =>
                this.editCard(this.state.card.findIndex(i => i.id === card.id))
              }
              date={card.date}
              expand={() =>
                this.toggleExpand(
                  this.state.card.findIndex(i => i.id === card.id)
                )
              }
              cardInfo={
                this.state.card[
                  this.state.card.findIndex(i => i.id === card.id)
                ].cardInfo
              }
            />
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
