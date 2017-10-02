import {statistics} from './statistics';

export class PVector {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public add(point: PVector): PVector {
        return new PVector(point.x + this.x, point.y + this.y);
    }

    public multiply(scalar: number): PVector {
        return new PVector(this.x * scalar, this.y * scalar);
    }

    public dot(point: PVector): number {
        return this.x * point.x + this.y + point.y;
    }

    public distance(point: PVector) {
        let Bneg = point.multiply(-1);
        let AB = this.add(Bneg);
        return AB.magnitude();
    }

    public scale(scalex: number, scaley: number): PVector {
        return new PVector(this.x * scalex, this.y * scaley);
    }

    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    public angle(): number {
        return Math.atan2(this.y, this.x);  //in radians
    }

    public norm(): PVector {
        return this.multiply(1.0 / this.magnitude());
    }
    public invertY(): PVector {
        return this.scale(1.0, -1.0);
    }
}

export class Matrix {
    mat: number[][];
    rDim: number;
    cDim: number;
    private getDim(Mat: number[][]){
        let rDim = Mat.length;
        let cDim = Mat[0].length;
        return [rDim,cDim];
    }
    constructor(Mat: number[][]){
        this.mat = Mat;
        let dim = this.getDim(this.mat);
        this.rDim = dim[0];
        this.cDim = dim[1];
    }
    public add(Mat: Matrix){
        //check dimension 
        let t1 = Mat.rDim == this.rDim;
        let t2 = Mat.cDim == this.cDim;
        if (t1 && t2){
            var nMat: number[][] = [];
            for (let i = 0; i < Mat.rDim; i++){
                var nRow: number[] = [];
                for (let j = 0; j < Mat.cDim; j++){
                    nRow.push(Mat.mat[i][j] + this.mat[i][j]);
                }
                nMat.push(nRow);
            }
            var newMatrix: Matrix = new Matrix(nMat);
            return newMatrix;
        }
        else{
            console.log("Matrix Dimensions do no match");
            return;
        }
    }
    public sMult(scale: number){
        var nMat: number[][] = [];
        for (let i = 0; i < this.rDim; i++){
            var nRow: number[] = [];
            for (let j = 0; j < this.cDim; j++){
                nRow.push(this.mat[i][j]*scale);
            }
            nMat.push(nRow);
        }
        var newMatrix: Matrix = new Matrix(nMat);
        return newMatrix;
    }

    private getColumnVec(Mat: Matrix, colind: number){
        var nVec: number[] = [];
        for (let i = 0; i < Mat.rDim; i++){
            nVec.push(Mat.mat[i][colind]);
        }
        return nVec;
    }

    private getRowVec(Mat: Matrix, rowind: number){
        var nVec: number[] = [];
        for (let j = 0; j < Mat.cDim; j++){
            nVec.push(Mat.mat[rowind][j]);
        }
        return nVec;
    }
    
    private sumColRowVecs(Mat: Matrix, rowind: number, colind: number){
        let rvec = this.getRowVec(this, rowind);
        let cvec = this.getColumnVec(Mat, colind);
        var sum = 0;
        var i = 0;
        for (let rval of rvec){
            sum += rval*cvec[i];
            i += 1;
        }
        return sum;
    }

    private sumColRowVecsLI(BMat: Matrix, rowind: number, colind: number){
        let rvec = this.getRowVec(this, rowind);
        let cvec = this.getColumnVec(BMat, colind);
        var sum = 0.0;
        for (let i = rowind; i < (colind + 1); i++){
            sum += -1.0*rvec[i]*cvec[i];
        }
        return sum;       
    }

    private getLowerDMatrix(){
        //assumed lower triangle matrix
        var DMatrix: Matrix = this.identityMatrix();
        for (let i = 0; i < this.rDim; i++){
            for (let j = 0; j < this.cDim; j++){
                if (i == j){
                    let val = this.get(i,j);
                    DMatrix.set(i,j,1.0/val);
                }
            }
        }
        return DMatrix;
    }

    private getLowerCMatrix(){
        var copyMatrix = this.copyMatrix();
         for (let i = 0; i < this.rDim; i++){
            for (let j = 0; j < this.cDim; j++){
                if (i == j){
                    copyMatrix.set(i,j, 1.0);
                }
            }
            
        }
        return copyMatrix;       
    }

