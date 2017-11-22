class CUtil{
	static fac(k) {
		var j = 1;
		for (var i = 1; i <= k; i++) {
			j *= i;
		}
		return j;
	}

	static per(k, i) {
		return this.fac(k) / this.fac(k - i);
	}

	static com(k, i) {
		return this.per(k, i) / this.fac(i);
	}

	static sum(n){
		var par=0;
		for (var i = 0; i < n.length; i++) {
			par+=n[i];
		}
		return par
	}
	static sigma(func,start,end){
		var sum=0;
		for (var i = start; i <= end; i++) {
			sum =sum + func(i);
		}
		return sum;
	}
}

// dataコンストラクタ
class Cdata{
	constructor(index, amount) {
		this.amount = amount;
		this.index = index;
		this.data = this.getNumber(this.getPriority(this.amount, this.index));
	}

	change(i_1, i_2) {
		var k = 0;
		k = this.data[i_1];
		this.data[i_1] = this.data[i_2];
		this.data[i_2] = k;
	}

	getPriority(amount, index){
		var priority = new Array(amount);
		for (var n = 1; n <= amount; n++) {
			if (index % CUtil.fac(amount - n + 1) != 0){
				priority[n - 1] = Math.ceil(
					(index % CUtil.fac(amount - n + 1)) / CUtil.fac(amount - n)
				);
			}else{
				priority[n - 1] = Math.ceil(
					(CUtil.fac(amount - n + 1)) / CUtil.fac(amount - n)
				);
			}
		}
		return priority;
	}

	getRemainder(data, p) {
		var dataFlag = new Array(data.length);
	
		for (var n = 1; n <= data.length; n++) {
			if (data[n - 1] !== undefined) {
				dataFlag[data[n - 1] - 1] = true;
			} else {
				dataFlag[data[n - 1] - 1] = false;
			}
		}
	
		var dataRemainder = new Array();
		for (var m = 1; m <= data.length; m++) {
			if (!dataFlag[m - 1]) {
				dataRemainder.push(m);
			}
		}
		return dataRemainder[p - 1];
	}

	getNumber(priority) {
		var data = new Array(priority.length);
		var length = data.length;
		for (var n = 1; n <= length; n++) {
			data[n - 1] = this.getRemainder(data, priority[n - 1]);
		}
		return data;
	}
}
class Csort{
	static sortSimpleInsertion(data){
		var info=new Object;
		info.comparison=0;
		info.movement=0; 
		for(var i=1; i<data.amount; i++){
			var data_b = data.data[i];
			info.movement++
			 for(var k=i-1; k>=0; k--){
				info.comparison++
				  if(data.data[k]>data_b){
					   data.data[k+1]=data.data[k];
					   info.movement++
				  }else{
					   break;
				  }
			 }
		 data.data[k+1]=data_b;
		 info.movement++
		}
		return info
	}

	static sortSimpleSelection(data){
		var info=new Object;
		info.comparison=0;
		info.movement=0; 
			function data_w_max(min,max){
			var num_min=data.amount
			var num_i=null
			for (var i=min; i<max; i++){
				info.comparison++
				if (data.data[i]<num_min){
					num_min=data.data[i]
					num_i=i
				}
			}
			return num_i;
		}
		for (var i=0; i<data.amount-1; i++){
			var min=data_w_max(i,data.amount)
			data.change(i,min);
			info.movement+=3
		}
		return info
	}

	static sortSimpleExchange(data){
		var info=new Object;
		info.comparison=0;
		info.movement=0; 
		for(var i = 0; i < data.amount; i++){
			for(var i_2 = data.amount-1; i_2>i ; i_2-- ){
				info.comparison++
				if(data.data[i_2]<data.data[i_2-1]){
					data.change(i_2,i_2-1)
					info.movement+=3
				}
			}
		}
		return info
	}
	static sortBucket(data){
		var info=new Object;
		info.comparison=0;
		info.movement=0; 
		var count=0
		var data_b=new Array(data.amount);
		for (var i=0; i<data.amount+1; i++){
			 data_b[i]=0
		}
		for (var i=0; i<data.amount; i++){
			 data_b[data.data[i]]=data_b[data.data[i]]+1;
			 info.movement++
		}
		for (var i=0; i<data.amount+1; i++){
			 for (var ii=data_b[i]; ii>0; ii--){
				  data.data[count]=i;
				  info.movement++
				count=count+1;
			 }
		}
		return info
	}

