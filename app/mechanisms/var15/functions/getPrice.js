export default function getPrice(type) {
  switch (type) {
    case "p":
      return 20;
    case "r":
      return 100;
    case "n":
      return 60;
    case "b":
      return 60;
    case "q":
      return 250;
    default:
      throw new Error("Wrong piece type made");
  }
}
