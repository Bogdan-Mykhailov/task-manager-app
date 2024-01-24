import React from 'react';
import { Spinner } from 'react-bootstrap';

const style = {
  width: 30,
  height: 30,
};

export const MainSpinner = () => (
  <Spinner style={style} animation="border" role="status" />
);