    public solveLowerTriangleInvert(LMat: Matrix){
        //assumes THIS matrix is in lower triangle form  (no checks on this)
        //decompose the lower triangle into C and D matrices
        var DMatrix: Matrix = LMat.getLowerDMatrix();
        var CMatrix: Matrix = LMat.getLowerCMatrix();
        var BMatrix: Matrix = LMat.identityMatrix();
        for (let i = 1; i < this.rDim; i++){
            for (let j = 0; j < (i+1); j++){
                var l = i;
                
                for (let k = j; k < (this.cDim - i); k++){
                    var s = this.sumColRowVecsLI(BMatrix, k, l);
                    BMatrix.set(k,l, s);
                    l += 1;
                }
            }
        }
        var AMatrix: Matrix = BMatrix.multiply(DMatrix);
        return AMatrix;
    }

    public LDecomposition(){
        //cholesky decomposition
        /*
        l_jj = sqroot(a_jj - sum(k=1, j-1, L(j,k)^2))

        l_ij = 1/l_jj(a_ij - sum(k=1, j-1, L(i,k)L(j,k)))
        */
        var LMatrix: Matrix = this.zeroMatrix();
        for (let i = 0; i < this.rDim; i++){
            for (let j = 0; j < (i+1); j++){
                if (i == j){
                    var sum = 0.0;
                    for (let k = 0; k < (j); k++){
                        sum += Math.pow(LMatrix.get(j,k),2.0);
                    }
                    var l = Math.sqrt(this.get(i,j)-sum);
                    LMatrix.set(i,j, l);
                }
                else{
                    var sum = 0.0;
                    for (let k = 0; k < (j); k++){
                        sum += LMatrix.get(i,k)*LMatrix.get(j,k);
                    }
                    var l = 1/(LMatrix.get(j,j))*(this.get(i,j)-sum);
                    LMatrix.set(i,j, l);
                }
            }
        }
        //console.log("This matrix: ");
        //console.log(this);
        //console.log("L Matrix: ");
        //console.log(LMatrix);
        let L2: Matrix = LMatrix.transpose();
        //console.log(LMatrix.multiply(L2));
        return LMatrix;
    }

    public InvertLD(){
        let det: number = this.determinant();
        if (det == 0){
            console.log("Matrix is not invertible.");
            return;
        }
        var LMatrix: Matrix = this.LDecomposition();
        var InvL:Matrix = this.solveLowerTriangleInvert(LMatrix);
        var InvLT: Matrix = InvL.transpose();
        var InvMatrix = InvLT.multiply(InvLT);
        return InvMatrix;
    }

    public Invert2x2(){
        var NewMatrix: Matrix = this.zeroMatrix();
        NewMatrix.set(0,0, this.get(1,1));
        NewMatrix.set(0,1, -1.0*this.get(0,1));
        NewMatrix.set(1,0, -1.0*this.get(1,0));
        NewMatrix.set(1,1, this.get(0,0));
        let det: number = NewMatrix.determinant2x2();
        if (det != 0.0){
            return NewMatrix.sMult(1.0/det);
        }
        else{
            console.log("determinant is equal to zero.  Matrix is not invertible")
            return;
        }
    }

    public Invert(){
        //via cofactors computation
        var cofacMatrix: Matrix = this.identityMatrix();
        for (let i = 0; i < this.rDim; i++){
            for (let j = 0; j < this.cDim; j++){
                let matcof: Matrix = this.cofactorMatrix(i,j);
                var coff: number = Math.pow(-1.0, j+i)*matcof.determinant();
                //console.log(i,j);
                //console.log(coff);
                cofacMatrix.set(i,j, coff);
            }
        }
        //cofacMatrix = cofacMatrix.transpose();
        var detcMat = this.determinant();
        if (detcMat == 0.0){
            console.log("determinant zero.  No inverse!");
            return;
        }
        cofacMatrix = cofacMatrix.sMult(1.0/detcMat);
        return cofacMatrix;
    }

    public determinant2x2(){
        let t1 = this.cDim == 2;
        let t2 = this.rDim == 2;
        if (t1 && t2){
            return this.get(0,0)*this.get(1,1)-(this.get(0,1)*this.get(1,0));
        }
        else{
            return;
        }
    }

    public determinant(){
        let t1 = this.cDim == 2;
        let t2 = this.rDim == 2;
        let t3 = this.cDim == this.rDim;
        if (!t3){
            console.log("Matrix not nxn.  Can't compute determinant.");
            return;
        }
        if (t1 && t2){
            return this.determinant2x2();
        }
        else{
            //expand by cofactors
            var sum = 0.0;
            for (let j = 0; j < this.cDim; j++){
                var cofactorMatrix: Matrix = this.cofactorMatrix(0,j);
                //console.log(cofactorMatrix.mat);
                let dval: number = cofactorMatrix.determinant();
                //console.log("j",j);
                //console.log(dval);
                sum += Math.pow(-1.0, j)*dval*this.get(j,0);
                //console.log(sum);
            }
            return sum;
        }

    }

