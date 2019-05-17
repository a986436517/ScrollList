import React, { Component } from 'react';
export default class ScrollList extends Component {
    constructor(d){
        super(d)
        this.state={
            opacity:this.props.option.alwaysShowScrollBar?1:0,
            SliderLength:0,
        }

        this.itemHeight=[0]
        this.itemIndex=0
        this.listDrag=false
        this.listClickedY=0
        this.sliderClickedY=0
        this.listClickedYtimeout=null
        this.sliderClicked=false
        this.scrollTop=0
         this.slideTop=0
        this.whellLock=false
        this.scrollTimeOut=false
        this.shouldScroll=true
        this.scrollOncePx=null

        this.getListdistance=this.getListdistance.bind(this)
        this.scrollBYitem=this.scrollBYitem.bind(this)
        this.synScrollbar=this.synScrollbar.bind(this)
        this.dragList=this.dragList.bind(this)
        this.scrollSliderClick=this.scrollSliderClick.bind(this)
        this.sliderMove=this.sliderMove.bind(this)
        this.sliderDragEnd=this.sliderDragEnd.bind(this)
        this.synList=this.synList.bind(this)
        this.slideTo=this.slideTo.bind(this)
        this.init=this.init.bind(this)
        this.updateItemIndex=this.updateItemIndex.bind(this)
        this.autoScrollByItem=this.autoScrollByItem.bind(this)
        this.autoScrollByPx=this.autoScrollByPx.bind(this)
        this.isRollBack=this.isRollBack.bind(this)
        this.autoScroll=this.autoScroll.bind(this)
        this.setScrollTop=this.setScrollTop.bind(this)
        this.setSlideTop=this.setSlideTop.bind(this)
        this.mouseIn=this.mouseIn.bind(this)
        this.mouseOut=this.mouseOut.bind(this)
        this.getScrollType=this.getScrollType.bind(this)
    }

    componentDidMount(){
        this.init()
    }

    componentWillUnmount(){
     clearTimeout(this.scrollTimeOut)
    }

    componentWillUpdata(){
        setTimeout(()=>{
                this.$scrollListHeight=this.scrollList.offsetHeight
                    this.scrollAble=this.$scrollListHeight-this.scrolldivHeight
                    this.setState({SliderLength:Math.pow(this.scrolldivHeight,2)/this.$scrollListHeight})
        },300)
    }

    init(){
            this.scrollList=this.scrolldiv.getElementsByTagName('ul')[0]
            this.scrolldivHeight=parseInt(this.scrolldiv.offsetHeight)
            this.scrollBarHeight=parseInt(this.scrollBar.offsetHeight)
            this.$scrollListHeight=parseInt(this.scrollList.offsetHeight)
            this.scrollAble=this.$scrollListHeight-this.scrolldivHeight
             this.autoScroll()
        let list=this.scrollList.getElementsByTagName('li')
        for(var i in list){
                if(list[i].clientHeight){
                    this.itemHeight.push(list[i].offsetHeight)
                }
        }
        this.setState({SliderLength:Math.pow(this.scrolldivHeight,2)/this.$scrollListHeight})
    }

    autoScroll(){
        if(this.props.option.autoScroll){
            switch (this.props.option.autoScrollType){
                case 'scrollByItem':this.autoScrollByItem()
                    break;
                case 'scrollByPx':this.autoScrollByPx()
                    break;
                default:this.autoScrollByPx()
                    break;
            }
        }
    }

    autoScrollByItem(){
        setTimeout(scroll.bind(this,true),1000)
        function scroll(isfirst) {
           if(!isfirst&&this.shouldScroll){
               this.scrollBYitem(1)
               this.isRollBack()
           }
                this.scrollTimeOut = setTimeout(scroll.bind(this, false), this.props.option.time / (this.itemHeight.length - 1))
        }
    }

    autoScrollByPx(){
        setTimeout(scroll.bind(this,true),1000)
        function scroll(isfirst) {
            if(!isfirst&&this.shouldScroll){
                this.scrollBYpx(1)
                this.updateItemIndex()
                this.isRollBack()
            }
                this.scrollTimeOut=setTimeout(scroll.bind(this,false),this.props.option.time/this.$scrollListHeight)
        }
    }

    isRollBack(){
        if(this.scrollTop>=this.scrollAble){
            this.setScrollTop(0)
            this.updateItemIndex()
            this.setSlideTop(0)
        }
    }

    scrollBYitem(direction){
        if(this.whellLock){return false}
        this.whellLock=true
            let timeout=null;
        if(direction>0){
            this.itemIndex++
            if(this.itemIndex>=this.itemHeight.length-1){this.itemIndex=this.itemHeight.length-1}
        }else if(direction<0){
            this.itemIndex--
            if(this.itemIndex<0){this.itemIndex=0}
        }

        let distance=this.getListdistance(this.itemIndex+1)
        doAnimata.call(this)
        function doAnimata() {
            this.scrollBYpx(this.scrollTop>distance?-1:1)
            timeout=setTimeout(doAnimata.bind(this),5)
            if(parseInt(this.scrollTop)===distance||this.scrollTop===0){
                clearTimeout(timeout)
                this.whellLock=false
            }
        }
    }

    scrollBYpx(distance){
        let scrollTop=this.scrollTop+=distance
        if(scrollTop<0){scrollTop=0}
        else if(scrollTop>this.scrollAble){scrollTop=this.scrollAble}
        this.setScrollTop(scrollTop)
        this.synScrollbar()
    }

