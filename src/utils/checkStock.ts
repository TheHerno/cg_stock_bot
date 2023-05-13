const checkStock = async (product: string): Promise<boolean> => {
  const res = await fetch(`https://serviciosweb.compragamer.com/net_micro_web2/productos/lista?ids=` + product)
  const data = await res.json()
  if (!data || data.length === 0) return false
  return data[0].stock > 0
}

export default checkStock
