//turn into stateless component

import React, { Component } from 'react';
import '../styles/HeaderAppBar.css';
import { Link } from "react-router-dom";

class HeaderAppBar extends Component {

  activeTab = (e) => {
    const tabList = document.getElementById('topSubHeaderList')
    const tabListChildren = tabList.children
    for (let x = 0; x < tabListChildren.length; x++) {
      (tabListChildren[x].id === 'active') ? tabListChildren[x].id = '' : tabListChildren[x].id = ''
    }
    e.target.parentElement.id = 'active'
  }

  // <a onClick={(e) => this.activeTab(e)} className="topSubHeaderListItemA">Home</a>

  render() {
    return (
      <div>
        <div className="topHeaderContainer">
          <div className="topHeaderBody">
            <a id="companyTitle">BOOST</a>
            <p>Kieran Hillier</p>
          </div>
        </div>
        <div className="topSubHeaderContainer">
          <div className="topSubHeaderBody">
            <ul id="topSubHeaderList">
              <li id="active" className="topSubHeaderListItem">
                <Link onClick={(e) => this.activeTab(e)} className="topSubHeaderListItemLink" to='/'>Home</Link>
              </li>
              <li className="topSubHeaderListItem">
                <Link onClick={(e) => this.activeTab(e)} className="topSubHeaderListItemLink" to='/trending'>Trending</Link>
              </li>
              <li className="topSubHeaderListItem">
                <Link onClick={(e) => this.activeTab(e)} className="topSubHeaderListItemLink" to='/compare'>Compare</Link>
              </li>
              <li className="topSubHeaderListItem">
                <Link onClick={(e) => this.activeTab(e)} className="topSubHeaderListItemLink" to='/categories'>Categories</Link>
              </li>
              <li className="topSubHeaderListItem">
                <Link onClick={(e) => this.activeTab(e)} className="topSubHeaderListItemLink" to='/friends'>Friends</Link>
              </li>
              <li className="topSubHeaderListItem">
                <Link onClick={(e) => this.activeTab(e)} className="topSubHeaderListItemLink" to='/news'>News</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderAppBar;