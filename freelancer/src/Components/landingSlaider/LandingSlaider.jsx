import React from 'react';
import '../landingSlaider/Slaider.css';
import styled from 'styled-components';

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  outline: 2px dotted magenta;
  z-index: 1;
`;
export default function LandingSlaider() {
  return (
    <div className="void" id="void">
      <div className="crop">
      <StyledUl id="card1-list" style={{ '--count': 6 }}>          <li className='list'>
            <div className="card1">
              <a href="#">
                <span className="model-name">Gretel-ACTGAN</span>
                <span>Model for generating highly dimensional, mostly numeric, tabular data</span>
              </a>
            </div>
          </li>
          <li className='list'>
            <div className="card1">
              <a href="#">
                <span className="model-name">Gretel-ACTGAN</span>
                <span>Model for generating highly dimensional, mostly numeric, tabular data</span>
              </a>
            </div>
          </li>
          <li className='list'>
            <div className="card1">
              <a href="#">
                <span className="model-name">Gretel-ACTGAN</span>
                <span>Model for generating highly dimensional, mostly numeric, tabular data</span>
              </a>
            </div>
          </li>
          <li className='list'> 
            <div className="card1">
              <a href="#">
                <span className="model-name">Gretel-ACTGAN</span>
                <span>Model for generating highly dimensional, mostly numeric, tabular data</span>
              </a>
            </div>
          </li>
          <li className='list'>
            <div className="card1">
              <a href="#">
                <span className="model-name">Gretel-ACTGAN</span>
                <span>Model for generating highly dimensional, mostly numeric, tabular data</span>
              </a>
            </div>
          </li>
          <li className='list'>
            <div className="card1">
              <a href="#">
                <span className="model-name">Gretel-ACTGAN</span>
                <span>Model for generating highly dimensional, mostly numeric, tabular data</span>
              </a>
            </div>
          </li>
          </StyledUl>
        <div className="last-circle" />
        <div className="second-circle" />
      </div>
      <div className="mask" />
      <div className="center-circle" />
    </div>
  );
}
