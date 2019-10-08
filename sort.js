window.onload = function(){
								//131
	let arreglo = generarArreglo(585);
	sortDraw(arreglo);
	//-----START-------
	document.getElementById("start").addEventListener("click",() => {
		setup(arreglo);
	});
	//--------------------------

	function setup(arreglo){
		let comboBox = document.getElementById("combobox1");
		let opcion = comboBox.selectedIndex;
		switch(opcion)
		{
			case 0:
				arreglo = generarArreglo(131);
				sortDraw(arreglo);
				ordenamientoBurbuja(arreglo);
				break;
			case 1:
				quickSort(arreglo,0,arreglo.length-1);
				break;
			case 2:
				shellSort(arreglo,0,arreglo.length-1);
				break;
			case 3:				//512
				arreglo = generarArreglo(512);
				sortDraw(arreglo);
				bitonicSortStart(arreglo,arreglo.length,1); 
				break;
		}
	}
	
/*-------------------DIBUJO--------------------------------------*/
	function sortDraw(arreglo, elemento1 = -1, elemento2 = -1,line = 2, num = 1, space = false){
		var canvas = document.getElementById("canvas1");
			if(canvas && canvas.getContext){
				canvas.width = canvas.width;
				var ctx = canvas.getContext("2d");
					if(ctx){
						//LINEA			/8
						ctx.lineWidth = line;
								//7
						var x = num;
							for(var i = 0; i < arreglo.length;i++){
								ctx.strokeStyle = "white";
								if( i == elemento1 || i == elemento2)
									ctx.strokeStyle = "red";
								ctx.beginPath();
								ctx.moveTo(x,470);
								ctx.lineTo(x,0+arreglo[i]);
								ctx.stroke();
								space ? x+= (line+1) :  x+= line;
							}
					}
			}
	}
/*----------------------------------------------------------------*/
/*---------------------UTILIDADES---------------------------------*/
	function generarArreglo(n){
		let arreglo = new Array();
					//131//128
		for(var i = 0; i < n; i++ )
			arreglo[i] = Math.round(10+Math.random()*460);
		return arreglo;
	}
	function sleep(ms) { 
		return new Promise(resolve => setTimeout(resolve, ms)); 
	} 	
	
	function titulo(nombre){
		var title = document.getElementById("tituloOrdenamientos");
		title.innerHTML = nombre;
	}
	
	async function swap(arr, a, b,ms,line = 2,num = 1,space = false){
		sortDraw(arr, a, b,line,num,space);
		await sleep(ms);
		let temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
	}
	
/*--------------------BUBBLE SORT------------------------------*/
	async function ordenamientoBurbuja(arr){
		titulo("BUBBLE SORT")
		for(let i = 0; i < arr.length-1;i++){
			for( let j = i + 1;j < arr.length;j++){
				if(arr[i] < arr[j]){
					await swap(arr,i,j,5,8,7,true);
				}
			}
		}
		sortDraw(arr,-1,-1,8,7,true);
	}
	
/*------------------------------------------------------------*/
/*------------QUICK SORT--------------------------------------*/
	
	async function quickSort(x,lb,ub){
		titulo("QUICK SORT");
		if (lb >= ub)
            return;
        let j = new Array();
        await Partition(x, lb, ub,j);
		await Promise.all([
			quickSort(x,lb, j[0] - 1),
			quickSort(x,j[0] + 1, ub)
		]);
		sortDraw(x);
	}
	async function Partition(x, lb, ub, j){
		let down, up;
        let temp, a;
        a = x[lb];
        up = ub;
        down = lb;
        while (down < up) {
            while (x[down] <= a && down < ub)
                down++;
            while (x[up] > a)
                up--;
            if (down < up) {
				await swap(x,down,up,50);
            }
        }
        x[lb] = x[up];
        x[up] = a;
        j[0] = up;
	}
/*------------------------------------------------------------*/
/*-------------------SHELL SORT-------------------------------*/
	async function shellSort(x,lb,ub) {
		titulo("SHELL SORT")
        let increments = [5, 3, 1];
        let numIncs = 3;
        let j, k, span,incr;
        let y;
		await sortDraw(x);
        for (incr = 0; incr < numIncs; incr++) {
            span = increments[incr];
            for (j = span; j < ub + 1; j++) {
                y = x[j];
                for (k = j - span; k >= 0 && y < x[k]; k -= span)
                    x[k + span] = x[k];
                x[k + span] = y;
				await sortDraw(x,j,k);
				await sleep(30);
            }
        }
		await sortDraw(x);

    }
/*-----------------------------------------------------------*/
/*--------------BITONIC SORT---------------------------------*/
	async function compAndSwap(a,i,j,dir) 
    { 
        if ( (a[i] > a[j] && dir == 1) || (a[i] < a[j] && dir == 0)) 
        { 
            // Swapping elements 
			await swap(a,i,j,20);		
        } 
    } 
  
    async function bitonicMerge(a, low, cnt,dir) 
    { 
        if (cnt>1) 
        { 
            let k = Math.round(cnt/2); 
            for (let i=low; i<low+k; i++){ 
            	await compAndSwap(a,i, i+k, dir);
			}
			await Promise.all([
		        await bitonicMerge(a,low, k, dir),
           		await bitonicMerge(a,low+k, k, dir)			
			]);
			
        } 
    } 
  
    async function bitonicSort(a,low,cnt,dir) 
    { 
		//console.log("Entro 01");
        if (cnt>1) 
        { 
            let k = Math.round(cnt/2);
			await Promise.all([
				bitonicSort(a, low, k, 1), 
  
				// sort in descending order since dir here is 0 
            	bitonicSort(a,low+k, k, 0)
			]);
			// sort in ascending order since dir here is 1 

			// Will merge wole sequence in ascending order 
            // since dir=1. 
            await bitonicMerge(a, low, cnt, dir)
        } 
    } 
	
    async function bitonicSortStart(a,N,up) 
    { 
		titulo("BITONIC SORT");
        await bitonicSort(a, 0, N, up); 
		await sortDraw(a);
    } 
	
}

