<template>
  <div>
    <van-nav-bar
      title="协议列表"
      left-arrow
      fixed
      @click-left="$router.go(-1)"
    />
    <div class="hg-pos-f hg-main-grey-box">
      <div class="hg-h-46"></div>
      <van-list
        v-model="agreement.loading"
        :finished="agreement.finished"
        :finished-text="agreement.totalPage === 0 ? '暂无' : '没有更多了'"
        @load="loadMore(agreement)"
      >
        <van-cell v-for="item of agreement.list" :key="item.id" is-link>
          <template solt="title">
            <div>title</div>
            <van-row class="hg-f-12 hg-color-grey">
              <van-col span="16">
                <div class="van-ellipsis">memo</div>
              </van-col>
              <van-col span="8" class="hg-text-right">time</van-col>
            </van-row>
          </template>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import { __user_agreement_lists } from '@/api/api'
export default {
  name: 'agreement-list',
  data() {
    return {
      agreement: {
        list: [],
        limit: 10, //每次加载的数量
        pageCount: 1, //追加的页码
        totalPage: 1, //总页码
        loading: false,
        finished: false
      }
    }
  },
  methods: {
    //获取更多数据
    loadMore(listObj) {
      //如果追加的页码大于总页码,不发ajax请求
      let page = listObj.pageCount
      let limit = listObj.limit
      if (page > listObj.totalPage) {
        listObj.loading = false
        listObj.finished = true
        return
      }
      // 发ajax请求,获取列表
      this.getList({ page: page, limit: limit }, listObj)
    },
    //分页获取
    getList(params, listObj) {
      console.log(params)
      __user_agreement_lists(params)
        .then(res => {
          if (res.status === 200) {
            listObj.loading = false
            let resData = res.data.data
            listObj.totalPage = Math.ceil(resData.total / listObj.limit)
            // listObj.totalPage = resData.total;
            listObj.list = listObj.list.concat(resData.data)
            listObj.pageCount++
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="less"></style>
