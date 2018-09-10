import React, { PureComponent } from 'react';
import { Trans, translate } from 'react-i18next';
import Form from 'components/Form/Form';
import FormInput from 'components/Form/FormInput';
import Rules from 'models/Rules';

class PokemonCreateRoute extends PureComponent {
  static propTypes = {};
  static defaultProps = {};

  render () {
    return (
      <div className="base-page">
        <div className="pokemon-details">
          <img
            className="pokemon-details__image"
            src=""
            alt=""/>
          <div className="pokemon-details__information">
            <Form onSubmitSuccess={(data) => {console.log(data);}} onSubmitFail={(err) => {console.log(err);}}>
              <table>
                <tbody>
                <tr className="pokemon-details__information-group">
                  <td className="pokemon-details__label"><Trans i18nKey="pokemon.number"/>:</td>
                  <td className="pokemon-details__value">
                    <FormInput
                      name="number"
                      rules={new Rules().required().addMessage('required', 'Required').min(6).addMessage('min', 'Min 6')}/>
                  </td>
                </tr>
                <tr className="pokemon-details__information-group">
                  <td className="pokemon-details__label"><Trans i18nKey="pokemon.name"/>:</td>
                  <td className="pokemon-details__value">
                    <FormInput
                      name="name"
                      rules={new Rules().required().addMessage('required', 'Field is required')}
                    />
                  </td>
                </tr>
                <tr className="pokemon-details__information-group">
                  <td className="pokemon-details__label"><Trans i18nKey="pokemon.height"/>:</td>
                  <td className="pokemon-details__value">

                  </td>
                </tr>
                <tr className="pokemon-details__information-group">
                  <td className="pokemon-details__label"><Trans i18nKey="pokemon.weight"/>:</td>
                  <td className="pokemon-details__value">
                    <input/>
                  </td>
                </tr>
                </tbody>
              </table>
              <button type="submit">Submit</button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default translate()(PokemonCreateRoute);
