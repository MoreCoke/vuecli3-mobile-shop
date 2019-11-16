export default function (second = 0) {
  const d = new Date(second * 1000);
  const date = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  return date;
}
