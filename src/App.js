import React, { Component } from 'react';

import uuid from 'uuid';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: 0,
      answerPoints: 0,
      selectedOption: "",
      results: ["Not good.", "Poor.", "Meh.", "You know a little bit.", "Well done!", "You're so smart!"],
      QandA: [
        {
          id: uuid.v4(),
          question: "How many states are there in the United States?",
          choices: [
            {text: "13", value: 13},
            {text: "50", value: 50},
            {text: "52", value: 52}
          ]
        },
        {
          id: uuid.v4(),
          question: "What is the supreme law of the land?",
          choices: [
            {text: "Bill of Rights", value: "Bill of Rights"},
            {text: "Declaration of Independence", value: "Declaration of Independence"},
            {text: "The Consitution", value: "The Constitution"}
          ]
        },
        {
          id: uuid.v4(),
          question: "What is the economic system in the United States?",
          choices: [
            {text: "Capitalist Economy", value: "Capitalist Economy"},
            {text: "Socialist Economy", value: "Socialist Economy"},
            {text: "Traditional Economy", value: "Traditional Economy"}
          ]
        },
        {
          id: uuid.v4(),
          question: "Who makes federal law?",
          choices: [
            {text: "The President", value: "The President"},
            {text: "Congress", value: "Congress"},
            {text: "United Nations", value: "United Nations"}
          ]
        },
        {
          id: uuid.v4(),
          question: "U.S. House Representatives serve for how many years?",
          choices: [
            {text: "4", value: 4},
            {text: "6", value: 6},
            {text: "2", value: 2}
          ]
        },
        {
          id: uuid.v4(),
          question: "",
          choices: []
        }
      ],
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleClick() {
    console.log(this.state.selectedOption);
    if (this.state.currentVal < 5) {
      if (this.state.selectedOption == 50 || this.state.selectedOption == "The Constitution" || this.state.selectedOption == "Capitalist Economy" || this.state.selectedOption == "Congress" || this.state.selectedOption == 2) {
        console.log("correct answer")
        this.setState({
          currentVal: this.state.currentVal + 1,
          answerPoints: this.state.answerPoints + 1
        });
      } else {
        console.log("incorrect answer")
        this.setState({
          currentVal: this.state.currentVal + 1,
          answerPoints: this.state.answerPoints
        });
      }
    }
  }

  handleOnChange(e) {
    console.log(e.target.value);
    this.setState({
      selectedOption: e.target.value,
    });
  }

  handleReset() {
    console.log("reset quiz");
    this.setState({
      currentVal: 0,
      answerPoints: 0,
      selectedOption: "",
    });
  }

  render() {
    var text;
    const QuizOption = ({options, selected, onChange}) => {
      if (this.state.currentVal < 5) {
        return (
          <div>
            <h3>{this.state.QandA[this.state.currentVal].question}</h3>
            {options.map((choice, index) => (
              <div className="form-check">
                <input type="radio"
                  className="form-check-input"
                  name="choice"
                  key={index}
                  value={choice.value}
                  checked={selected == choice.value}
                  onChange={onChange} />
                <label key={index} className="form-check-label">
                  {choice.text}
                </label>
              </div>
            ))}
            <button id="submit" type="button" className="btn btn-success btn-block" onClick={() => this.handleClick()}>Submit</button>
            <button id="reset" type="button" className="btn btn-danger btn-block" onClick={() => this.handleReset()}>Start Over</button>
          </div>
        );
      } else {
        return (
          <div className="align-center results">
            <p>Results!</p>
            <p>{this.state.answerPoints} / 5</p>
            <p>{this.state.results[this.state.answerPoints]}</p>
            <button id="reset" type="button" className="btn btn-danger btn-block" onClick={() => this.handleReset()}>Start Over</button>
          </div>
        )
      }
    };

    return (
      <div className="align-middle">
        <div>
          <h1>How much do you know about the United States?</h1>
        </div>
        <div className="question-box">
          <div className="align-left">
            <QuizOption
              options={this.state.QandA[this.state.currentVal].choices}
              onChange={(e) => this.handleOnChange(e)}
              selected={this.state.selectedOption} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