    public multiply(Mat: Matrix){
        //check this column rank matches Mat row rank
        /*
        console.log("multiply c dim: ");
        console.log(this.cDim);
        console.log("multiply r dim: ");
        console.log(this.rDim);
        console.log("multiply Mat r dim: ");
        console.log(Mat.rDim);
        console.log("multiply Mat c dim: ");
        console.log(Mat.cDim);
        */
        let t1 = this.cDim == Mat.rDim;
        if (t1){
            var nMat: number[][] = [];
            for (let i = 0; i < this.rDim; i++){
                var nRow: number[] = [];
                for (let j = 0; j < Mat.cDim; j++){
                    let val = this.sumColRowVecs(Mat, i,j);
                    nRow.push(val);
                }
                nMat.push(nRow);
            }
            var newMat: Matrix = new Matrix(nMat);
            return newMat;
        }
        else{
            console.log("Column rank doesn't match row rank.")
            return;
        }
    }

    public zeroMatrix(){
        var nMat: number[][] = [];
        for (let i = 0; i < this.rDim; i++){
            var nRow: number[] = [];
            for (let j = 0; j < this.cDim; j++){
                nRow.push(0);
            }
            nMat.push(nRow);
        }
        var newMatrix: Matrix = new Matrix(nMat);
        return newMatrix;
    }

    public cofactorMatrix(colind: number, rowind: number){
        var newMat: number[][] = [];
        for (let i = 0; i < this.rDim; i++){
            var newRow: number[] = [];
            if (i == rowind){
                continue;
            }
            for (let j = 0; j < this.cDim; j++){
                if (j == colind){
                    continue;
                }
                newRow.push(this.get(i,j));
            }
            newMat.push(newRow);
        }
        var newMatrix: Matrix = new Matrix(newMat);
        return newMatrix;
    }

    public identityMatrix(){
        var nMat: number[][] = [];
        for (let i = 0; i < this.rDim; i++){
            var nRow: number[] = [];
            for (let j = 0; j < this.cDim; j++){
                if (i == j){
                    nRow.push(1.0);
                }
                else{
                    nRow.push(0.0);
                }
            }
            nMat.push(nRow);
        }
        var newMatrix: Matrix = new Matrix(nMat);
        return newMatrix;
    }
    
    public transposeZeroMatrix(){
        var nMat: number[][] = [];
        for (let i = 0; i < this.cDim; i++){
            var nRow: number[] = [];
            for (let j = 0; j < this.rDim; j++){
                nRow.push(0);
            }
            nMat.push(nRow);
        }
        var newMatrix: Matrix = new Matrix(nMat);
        return newMatrix;
    }

    public copyMatrix(){
        var nMat: number[][] = [];
        for (let i = 0; i < this.cDim; i++){
            var nRow: number[] = [];
            for (let j = 0; j < this.rDim; j++){
                let val = this.get(i,j);
                nRow.push(val);
            }
            nMat.push(nRow);
        }
        var newMatrix: Matrix = new Matrix(nMat);
        return newMatrix;
    }

    public transpose(){
        var newMatrix: Matrix = this.transposeZeroMatrix();
        /*
        console.log(newMatrix.mat);
        console.log("rDim: ");
        console.log(this.rDim);
        console.log("cDim: ");
        console.log(this.cDim);
        */
        for (let i = 0; i < this.rDim; i++){
            for (let j = 0; j < this.cDim; j++){
                newMatrix.set(j,i, this.mat[i][j]);
            }
        }
        return newMatrix;
    }

    public convertToVector(points: PVector[]){
        var rpoints: PVector[] = [];
        var i = 0;
        for (let point of points){
            
            rpoints.push(new PVector(point.x, this.mat[0][i]));
            i += 1;
        }
        return rpoints;
    }

    public set(colind: number, rowind: number, val: number){
        this.mat[colind][rowind] = val;
    }

    public get(colind: number, rowind: number){
        return this.mat[colind][rowind];
    }

    public test(){
        var matdat: number[][] = [[1,2,3],[4,5,6],[2,8,1]];
        var Mat: Matrix = new Matrix(matdat);
        var Matinv = Mat.Invert();
        /*
        console.log("Tests!");
        console.log(Matinv);
        console.log(Mat.multiply(Matinv));
        console.log(Matinv.multiply(Mat));
        */
    }
}

