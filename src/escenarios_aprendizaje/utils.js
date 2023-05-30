export function buscarPorId(id, array) {
  return array.find((item) => item.id === id);
}

export function crearHtml(htmlString) {
  return { __html: htmlString };
}
