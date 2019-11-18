<template>
  <div class="container">
    <div class="topic">品牌故事</div>
    <div class="row">
      <div class="col-md-5 d-flex flex-column justify-content-center align-items-center">
        <div class="boss-img"></div>
        <p class="boss-text"><i class="fas fa-caret-up"></i>老闆喜歡帶筆電進電影院邊看電影邊工作，索性將總店開在戲院。</p>
      </div>
      <div class="col-md-7">
        <div class="about-text">
          <p>
            &emsp;&emsp;我們是新創公司，老闆勤奮好學，從小上貴族學校，大學出國深造，因為英文不好差點畢不了業，
            幸好老闆平時有存零用錢的習慣，最後包紅包請教授吃飯成功地準時畢業。
            <br />&emsp;&emsp;老闆回台後不想回家族公司當普通老闆過沒有挑戰的生活，決定自行創業，一開始開的餐廳和潮
            牌衣服店都以失敗收場，但老闆勇於嘗試不怕失敗，嗅到台灣人喜歡換新手機滿足自己虛榮心的市場
            後轉戰通訊業，最後靠爸爸給的2000萬創業款在寸土寸金的台北打出自己的天下。
            <br />&emsp;&emsp;速達通訊做事講求效率，不只要快還要更好，掌握3C產品的最新動態，給客人最適合的選擇是我們追求的核心價值，我們
            視顧客如家人，有絕對的自信能在第一時間內解決您生活上遇到的問題。
          </p>
        </div>
      </div>
    </div>
    <div class="row flex-md-row-reverse">
      <div class="col-md-7">
        <div class="responsive-googlemap mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4298.949316409396!2d121.5651092754385!3d25.035055849769083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb09724fad9%3A0x4f124e3c47e82bd!2z5Y-w5YyX5L-h576p5aiB56eA5b2x5Z-O!5e0!3m2!1szh-TW!2stw!4v1573315096128!5m2!1szh-TW!2stw"
            width="600"
            height="600"
            frameborder="0"
            style="border:0;"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div class="col-md-5">
        <div class="shop-title"><i class="text-info fas fa-info-circle mr-3"></i>總店資訊</div>
        <div class="about-text">
          <p>
            <i class="text-info far fa-building mr-3"></i>總店 : 台北信義店
          </p>
          <p>
            <i class="text-info fas fa-map-marker-alt mr-3"></i>地址 : 110台北市信義區松壽路20號
          </p>
          <p>
            <i class="text-info fas fa-phone-volume mr-3"></i>電話 : (02)2019-1234
          </p>
          <p>
            <i class="text-info far fa-envelope mr-3"></i>信箱 : fastservice123@gmail.com
          </p>
          <p>
            <i class="text-info far fa-thumbs-up mr-3"></i>全年無休
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgpath: {
        backgroundImage: "url(" + require("@/assets/img/4.jpg") + ")",
        height: "600px",
        position: "relative"
      }
    };
  }
};
</script>