const populateChart = (fetched) => {
  // copy array and reverse it
  const reversed = fetched.slice().reverse();
  let sum = 0;

  // create date labels for chart
  const labels = reversed.map(t => {
    const date = new Date(t.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  });

  // create incremental amounts for chart
  const data = reversed.map( t => {
    if (t.category == 'in') {
      sum += parseInt(t.amount);
      
    } else {
      
      sum -= parseInt(t.amount);
    }
    return sum;
  } );
  
  let myChart = null;

  // remove old chart if it exists
  if (myChart) {
    myChart.destroy();
  }

  const ctx = document.getElementById("my-chart").getContext("2d");

  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          fill: true,
          label: "Total Over Time",
          pointHoverBorderWidth: 10,
          pointHoverBorderColor: "#272b30",
          pointHoverBackgroundColor: "#5bc0de",
          borderColor: "#62c462",
          pointHoverRadius: 25,
          borderWidth: 2,
          pointRadius: 8,
          pointBackgroundColor: "#62c462",
          backgroundColor: "#3a3f44",
          data
        }
      ]
    }
  });
}
