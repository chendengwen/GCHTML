class NumInput extends HTMLElement {
    constructor() {
      super();
      // this.dataset
      
      // 添加shadowDom
      let shadowRoot = this.attachShadow({mode: 'open'});
      let styles = `
        hello-web-components {color: red;}
        h3 {font-weight: normal;}
        .num-input-content {margin: 10px 0;}
        .num-input {text-align: center;}
      `;
      console.log(this.dataset)
      shadowRoot.innerHTML = `
        <style>${styles}</style>
        <div class="num-input-content">
          <button class="decrease">-</button>
          <input type="text" class="num-input" value="${this.dataset.value}"/>
          <button class="increase">+</button>
          <span>价格：<b class="price">${this.dataset.price}</b>元</span>
        </div>
      `;
   
      this.numInput = this.shadowRoot.querySelector('.num-input');  // 数量
      this.price = this.shadowRoot.querySelector('.price'); // 价格
   
      // 获取shadowDom下的元素
      let decrease = this.shadowRoot.querySelector('.decrease');
      let increase = this.shadowRoot.querySelector('.increase');
   
      // 绑定事件
      decrease.addEventListener('click', this.decrease.bind(this), false);
      increase.addEventListener('click', this.increase.bind(this), false);
    }
    // -
    decrease() {
      this.dataset.value--;
      this.update();
    }
    // +
    increase() {
      this.dataset.value++;
      this.update();
    }
    // update
    update() {
      // 更新数值
      this.numInput.setAttribute('value', this.dataset.value);
      let allPrice = this.dataset.value*this.dataset.price;
      this.price.innerText = allPrice;
   
      // 输出结果到:host元素
      this.dataset.out = JSON.stringify({
        value: this.dataset.value,
        price: allPrice
      });
    }
  }
   
  // 注册 <num-input></num-input> 元素
  customElements.define('num-input', NumInput)
  