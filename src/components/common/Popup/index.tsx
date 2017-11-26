import * as React from 'react';
import { Component, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = HTMLProps<HTMLDivElement> & ComponentProps;

export type ComponentProps = {
  title: string
  open: boolean
  close: () => void
};

class Popup extends Component<Props, {}> {
  private popup: any;

  constructor(props) {
    super(props);

    this._handleBackdropClick = this._handleBackdropClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      document.body.classList.add('popupOpened');
    } else {
      document.body.classList.remove('popupOpened');
    }
  }

  _handleBackdropClick(e) {
    if (this.popup.contains(e.target)) {
      return;
    }

    this.props.close();
  }

  render() {
    const {
      title,
      children,
      open,
      close
    } = this.props;

    const renderPopup = () => (
      <div styleName="background" onClick={this._handleBackdropClick}>
        <div styleName="popup" ref={(popup) => { this.popup = popup; }}>
          {title && <div styleName="title">{title}</div>}
          <div>{children}</div>
          <div styleName="footer">
            <button styleName="close" type="button" onClick={() => { close() }}>
              <img src={require('./images/close.svg')}/>
            </button>
          </div>
        </div>
      </div>
    );

    return open && renderPopup();
  }
}

export default CSSModules(Popup, require('./styles.css'));