    getListdistance(data){
        let res=0
        this.itemHeight.map((d,i)=>{
            if(i<data){
                res+=d
                if(res>this.scrollAble){
                    res=this.scrollAble
                }
            }
            return true
        })
        return res
    }

    mouseIn(e){
        this.shouldScroll=false
        if(this.props.option.alwaysShowScrollBar){ return false}
        this.setState({opacity:1})
    }

    mouseOut() {
        this.shouldScroll=true
        if(this.props.option.alwaysShowScrollBar){ return false}
        this.setState({opacity:0})
    }

    synScrollbar(){
       this.setSlideTop(this.scrollTop/this.$scrollListHeight*this.scrolldivHeight)
    }

    setSlideTop(data){
        this.slideTop=data
        this.scrollSlider.style.transform=`translateY(${this.slideTop}px)`
    }

    dragList(e){
        if(this.listDrag&&this.props.option.dragAble){
            let y=e.clientY
            this.scrollBYpx(this.listClickedY-y)
           this.updateItemIndex()
            clearTimeout(this.listClickedYtimeout)
            this.listClickedYtimeout=setTimeout(()=>{
                this.listClickedY=y
            },100)
        }
    }

    updateItemIndex(){
        this.itemIndex=Math.ceil(this.scrollTop/this.scrolldivHeight)
    }

    scrollSliderClick(e){
        e.stopPropagation()
        this.sliderClicked=true
        this.sliderClickedY=e.pageY-this.slideTop-this.scrollBar.offsetTop
        this.updateItemIndex()
    }

    sliderMove(e){
        if(this.sliderClicked) {
            let slideTop=e.clientY-this.scrollBar.offsetTop-this.sliderClickedY
            if(slideTop<0){slideTop=0}
            else if(slideTop>this.scrolldivHeight-this.state.SliderLength){slideTop=this.scrolldivHeight-this.state.SliderLength}
            this.slideTop=slideTop
            this.scrollSlider.style.transform=`translateY(${this.slideTop}px)`
            this.synList()
        }
    }

    sliderDragEnd(e){
        e.stopPropagation()
        this.sliderClicked=false
    }

    synList(){
        this.setScrollTop(this.slideTop/this.scrolldivHeight*this.$scrollListHeight)
    }

    setScrollTop(data){
        this.scrollTop=data
        this.scrolldiv.style.transform=`translateY(${-this.scrollTop}px)`
    }


    slideTo(e){
        e.stopPropagation()
        let slideTop=e.clientY-this.scrollBar.offsetTop
        if(slideTop>this.scrolldivHeight-this.state.SliderLength){
            slideTop=this.scrolldivHeight-this.state.SliderLength
        }
        this.setSlideTop(slideTop)
        this.synList()
        this.updateItemIndex()
    }

    getScrollType(data){
            if(this.props.option.scrollOncePx){
                this.scrollOncePx=data>0?this.props.option.scrollOncePx:-1*this.props.option.scrollOncePx
            }else {
                this.scrollOncePx=data/5
            }
        switch (this.props.option.scrollType){
            case 'scrollByItem':
                this.scrollBYitem(data);
                break;
            case 'scrollByPx':
                this.scrollBYpx(this.scrollOncePx)
                this.updateItemIndex()
                break;
            default:
                this.scrollBYpx(this.scrollOncePx)
                this.updateItemIndex()
                break;
        }
    }

    render() {
        this.scrolldivStyle={
            width:this.props.option.width,
            height:this.props.option.height,
            transform:'translateY(0px)',
            float:'left'}
        this.scrollBarStyle={
            float:'left',
            width:'20px',
            background:'#2F4F4F',
            transition:'all,0.3s',
            position:'relative'}
        this.scrollSliderStyle={
            width:'100%',
            background:'#ADFF2F',
            cursor:'pointer'
        }
        this.scrollBarStyle={...this.scrollBarStyle,...this.props.option.scrollBarStyle}
        this.scrollSliderStyle={...this.scrollSliderStyle,...this.props.option.scrollSliderStyle}

        return (
            <div style={{overflow:'hidden',display:'table',border:'1px solid blue',userSelect:'none'}} ref={ref=>this.node=ref}
                 onMouseEnter={this.mouseIn}
                 onMouseLeave={this.mouseOut}
            >
                <div className='scrolldiv' style={this.scrolldivStyle} ref={ref=>this.scrolldiv=ref}
                     onWheel={(e)=>{
                             this.getScrollType(e.deltaY)
                         }}
                     onMouseDown={(e)=>{e.stopPropagation(); this.listDrag=true;this.listClickedY=e.clientY}}
                     onMouseUp={(e)=>{e.stopPropagation();this.listDrag=false}}
                     onMouseMove={this.dragList}
                >
                    {this.props.children}
                </div>
                <div className='scrollBar' style={{...this.scrollBarStyle,  height:this.props.option.height,  opacity:this.state.opacity,}} ref={ref=>this.scrollBar=ref}
                     onMouseMove={this.sliderMove}
                     onMouseDown={this.slideTo}
                >
                    <div className='scrollSlider' style={{...this.scrollSliderStyle, height:`${this.state.SliderLength}px`,}} ref={ref=>this.scrollSlider=ref}
                         onMouseDown={this.scrollSliderClick}
                         onMouseUp={this.sliderDragEnd}
                    />
                </div>
            </div>
        );
    }
}
