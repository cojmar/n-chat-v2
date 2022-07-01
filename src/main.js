
import './components.js'

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