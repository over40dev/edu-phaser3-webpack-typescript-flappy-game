import Phaser from 'phaser';

export default interface IPipe {
    scene:Phaser.Scene;
    x:number; 
    y:number;
    key:string;
    frame?:string|number;
}
