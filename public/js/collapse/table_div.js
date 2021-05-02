
let coll_tabl_collapsed = false;
$( '#coll_tabl_button' )
  .on( "click", () => {
    if ( coll_tabl_collapsed ) {
      coll_tabl_collapsed = false;
      $( "#coll_tabl_icon" ).removeClass( "fa-chevron-up" );
      $( "#coll_tabl_icon" ).addClass( "fa-chevron-down" );
    } else {
      coll_tabl_collapsed = true;
      $( "#coll_tabl_icon" ).removeClass( "fa-chevron-down" );
      $( "#coll_tabl_icon" ).addClass( "fa-chevron-up" );
    }


  } );
