import { lineData, PVector , Matrix} from './lineData';

export class statistics{
    public bparams: number[] = [];

    public polyInterpolation(points: PVector[]): number[]{
        var coeffs: number[];
        var interpmat: number[][] = [];
        var interpmat2: number[][] = [];
        for (let point of points){
            var row: number[] = [];
            var row2: number[] = [];
            let pdegree: number = points.length;
            for (let i = 0; i < pdegree; i++){
                let val = Math.pow(point.x, i);
                row.push(val);
            }
            interpmat.push(row);
            row2.push(point.y);
            interpmat2.push(row2);
        }
        var interpMat: Matrix = new Matrix(interpmat);
        //console.log("interpMat: ");
        //console.log(interpMat);
        var interpMat2: Matrix = new Matrix(interpmat2);
        var interpMatinv = interpMat.Invert();
        //console.log("interpMatinv: ");
        //console.log(interpMatinv);
        //console.log(interpMat.multiply(interpMatinv));
        var coeffsmat: Matrix = interpMatinv.multiply(interpMat2);
        coeffs = (coeffsmat.transpose()).mat[0];
        return coeffs;
    }

    public getSlopeIntercept(p1: PVector, p2: PVector): number[]{
        var params: number[] = [];
        var m = (p2.y - p1.y)/(p2.x - p1.x);
        var inter = p2.y - m*p2.x;
        params = [inter, m];
        return params;
    }

    public meanaverage(points: PVector[]): PVector{
        var pvec: PVector = new PVector(0.0,0.0);
        var sumx = 0.0;
        var sumy = 0.0;
        for (let point of points){
            sumx += point.x;
            sumy += point.y;
        }
        pvec.x = sumx / points.length;
        pvec.y = sumy / points.length;
        return pvec;
    }

    
    public movingaverageY(points: PVector[], index: number){
        var sum = 0;
        var i = 0;
        let radius = 50;
        /*
        for (let pvec of points){
            if (i >= (index - radius)){
            sum += pvec.y;
            }
            if (i >= index){
                break;
            }
            i+=1;
        }
        */
        for (i = index - radius; i < index; i++){
            sum += points[i].y;
        }
        return sum/((radius));
    }

    public movingaverageY2(points: PVector[], index: number){
        var sum = 0;
        var i = 0;
        let radius = 50;
        /*
        for (let pvec of points){
            if (i >= (index - radius)){
            sum += pvec.y;
            }
            if (i >= index){
                break;
            }
            i+=1;
        }
        */
        for (i = index - radius/2.0; i < (index + radius/2.0); i++){
            if (i < 0){
                sum += points[0].y;
                continue;
            }
            if (i > (points.length - 1)){
                sum += points[points.length-1].y;
                continue;
            }
            sum += points[i].y;
        }
        return sum/((radius));
    }

    public computeMovingAverageData(points: PVector[]): PVector[]{
        var maPoints: PVector[] = [];
        
        for (let i = 0; i < points.length; i++){
            var y = 0;
            if (i < 50){
                y = points[i].y;
            }
            else{
                y = this.movingaverageY(points, i);
                if (y == undefined){
                    y = points[i].y;
                }
            }
            let x = points[i].x;
            maPoints.push(new PVector(x, y));
           // i += 1;
        }
        return maPoints;
    }

