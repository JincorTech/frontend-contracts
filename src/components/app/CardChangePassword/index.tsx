import * as React from 'react';
import { Component } from 'react';
import * as CSSModules from 'react-css-modules';
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form';
import { translate } from 'react-i18next';

import { required, password } from '../../../utils/validators';

import Button from '../../common/Button';
import RenderPassword from '../../forms/RenderPassword';

/**
 * Types
 */

export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>;

export type ComponentProps = {
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>,
  onCancel: () => void
  spinner: boolean,
  t: Function
};

export type FormFields = {
  oldPassword: string,
  password: string
};

/**
 * Component
 */

class CardChangePassword extends Component<Props, {}> {
  public render(): JSX.Element {
    const { t, invalid, handleSubmit, onCancel, spinner } = this.props;

    return (
      <div styleName="change-password">
        <form
          onSubmit={handleSubmit}
          styleName="profile-bottom-form">

          <Field
            component={RenderPassword}
            validate={[
              required(t('fieldCantBeEmpty')),
              password()
            ]}
            warn={password(t('passwordMustBeStrong'))}
            name="oldPassword"
            type="password"
            placeholder={t('oldPassword')}/>

          <Field
            component={RenderPassword}
            validate={[
              required(t('fieldCantBeEmpty')),
              password()
            ]}
            warn={password(t('passwordMustBeStrong'))}
            name="password"
            type="password"
            placeholder={t('newPassword')}/>

          <div styleName="form-buttons">
            <Button styleName="form-cancel-button" onClick={onCancel}>{t('cancel')}</Button>
            <Button isSubmit={true} styleName="form-submit-button" disabled={invalid} spinner={spinner} value={t('save')}/>
          </div>
        </form>
      </div>
    );
  }
}

/**
 * Export
 */

const StyledComponent = CSSModules(CardChangePassword, require('./styles.css'));
const TranslatedComponent = translate('app')(StyledComponent);

export default reduxForm<FormFields, ComponentProps>({
  form: 'cardChangePassword',
  initialValues: {
    oldPassword: '',
    password: ''
  }
})(TranslatedComponent);
