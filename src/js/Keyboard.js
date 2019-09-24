export default class Keyboard {
    constructor() {
        this.keyStates = new Map();
        this.assignedKeys = new Map();
    }
    addKey(key) {
        if (!this.assignedKeys.has(key)) {
            this.assignedKeys.set(key, 1);
            this.keyStates.set(key, 0);
            return true;
        } else {
            window.alert("Ten klawisz jest zajęty");
            return false;
        }

    }
    handleEvent(e) {
        const key = e.code;
        if (!this.assignedKeys.has(key)) {
            return;
        }
        e.preventDefault();

        const keyState = e.type === 'keydown' ? 1 : 0;
        if (this.keyStates.get(key) === keyState) return;
        this.keyStates.set(key, keyState);

    }
    listenTo(window) {
        ['keydown', 'keyup'].forEach(eName => {
            window.addEventListener(eName, e => {
                this.handleEvent(e);
            });
        });

    }
}