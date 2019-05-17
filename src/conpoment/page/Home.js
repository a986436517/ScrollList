import React, { Component } from 'react';
import ScrollList from '../../ScrollList'



export default class Home extends Component {
    constructor(props){
        super(props)
        this.type=0
    }
  render() {
    return (
      <div className="App" style={{margin:"200px auto 0 auto",width:'400px'}}>
          <ScrollList option={{
              autoScroll:true,//是否自动滚动列表 默认为false
              width:'200px',//列表的高度
              height:'300px',//列表的宽度
              scrollBarStyle:{},//列表滚动条的样式
              scrollSliderStyle:{},//列表滚动条滑块的样式
              autoScrollType:'',//自动滚动列表的模式('scrollByPx':每次滚动一定的像素的高度,'scrollByItem':每次滚动一个条目的高度;默认为scrollByPx)
              time:10000,//滚动完整个列表所需要的时间，单位为ms
              scrollType:'',//滚轮滚动列表的模式('scrollByPx':每次滚动一定的像素的高度,'scrollByItem':每次滚动一个条目的高度;默认为scrollByPx)
              dragAble:'',//列表是否可以拖曳滚动，默认为false
              scrollOncePx:10,//滚轮滚动一次列表滚动的高度，默认为20，scrollByPx模式下生效
              alwaysShowScrollBar:true,//是否一直显示滚动条，默认为false
          }}>
              <ul style={{margin:0}}>
                  <li style={{height:'100px',border:'1px solid red'}}>1</li>
                  <li style={{height:'300px',border:'1px solid red'}}>2</li>
                  <li style={{height:'400px',border:'1px solid red'}}>3</li>
                  <li style={{height:'200px',border:'1px solid red'}}>4</li>
                  <li style={{height:'40px',border:'1px solid red'}}>5</li>
                  <li style={{height:'600px',border:'1px solid red'}}>6</li>
              </ul>
          </ScrollList>
      </div>
    );
  }
}
