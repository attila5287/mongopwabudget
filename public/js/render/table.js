const table_update = ( data ) => {
  $( '#table_body' ).empty();
  
  
  const icons_category = {
    in: 'fas fa-arrow-up text-success',
    out: 'fas fa-arrow-down text-danger',
  };
  data.forEach( record => {

    const row = $( '<tr>' ); // table row

    const row_icon = $( '<i>' )
      .attr( 'class', icons_category[ record.category ] );

    const collapse_btn = $( '<button>' )
      .attr( 'class', 'btn btn-sm btn-primary' )
      .attr( 'type', 'button' )
      .attr( 'data-toggle', 'collapse' )
      .attr( 'data-target', '#row' + record._id )
      .attr( 'aria-controls', 'row' + record._id )
      .attr( 'aria-expanded', false );
    
    const icon_btn = $( '<i>' ).attr( 'class', 'fas fa-chevron-up' );
    collapse_btn.append( icon_btn );

    row.append( $( '<td>' ).append( row_icon ) );
    row.append( $( '<td>' ).append( record.description ) );
    row.append( $( '<td>' ).append( record.amount ) );
    row.append( $( '<td>' ).append( record.category ) );
    row.append( $( '<td>' ).append( record.date ) );
    row.append( $( '<td>' ).append( collapse_btn ) );



    $( '#table_body' ).append( row );

  } );
}
