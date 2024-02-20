<template>
    <div class="card border-light shadow-sm p-3 mb-5 bg-white rounded">
        <div class="card-body">
            <h3> Transaktionen</h3>

            <table class="table table-borderless">
                  <tbody>
                  <tr>
                    <td>Startguthaben</td>
                    <td></td>
                    <td>50.000 €</td>
                  </tr>
                  <tr>
                    <td>Aktuelles Guthaben</td>
                    <td></td>
                    <td>55.000 €</td>
                  </tr>
                  <tr>
                    <td>Wertentwicklung</td>
                    <td></td>
                    <td>+5.000 €</td>
                  </tr>
                </tbody>
              </table>

        </div>
      </div>
  </template>
  
  <script>
  export default {
    name: 'VerlaufCard',
    // Andere Optionen und Methoden...
  };
  </script>

  <style>

  h3{
    margin-bottom: 15px;
  }

</style>