// hide all elements
const hideAll = () => {
  $("#search-list").hide();
  $("h3").hide();
  $("#add-cupcake").hide();
  $("#homepage").hide();
  $("#new-cupcake-btn").hide();
  $("#cupcakes-list").hide();
};

// show all cupcakes after the page loads
const getAllCupcakesHandler = async () => {
  hideAll();
  $("#cupcakes-list").show();
  $("#new-cupcake-btn").show();
  cupcakes = await Cupcake.getAllCupcakes();
  for (let c of cupcakes) {
    c.createMarkUp("#cupcakes-list");
  }
};

$(window).on("load", getAllCupcakesHandler);

// show create new cupcake form
const showNewCupcakeForm = () => {
  $("#new-cupcake-btn").hide();
  $("h3").show();
  $("#add-cupcake").show();
};

$("#new-cupcake-btn").on("click", showNewCupcakeForm);

// add cupcake to db and update the page when submit the form
const addCupcakeHandler = async (e) => {
  e.preventDefault();
  const flavor = $("#flavor").val();
  const size = $("#size").val();
  const rating = $("#rating").val();
  const image = $("#image").val();
  const data = {
    flavor,
    size,
    rating,
    image,
  };
  const cupcake = await Cupcake.postCupcake(data);
  cupcake.createMarkUp("#cupcakes-list");
  $("#add-cupcake").trigger("reset");
};

$("#add-cupcake").on("submit", addCupcakeHandler);

// delete cupcake when clicking "X"
const deleteCupcakeHandler = async (e) => {
  const id = e.target.dataset.id;
  Cupcake.deleteCupcake(id);
  $(e.target).parent().remove();
};
// because when the JS script runs, delete buttons havn't been created - we need to delegate the delete event to the parent <ul>
$("#cupcakes-list").on("click", ".delete-btn", deleteCupcakeHandler);

// search cupcakes
const searchCupcake = async (e) => {
  e.preventDefault();
  searchTerm = $("#search").val();
  cupcakes = await Cupcake.searchCupcake(searchTerm);
  showSearchResult(cupcakes);
};

const showSearchResult = (cupcakes) => {
  hideAll();
  $("#search-list").show();
  $("#homepage").show();
  $("#search-list").empty();
  if (cupcakes.length >= 1) {
    for (let c of cupcakes) {
      c.createMarkUp("#search-list");
    }
  } else {
    const result = $("<div class='alert alert-secondary'></div").text(
      `No Cupcake with flavor - "${searchTerm}" Found`
    );
    $("#search-list").append(result);
  }
};

$("#search").on("input", searchCupcake);
$("#search-form").on("submit", searchCupcake);
