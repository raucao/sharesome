import rs from 'sharesome/services/remote-storage';

export function initialize(application) {
  application.register('service:rs', rs);

  application.inject('controller', 'rs', 'service:rs');
  application.inject('route'     , 'rs', 'service:rs');
  application.inject('model'     , 'rs', 'service:rs');
  application.inject('component' , 'rs', 'service:rs');
}

export default {
  name: 'remote-storage',
  initialize
};
