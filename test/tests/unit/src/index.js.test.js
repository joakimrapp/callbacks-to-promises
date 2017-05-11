require( '../../../helpers/unit.js' )( ( index ) => ( {
	fs: index.fs
} ) )
	.it( 'should convert fs callbacks to promises', ( assert, index, { fs } ) => fs.readdir( __dirname )
		.then( filenames => assert.deepEqual( filenames, [ 'index.js.test.js' ] ) ) )
	.it( 'should convert fs callbacks to promises as function', ( assert, index, { fs } ) => index( 'fs' ).fs.readdir( __dirname )
		.then( filenames => assert.deepEqual( filenames, [ 'index.js.test.js' ] ) ) )
	.done();
