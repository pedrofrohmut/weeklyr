/**
 * Root Component For the entire App
 */
import React, { Component } from "react"
import AppAddingState from "./components/AppAddingState"
import AppEditingState from "./components/AppEditingState"
import AppLoadingState from "./components/AppLoadingState"
import AppCantConnectState from "./components/AppCantConnectState"
import MealService from "./services/MealService"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentState: this.getAppAddingState()
    }
  }

  getAppAddingState = (alertMsg, alertType) => (
    <AppAddingState
      onSetEditingState={this.handleOnEdit}
      onSetLoadingState={this.handleLoading}
      onSetAddingState={this.handleOnAdd}
      alertMsg={alertMsg}
      alertType={alertType}
    />
  )

  getAppEditingState = mealToEdit => <AppEditingState meal={mealToEdit} />

  getAppLoadingState = loadingMsg => <AppLoadingState msg={loadingMsg} />

  getAppCantConnectState = () => <AppCantConnectState />

  displayAddState = (msg, type) => {
    this.setState({
      currentState: this.getAppAddingState(msg, type)
    })
  }

  displayEditState = mealToEdit => {
    this.setState({
      currentState: this.getAppEditingState(mealToEdit)
    })
  }

  displayLoadingState = msg => {
    this.setState({
      currentState: this.getAppLoadingState(msg)
    })
  }

  displayCantConnectState = () => {
    this.setState({
      currentState: this.getAppCantConnectState()
    })
  }

  handleOnEdit = (mealId, e) => {
    e.preventDefault()
    this.displayLoadingState()
    MealService.getMeal(mealId)
      .then(meal => {
        this.displayEditState(meal)
      })
      .catch(err => console.log(err))
  }

  handleLoading = (msg, e) => {
    this.displayLoadingState(msg)
  }

  handleOnAdd = (msg, type, e) => {
    this.displayAddState(msg, type)
  }

  render() {
    return (
      <React.Fragment>
        {/* NavBar + Brand */}
        <nav className="navbar">
          <div className="container">
            <a href="/" className="navbar-brand">
              Track Calories
            </a>
          </div>
        </nav>

        {/* Content Container */}
        <main className="container">{this.state.currentState}</main>
      </React.Fragment>
    )
  }
}

export default App
