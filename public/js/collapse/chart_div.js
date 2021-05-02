let coll_chrt_collapsed = false;
$( '#coll_chrt_button' )
  .on( "click", () => {
    if ( coll_chrt_collapsed ) {
      coll_chrt_collapsed = false;
      $( "#coll_chrt_icon" ).removeClass( "fa-chevron-up" );
      $( "#coll_chrt_icon" ).addClass( "fa-chevron-down" );
    } else {
      coll_chrt_collapsed = true;
      $( "#coll_chrt_icon" ).removeClass( "fa-chevron-down" );
      $( "#coll_chrt_icon" ).addClass( "fa-chevron-up" );
    }


  } );
