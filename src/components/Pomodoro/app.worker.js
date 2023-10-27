export default () => {
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;
        let tempTimerId = setInterval(sendCountSecond, 1000);
        
    })


    const sendCountSecond = () =>  {
        postMessage("second");
    }
  }