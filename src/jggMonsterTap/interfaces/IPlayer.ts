import Phaser from 'phaser';

export default interface IPlayer {
    scene:Phaser.Scene;
    x:number; 
    y:number;
    key:string;
    frame?:string|number;
}
