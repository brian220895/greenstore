import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import fileDownload from 'js-file-download'
import logo192  from '../logo192.png'

// import FileSaver from 'file-saver';
function Download() {
  

  // const handleClick = (url, filename) => {
  //   axios.get(url, {
  //     responseType: 'blob',
  //   })
  //   .then((res) => {
  //     console.log('asdas',res)
  //     // fileDownload(res.data, filename)
  //   })
  // }



  return (
    <div className="App">


      <a href="https://www.mediafire.com/file/mg4a9os9a6udule/Sample_-_Butterfly.jpg" download="w3logo">Download</a>
  </div>
  )
}

export default Download
