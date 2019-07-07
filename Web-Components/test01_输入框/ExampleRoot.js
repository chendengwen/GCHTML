class ExampleRoot extends BaseElement {

    static get observedAttributes() {
        return ['width', 'height'];
    }

    connectedCallback() {
        console.log('connectedCallback');
    }

    disconnectedCallback() {
        console.log('disconnectedCallback');
    }

    adoptedCallback() {
        console.log('adoptedCallback');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        console.log('attributeChangedCallback', name, oldValue, newValue);
    }

    handleDispatchEvent() {
        const event = new CustomEvent('example-event');
        event.currentAttr = this.state;
        this.dispatchEvent(event);
    }

    updateAttribute(name) {
        return (e) => {
            this.setAttribute(name, e.value);
        };
    }

    createInputForm(name) {
        return this.createElement({
            type: 'input-form',
            attributes: { value: this.state[name], name: `Set ${name}` },
            events: { 'set-value': this.updateAttribute.call(this, name) },
        });
    }

    render() {
        return [
            this.createInputForm('width'),
            this.createElement({ type: 'hr' }),
            this.createInputForm('height'),
            this.createElement({ type: 'hr' }),
            this.createElement({
                type: 'button',
                children: 'Dispatch event',
                events: { click: this.handleDispatchEvent.bind(this) },
            }),
        ];
    }
}

customElements.define('example-root', ExampleRoot);

/*
组件生命周期

connectedCallback 组件挂载，组件初始化后和移动时会触发
disconnectedCallback 组件卸载
adoptedCallback 组件被移动到一个新的文档树
attributeChangedCallback 组件属性变化
*/