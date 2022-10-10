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
    let cupcakes = [];
    for (let c of res.data.cupcakes) {
      const { id, flavor, size, rating, image } = c;
      cupcakes.push(new Cupcake(id, flavor, size, rating, image));
    }
    return cupcakes;
  }

  static async postCupcake(data) {
    const {
      data: { cupcake },
    } = await axios.post("/api/cupcakes", data);
    return new Cupcake(
      cupcake.id,
      cupcake.flavor,
      cupcake.size,
      cupcake.rating,
      cupcake.image
    );
  }

  static async searchCupcake(term) {
    const res = await axios.get("/api/cupcakes/search", {
      params: { search: term },
    });
    let cupcakes = [];
    for (let c of res.data.cupcakes) {
      const { id, flavor, size, rating, image } = c;
      cupcakes.push(new Cupcake(id, flavor, size, rating, image));
    }
    return cupcakes;
  }

  static async deleteCupcake(id) {
    await axios.delete(`/api/cupcakes/${id}`);
  }
}
