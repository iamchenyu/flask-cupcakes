// show all cupcakes after the page loads
const getAllCupcakesHandler = async () => {
  $("#search-list").hide();
  $("h3").hide();
  $("#add-cupcake").hide();
  $("#homepage").hide();
  cupcakes = await Cupcake.getAllCupcakes();
  for (let c of cupcakes) {
    const { id, flavor, size, rating, image } = c;
    const cupcake = new Cupcake(id, flavor, size, rating, image);
    cupcake.createMarkUp("#cupcakes-list");
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

// add cupcake when click the submit button
const addCupcakeHandler = async () => {
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
  Cupcake.postCupcake(data);
};

$("#submit").on("click", addCupcakeHandler);

// delete cupcake when clicking "X"
const deleteCupcakeHandler = async (e) => {
  const id = e.target.dataset.id;
  Cupcake.deleteCupcake(id);
  $(e.target).parent().remove();
};
// because when the JS script runs, delete buttons havn't been created - we need to delegate the delete event to the parent <ul>
$("#cupcakes-list").on("click", deleteCupcakeHandler);

// search cupcakes
const searchCupcake = async (e) => {
  e.preventDefault();
  searchTerm = $("#search").val();
  cupcakes = await Cupcake.searchCupcake(searchTerm);
  showSearchResult(cupcakes);
};

const showSearchResult = (cupcakes) => {
  $("#new-cupcake-btn").hide();
  $("#cupcakes-list").hide();
  $("h3").hide();
  $("#add-cupcake").hide();
  $("#search-list").empty();
  $("#search-list").show();
  $("#homepage").show();
  if (cupcakes.length >= 1) {
    for (let c of cupcakes) {
      const { id, flavor, size, rating, image } = c;
      const cupcake = new Cupcake(id, flavor, size, rating, image);
      cupcake.createMarkUp("#search-list");
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
