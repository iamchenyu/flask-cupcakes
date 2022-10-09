// create a cupcake class

class Cupcake {
  constructor(id, flavor, size, rating, image) {
    this.id = id;
    this.flavor = flavor;
    this.size = size;
    this.rating = rating;
    this.image = image;
  }

  createMarkUp(ul) {
    const newLiText = $(`<a href='/api/cupcakes/${this.id}'></a>`).text(
      this.flavor.toUpperCase()
    );
    const deleteButton = $(
      `<button class='delete-btn btn btn-outline-danger btn-sm mx-3' data-id=${this.id}></button>`
    ).text("X");
    const newLi = $("<li class='list-group-item'></li>");
    newLi.append(newLiText);
    newLi.append(deleteButton);
    $(ul).append(newLi);
  }

  static async getAllCupcakes() {
    const res = await axios.get("/api/cupcakes");
    return res.data.cupcakes;
  }

  static async postCupcake(data) {
    await axios.post("/api/cupcakes", data);
  }

  static async searchCupcake(term) {
    const res = await axios.get("/api/cupcakes/search", {
      params: { search: term },
    });
    return res.data.cupcakes;
  }

  static async deleteCupcake(id) {
    await axios.delete(`/api/cupcakes/${id}`);
  }
}
