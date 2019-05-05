import React, { Component } from "react";

class Preposition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });

    // update localStorage
    localStorage.setItem(key, value);
  }

  addItem() {
    // create a new item
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice().toLowerCase()
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
    });

     // update localStorage
     localStorage.setItem("list", JSON.stringify(list));
     localStorage.setItem("newItem", "");
    
  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });

    // update localStorage
  localStorage.setItem("list", JSON.stringify(updatedList));
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
 }

 saveStateToLocalStorage() {
  // for every item in React state
  for (let key in this.state) {
    // save to localStorage
    localStorage.setItem(key, JSON.stringify(this.state[key]));
  }
}

componentWillUnmount() {
  window.removeEventListener(
    "beforeunload",
    this.saveStateToLocalStorage.bind(this)
  );

  // saves if component has a chance to unmount
  this.saveStateToLocalStorage();
}

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  render() {

    const {list} = this.state.list;

    let button;

    if (list === 'why') {

       button =  'Congratulation, you made it!';

    }else{
        button =  'Sorry, your answer is wrong!';
    }
    return (
      <div className="App">
        
          
          <h1 className="App-title">Word Puzzle</h1>
        
        <div style={{ padding: 50, textAlign: "left", maxWidth: 500, margin: "auto" }}>
          <p>Complete the blank space with the correct preposition</p>
          1. May I to know  
          
          <input
            type="text"
            placeholder="preposition..."
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />you are crying.  
          <button
            onClick={() => this.addItem()}
            disabled={!this.state.newItem.length}
          >
            &#43; Add
          </button>
          <br /> <br />
          <div>
            {this.state.list.map(item => {
              return (
                <div key={item.id}>
                  <p>1. May I to know {item.value} you are crying.</p>
                  <p>{button}</p>
                  <button onClick={() => this.deleteItem(item.id)} style={{display:'none'}}>
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Preposition;