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
				send_button:hover {
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