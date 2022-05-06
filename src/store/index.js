import Vue from 'vue'
import Vuex from 'vuex'
import Element from "element-ui";
import Housedata from "@/views/Housedata";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* 记录登录状态 */
    isLogin: false,
    /*WebSocket*/
    ws: '', athis: this,
    /* 我的信息 */
    myInfo: {
      img: 'https://img0.baidu.com/it/u=3286620577,661592788&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200',
      name: '',
      username: ''
    },
    /* 别人的信息（特指聊天对象） */
    userInfo: {
      img: '',
      name: '',
      username: ''
    },
    houseInfo: {
      id:''
    },
    /* 用户列表 */
    userList: [{
      name: '王小虎',
      username: '123',
      img: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }, {
      name: '郑泷',
      img: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }, {
      name: '小蛮',
      img: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/30adcbef76094b36ba49777aa5cc7cd98c109d49.jpg'
    }, {
      name: '张云',
      img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg'
    },],
    /* 聊天记录 */
    chatMessageList: [
      {
        username: "123",
        list: [
          {
            type: "my",
            msg: "你好啊",
          },
          {
            type: "user",
            msg: "你好啊",
          },
          {
            type: "user",
            msg: "你要租房吗？",
          },
        ],
      },
      {
        username: "小蛮",
        list: [
          {
            type: "my",

            msg: "你好啊",
          },
          {
            type: "user",

            msg: "你好啊",
          },
        ]
      },
    ],
    houseList:[
      {
        id:'001',
        img:['https://pic4.ajkimg.com/display/xinfang/b57d6d4baf27754c01996e42cda8fece/403x335n.jpg'],
        neighborhood: '幸福小区',
        district:'江宁区',
        type:'两室',
        area:'100',
        cost:'2000',
        layer:'2层',
        joint:'true',
        information:'不错',
        host:'123'
      },
      {
        id:'002',
        img:['https://pic4.ajkimg.com/display/xinfang/b57d6d4baf27754c01996e42cda8fece/403x335n.jpg'],
        neighborhood: '华都福林',
        district:'建邺区',
        type:'三室',
        area:'150',
        cost:'3000',
        layer:'13层',
        joint:'false',
        information:'还行',
        host:''
      }
    ],
    chosenList:[

    ]
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data;
      //alert(state.userInfo.name)
    },
    //搜索栏功能

    selectHouse(state,data){
      //初始化置空
      state.chosenList=[];
      //在houseList里面遍历，符合条件的就放到choiceList里面
      let i=0;//遍历
      let districtCount=0;
      let districtFlag=false;
      let typeCount=0;
      let typeFlag=false;
      let costCount=0;
      let costFlag=false;

      //let flag=false;//看chosenList中是否有数据
      //alert("开始循环")
      //传入的data为选中值所组成的数组，需要挨个遍历
      for(i=0;i<state.houseList.length;i++){
        //alert(i)
        districtFlag=false;
        typeFlag=false;
        costFlag=false;
        //地区
        for(districtCount=0;districtCount<data.district.length;districtCount++){
          //满足其中的一个条件
          if(data.district[districtCount]=='不限'||data.district[districtCount]==state.houseList[i].district) {
            districtFlag = true;
            //alert("地区")
            break;
          }
        }
        if(districtFlag==false)continue;
        //户型
        for(typeCount=0;typeCount<data.type.length;typeCount++){
          if(data.type[typeCount]=='不限'||data.type[typeCount]==state.houseList[i].type) {
            typeFlag = true;
            //alert("户型")
            break;//满足其中的一个条件
          }
        }
        if(typeFlag==false)continue;
        //租金
        for(costCount=0;costCount<data.cost.length;costCount++){
          if(data.cost[costCount]=='不限'){
            costFlag=true;
            break;
          }else if(data.cost[costCount]=='1500以下'&&state.houseList[i].cost < 1500){
            costFlag=true;
            break;
          }else if(data.cost[costCount]=='1500-3000元'&&1500 <= state.houseList[i].cost&& state.houseList[i].cost< 3000){
            costFlag = true;
            break;
          }else if(data.cost[costCount]=='3000-4500元'&&3000 <= state.houseList[i].cost &&state.houseList[i].cost< 4500){
            costFlag=true;
            break;
          }
          else if(data.cost[costCount]=='4500-6000元'&&4500 <= state.houseList[i].cost &&state.houseList[i].cost< 6000){
            costFlag=true;
            break;
          }else if(data.cost[costCount]=='6000元以上'&&6000 <= state.houseList[i].cost){
            costFlag=true;
            break;
          }
        }
        if(costFlag==false)continue;
        //同时满足时放到chosenList里面
        else{
          state.chosenList.push(state.houseList[i]);
          //alert("找到一个")
        }

      }
      //alert("hello")
      if(state.chosenList.length==0)//没有符合要求的
      {
        Element.Message.error("无对应房源");
        Housedata.data().housedata=state.houseList;//防止页面无数据
      }
      else{
        //alert("数据源更换")
        //Housedata.data().housedata=state.chosenList;

      }
    },
    researchHouse(state,data){
      state.chosenList=[];
      //在houseList里面遍历，符合条件的就放到choiceList里面
      let i=0;//遍历
      for(i=0;i<state.houseList.length;i++){
        if(state.houseList[i].neighborhood.indexOf(data.neighborhood)>=0)//实现子字符串添加
          state.chosenList.push(state.houseList[i]);
      }
      if(state.chosenList.length==0){
        Element.Message.error("该小区暂无在租房产");
        Housedata.data().housedata=state.houseList;//防止页面无数据
      }
    },
    //侧边栏添加用户
    addUser(state,data){
      let i;
      let flag=false;
      for(i=0;i<state.userList.length;i++) {
        if (state.userList[i].username == data.username) {//获取到的是对应房屋的信息，根据其中host来获取对应的卖家信息
          flag = true;//判断是否已存在，若存在直接跳转到聊天界面
          state.userInfo.img=state.userList[i].img;
          state.userInfo.name=state.userList[i].name;
          state.userInfo.username=state.userList[i].username;
          break;
        }
      }
      if(flag==false){//不存在时添加
        //从后端获取对应的卖家信息，认为获得的信息是含有username,name,img的结构
        let formdata=new FormData();
        formdata.append("username",data.host);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$axios.post('http://localhost:8080/getuser', formdata,config).then(res =>{
          let msg=res.data.msg;
          //将卖家信息增加到侧边栏中
            state.userList.push({name: msg.myInfo.name, img:msg.myInfo.img,username: msg.myInfo.username})
          //将卖家信息放入userinfo
            state.userInfo.img=msg.myInfo.img;
            state.userInfo.name=msg.myInfo.name;
            state.userInfo.username=msg.myInfo.username;
        })
      }
    },
    addMessage(state, data) {
      let i;
      for (i = 0; i < state.chatMessageList.length; i++) {
        if (state.chatMessageList[i].username == state.userInfo.username) {
          //alert("?");
          state.chatMessageList[i].list.push(data);
          //alert("ok");
          break;
        }
      }
      if (i == state.chatMessageList.length) {
        state.chatMessageList.push({username: state.userInfo.username, list: []});
        state.chatMessageList[i].list.push(data);
      }
    },
    setHouseInfo(state, data) {
      state.houseInfo = data;
      //alert(state.houseInfo.houseId);
    },
    setData(state, data) {
      state.myInfo.username = data.userName;
      state.myInfo.name = data.name;
      state.myInfo.img = data.img;
      state.userList = data.userList;
      state.chatMessageList = data.chatMessageList;
      state.isLogin = true;
      state.athis=data.that
    },
    setHouseData(state,data){
      state.houseList=data.houseList;
    },
    setWS(state, data,that) {

      state.ws = new WebSocket("ws://localhost:8080/ws");

      if (state.ws.readyState == state.ws.CONNECTING) console.log("ws 连接成功");
      state.ws.onopen = function () {
        state.ws.send(JSON.stringify({"username": state.myInfo.username}));
      }

      state.ws.onmessage = function (evt) {
        let formdata = new FormData();
        formdata.append("username", state.myInfo.username);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        state.athis.$axios.post("http://localhost:8080/getuser", formdata, config).then(res => {
          let msg = res.data.msg;
          state.userList = msg.userlist;
          state.chatMessageList = msg.chatmessagelist;
          alert(state.myInfo.username+"收到消息！")

        })
      }
    }
    },
    actions: {},
    modules: {},
  }
)

