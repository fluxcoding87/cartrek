import { faker } from "@faker-js/faker";

function createRandomList() {
  return {
    name: faker.vehicle.vehicle(),
    fuelType: faker.vehicle.fuel(),
    model: faker.vehicle.model(),
    type: faker.vehicle.type(),
    image: "https://m.media-amazon.com/images/I/81c0NzQrOqL.jpg",
    miles: 1000,
    gearType: "Manual",
    price: faker.finance.amount({ min: 8000, max: 500000 }),
  };
}

const carList = faker.helpers.multiple(createRandomList, {
  count: 7,
});

export default carList;
