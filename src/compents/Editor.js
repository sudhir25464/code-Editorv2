import React, { useState } from 'react';
import { debounce } from 'lodash';
import { Modal, Button } from 'react-bootstrap';
const Editor = () => {
    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [jsCode, setJsCode] = useState('');
    const [output, setOutput] = useState('');




    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const compileCode = debounce(() => {
        // Concatenate HTML, CSS, and JS code
        const fullCode = `
            <html>
                <head>
                    <style>${cssCode}</style>
                </head>
                <body>
                    ${htmlCode}
                    <script>${jsCode}</script>
                </body>
            </html>
        `;

        // Create a blob from the code
        const blob = new Blob([fullCode], { type: 'text/html' });

        // Create a URL for the blob
        const url = URL.createObjectURL(blob);

        // Set the URL as the iframe source
        setOutput(url);
    }, 500); // Adjust the debounce delay as needed (in milliseconds)

    const handleHtmlChange = (e) => {
        setHtmlCode(e.target.value);
        compileCode();
    };

    const handleCssChange = (e) => {
        setCssCode(e.target.value);
        compileCode();
    };

    const handleJsChange = (e) => {
        setJsCode(e.target.value);
        compileCode();
    };

    return (
        <>
            <div className="container-fluid col-12 bg-light main-code-container">
                <div className='bg-dark text-light p-3 mb-4 fs-5 fw-bold' >
                    <div className='me-5'>Quick Start
                        Development  </div>
                </div>

                <div className='row'>
                    <div className="col-12 col-md-4">
                        <div className="mb-3">
                            <label htmlFor="htmlCode" className="form-label">HTML</label>
                            <textarea className="form-control" id="htmlCode" rows="3" value={htmlCode} onChange={handleHtmlChange}></textarea>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="mb-3">
                            <label htmlFor="cssCode" className="form-label">CSS</label>
                            <textarea className="form-control" id="cssCode" rows="3" value={cssCode} onChange={handleCssChange}></textarea>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="mb-3">
                            <label htmlFor="jsCode" className="form-label">JS</label>
                            <textarea className="form-control" id="jsCode" rows="3" value={jsCode} onChange={handleJsChange}></textarea>
                        </div>
                    </div>
                </div>
                <div className="compile-button  bg-light mb-4">
                    <button className='btn   shadow-none me-4' onClick={compileCode}>Compile</button>
                    <button className=' btn btn-warning text-dark border shadow-none pull-right' onClick={handleShow}>Guidlines</button>
                </div>
                <p className='bg-success p-1 '>OutPut Screen</p>
                <div className="output-section border mb-4 outputscreen">

                    {output && <iframe title="output" src={output} width="100%" height="100%" />}
                </div>
            </div>


            {/* model */}
            {/* <Button variant="primary" onClick={handleShow}>
        Launch Full Screen Modal
      </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-fullscreen"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='font1 text-primary'>
                        Guidelines..
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='font1'>

                    <p> <i class="bi bi-code-slash me-3 "></i>Look for the designated area where you can input HTML, CSS, and JavaScript code.</p>


                    <p> <i class="bi bi-code-slash me-3 "></i>Begin by typing your HTML code in the HTML section provided.</p>
                    <p><i class="bi bi-code-slash me-3 "></i> Similarly, input your CSS code in the CSS section.</p>
                    <p> <i class="bi bi-code-slash me-3 "></i>Write your JavaScript code in the JavaScript section.</p>


                    <p><i class="bi bi-code-slash me-3 "></i>As you type your code in any of the sections (HTML, CSS, JavaScript), the code will automatically compile.</p>
                    <p><i class="bi bi-code-slash me-3 "></i>Each time you move to the next line or make changes, the compiler will process your code and update the output accordingly.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} className='px-4'>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Editor;
