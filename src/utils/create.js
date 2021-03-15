import Vue from 'vue';
// 传入组件配置，返回组件实例
// 并且将组件实例执行挂载到body
export default function create(component, props) {
    // const Ctor = Vue.extends(component);
    // const comp = new Ctor({
    //     propsData: props
    // })

    // 方式2： 借鸡生蛋
    const vm = new Vue({
        render: h => h(component, { props }),
    });

    // 挂载到boty
    vm.$mount() // 不传递传输，依然可以得到组件dom => vm.$el
    // 手动追加
    document.body.appendChild(vm.$el);

    // 获取组件实例
    const comp = vm.$children[0];
    
    // 淘汰方法
    comp.remove = () => {
        document.body.removeChild(vm.$el);
        vm.$destroy();
    }

    return comp;
}