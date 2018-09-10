import Model from 'models/Model';

export default class Auth extends Model {
  get name () {
    return this.get('displayName');
  }

  get profileImage () {
    return this.get('photoURL');
  }

  isAuthenticated () {
    return !!this.get('uid');
  }
}
