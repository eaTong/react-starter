/**
 * Created by 7wingsfish on 2016/4/1.
 */
import React , { PropTypes } from 'react';

const App = (props) => {
  return (
    <div className="main-body">
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};
export default App;
