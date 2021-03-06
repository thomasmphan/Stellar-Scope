import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../../store';
import { logoutUser } from '../../store/actions/authActions';
import API from '../../utils/apiHelper';
import { Link } from 'react-router-dom';

const Dashboard = props => {
  const { state, dispatch } = useContext(Store);
  const [astroData, setAstroData] = useState();
  const user = state.auth.user;

  useEffect(() => {
    if (!state.auth.isAuthenticated)
      props.history.push('/login');

    API.getUser()
      .then(res => console.log({ res }))
      .catch(err => console.log({ err }));
  }, [state, props]);

  const astrologyAPICall = async () => {
    const dataRaw = {
      day: 12,
      month: 3,
      year: 1992,
      hour: 2,
      min: 23,
      lat: 19.132,
      lon: 72.342,
      tzone: 5.5
    };
    try {

      var _selectedPlanet = "Sun"
      const response = await fetch("https://json.astrologyapi.com/v1/planets/tropical", {
        method: 'POST', headers: {
          "Authorization": "Basic " + btoa("615856:4833e72955dc35aaff5f4cfb7e886220"),
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(dataRaw)
      });

      switch(_userInput) {
        case "Sun":
        _selectedPlanet = response[0];
        break;

        case "Moon":
          _selectedPlanet = response[1];
          break;

        case "Mars":
          _selectedPlanet = response[2];
          break;

        case "Mercury":
          _selectedPlanet = response[3];
          break;

        case "Jupiter":
          _selectedPlanet = response[4];
          break;

        case "Venus":
          _selectedPlanet = response[5];
          break;

        case "Saturn":
          _selectedPlanet = response[6];
          break;

        case "Uranus":
          _selectedPlanet = response[7];
          break;

        case "Neptune":
          _selectedPlanet = response[8];
          break;

        case "Pluto":
          _selectedPlanet = response[9];
          break;
          
        default:
            break;}

          const data = await response.json();
          setAstroData(data)
      } catch (e) { console.log({ e }) }
    };

    useEffect(() => {
      astrologyAPICall()
    }, []);

    const onLogoutClick = e => {
      e.preventDefault();

      logoutUser(props.history)(dispatch);
    };

    return (

      <div className="container"
        style={{
          width: '100%'
        }}>
        <div className="navbar">
          <nav className="z-depth-0">
            <div className="nav-wrapper grey"
              style={{
                background: 'rgb(238,174,202)',
                background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
              }}>
              <button
                className="btn btn-large waves-effect waves-light grey lighten-1"
                style={
                  {
                    width: '150px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    float: 'right',
                  }
                }
                onClick={onLogoutClick}>
                Logout
          </button>
              <Link to="/" className="col s5 brand-logo center white-text" style={{ fontFamily: 'Dancing Script' }}>
                <i className="material-icons">nightlight_round</i> Stellar Scope
            </Link>
            </div>

          </nav>
        </div>
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(' ')[0]}
              <p className="flow-text grey-text text-darken-1">
                Click on any card to unlock more astrology{' '}
              </p>
            </h4>

          </div>
        </div>
        <div className="row">
          <div class="col s4 center-align">
            <div class="card">
              <div class="card-image">
                <img src="images/sample-1.jpg" />
                <span class="card-title">Daily Astrology</span>
              </div>
              <div class="card-content">
                <p>.</p>
              </div>
              <div class="card-action">
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>

          <div class="col s4 center-align">
            <div class="card">
              <div class="card-image">
                <img src="images/sample-1.jpg" />
                <span class="card-title">Match Making</span>
              </div>
              <div class="card-content">
                <p>.</p>
              </div>
              <div class="card-action">
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>

          <div class="col s4 center-align">
            <div class="card">
              <div class="card-image">
                <img src="images/sample-1.jpg" />
                <span class="card-title">Horoscope</span>
              </div>
              <div class="card-content">
                <p>.</p>
              </div>
              <div class="card-action">
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>

          {astroData && <p>{JSON.stringify(astroData, null, 2)}</p>}
        </div>
      </div>

    );
  };

  export default Dashboard;
