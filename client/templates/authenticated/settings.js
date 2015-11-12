Template.settings.events( {
  'change #user-geolocation': ( ev, template ) => {
    template.locationTracking.set( ev.target.checked );
    let result = Modules.client.setGeolocation( template.locationTracking.get() );
    if ( !result ) {
      template.locationTracking.set( result );
      ev.target.checked = result;
    }
  },
  'blur #user-name': ( ev, template ) => {
    let keypressTimer, username;
    keypressTimer = setTimeout( () => {
      ev.currentTarget.value = ev.currentTarget.value.trim().split(' ').join('');
      username = ev.currentTarget.value;
      setTimeout( () => {
        Meteor.call( 'changeUsername', username, function ( error, result ) {
          if ( error ) {
            Bert.alert( error.reason, 'danger' );
          }
          if ( result ) {
            Bert.alert( 'Username successfully changed', 'success' );
          }
        } );
      }, 500);
    }, 100 );
  }
} );

Template.settings.helpers( {
  checked: function () {
    return !!Template.instance().locationTracking.get() ? 'checked' : '';
  }
} );

Template.settings.onCreated( () => {

  let self = Template.instance();
  self.locationTracking = new ReactiveVar( false );
  self.subscribe( 'userSettings' );

  Tracker.autorun( ( computation ) => {
    if ( !!Settings.findOne() ) {
      let locationTracking = Settings.findOne().settings.locationTracking;
      self.locationTracking.set( locationTracking );
    }
  } );
} );

Template.settings.onRendered( () => {
} );

Template.settings.onDestroyed( () => {
  self.stop();
} );
