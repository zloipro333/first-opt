export const isBelong = (value, range) => {
	return range[0] <= value && range[1] >= value
}

export const round = (value, exponent=0) => {
	let offset = Math.pow(10, exponent)
  return Math.round(value * offset) / offset
}

export const numberRUFormat = (price) =>
{
	let str = price + ""
	return str.replace('.', ',')
}