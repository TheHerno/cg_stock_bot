import { htmlParser } from "https://deno.land/x/tinyssg@0.0.1/deps/html-parser.ts"
const { parse } = htmlParser

const getDolarBlue = async (): Promise<number> => {
  try {
    const resp = await fetch("https://api.bluelytics.com.ar/v2/latest")
    const data = await resp.json()
    return data.blue.value_sell
  } catch (_error) {
    return 0
  }
}

const getDolarCrypto = async (): Promise<number> => {
  try {
    const resp = await fetch("https://dolarhoy.com/")
    const html = parse(await resp.text())
    const element = html.querySelector(
      "div.is-7:nth-child(2) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)"
    )
    return Number(element.innerText.split("$")[1])
  } catch (_error) {
    return 0
  }
}

export { getDolarBlue, getDolarCrypto }
