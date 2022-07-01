

//component chat-input
window.customElements.define('chat-input',
	class extends HTMLElement {
		template() {
			return `
			<link rel="stylesheet" href="main.css">
			<style>
				.container{				
					height:calc(var(--font-size) * 2);				
				}
				.send_button{									
					
					float:right;
					height:100%;
					border: var(--border-width) solid var(--border-color);
					color: var(--button-text-color);
					border-top:0px;
					border-right:0px;
					border-bottom:0px;
					

					background: var(--button-background-color);
							
					font-size:var(--font-size);
					
					
					
					cursor: pointer;
				}
				.send_button:hover {
					background: var(--button-background-color-hover);
					color: var(--button-text-color-hover);
				}

				.chat-input{
					float:left;
					margin:calc(var(--font-size) / 2.2 );
					font-size:var(--font-size);					
				}
			</style>
            <div class="container">             				
				<div class="chat-input">asd</div>
                <button class="send_button">⚡Send⚡</button>
            </div>            
            `
		}

		init_socket(socket) {
			this.socket = socket
			this.shadowRoot.querySelectorAll('[socket=false]').forEach(el => (el.setAttribute('socket', true), el.init_socket?.(this.socket)))
		}

		connectedCallback() {
			this.shadowRoot.querySelector(".send_button").onclick = (e) => {

				this.socket?.send_cmd?.('test', this.socket)

			}
		}



		constructor() {
			super()
			this.attachShadow({ mode: "open" })
			this.shadowRoot.innerHTML = this.template()
			this.setAttribute('socket', false)
		}

	}
)

//component chat-output
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

//component chat-window
window.customElements.define('chat-window',
	class extends HTMLElement {
		template() {
			return `
			<link rel="stylesheet" href="main.css">
            <style>
                .container{					
					height:100%;
					width:100%;					
				}  
				.output{
					height: calc(100% - calc(var(--font-size) * 1)  - calc(var(--border-width) * 2)  );				
					width:calc(100% -  calc(var(--border-width) * 2) );											
					
				}
				.input{
					width:calc(100% -  calc(var(--border-width) * 2) );						
					border-top:0px;					
				}
				.left{
					float:left;
					height:100%;
					width:calc(20% - calc(var(--border-width) * 2)  );
					border:0px;					
				}
				.right{
					float:left;
					height:100%;
					width:calc(20% - calc(var(--border-width) * 2)  );
					border:0px;
				}
				.center{
					float:left;
					height:calc(100% - var(--font-size)  );
					width:calc(60% - calc( var(--border-width) * 2)  );
					border:0px;
					

				}

            </style>
			<div class="chat-panel container">
				<div class="chat-panel left">
					left
				</div>

				<div class="chat-panel center">
					<div class="chat-panel output">    
						<chat-output></chat-output>   
					</div>        
					<div class="chat-panel input">    
						<chat-input></chat-input>   
					</div> 
				</div>

				<div class="chat-panel right">
					right
				</div>

			</div>
            
            `
		}

		init_socket(socket) {
			this.socket = socket
			this.shadowRoot.querySelectorAll('[socket=false]').forEach(el => (el.setAttribute('socket', true), el.init_socket?.(this.socket)))
		}

		constructor() {
			super()
			this.attachShadow({ mode: "open" })
			this.shadowRoot.innerHTML = this.template()
			this.setAttribute('socket', false)
		}
	}
)


// main
document.addEventListener('DOMContentLoaded', () => new class {
    constructor() {
        this.server = 'wss://ws.emupedia.net'
        //this.server = 'ws://localhost/ws/'
        this.room = 'N-screen'
        this.init()
    }

    async init() {
        this.socket = new u_socket()
        this.fingerprint = await FingerprintJS.load().then(fp => fp.get()).then(fp => fp.visitorId)
        this.send_cmd = (...args) => this.socket.send_cmd(...args)

        this.socket.on('connect', () => {
            this.socket.send_cmd('auth', { user: '', fingerprint: this.fingerprint, room: this.room })
        })

        this.socket.on('auth.info', () => {
            this.room = [this.room, '-', this.fingerprint].join('')
            this.send_cmd('join', this.room)
            Array.from(['a', 'b', 'c']).map(r => this.send_cmd('join', [r, false]))
            this.send_cmd('leave', 'c')
        })

        this.socket.connect(this.server)

        document.querySelectorAll('[socket=false]').forEach(el => (el.setAttribute('socket', true), el.init_socket?.(this.socket)))
        this.main()
    }

    main() {

        console.log('- start -')
        setTimeout(() => {
            //console.log(this.socket)
        }, 2000)

    }


})