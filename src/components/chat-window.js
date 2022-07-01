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
					height: calc(100% - 30px - calc(var(--border-width) * 3) );				
					width:calc(100% -  calc(var(--border-width) * 2) );						
					
					
				}
				.input{
					width:calc(100% -  calc(var(--border-width) * 2) );						
					border-top:0px;
					
				}
            </style>
			<div class="container">
				<div class="chat-panel output">    
					<chat-output></chat-output>   
				</div>        
				<div class="chat-panel input">    
					<chat-input></chat-input>   
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