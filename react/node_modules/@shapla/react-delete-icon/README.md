# React Delete Icon
A simple circle with a cross for React

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```
npm install --save @shapla/react-delete-icon
```

# Usage

### Styles 

with Sass:
```js
import '@shapla/react-delete-icon/src/index.scss';
```

with CSS:
```js
import '@shapla/react-delete-icon/dist/delete-icon.css';
```

### Javascript Instantiation

```js
import React from 'react';
import DeleteIcon from '@shapla/react-delete-icon';
 
class MyApp extends React.Component {
  render() {
    return (
      <DeleteIcon size='small' onClick={this.handleClick}>Click Me</DeleteIcon>
    );
  }
  handleClick(){
    console.log('Button clicked!');  
  }
}
```

### Props
| Property      | Type      | Required  | Default   | Description
|---------------|-----------|-----------|-----------|--------------------------------------------------------
| `size`        | String    | **no**    | `normal`  | Value can be `normal` or `small` or `medium` or `large`.
| `ariaLabel`   | String    | **no**    | `close`   | Value for html `aria-label` attribute 
