<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      orderField: '',
      orderBy: 'desc'
    }
  },
  created() {
    this.columns.forEach(column => {
      // 如果存在sortable列， 则投医个作为默认字段
      if (column.hasOwnProperty('sortable')) {
        if (column.prop && !this.orderField) {
          this.sort(column.prop, this.orderBy)
        }
      }
    })
  },
  computed: {
    columns() {
      // 由于不一定有prop属性，内部如果出现了默认作用域插槽， 则就按照它来执行渲染
      return this.$slots.default.map(({ data: { attrs, scopedSlots } }) => {
          const column = {...attrs}
          if (scopedSlots) {
              // 自定义列模板
              column.renderCell = (row, i) =>  <div>{scopedSlots.default({row, $index: i})}</div>
          } else {
              // 设置prop的情况
              column.renderCell = (row) => <div>{row[column.prop]}</div>
          }
          return column;
      });
    },
  },
  methods: {
    sort(field, by) {
      this.orderField = field;
      this.orderBy = by;

      this.data.sort((a, b) => {
        const v1 = a[this.orderField]
        const v2 = b[this.orderField]
        if (typeof v1 === 'number') {
          return this.orderBy == 'desc' ? (v2 - v1) : (v1 - v2);
        } else {
          return this.orderBy === 'desc' ? v2.localeCompare(v1) : v1.localeCompare(v2);
        }
      })
    },
    toggleSort(field) {
      const by = this.orderBy === 'desc' ? 'asc' : 'desc';
      this.sort(field, by);
    },
  },
  render() {
    return (
      <table>
        <thead>
          <tr>
            {this.columns.map((column) => {
              if (column.hasOwnProperty('sortable') && column.prop) {
                let orderArrow = '↓↑'
                if (this.orderField === column.prop) {
                  orderArrow = this.orderBy === 'desc' ? '↓' : '↑'
                }
                return <th key={column.label} onClick={() => this.toggleSort(column.prop)}>{column.label} <span>{orderArrow}</span></th>
              } else {
                return <th key={column.label}>{column.label}</th>
              }
            })}
          </tr>
        </thead>
        <tbody>
          {this.data.map((row, rowIndex) => (
              <tr key={rowIndex}>{this.columns.map((column, columnIndex) => (
                  <td key={columnIndex}>{column.renderCell(row, rowIndex)}</td>
              ))}</tr>
          ))}
        </tbody>
      </table>
    );
  },
};
</script>

<style>
</style>