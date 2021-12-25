/*!
 * Shapla Delete Icon v1.0.0
 * (c) 2020 Sayful Islam
 * Released under the MIT License.
 */
import React from 'react'
import PropTypes from 'prop-types';

class DeleteIcon extends React.Component {
  /**
   * Specifies the default values for props:
   */
  static defaultProps = {
    size: 'normal',
    ariaLabel: 'close',
    fixed: false,
    onClick: () => {},
  };

  /**
   * Specifies props data type
   */
  static propTypes = {
    size: PropTypes.oneOf(['normal', 'small', 'medium', 'large']),
    ariaLabel: PropTypes.string,
    fixed: PropTypes.bool,
    onClick: PropTypes.func,
  }

  /**
   * Class constructor
   *
   * @param props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render component UI
   */
  render() {
    return (
      <span className={this.classes()} aria-label={this.props.ariaLabel} onClick={this.props.onClick}/>
    )
  }

  /**
   * Button classes
   *
   * @returns {string}
   */
  classes() {
    let classes = ['shapla-delete-icon'];

    if (this.props.size === 'small') {
      classes.push('is-small')
    }
    if (this.props.size === 'medium') {
      classes.push('is-medium')
    }
    if (this.props.size === 'large') {
      classes.push('is-large')
    }
    if (this.props.fixed) {
      classes.push('is-fixed')
    }

    return classes.join(' ');
  }
}

export {DeleteIcon}
export default DeleteIcon;
