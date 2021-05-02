const  form_handler = async ( event ) => {
  // does not post data to server thus no page refresh
  event.preventDefault();
  
  // console.log( 'test submit' );
  
  const form_data = {
    description: $( '#description' ).val(),
    amount: $( '#amount' ).val(),
    category: $( '#category' ).val(),
    date: Date.now(),
  };
  console.log('form_data :>> ', form_data);
  saveRecord( form_data );
  
  const response = await fetch('/api/transaction', {
    method: 'POST',
    body: JSON.stringify(form_data),
    headers: { 'Content-Type': 'application/json' },
  } );
  
  if ( response.ok ) {
    // alert( ':>> record posted to server' );
    render();

    // document.location.replace('/');
    
    
  } else {
    alert( 'ERROR: DUPLICATE RECORDS' );

    
  }



}

$( '#new_item_form' ).on( 'submit', form_handler);
