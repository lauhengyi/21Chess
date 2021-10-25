export default function getClusterSize() {
  const range = 4;
  const size = Math.floor(Math.random() * range);
  console.log({ size });
  return size;
}
