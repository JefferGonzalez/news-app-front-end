export const newsFragment = (text) => {
  const fragments = text.split(".");
  const estimatedTime = (text.split(" ").length * 60) / 200;
  return [
    fragments.map((fragment) => fragment + ".").slice(0, 3),
    (estimatedTime / 60).toString()[0],
  ];
};