	static sortQuick(data){
		var info=new Object;
		info.comparison=0;
		info.movement=0; 
		sort(0,data.amount-1)
		function sort(s,e){
			var p = data.data[Math.floor((s + e)/2)];
			var l = s;
			var r = e;
			while(true){
				while(data.data[l]<p){
					info.comparison++									
					l++;
				}
				while(data.data[r]>p){
					info.comparison++				
					r--;
				}
				info.comparison++
				if(r <= l){
					break;
				}
				data.change(r,l)
				info.movement+=3
				l++;
				r--;
			}
			if(s < l-1){
				sort(s,l-1);
			}
			if(e > r+1 ){
				sort(r+1,e);
			}
		}
		return info
	}

	static sortMarge(data){
		var info=new Object;
		info.comparison=0;
		info.movement=0; 
		var data_b = new Array();	
		sort(0,data.amount-1);				
		function sort(s,e){
			if(s >= e) return;
			var m = Math.floor((s + e) / 2);
			sort(s,m);
			sort(m+1,e);
			var p = 0;
			for (i=s; i<=m; i++) {
				data_b[p++] = data.data[i];
				info.movement++
			}
			var i = m + 1;
			var j = 0;
			var k = s;
			while ((i<=e) && (j<p)){
				info.comparison++
				if (data_b[j] <= data.data[i]){
					data.data[k++] = data_b[j++];
					info.movement++
				}else{
					data.data[k++] = data.data[i++];
					info.movement++
				}
			}
			while (j < p) {
				data.data[k++] = data_b[j++];
				info.movement++
			}
		}
		return info
	}
}
/*
for(var k=1; k<=100; k++){
	var sum=new Object;
	sum.comparison=0;
	sum.movement=0;
	if (CMath.fac(k) >= 10000){
		for(var i=1; i<=CMath.fac(k); i+=CMath.fac(k)/10000){
			var data = new Cdata(i, k);
			var inf = Csort.sortMarge(data);
			sum.comparison+=inf.comparison
			sum.movement+=inf.movement
		}
		console.log(k+","+sum.comparison/10000+","+sum.movement/10000);
	}else{
		for(var i=1; i<=CMath.fac(k); i++){
			var data = new Cdata(i, k);
			var inf = Csort.sortMarge(data);
			
			sum.comparison+=inf.comparison
			sum.movement+=inf.movement
		}
		console.log(k+","+sum.comparison/CMath.fac(k)+","+sum.movement/CMath.fac(k));
	}
}
*/

var ECIdata = new Array()
par = 7
for(var i=1; i<=CUtil.fac(par); i++){
	var data = new Cdata(i, par);
	var inf = Csort.sortSimpleSelection(data);
	var entropy = CUtil.sum(data.getPriority(data.amount, data.index))-par;
	ECIdata[i]= new Object()
	ECIdata[i].entropy=entropy;
	ECIdata[i].comparison=inf.comparison;
	ECIdata[i].movement=inf.movement;
	//console.log(entropy+","+inf.comparison+","+inf.movement);	
}
//すべての乱雑度を処理
for (var i = 0; i < CUtil.sigma(function(n){return n;},1,par)-par+1; i++) {
	//特定の乱雑度の比較数、移動数をすべて足す
	var sumComparison=0;
	var sumMovement=0;
	var sumNumber=0;
	for(var j=1; j<=CUtil.fac(par); j++){
		if (i==ECIdata[j].entropy){
			sumNumber++;
			sumComparison+=ECIdata[j].comparison;
			sumMovement+=ECIdata[j].movement;
		}
	}
	var avarComparison = sumComparison/sumNumber;
	var avarMovement = sumMovement/sumNumber;
	console.log(i+","+avarComparison+","+avarMovement);
}

console.log("終了!!!");
//test