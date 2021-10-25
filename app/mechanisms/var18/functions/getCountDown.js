export default function getCountDown() {
  const minCount = 4;
  const randomCount = Math.floor(Math.random() * 10);
  return minCount + randomCount;
}
