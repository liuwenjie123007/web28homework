import { mount, shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import KTable from '@/components/form/KTable.vue'
import KTableColumn from '@/components/form/KTableColumn.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

describe('KTable.vue', () => {
  test('基本表格', () => {
    const template = `
    <k-table :data="tableData">
      <k-table-column prop="date" label="日期"></k-table-column>
      <k-table-column prop="name" label="姓名"></k-table-column>
      <k-table-column prop="address" label="地址"></k-table-column>
      <!-- 自定义列模板 -->
      <k-table-column label="操作">
        <template v-slot:default="scope">
          <button @click="handleEdit(scope.$index, scope.row)">编辑</button>
          <button @click="handlerDelete(scope.$index, scope.row)">删除</button>
        </template>
      </k-table-column>
    </k-table>
      `;
    const comp = {
      template,
      components: {
        KTable, 
        KTableColumn,
      },
      data() {
        return {
          model: {
            username: "tom",
          },
          rules: {
            username: [{ required: true, message: "用户名为必填项" }],
          },
          tableData: [
            {
              date: "2016-05-02",
              name: "王小虎",
              address: "上海市普陀区金沙江路1518弄",
            },
            {
              date: "2016-05-04",
              name: "王小二",
              address: "上海市普陀区金沙江路1517弄",
            },
            {
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路1519弄",
            },
            {
              date: "2016-05-03",
              name: "王小虎",
              address: "上海市普陀区金沙江路1516弄",
            },
          ],
        };
      }
    }
    const wrapper = mount(comp);
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.findAll("th").length).toBe(4);
    expect(wrapper.findAll("tbody>tr").length).toBe(4);
    expect(wrapper.find("tbody>tr").text()).toMatch("上海市普陀区金沙江路1518弄");
  })

  test('排序表格', () => {
    const template = `
    <k-table :data="tableData">
      <k-table-column sortable prop="date" label="日期"></k-table-column>
      <k-table-column sortable prop="name" label="姓名"></k-table-column>
      <k-table-column prop="address" label="地址"></k-table-column>
      <k-table-column label="操作">
        <template v-slot:default="scope">
          <button @click="handleEdit(scope.$index, scope.row)">编辑</button>
          <button @click="handlerDelete(scope.$index, scope.row)">删除</button>
        </template>
      </k-table-column>
    </k-table>
    `;
    const comp = {
      template,
      components: {
        KTable, 
        KTableColumn,
      },
      data() {
        return {
          model: {
            username: "tom",
          },
          rules: {
            username: [{ required: true, message: "用户名为必填项" }],
          },
          tableData: [
            {
              date: 20160502,
              name: "王小虎",
              address: "上海市普陀区金沙江路1518弄",
            },
            {
              date: 20160504,
              name: "王小二",
              address: "上海市普陀区金沙江路1517弄",
            },
            {
              date: 20160501,
              name: "王小虎",
              address: "上海市普陀区金沙江路1519弄",
            },
            {
              date: 20160503,
              name: "王小虎",
              address: "上海市普陀区金沙江路1516弄",
            },
          ],
        };
      }
    }
    const wrapper = mount(comp);
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.findAll("th").length).toBe(4);
    expect(wrapper.findAll("tbody>tr").length).toBe(4);
    expect(wrapper.find("tbody>tr").text()).toMatch("上海市普陀区金沙江路1517弄");
    wrapper.find("thead>tr>th").trigger('click');
    wrapper.find("thead > tr > th:nth-child(2)").trigger('click');
    wrapper.find("thead > tr > th:nth-child(2)").trigger('click');
  })
})
