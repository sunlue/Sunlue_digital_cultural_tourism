import axios from "axios"

export default {
  // 点击"喜欢"按钮
  setLike: function (data, id) {
    for (let i = 0; i < data.length; i++) {
      if (id === data[i].id) {
        if (!data[i].isLike) {
          axios.put(this.$config.apiUrl + "portal/article/data/like", {
            uniqid: id
          }).then(res => {
            console.log(res)
          })
          data[i].like = parseInt(data[i].like) + 1;
          data[i].isLike = true
        }
      }
    }
  },
  // 分页跳转
  linkGen(pageNum) {
    return pageNum === 1 ? '?' : `?page=${pageNum}`
  }
}
