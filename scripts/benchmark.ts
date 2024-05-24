/* eslint-disable import/no-named-as-default-member */
import puppeteer from 'puppeteer'

const run = async () => {
  // 创建一个浏览器实例
  // 此处传入配置项设置headless为false，否则程序将在后台执行，不会打开浏览器
  const browser = await puppeteer.launch({ headless: true })
  // 在刚才的浏览器上打开一个空页面
  const page = await browser.newPage()
  // 等待页面创建完成后跳转到简书官网
  await page.goto('https://www.jianshu.com')
  // 获取 DevTools 中的数据
  const devData = await page.metrics()
  // 获取 window 中的数据
  console.log(devData)
}

run()
