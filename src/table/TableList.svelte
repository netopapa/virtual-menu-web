<script>
  import * as TableService from "../services/TableService";

  TableService.basic.getAll();
</script>

<style>
  #table-list {
    width: 60%;
    margin: 30px 0;
  }

  #table-list .table .cell {
    width: 33%;
  }
</style>

<section id="table-list" class="card">
  <div class="header space-between">
    <h3>Tables (1)</h3>
    <button class="btn success">
      <i class="fa fa-plus" />
    </button>
  </div>

  <div class="table">

    <div class="row header">
      <div class="cell">Number</div>
      <div class="cell">Status</div>
      <div class="cell">Actions</div>
    </div>

    <div class="row">
      <div class="cell" data-title="Full Name">1</div>
      <div class="cell" data-title="Age">Busy</div>
      <div class="cell" data-title="Job Title">
        <div class="options">
          <button class="btn info">
            <i class="fa fa-pencil" />
          </button>
          <button class="btn danger">
            <i class="fa fa-trash" />
          </button>
        </div>
      </div>
    </div>

  </div>

  <!-- <ul>
    <li class="space-between">
      <sub>Hamburguer</sub>
      <div class="options">
        <button class="btn info">
          <i class="fa fa-pencil" />
        </button>
        <button class="btn danger">
          <i class="fa fa-trash" />
        </button>
      </div>
    </li>
  </ul> -->
</section>
