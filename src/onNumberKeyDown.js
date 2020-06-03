const allowedKeys = [
  "Tab",
  "Enter",
  "Backspace",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
  "ArrowDown",
  "ArrowUp",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];

export default function onNumberKeyDown(event) {
  if (event.ctrlKey && event.key === "a") {
    return;
  }
  if (
    (!event.metaKey && !allowedKeys.includes(event.key)) ||
    (event.key === "." && event.currentTarget.value.includes("."))
  ) {
    event.preventDefault();
  }
}