    public computeMovingAverageData2(points: PVector[]): PVector[]{
        var maPoints: PVector[] = [];
        
        for (let i = 0; i < points.length; i++){
            var y = 0;

            y = this.movingaverageY2(points, i);
            if (y == undefined){
                y = points[i].y;
            }
    
            let x = points[i].x;
            maPoints.push(new PVector(x, y));
           // i += 1;
        }
        return maPoints;        
    }
    // y = a1*sin(a2*x)
    //partial y/partial a1 = sin(a2*x)
    //partial y/partial a2 = a1*x*cos(a2*x)
    //(J_r)_ij = partial r_i(b(s))/ partial b_j
    //residual_i = y_i - f(x_i,B)
    public computeNonLinearLeastSquares(points: PVector[], functype: number, iterations: number){
        var jmat: number[][] = [];
        var rvecs: PVector[] = [];
        //initialize guess
        var x: number[]; 
        var paramsMatrix: Matrix;
        paramsMatrix = new Matrix([[1,2,3]]);
        paramsMatrix.test();
        if (functype == 1){
            //guess is initialized to first point 
            if (this.bparams.length == 0){
                this.bparams = [points[0].y, 0.02];
                var bparamsmat: number[][] = [];
                bparamsmat.push(this.bparams);
                paramsMatrix = new Matrix(bparamsmat);

                //check here
                paramsMatrix = paramsMatrix.transpose();
            }
            else{
                var bparamsmat: number[][] = [];
                bparamsmat.push(this.bparams);
                paramsMatrix = new Matrix(bparamsmat);

                //check here
                paramsMatrix = paramsMatrix.transpose();
            }
        }
        else if (functype == 2){
            if (this.bparams.length == 0){
                this.bparams = this.getSlopeIntercept(points[0], points[1]);
                //this.bparams = [1.0, 1.0];
                var bparamsmat: number[][] = [];
                bparamsmat.push(this.bparams);
                paramsMatrix = new Matrix(bparamsmat);

                //check here
                paramsMatrix = paramsMatrix.transpose();
            }
            else{
                var bparamsmat: number[][] = [];
                bparamsmat.push(this.bparams);
                paramsMatrix = new Matrix(bparamsmat);

                //check here
                paramsMatrix = paramsMatrix.transpose();
            }
        }

        else if (functype == 3){
            if (this.bparams.length == 0){
                var pts: PVector[] = [points[0],points[1],points[2]];
                this.bparams = this.polyInterpolation(pts);
                //this.bparams = [1.0, 1.0];
                var bparamsmat: number[][] = [];
                bparamsmat.push(this.bparams);
                paramsMatrix = new Matrix(bparamsmat);

                //check here
                paramsMatrix = paramsMatrix.transpose();
            }
            else{
                var bparamsmat: number[][] = [];
                bparamsmat.push(this.bparams);
                paramsMatrix = new Matrix(bparamsmat);

                //check here
                paramsMatrix = paramsMatrix.transpose();
            }            
        }

        else if (functype == 4){
            if (this.bparams.length == 0){
                var pts: PVector[] = [points[0],points[1],points[2],points[3],points[points.length-1]];
                this.bparams = this.polyInterpolation(pts);
                //this.bparams = [1.0, 1.0];
                var bparamsmat: number[][] = [];
                bparamsmat.push(this.bparams);
                paramsMatrix = new Matrix(bparamsmat);

                //check here
                paramsMatrix = paramsMatrix.transpose();
            }
            else{
                var bparamsmat: number[][] = [];
                bparamsmat.push(this.bparams);
                paramsMatrix = new Matrix(bparamsmat);

                //check here
                paramsMatrix = paramsMatrix.transpose();
            }            
        }
        
        var residualmat: number[][] = [];
        var rMatrix: Matrix;
        var nRow1: number[] = [];
        var nRow2: number[] = [];
        var nRow3: number[] = [];
        var nRow4: number[] = [];
        var nRow5: number[] = [];
        var nRow6: number[] = [];
        //console.log("points: ");
        //console.log(points);
        for (let point of points){
            if(functype == 1){
                let val = Math.sin(this.bparams[1]*point.x);
                let val2 = this.bparams[0]*point.x*Math.cos(this.bparams[1]*point.x);
                nRow1.push(val);
                nRow2.push(val2);
                let val3 = this.bparams[0]*Math.sin(this.bparams[1]*point.x) - point.y;
                nRow3.push(val3);
            }
            else if (functype == 2){
                let val = 1.0;
                let val2 = 1.0*point.x;
                nRow1.push(val);
                nRow2.push(val2);
                let val3 = point.y - this.bparams[1]*point.x - this.bparams[0];
                nRow3.push(val3);
            }
            else if (functype == 3){
                let val = 1.0;
                let val2 = point.x;
                let val4 = point.x*point.x;
                nRow1.push(val);
                nRow2.push(val2);
                nRow4.push(val4);
                let val3 = point.y - this.bparams[2]*point.x*point.x - this.bparams[1]*point.x - this.bparams[0];
                nRow3.push(val3);
            }
            else if (functype == 4){
                let val = 1.0;
                let val2 = point.x;
                let val4 = point.x*point.x;
                let val5 = point.x*point.x*point.x;
                let val6 = point.x*point.x*point.x*point.x;
                nRow1.push(val);
                nRow2.push(val2);
                nRow4.push(val4);
                nRow5.push(val5);
                nRow6.push(val6);
                let val3 = point.y - this.bparams[4]*point.x*point.x*point.x*point.x - this.bparams[3]*point.x*point.x*point.x - this.bparams[2]*point.x*point.x - this.bparams[1]*point.x - this.bparams[0];
                nRow3.push(val3);
            }
        }
        jmat.push(nRow1);
        jmat.push(nRow2);
        if (functype == 3){
            jmat.push(nRow4);
        }
        else if (functype == 4){
            jmat.push(nRow4);
            jmat.push(nRow5);
            jmat.push(nRow6);
        }
        residualmat.push(nRow3);
        rMatrix = new Matrix(residualmat);
        rMatrix = rMatrix.transpose();
        var JMatrix: Matrix = new Matrix(jmat);
        JMatrix = JMatrix.transpose();
        var JTMatrix: Matrix = JMatrix.transpose();
        var JTJMatrix: Matrix = JTMatrix.multiply(JMatrix);
        //console.log("jtmatrix: ");
        //console.log(JTMatrix);
        //console.log(JMatrix);
        //console.log("jtjmatrix: ");
        //console.log(JTJMatrix.mat);
        var JTJMatrixInv: Matrix; //case for Jacobian with 2 parameters (this will not hold for greater number of parameters)
        if (functype == 3){
            JTJMatrixInv = JTJMatrix.Invert();
        }
        else if (functype == 4){
            JTJMatrixInv = JTJMatrix.Invert();
        }
        else{
            JTJMatrixInv = JTJMatrix.Invert2x2();
        }
        var JTJInvJMatrix: Matrix = JTJMatrixInv.multiply(JTMatrix);
        var pMatrix: Matrix = JTJInvJMatrix.multiply(rMatrix);
        var nbParamsMatrix: Matrix = paramsMatrix.add(pMatrix);
        nbParamsMatrix = nbParamsMatrix.transpose();
        //console.log(nbParamsMatrix.mat);
        this.bparams = nbParamsMatrix.mat[0];
        if (iterations > 0){
            iterations--;
            this.computeNonLinearLeastSquares(points,functype,iterations);
        }
        var i = 0;
        //console.log("B params: ");
        //console.log(this.bparams);
        /*
        for (let y of this.bparams){
            rvecs.push(new PVector(points[i].x, y));
            i += 1;
        }
        return rvecs;
        */
    }

    public getNonLinearDataPoints(points: PVector[], functype: number){
        var pvecs: PVector[] = [];
        var presortpoints: number[] = [];
        for (let point of points){
            presortpoints.push(point.x);
        }
        var sortpoints: number[] = presortpoints.sort((n1,n2) => n1 - n2);
        for (let point of sortpoints){
            if (functype == 1){
                let y = this.bparams[0]*Math.sin(this.bparams[1]*point);
                pvecs.push(new PVector(point, y));
            }
            if (functype == 2){
                let y = this.bparams[1]*point + this.bparams[0];
                pvecs.push(new PVector(point, y));
            }
            if (functype == 3){
                let y = this.bparams[2]*point*point+this.bparams[1]*point+this.bparams[0];
                pvecs.push(new PVector(point, y));
            }
            if (functype == 4){
                let y = this.bparams[4]*point*point*point*point + this.bparams[3]*point*point*point + this.bparams[2]*point*point+this.bparams[1]*point+this.bparams[0];
                pvecs.push(new PVector(point, y));               
            }
        }
        //console.log("non linear points pre scale: ");
        //console.log(pvecs);
        return pvecs;
    }

    public resetLeastSquares(){
        this.bparams = [];
    }

}