export class lineData {
    points: PVector[];
    movingAveragePoints: PVector[];
    nonLinearLeastSquaresPoints: PVector[];
    chartName: string;
    chartColor: string;
    chartVisible: boolean;
    selected: boolean;
    animInterpolate: boolean;
    nonAnimPoints: PVector[];
    animIndex: number;
    animFinished: boolean;
    animSelected: boolean;
    animRate: number;  //points per frame 
    banimRate: number;
    lastPointsAdded: PVector[];
    barXData: PVector[];  //bar animation data
    barXIndexing: number[]; // bar animation data indexes
    screenpoints: PVector[];  //storage for screencoordinates
    screenToIndex = {};  //screen x coordinate int hashed string 
    piechartPoints: number[];  //normalized point values

    constructor(chartname?: string, chartcolor?: string, chartvisible?: boolean, selected?: boolean) {
        this.points = [];
        this.nonAnimPoints = [];
        if (chartname != null) {
            this.chartName = chartname;
        }

        if (chartcolor != null) {
            this.chartColor = chartcolor;
        }

        if (chartvisible != null) {
            this.chartVisible = chartvisible;
        }

        if (selected != null) {
            this.selected = selected;
        }
    }

    public getMovingAverage(){
        let stats = new statistics();
        this.movingAveragePoints = stats.computeMovingAverageData(this.points);
    }

    public getMovingAverage2(){
        let stats = new statistics();
        this.movingAveragePoints = stats.computeMovingAverageData2(this.points);
    }

    public getNonLinearLeastSquares(functype: number){
        let stats = new statistics();
        this.sortPoints();
        stats.computeNonLinearLeastSquares(this.movingAveragePoints, functype,10);
        this.nonLinearLeastSquaresPoints = stats.getNonLinearDataPoints(this.movingAveragePoints, functype);
    }

    private adjustSplineTranslationOffset(sppoints: PVector[]): PVector[]{
        var spoints: PVector[] = [];
        var troffset = sppoints[0].y - this.nonLinearLeastSquaresPoints[this.nonLinearLeastSquaresPoints.length-1].y;
        for (let point of sppoints){
            var mpoint: PVector = new PVector(point.x, point.y - troffset);
            spoints.push(mpoint);
        }
        return spoints;
    }

    public getNonLinearLeastSquaresSpline(splinesPointSize: number, functype: number){
        let stats = new statistics();
        this.sortPoints();
        this.nonLinearLeastSquaresPoints = [];

        var set = this.points.length/splinesPointSize;
        var k = 0;
        var l = 0;
        var nonlpoints: PVector[] = [];
        for (let i = 0; i < set; i++){
            var pointset: PVector[] = [];
            for (let j = 0; j < splinesPointSize; j++){
                
                pointset.push(this.movingAveragePoints[k]);
                k += 1;
            }
            
            stats.resetLeastSquares();

            stats.computeNonLinearLeastSquares(pointset, functype, 10);
            nonlpoints = stats.getNonLinearDataPoints(pointset, functype);
            //nonlpoints = stats.computeMovingAverageData2(nonlpoints);
            //console.log("Non l points: ");
            //console.log(nonlpoints);
            if (i != 0){
                nonlpoints = this.adjustSplineTranslationOffset(nonlpoints);
            }
            for (let point of nonlpoints){
                this.nonLinearLeastSquaresPoints.push(point);
            }
            //this.nonLinearLeastSquaresPoints.concat(nonlpoints);
        }
        //console.log("non linear least squares points 2: ");
        //console.log(this.nonLinearLeastSquaresPoints);
    }

    public minX(): number {
        var minpoint: PVector = this.points[0];
        for (let point of this.points) {
            if (point.x < minpoint.x) {
                minpoint = point;
            }
        }
        return minpoint.x;
    }

    public minY(): number {
        var minpoint: PVector = this.points[0];
        for (let point of this.points) {
            if (point.y < minpoint.y) {
                minpoint = point;
            }
        }
        return minpoint.y;
    }

    public maxX(): number {
        var minpoint: PVector = this.points[0];
        for (let point of this.points) {
            if (point.x > minpoint.x) {
                minpoint = point;
            }
        }
        return minpoint.x;
    }

    public maxY(): number {
        var minpoint: PVector = this.points[0];
        for (let point of this.points) {
            if (point.y > minpoint.y) {
                minpoint = point;
            }
        }
        return minpoint.y;
    }

    public addPoint(point: PVector): void {
        this.points.push(point);
    }

    public getLastPoint(): PVector {
        return this.points[this.points.length];
    }

    public incrementAnim() {
        if (this.animIndex == this.points.length - 1) {
            this.animFinished = true;

            return;
        }
        this.nonAnimPoints.push(this.points[this.animIndex]);
        this.animIndex += 1;
    }

