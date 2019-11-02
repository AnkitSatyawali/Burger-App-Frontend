import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => (
<div>
<img src="https://www.elegantthemes.com/blog/wp-content/uploads/2017/07/404-error.png" style={{width: 400, height: 400, display: 'block', margin: 'auto', position: 'relative' }} />
<center><Link to="/">Return to Home Page</Link></center>
</div>
);


export default NotFound;