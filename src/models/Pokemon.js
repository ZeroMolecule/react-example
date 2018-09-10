import Model from 'models/Model';
import { capitalizeFirstLetter } from 'util/string';

export default class Pokemon extends Model {
  get formattedId () {
    return `#${this.id}`;
  }

  get name () {
    return this.get('name');
  }

  get height () {
    return this.get('height');
  }

  get weight () {
    return this.get('weight');
  }

  get type () {
    return (this.get('type') || []).map(item => capitalizeFirstLetter(item)).join(', ');
  }

  get weaknesses () {
    return (this.get('weaknesses') || []).map(item => capitalizeFirstLetter(item)).join(', ');
  }

  get description () {
    return this.get('description');
  }

}