    public incrementAnimVar(animTime: number) {
        if (this.animRate * animTime > this.points.length) {
            this.incrementAnim();
        }
        else {
            this.lastPointsAdded = [];
            for (let i = 0; i < this.animRate; i++) {
                if (this.animIndex == this.points.length - 1) {
                    this.animFinished = true;
                    return;
                }
                this.lastPointsAdded.push(this.points[this.animIndex]);
                this.nonAnimPoints.push(this.points[this.animIndex]);
                this.animIndex += 1;
            }
        }
    }

    public incrementBAnimVar(banimTime: number) {
        if (this.banimRate * banimTime > this.points.length) {
            this.incrementAnim();
        }
        else {
            this.lastPointsAdded = [];
            for (let i = 0; i < this.banimRate; i++) {
                if (this.animIndex == this.points.length - 1) {
                    this.animFinished = true;
                    return;
                }
                this.lastPointsAdded.push(this.points[this.animIndex]);
                this.nonAnimPoints.push(this.points[this.animIndex]);
                this.animIndex += 1;
            }
        }
    }
    /*
    public addBarpoints(barpoints: PVector[][]){
        var i = 0;
        for (let bpoints of barpoints){
            for (let pvec of bpoints){
                this.addBarpoint(i,pvec);
            }
            i += 1;
        }
    }
    */
    public addBarpoint( point: PVector) {
        //if (this.barXData[chartindex] != undefined) {
            this.barXData.push(point);
        /*
        }
        else {
            let pvl: PVector[] = [];
            pvl.push(point);
            this.barXData[chartindex] = pvl;
        }*/
    }

    public addBarIndex( index: number){
        this.barXIndexing.push(index);
    }

    public removeBarpoint(chartindex: number) {
        if (this.barXData[chartindex] != undefined) {
           // if (this.barXData[chartindex][pointindex] != undefined) {
                this.barXData.splice(chartindex, 1);
            //}
        }
    }
    
    public removeBarindex(bindex: number){
        if(this.barXIndexing[bindex] != undefined){
            this.barXIndexing.splice(bindex,1);
        }
    }

    public barInXBounds(minX: number, chartindex: number) {
        if (this.barXData[chartindex].x < minX) {
            return false;
        }
        else {
            return true;
        }
    }

    public checkRemoveRange(range: number) {
        //bar line graph animation handler
        //var i = 0;
        //for (let pvecdat of this.barXData) {
            var j = 0;
            for (let k = range-1; k > 0; k--) {
                if (!this.barInXBounds(0,k)){
                    this.removeBarpoint(k); 
                    this.removeBarindex(k);
                }
                j+=1;
            }
          //  i+=1;
        //}
    }

    public decrementBarPoints(){
        //var i = 0;
        //for (let bpoints of this.barXData){
            var j = 0;
            for (let pvec of this.barXData){
                this.decrementXpos(j,1);
                j+=1;
            }
           // i+=1;
        //}
    }

    public decrementXpos(chartindex: number, decX: number) {
        this.barXData[chartindex].x -= decX;
    }

    public startAnimation() {
        this.animIndex = 0;
        this.nonAnimPoints = [];
        this.animFinished = false;
        this.animSelected = true;
    }

    public resetAnimationSeed() {
        this.nonAnimPoints = [];
        this.animIndex = 0;
        this.animFinished = false;
        this.animSelected = false;
        this.selected = false;
    }

    public initializeBarXData(){
        this.barXData = [];
        this.barXIndexing = [];
    }

    public setScreenXCoords(){
        //called after screen coordinates have been setSceenXCoords
        //and that this.points is a screen coordinate set.  
        this.screenToIndex = {};
        var i = 0;
        for (let pvec of this.screenpoints){
            let x = pvec.x;
            x = Math.round(x);
            /*
            console.log("key: ");
            console.log(x);
            console.log("value");
            console.log(i);
            */
            this.screenToIndex[x.toString()] = i;
            i += 1; 
        }
    }
    
    public sortPoints(){
        var pxymap = {};
        var presortpoints: number[] = [];
        for (let point of this.points){
            pxymap[point.x] = point.y;
            presortpoints.push(point.x);
        }
        var sortpoints: number[] = presortpoints.sort((n1,n2) => n1 - n2);
        var newvecs: PVector[] = [];
        for (let x of sortpoints){
            newvecs.push(new PVector(x, pxymap[x]));
        }
        this.points = newvecs;
    }

    public getScreenPoint(xpos: number){
        let xpostr = xpos.toString();
        if (xpostr in this.screenToIndex){
            return this.screenToIndex[xpostr];
        }
        return undefined;
    }
}