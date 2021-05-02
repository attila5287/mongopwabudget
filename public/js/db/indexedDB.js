let db;
// create a new db request for a "BudgetDB" database.
let version_no = 21;
// todo1
const request = indexedDB.open( 'budget_db', version_no );
// todo2 ex19
let msg = document.getElementById('indexedDB_msg');
request.onupgradeneeded = function ( event ) {
  console.log(':>> indexedDB version needs upgrade');
  // create object store called "BudgetStore" and set autoIncrement to true
  db = event.target.result;

  db.createObjectStore( "pending", {
    autoIncrement: true
  } );
  
};

request.onsuccess = function ( event ) {
  console.log(':>> indexedDB request success');
  db = event.target.result;
  
  if ( navigator.onLine ) {
    console.log( ':>> indexedDB online sends records' );
    msg.innerText = 'App online'
    checkDatabase();
  } else {
    msg.innerText = 'App offline'

  }
};

request.onerror = function (event) {
  console.log(':>> indexedDB request error');
  // log error here
  console.log( 'error :>> ', event.target.errorCode );
  
  document.getElementById( 'indexedDB_error' ).innerText =  event.target.errorCode ;

};

function saveRecord ( record ) {// ex22
  console.log( ':>> indexedDB saving record' );

  // create a transaction on the pending db with readwrite access
  const transaction = db.transaction( [ 'pending' ], "readwrite" );
  
  // access your pending object store
  const obj_store = transaction.objectStore('pending');
  
  // add record to your store with add method.
  obj_store.add( record );
  
  if ( !navigator.onLine ) {

    msg.innerText = 'No internet connection, record saved as pending and will be submitted when online' ;

  }
}

function checkDatabase() {
  console.log( ':>> indexedDB check database for pending' );
  // open a transaction on your pending db
  const transaction = db.transaction( [ 'pending' ], "readwrite" );
  
  // access your pending object store
  const obj_store = transaction.objectStore('pending');

  // get all records from store and set to a variable
  const getAll = obj_store.getAll();
  console.log(':>> indexedDB get all pending',getAll);
  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => {
          // if successful, open a transaction on your pending db
          // access your pending object store
          // clear all items in your store
          const transaction = db.transaction( [ 'pending' ], "readwrite" );
          
          // access your pending object store
          const existing_store = transaction.objectStore('pending');
          
          // Clear existing entries because our bulk add was successful
          console.log(':>> indexedDB online, submitted records, pending records cleared');
          existing_store.clear();
        });
    } else {
      console.log(':>> indexedDB no pending records');
    }
  };
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);
