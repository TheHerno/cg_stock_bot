const checkStock = async (product: string): Promise<Boolean> => {
  const res = await fetch(`https://compragamer.com/producto/${product}`)
  const html = await res.text()
  let stock = html.includes("Sumar al carrito") ? true : false
  return stock
}

export default checkStock
