window.customElements.define('chat-window',
	class extends HTMLElement {
		template() {
			return `
			<link rel="stylesheet" href="main.css">
            <style>
                .container{					
					height:100%;
					width:100%;
					overflow:hidden;					
				}  
				.output{
					height: calc(100% - calc(var(--font-size) * 1)  - calc(var(--border-width) )  );				
					width:calc(100% -  calc(var(--border-width) * 2) );			
					border-top:0px;								
					
				}
				.input{
					width:calc(100% -  calc(var(--border-width) * 2) );						
					border-top:0px;					
				}
				.left{
					font-size:var(--font-size);
					float:left;
					height:100%;
					width:20%;
					border:0px;					
				}
				.right{
					font-size:var(--font-size);
					float:left;
					height:100%;
					width:20%;
					border:0px;
				}
				.center{	
					font-size:var(--font-size);				
					float:left;
					height:calc(100% - var(--font-size)  );
					width:60%;
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