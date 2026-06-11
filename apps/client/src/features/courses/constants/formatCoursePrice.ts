const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatCoursePrice(price: number) {
  return priceFormatter.format(price)
}
