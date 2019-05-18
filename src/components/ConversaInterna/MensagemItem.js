import React, {Component} from 'react';
import {View, Text,StyleSheet,Image,TouchableHighlight} from 'react-native';

export default class MensagemItem extends Component{
    

    constructor(props){
        super(props);

        let bgColor='#EEEEEE';
        let align='flex-start';
        let txtAlign='left';

        if(this.props.data.uid == this.props.me){
            bgColor = '#9999FF';
            align='flex-end';
            txtAlign='right';
        }
        this.state = {
            bgColor,
            align,
            txtAlign,
            dateMsg:this.getFormattedDate(this.props.data.date)
        };
        this.imageClicked = this.imageClicked.bind(this);
    }
    
    getFormattedDate(originalDate){
        let cDate = new Date();
        let mdate = originalDate.split(' ');
        let todayDate = cDate.getFullYear()+'-'+(cDate.getMonth+1)+'-'+cDate.getDay();
        let newDateHour =   mdate[1].split(':');
        newDateHour = (newDateHour[0]<10?'0'+newDateHour[0]:newDateHour[0])+':'+newDateHour[1];
        if(todayDate != mdate[0]){
            let newDateDay = mdate[0].split('-');
            newDateHour = newDateDay[2]+'/'+newDateDay[1]+'/'+newDateDay[0]+' '+newDateHour;
        }
        return newDateHour;
    }

    imageClicked(){
        this.props.onImagePress(this.props.data.imgSource);
    }
    render() {
        return (
            <View style={[MensagemItemStyles.area,{alignSelf:this.state.align,backgroundColor:this.state.bgColor}]}>
                {this.props.data.msgType == 'text' &&
                    <Text style={{textAlign:this.state.txtAlign}} >{this.props.data.m}</Text>
                }
                {this.props.data.msgType == 'image' &&
                    <TouchableHighlight onPress={this.imageClicked}>
                        <Image resizeMethod="resize" style={MensagemItemStyles.imagem} source={{uri:this.props.data.imgSource}} />
                    </TouchableHighlight>
                }
                <Text style={[MensagemItemStyles.dateTxt,{textAlign:this.state.txtAlign}]}>{this.state.dateMsg}</Text>
            </View>
            );
    }
}

const MensagemItemStyles = StyleSheet.create({
    area:{
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        padding:10,
        maxWidth:'80%',
        borderRadius:5
    },
    dateTxt:{
        fontSize:8
    },
    imagem:{
        width:100,
        height:100
    }
});