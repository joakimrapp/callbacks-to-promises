require( '../../../helpers/unit.js' )( ( index ) => ( {
	fs: index.fs
} ) )
	.it( 'should convert fs callbacks to promises', ( assert, index, { fs } ) => fs.readdir( __dirname )
		.then( filenames => assert.deepEqual( filenames, [ 'index.js.test.js' ] ) ) )
	.it( 'should convert fs callbacks to promises as function', ( assert, index, { fs } ) => index( 'fs' ).fs.readdir( __dirname )
		.then( filenames => assert.deepEqual( filenames, [ 'index.js.test.js' ] ) ) )
	.it( 'should reject when callbacking an error', ( assert, index, { fs } ) => new Promise( resolve =>
		fs.readdir( '/wfwefefewf/FEWfwefwwef' )
			.catch( () => resolve() ) ) )
	.it( 'should not convert to promise if not a callback', ( assert, index, { fs } ) =>
		assert.deepEqual( index( 'fs' ).fs.readdirSync( __dirname ), [ 'index.js.test.js' ] ) )
	.it( 'should return a property', ( assert, index, { fs } ) =>
		assert.equal( index( 'fs' ).fs.constants.F_OK, 0 ) )
	.it( 'should set a property', ( assert, index, { fs } ) =>
		( index( 'fs' ).fs.constants = {} ) )
	.done();
