export const PORTFOLIO_OWNER = {
  name: "Peter",
  companyName: "Peter",
  copyright(year: number) {
    return `© ${year} ${this.companyName}. All rights reserved.`
  },
}
