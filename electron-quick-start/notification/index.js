let myNotification = new Notification('Jartto', {
  body: 'Hello Everybody!'
})

myNotification.onclick = () => {
  console.log('通知被点击')
}