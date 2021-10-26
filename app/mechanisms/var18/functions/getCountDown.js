export default function getCountDown() {
  const minCount = 6;
  const randomCount = Math.floor(Math.random() * 10);
  return minCount + randomCount;
}
