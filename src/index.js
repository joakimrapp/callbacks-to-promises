const store = new Map();
const create = ( required ) => Object.keys( required ).reduce( ( compiled, name ) => {
  if( required[ name ] instanceof Function )
    if( required[ name ].toString().split( '\n' )[ 0 ].indexOf( 'callback' ) >= 0 )
      compiled[ name ] = ( ...args ) => new Promise( ( resolve, reject ) =>
    		required[ name ]( ...args, ( err, result ) => err ? reject( err ) : resolve( result ) ) );
    else
      compiled[ name ] = ( ...args ) => required[ name ]( ...args );
  else
    Object.defineProperty( compiled, name, {
      get: () => required[ name ],
      set: ( value ) => ( required[ name ] = value )
    } );
  return compiled;
}, {} );
module.exports = new Proxy( ( name ) => store.get( name ) || store.set( name, create( require( name ) ) ).get( name ), {
	get: ( target, name ) => target( name ),
	apply: ( target, thisArg, argumentsList ) => argumentsList.reduce( ( result, name ) => ( { [ name ]: target( name ) } ), {} )
} );
