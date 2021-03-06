// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB9TtHiWjIqPLtUjfGflEodlgQD7-LQZ-k',
    authDomain: 'tubs-c616c.firebaseapp.com',
    databaseURL: 'https://tubs-c616c.firebaseio.com',
    projectId: 'tubs-c616c',
    storageBucket: 'tubs-c616c.appspot.com',
    messagingSenderId: '780617426048'
  },
  api_url: 'http://localhost:3000/api/',
  uploadUrl: 'http://localhost:3000/api/file/upload'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
