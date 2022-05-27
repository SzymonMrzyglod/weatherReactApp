import React, {Component} from 'react';
import './App.css';
import WeatherForm from '../WeatherForm/WeatherForm'
import WeatherResult from '../WeatherResult/WeatherResult'

const KEYApi = 'ef39c9d59e30776fa6c28a91fd47f445';

class App extends Component{
  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    wind: '',
    pressure: '',
    error: false
  }

  fetchWeather = () => {
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${KEYApi}&units=metric`;
    
    fetch(API)
    .then(response => {
      if(response.ok){
        return response;
      }
      throw Error('Błąd...')
    })
    .then(response => response.json())
    .then(data => {
      const date = new Date().toLocaleString();
      this.setState(prevState => ({
        date,
        city: prevState.value,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        temp: data.main.temp,
        wind: data.wind.speed,
        pressure: data.main.pressure,
        error: false
      }))
    })
    .catch(error => {
      this.setState(prevState => ({
        error: true,
        city: prevState.value
      }))
    })
  }

  handleInputChange = event => {
    this.setState({
      value: event.target.value
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.value)
    if(this.state.value.length === 1 ) return;
    if(prevState.value !== this.state.value){
      this.fetchWeather()
    }
  }

  render(){
    return(
      <div className="app">
        <div className='app-container'>
        <WeatherForm 
        value={this.state.value} 
        onChange={this.handleInputChange}
        />
        <WeatherResult 
        weather={this.state}
        />  
       </div>
      </div>
    )
  }
}


export default App;
