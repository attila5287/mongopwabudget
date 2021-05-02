const router = require( 'express' ).Router();
const Transaction = require( "../models/Transaction" );
const demo = require( '../demo' );

router.get( "/api/transaction/demo", async ( req, res ) => {
  res.json( demo )
} );


router.post("/api/transaction/bulk", ( req, res) => {
  console.log( 'req.body :>> ', req.body );
  
  const str = req.body.map( rec => { return JSON.stringify( { description: rec.description, amount: rec.amount, category: rec.category } ) } );
  console.log( 'str :>> ', str );
  
  const set = new Set( str );
  console.log('set :>> ', set);
  
  const unq = Array.from( set ).map( r => JSON.parse( r ) );
  
  Transaction.insertMany(unq)
    .then(inserted => {
      res.json(inserted);
    })
    .catch(err => {
      res.status(400).json(err);
    });
} );

router.get('/api/transaction/delete/:id', async (req, res) => {
  const deleted = await Transaction.findByIdAndDelete(  req.params.id  ).j( true ).catch( e => console.log( e ) );
  
  // res.json( deleted );
  res.redirect( req.header( 'Referer' ) );

});

router.post( '/api/transaction/update/:id', async ( req, res ) => {
  const updated = await Transaction.findByIdAndUpdate( req.params.id, { ...req.body } ).catch( e => console.log( e ) );
  
  // res.json( updated );
  res.redirect(req.header('Referer'));

});


router.get( "/api/transaction/seed", async ( req, res ) => {
  const existing = await Transaction.find( {} ).catch( e => console.log( e ) );

  if ( existing.length ) {
    const msg = {
      status: "records exist, no seeding necessary"
    };
    res.json( msg );

  } else {

    const bulk = await Transaction
      .insertMany( demo )
      .catch( e => console.log( e ) );

    res.redirect( '/' );

  }
} );


router.post( "/api/transaction", async ( req, res ) => {
  // console.log('req.body :>> ', req.body);
  
  const latest = await Transaction.findOne( {} ).sort( { '_id': -1 }  ).limit(1).catch( e => console.log( e ) );
  // console.log( 'latest :>> ', latest );

  const same_desc = req.body.description == latest.description;
  const same_amount = req.body.amount == latest.amount;
  const same_cat = req.body.category == latest.category;
  const duplicate = ( same_desc && same_amount && same_cat );
  
  if ( !duplicate ) {
    
    const new_item = await Transaction
      .create( req.body )
      .catch( e => console.log( e ) );
  
    // console.log( 'new_item :>> ', new_item );
    // res.json( {} );
    res.json( new_item );
    
  } else {
    res.status(400).json({status : 'duplicate record'});    
  }

  // res.redirect(req.header('Referer'));
} );

router.get( "/api/transaction", async ( req, res ) => {
  const mods = await Transaction.find( {} )
    .sort( {
      date: -1
    } ).catch( e => console.log( e ) );

  res.json( mods );
} );

module.exports = router;
