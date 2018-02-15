import React, { Component } from 'react';
import ViewerTemplate from './components/ViewerTemplate';
import SpaceNavigator from './components/SpaceNavigator';
import Viewer from './components/Viewer/Viewer';
import * as api from './lib/api';
import moment from 'moment';

import { createAction } from 'redux-actions';
import ViewContainer from "./containers/ViewContainer";
import SpaceNavigatorContainer from "./containers/SpaceNavigatorContainer";

window.createAction = createAction;

class App extends Component {


  render() {
    return (
      <ViewerTemplate
        spaceNavigator={<SpaceNavigatorContainer/>}
        viewer={(
          <ViewContainer/>
        )}/>
    );
  }
}

export default App;
