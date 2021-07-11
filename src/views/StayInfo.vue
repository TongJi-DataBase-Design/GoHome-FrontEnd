  <template>
  <el-container>
    <el-aside width="70%">
      <div class="StayInfo">
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
        <div id="ImageCarousel">
          <el-carousel :interval="4000" type="card" trigger="click" width="400px">
            <el-carousel-item v-for="item of data.data.stayImages" :key="item">
              <!--        <h5 class="medium">{{ item }}</h5>-->
              <el-image :src=item :alt=item height="300px" fit="fill"/>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="NavBar">
          <el-menu class="NavMenu" :default-active="activeIndex" mode="horizontal" >
            <!--@select="handleSelect"-->
            <a href="#detail"><el-menu-item index="1">详情</el-menu-item></a>
            <a href="#comments">
              <el-menu-item index="2">评价</el-menu-item>

            </a>
            <!--      <el-menu-item index="3"><a href="#bookable">可订日期</a></el-menu-item>-->
            <a href="#location">
              <el-menu-item index="4">位置</el-menu-item>

            </a>
            <a href="#location">

              <el-menu-item index="5">周边信息</el-menu-item>
            </a>
          </el-menu>

        </div>
        <div class="info">
          <detail id="detail" :stay="data.data"></detail>
          <rooms v-for="room of data.data.rooms" :key="item" :room="room" :stayId="stayId"></rooms>

          <!--    </el-row>-->
        </div>
        <div>
          <comments id="comments"> </comments>
        </div>
        <div>
          <location id="location"></location>
        </div>
      </div>
    </el-aside>
    <el-main>
      <el-image src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/ae21dad38a0a26e51f74d42cba17adfd.png" style="margin-top: 10%; width: 22%; position: fixed; left: 75%;"></el-image>
    </el-main>
  </el-container>

</template>

<script>
import detail from '@/components/StayInfo/detail.vue'
import rooms from '@/components/StayInfo/rooms.vue'
import comments from '@/components/StayInfo/comments.vue'
import location from '@/components/StayInfo/location.vue'
//假数据
import stayinfo from '@/assets/stayinfo.json'

let data=stayinfo;
// console.log(data);
export default {
  name: "StayInfo",
  components: {
    detail,
    rooms,
    comments,
    location,
  },
  data() {
    return{
      activeIndex: "1",
      data,
      stayId: 10086,
    }
  }
}
</script>

<style scoped>
@import url("https://unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css");

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  /*background-color: #99a9bf;*/
}

.el-carousel__item:nth-child(2n+1) {
  /*background-color: #d3dce6;*/
}

.NavBar{
  align-content: center;
  width: 100%;
  display: flex;
  justify-content: center;
}

.NavMenu {
  width: 100%;
  /*background-color: blue;*/
  display: flex;
  justify-content: center;
}

.info{

  justify-content: center;
  /*width: 65%;*/
  /*background-color: #42b983;*/
  /*text-align:center;*/

}
</style>