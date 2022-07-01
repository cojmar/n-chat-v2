window.customElements.define('chat-output',
    class extends HTMLElement {
        template() {
            return `
            <link rel="stylesheet" href="main.css">            
            <style>
                .chat-log{
                    padding:2px;
                    margin-bottom:10px;
                    font-size:var(--font-size);
                }
                .container{                   
                    height:calc(100% - 4px);
                    overflow-y:auto;
                    padding:2px;
                    width:calc(100% - 4px);
                }
            
                
            </style>
            <div class="container">
            </div>
            `
        }

        init_socket(socket) {
            this.socket = socket
            this.socket.on('cmd', (data) => {
                this.log(data.cmd, data.data)
            })
        }
        log(head = "", data = {}) {
            this.container.innerHTML += `
            <div class='chat-log'>
                <b>${head}</b>
                <xmp>${JSON.stringify(data, null, 2)}</xmp>
            </div>
            `
            this.container.scrollTo(0, this.container.scrollHeight)
        }


        constructor() {
            super()
            this.attachShadow({ mode: "open" })
            this.shadowRoot.innerHTML = this.template()
            this.setAttribute('socket', false)
            this.container = this.shadowRoot.querySelector('.container')
        }
    }
)