export default class TreeData{

  static data(data)
  {
    let pos={};
    let tree=[];
    let i=0;
    while(data.length!=0){
      if(data[i].pKindNo==null){
        tree.push({
          kindNo:data[i].kindNo,
          name:data[i].name,
          islocked:data[i].islocked,
          pKindNo:data[i].pKindNo,
          children:[]
        });
        pos[data[i].kindNo]=[tree.length-1];
        data.splice(i,1);
        i--;
      }else{
        var posArr=pos[data[i].pKindNo];
        if(posArr!=undefined){

          var obj=tree[posArr[0]];
          for(var j=1;j<posArr.length;j++){
            obj=obj.children[posArr[j]];
          }

          obj.children.push({

            kindNo:data[i].kindNo,
            name:data[i].name,
            islocked:data[i].islocked,
            pKindNo:data[i].pKindNo,
            children:[]
          });
          pos[data[i].kindNo]=posArr.concat([obj.children.length-1]);
          data.splice(i,1);
          i--;
        }
      }
      i++;
      if(i>data.length-1){
        i=0;
      }
    }
    return tree;
  }
}
